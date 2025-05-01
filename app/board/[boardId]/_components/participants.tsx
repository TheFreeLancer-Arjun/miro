"use client";

import { UserAvatar } from "./user-avatar";
import { useOthers, useSelf } from "@/liveblocks.config";

const MAX_SHOW_USERS = 2;

/**
 * The Participants component displays a list of users currently in the session.
 * 
 * It shows:
 * - A list of user avatars (up to `MAX_SHOW_USERS` users)
 * - The current user's avatar with a `(YOU)` label
 * - A count of additional users if there are more than the allowed maximum
 *
 * @returns The UI for displaying user avatars and participant information.
 */
export const Participants = () => {
  // Fetch the list of other users and the current user's data
  const users = useOthers();
  const currentUser = useSelf();
  
  // Check if there are more users than the allowed maximum
  const hasMoreUsers = users.length > MAX_SHOW_USERS;

  return (
    <div className="absolute top-2 right-2 bg-white rounded-md p-3 h-12 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {/* Display avatars of the first few users */}
        {users.slice(0, MAX_SHOW_USERS).map(({ connectionId, info }) => (
          <UserAvatar
            key={connectionId}
            src={info?.picture as string | undefined}
            name={info?.name as string | undefined}
            fallback={(info?.name as string | undefined)?.[0] || "N"}
          />
        ))}

        {/* Display the current user's avatar with a (YOU) label */}
        {currentUser && (
          <UserAvatar
            src={currentUser.info?.picture as string | undefined}
            name={`${currentUser.info?.name as string} (YOU)`}
            fallback={(currentUser.info?.name as string | undefined)?.[0] || "Y"}
          />
        )}

        {/* Show the count of additional users if applicable */}
        {hasMoreUsers && (
          <div className="text-sm text-muted-foreground">+{users.length - MAX_SHOW_USERS}</div>
        )}
      </div>
    </div>
  );
};

/**
 * Skeleton placeholder for the Participants component, shown while user data is loading.
 *
 * @returns A skeleton UI with a fixed width for the participants section.
 */
export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute top-2 right-2 bg-white rounded-md p-3 h-12 flex items-center shadow-md w-[100px]" />
  );
};
