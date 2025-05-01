"use client";

import { Info } from "./info";
import { Participants } from "./participants";
import { ToolBar } from "./toolbar";
import { useSelf } from "@/liveblocks.config";

/**
 * Props for the Canvas component.
 */
interface CanvasProps {
  /**
   * The unique identifier of the board to be rendered.
   */
  boardId: string;
}

/**
 * The Canvas component is the main visual area of the board.
 * 
 * It includes:
 * - `Info`: Displays board-related information.
 * - `Participants`: Shows current users in the session.
 * - `ToolBar`: Provides drawing or interaction tools.
 * 
 * It also uses `useSelf` to access the current user's information from Liveblocks.
 * 
 * @param {CanvasProps} props - The props containing the board ID.
 * @returns The visual canvas layout with tools and participant info.
 */
export const Canvas = ({ boardId }: CanvasProps) => {
  // Get current user's info from Liveblocks
  const info = useSelf((me) => me.info);

  return (
    <main className="h-full w-full relative bg-neutral-300 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <ToolBar />
    </main>
  );
};
