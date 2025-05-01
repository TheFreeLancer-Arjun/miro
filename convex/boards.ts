import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";

/**
 * Retrieves a list of boards for a given organization, with optional search and favorite filters.
 * 
 * @param {Object} args - The arguments for the query.
 * @param {string} args.orgId - The organization ID to filter the boards by.
 * @param {string} [args.search] - An optional search query to filter boards by title.
 * @param {string} [args.favorites] - An optional filter to only return favorited boards.
 * 
 * @throws {Error} Throws an error if the user is not authenticated.
 * 
 * @returns {Array} A list of boards, each with a `isFavorite` property indicating whether the board is favorited by the current user.
 */
export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("unauthorized");
    }

    // If user wants favorite boards
    if (args.favorites) {
      const favoriteBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity.subject).eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();

      const ids = favoriteBoards.map((b) => b.boardId);
      const boards = await getAllOrThrow(ctx.db, ids);

      return boards.map((board) => ({
        ...board,
        isFavorite: true,
      }));
    }

    const title = args.search as string;
    let boards = [];

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    // Adding the favorite relation to each board
    const boardWithFavoriteRelation = boards.map((board) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", identity.subject).eq("boardId", board._id)
        )
        .unique()
        .then((favorite) => {
          return {
            ...board,
            isFavorite: !!favorite,
          };
        });
    });

    const boardWithFavoriteBoolean = await Promise.all(boardWithFavoriteRelation);

    return boardWithFavoriteBoolean;
  },
});
