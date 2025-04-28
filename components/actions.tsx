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
import { useRenameModal } from "@/nextjs-clerk/store/use-rename-modal";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionsProps) => {
  const { onOpen } = useRenameModal();

  const { mutate, pending } = useApiMutationHook(api.board.remove);

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("FAILED TO COPY "));
  };

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success("board deleted"))
      .catch(() => toast.error("failed to delete board "));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60 "
      >
        <DropdownMenuItem
          onClick={onCopyLink}
          className="p-3 cursor-pointer justify-center "
        >
          <Link2 className=" h-4 w-4  mr-2" />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen(id, title)}
          className="p-3 cursor-pointer justify-center "
        >
          <Pencil className=" h-4 w-4  mr-2" />
          rename
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete board"
          description="this will  delete the board and all of its contents"
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button
            variant="ghost"
            className="p-3 cursor-pointer  text-sm w-full justify-center font-normal"
          >
            <Trash2 className=" h-4 w-4  mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
