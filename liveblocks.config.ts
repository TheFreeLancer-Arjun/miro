import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

// 1. Create the client
// Initializes the Liveblocks client, which will communicate with the Liveblocks API.
// The authEndpoint is used to authenticate the client with your backend.
const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
});

// UserMeta type definition
// Defines the metadata for a user in the Liveblocks system.
// This can include an optional user ID, as well as an optional object containing user details such as name and picture.
type UserMeta = {
  id?: string;
  info?: {
    name?: string;
    picture?: string;
  };
};

// 2. Create base room context
// Creates a context that will be used throughout your application to manage real-time room-based interactions.
// The `createRoomContext` function from Liveblocks creates a context that enables you to manage users, events, and state in a room.
const {
  suspense: {
    // RoomProvider: Provider component to wrap your app and provide room data to components
    RoomProvider,

    // useRoom: Custom hook to access the room's state, including presence and storage.
    useRoom,

    // useMyPresence: Custom hook to access the current user's presence data in the room.
    useMyPresence,

    // useUpdateMyPresence: Custom hook to update the current user's presence data.
    useUpdateMyPresence,

    // useSelf: Custom hook to get the current user.
    useSelf,

    // useOthers: Custom hook to access a list of all other users currently in the room.
    useOthers,

    // useOthersMapped: Custom hook to access a mapped list of other users in the room.
    useOthersMapped,

    // useOthersConnectionIds: Custom hook to access the connection IDs of all other users.
    useOthersConnectionIds,

    // useOther: Custom hook to access data about a specific user in the room.
    useOther,

    // useBroadcastEvent: Custom hook to send events to all other users in the room.
    useBroadcastEvent,

    // useEventListener: Custom hook to listen for events broadcasted in the room.
    useEventListener,

    // useErrorListener: Custom hook to listen for errors in the room context.
    useErrorListener,

    // useStorage: Custom hook to access and manage the room's storage.
    useStorage,
  },
} = createRoomContext(client);

// 3. Export hooks and RoomProvider to use in components
// Exports all the hooks and RoomProvider to be used within your components, allowing you to interact with the room's real-time features.
// These hooks allow access to the room's state, users' presence, events, and room storage.
export {
  RoomProvider,
  useRoom,
  useMyPresence,
  useUpdateMyPresence,
  useSelf,
  useOthers,
  useOthersMapped,
  useOthersConnectionIds,
};
