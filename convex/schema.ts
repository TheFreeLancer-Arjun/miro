import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

/**
 * Defines the schema for the database, including the tables `boards` and `userFavorites`.
 * 
 * - `boards`: Contains information about boards in an organization.
 *   - `title`: The title of the board.
 *   - `orgId`: The ID of the organization the board belongs to.
 *   - `authorId`: The ID of the author of the board.
 *   - `authorName`: The name of the author of the board.
 *   - `imageUrl`: The URL of the image associated with the board.
 *   - Indexes:
 *     - `by_org`: Indexes boards by `orgId` for fast querying by organization.
 *     - `search_title`: A full-text search index on the `title` field, filtered by `orgId`.
 * 
 * - `userFavorites`: Stores user favorites, linking users to boards they have favorited.
 *   - `orgId`: The ID of the organization the favorite belongs to.
 *   - `userId`: The ID of the user who favorited the board.
 *   - `boardId`: The ID of the board the user has favorited (referencing the `boards` table).
 *   - Indexes:
 *     - `by_board`: Indexes the table by `boardId` for fast querying by board.
 *     - `by_user_org`: Indexes the table by `userId` and `orgId` for fast querying by user and organization.
 *     - `by_user_board`: Indexes the table by `userId` and `boardId` for fast querying by user and board.
 *     - `by_user_board_org`: Indexes the table by `userId`, `boardId`, and `orgId` for more specific queries.
 * 
 * @returns The defined schema with `boards` and `userFavorites` tables.
 */
export default defineSchema({
  boards: defineTable({
    title: v.string(),
    orgId: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
  })
    .index("by_org", ["orgId"]) // Index boards by orgId for efficient lookups
    .searchIndex("search_title", { // Full-text search index on title field
      searchField: "title",
      filterFields: ["orgId"], // Allows search filtering by orgId
    }),

  userFavorites: defineTable({
    orgId: v.string(),
    userId: v.string(),
    boardId: v.id("boards"), // References the boards table
  })
    .index("by_board", ["boardId"]) // Index userFavorites by boardId
    .index("by_user_org", ["userId", "orgId"]) // Index userFavorites by userId and orgId
    .index("by_user_board", ["userId", "boardId"]) // Index userFavorites by userId and boardId
    .index("by_user_board_org", ["userId", "boardId", "orgId"]), // Index userFavorites by userId, boardId, and orgId
});
