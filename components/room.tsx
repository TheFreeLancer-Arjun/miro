"use client";

import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "@/liveblocks.config";

/**
 * Props for the `Room` component.
 * 
 * @param {ReactNode} children - The child elements that are wrapped by the `Room` component, rendered inside the `ClientSideSuspense`.
 * @param {string} roomId - The unique identifier for the room that connects the client to the live room.
 * @param {NonNullable<ReactNode> | null} fallback - The content displayed while the room is loading or waiting for initial data.
 */
interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}

/**
 * A component that provides a live room context and suspense for loading content.
 * The `Room` component uses `RoomProvider` to manage the live room state and `ClientSideSuspense` to handle loading states with a fallback.
 * 
 * @param {RoomProps} props - The properties for the room, including `children`, `roomId`, and `fallback`.
 * 
 * @returns {JSX.Element} The rendered `Room` component, which provides live room functionality and suspense for content loading.
 */
export const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={fallback}>
        {children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
