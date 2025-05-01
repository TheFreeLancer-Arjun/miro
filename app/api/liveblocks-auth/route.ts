import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Id } from "@/convex/_generated/dataModel"; // Required for type casting

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_ThQrAxuDQpId0NvWgRj5dRzUZJ8qPXmYcQRmTj00tBhLKLHpt3epQt3mLoR4AKU9", // Replace with env variable in production
});

/**
 * Handles POST requests to authorize a user for a Liveblocks session.
 *
 * This endpoint:
 * - Authenticates the current user via Clerk.
 * - Verifies the user is part of the same organization as the board.
 * - Prepares and authorizes a Liveblocks session with full access to the room (board).
 *
 * Request body must include:
 * - `room`: A Convex board ID (used as the Liveblocks room identifier).
 *
 * Returns:
 * - 200 and a Liveblocks authorization body if successful.
 * - 403 if the user is not authenticated or does not belong to the same organization as the board.
 *
 * @param {Request} request - The incoming HTTP POST request containing JSON with the board room ID.
 * @returns {Promise<Response>} A response containing the Liveblocks authorization or an error.
 */
export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();

  console.log("AUTH_INFO", {
    authorization,
    user,
  });

  if (!user || !authorization) {
    return new Response("unauthorized", { status: 403 });
  }

  const { room } = await request.json();

  // Cast room as Convex board ID
  const board = await convex.query(api.board.get, { id: room as Id<"boards"> });

  console.log("BOARD_CHECK", {
    room,
    board,
    boardOrgId: board?.orgId,
    userOrgId: authorization.orgId,
  });

  if (board?.orgId !== authorization.orgId) {
    return new Response("unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.firstName!,
    picture: user.imageUrl!,
  };

  console.log({ userInfo });

  const session = liveblocks.prepareSession(user.id, {
    userInfo: userInfo,
  });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();

  console.log({ status, body }, "ALLOWED");

  return new Response(body, { status });
}
