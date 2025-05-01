import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const images = ["/file.svg"];

/**
 * Creates a new board with a random image and saves it to the database.
 * 
 * @param {Object} args - The arguments for the mutation.
 * @param {string} args.orgId - The organization ID associated with the board.
 * @param {string} args.title - The title of the board.
 * 
 * @throws {Error} Throws an error if the user is not authenticated.
 * 
 * @returns {Object} The created board object.
 */
export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    });

    return board;
  },
});

/**
 * Removes a board from the database and deletes any associated user favorites.
 * 
 * @param {Object} args - The arguments for the mutation.
 * @param {Id} args.id - The ID of the board to be deleted.
 * 
 * @throws {Error} Throws an error if the user is not authenticated or the board is not found.
 */
export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.subject;
    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", args.id)
      )
      .unique();

    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id);
    }

    await ctx.db.delete(args.id);
  },
});

/**
 * Updates the title of an existing board.
 * 
 * @param {Object} args - The arguments for the mutation.
 * @param {Id} args.id - The ID of the board to be updated.
 * @param {string} args.title - The new title of the board.
 * 
 * @throws {Error} Throws an error if the user is not authenticated, the title is empty, or the title exceeds 60 characters.
 * 
 * @returns {Object} The updated board object.
 */
export const update = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const title = args.title.trim();

    if (!title) {
      throw new Error("Title is required");
    }

    if (title.length > 60) {
      throw new Error("Title cannot be longer than 60 characters");
    }

    const board = await ctx.db.patch(args.id, {
      title: args.title,
    });

    return board;
  },
});

/**
 * Adds a board to the user's favorites.
 * 
 * @param {Object} args - The arguments for the mutation.
 * @param {Id} args.id - The ID of the board to be favorited.
 * @param {string} args.orgId - The organization ID associated with the board.
 * 
 * @throws {Error} Throws an error if the user is not authenticated, the board is not found, or the board is already favorited.
 * 
 * @returns {Object} The favorited board object.
 */
export const favorites = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id)
      )
      .unique();

    if (existingFavorite) {
      throw new Error("Board already favorited");
    }

    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });

    return board;
  },
});

/**
 * Removes a board from the user's favorites.
 * 
 * @param {Object} args - The arguments for the mutation.
 * @param {Id} args.id - The ID of the board to be unfavorited.
 * 
 * @throws {Error} Throws an error if the user is not authenticated, the board is not found, or the board is not favorited.
 * 
 * @returns {Object} The unfavorited board object.
 */
export const unfavorites = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id)
      )
      .unique();

    if (!existingFavorite) {
      throw new Error("Favorited board not found");
    }

    await ctx.db.delete(existingFavorite._id);

    return board;
  },
});

/**
 * Retrieves a board from the database by its ID.
 * 
 * @param {Object} args - The arguments for the query.
 * @param {Id} args.id - The ID of the board to retrieve.
 * 
 * @returns {Object} The retrieved board object.
 */
export const get = query({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const board = ctx.db.get(args.id);

    return board;
  },
});
