"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { useRenameModal } from "@/store/use-rename-modal";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";

/**
 * Props for the Info component.
 */
interface InfoProps {
  /**
   * The unique ID of the board used to fetch and display board-specific data.
   */
  boardId: string;
}

// Load the Poppins font with a specific weight for title styling
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

/**
 * A small vertical line separator used between toolbar items for spacing and clarity.
 *
 * @returns JSX element representing a vertical divider.
 */
const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>;
};

/**
 * The Info component shows header details of the board including:
 * - A link to return to the board listing page
 * - The board title (with editing support)
 * - A dropdown menu with additional actions (e.g., delete, share)
 *
 * It fetches board data using a Convex query and displays a skeleton while loading.
 *
 * @param {InfoProps} props - Props containing the board ID
 * @returns A toolbar with board information and controls
 */
export const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModal();

  // Fetch the board's data by its ID
  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  // Show a placeholder while the board data is loading
  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      {/* Button linking to the home/boards page */}
      <Hint label="Go to boards" side="bottom" sideOffset={10}>
        <Button asChild variant="board" className="px-2">
          <Link href="/">
            <Image src="/file.svg" alt="logo" height={40} width={40} />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>

      <TabSeparator />

      {/* Button to edit the current board title */}
      <Hint label="Edit Title" side="bottom" sideOffset={10}>
        <Button
          variant="board"
          className="px-2 text-base font-normal"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>

      <TabSeparator />

      {/* Dropdown actions (menu) for the board */}
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <div>
          <Hint label="main menu" side="bottom" sideOffset={10}>
            <Button variant="board" size="icon">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

/**
 * A skeleton placeholder for the Info component shown while board data is being fetched.
 *
 * @returns A styled empty container resembling the final Info layout.
 */
export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  );
};
