"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

/**
 * Props for the `ConfirmModal` component.
 * 
 * @param {React.ReactNode} children - The trigger element that opens the confirmation dialog.
 * @param {() => void} onConfirm - The function to execute when the user confirms the action.
 * @param {boolean} [disabled] - Determines if the confirm button is disabled.
 * @param {string} header - The title of the confirmation dialog.
 * @param {string} [description] - Optional description providing more context for the action.
 */
interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
  disabled?: boolean;
  header: string;
  description?: string;
}

/**
 * A modal component that prompts the user for confirmation with a customizable header and description.
 * Displays a "cancel" and a "confirm" button, with the confirm button calling the provided `onConfirm` function when clicked.
 * 
 * @param {ConfirmModalProps} props - The properties for the modal, including children, onConfirm, disabled, header, and description.
 * 
 * @returns {JSX.Element} The rendered confirmation modal component.
 */
export const ConfirmModal = ({
  children,
  onConfirm,
  disabled,
  header,
  description,
}: ConfirmModalProps) => {
  /**
   * Handles the confirmation action by invoking the provided onConfirm function.
   */
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{header}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>cancel</AlertDialogCancel>
          <AlertDialogAction disabled={disabled} onClick={handleConfirm}>
            confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
