"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRenameModal } from "@/store/use-rename-modal";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutationHook } from "@/hook/use-api-mutation-hook";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

/**
 * RenameModal Component
 * 
 * A modal that allows users to edit and update the title of a board. 
 * It displays an input field for the new title and includes actions to save 
 * or cancel the update.
 */
export const RenameModal = () => {
  // Hook to handle API mutation for updating the board's title
  const { mutate, pending } = useApiMutationHook(api.board.update);

  // Access modal state and data from the custom store
  const { isOpen, onClose, initialValues } = useRenameModal();

  // Local state to hold the new title value
  const [title, setTitle] = useState(initialValues.title);

  // Sync the initial title value when it changes
  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  /**
   * onSubmit Handler
   * 
   * Handles form submission to update the board's title.
   * Calls the mutate function to perform the API request.
   * Displays success or error toast based on the result.
   */
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({
      id: initialValues.id,
      title,
    })
      .then(() => {
        // Success: Display success message and close the modal
        toast.success("board renamed");
        onClose();
      })
      .catch(() => {
        // Error: Display error message if the mutation fails
        toast.error("failed to rename board");
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>enter a new title for this board</DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="board title"
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
