import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_components/loding";

/**
 * Props interface for the BoardIdPage component.
 * Contains route parameters including the board ID.
 */
interface BoardIdPageProps {
  params: {
    /**
     * The unique identifier for the board (room).
     */
    boardId: string;
  };
}

/**
 * The BoardIdPage component represents a dynamic route page
 * that renders a specific board (or room) based on the boardId from the URL.
 * 
 * It wraps the `Canvas` component (which likely contains the board's content)
 * inside the `Room` component to handle room-related logic like state or WebSocket connections.
 * 
 * If the room is still loading, it shows the `Loading` fallback.
 * 
 * @param {BoardIdPageProps} props - Props containing the boardId parameter
 * @returns The board page with room and canvas components
 */
const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default BoardIdPage;
