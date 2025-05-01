"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useApiMutationHook } from "@/hook/use-api-mutation-hook";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";
import { Id } from "@/convex/_generated/dataModel";

/**
 * Component that renders a dropdown menu with actions for a board, such as copying a link, renaming, and deleting.
 * 
 * @param {React.ReactNode} children - The trigger element that opens the dropdown menu.
 * @param {DropdownMenuContentProps["side"]} [side] - The side to display the dropdown menu.
 * @param {DropdownMenuContentProps["sideOffset"]} [sideOffset] - The offset distance for positioning the dropdown menu.
 * @param {Id<"boards">} id - The unique identifier of the board.
 * @param {string} title - The title of the board.
 * 
 * @returns {JSX.Element} The rendered dropdown menu component.
 */
interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: Id<"boards">; // ✅ Properly typed
  title: string;
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionsProps) => {
  const { onOpen } = useRenameModal(); // Hook to handle opening the rename modal
  const { mutate, pending } = useApiMutationHook(api.board.remove); // API hook for deleting the board

  /**
   * Copies the board's URL to the clipboard and shows a success or error toast.
   */
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"));
  };

  /**
   * Deletes the board and shows a success or error toast.
   */
  const onDelete = () => {
    mutate({ id }) // ✅ works because id is already the correct type
      .then(() => toast.success("Board deleted"))
      .catch(() => toast.error("Failed to delete board"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem
          onClick={onCopyLink}
          className="p-3 cursor-pointer justify-start"
        >
          <Link2 className="h-4 w-4 mr-2" />
          Copy Link
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onOpen(id, title)}
          className="p-3 cursor-pointer justify-start"
        >
          <Pencil className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <ConfirmModal
          header="Delete Board"
          description="This will delete the board and all its contents."
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button
            variant="ghost"
            className="p-3 text-sm w-full justify-start font-normal"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
