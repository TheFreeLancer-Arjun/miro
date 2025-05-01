"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutationHook } from "@/hook/use-api-mutation-hook";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NewBoardButtonProps {
  orgId: string; // The ID of the organization to associate with the new board
  disabled?: boolean; // Optional prop to disable the button
}

/**
 * NewBoardButton component provides a button to create a new board in an organization.
 * When clicked, it triggers the board creation process, shows a success message, 
 * and redirects the user to the newly created board.
 *
 * @param {NewBoardButtonProps} props - The properties passed to the component
 * @param {string} props.orgId - The organization ID to associate with the new board
 * @param {boolean} [props.disabled=false] - Optional flag to disable the button
 * 
 * @returns {JSX.Element} The rendered button component
 */
export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const router = useRouter();
  const { mutate, pending } = useApiMutationHook(api.board.create);

  // Handle the button click to create a new board
  const onClick = () => {
    mutate({
      orgId,
      title: "Untitled", // Default title for the new board
    })
      .then((id) => {
        toast.success("Board Created"); // Show success message
        router.push(`board/${id}`); // Redirect to the new board's page
      })
      .catch(() => toast.error("Failed to create board")); // Show error message if creation fails
  };

  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6 ",
        (pending || disabled) && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <Plus className="h-12 w-12 text-white stroke-1 " />
      <p className="text-sm text-white font-light ">New Board</p>
    </button>
  );
};
