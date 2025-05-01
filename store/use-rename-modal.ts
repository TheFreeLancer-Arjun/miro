import { create } from "zustand";
import { Id } from "@/convex/_generated/dataModel";

/**
 * Zustand store to manage the state of the Rename Modal.
 * 
 * This store manages the visibility and initial values of the Rename Modal,
 * including the board ID and title that will be passed to the modal for editing.
 * It provides methods to open and close the modal, and to set the initial values
 * when the modal is opened.
 * 
 * @example
 * const { isOpen, onOpen, onClose, initialValues } = useRenameModal();
 * onOpen(id, title); // To open the modal with specific values.
 * onClose(); // To close the modal and reset the state.
 */
interface IRenameModal {
  isOpen: boolean; // Whether the modal is open or closed.
  initialValues: {
    id: Id<"boards">; // The ID of the board to be renamed.
    title: string; // The current title of the board.
  };
  onOpen: (id: Id<"boards">, title: string) => void; // Function to open the modal with the given board ID and title.
  onClose: () => void; // Function to close the modal and reset the state.
}

const defaultValues = {
  id: "" as Id<"boards">, // Default empty ID for the board.
  title: "", // Default empty title for the board.
};

/**
 * Zustand store hook to manage the Rename Modal state.
 * 
 * The store contains:
 * - `isOpen`: A boolean to track whether the Rename Modal is open.
 * - `initialValues`: The initial values (board ID and title) passed when the modal is opened.
 * - `onOpen`: A function to open the modal and set the initial values.
 * - `onClose`: A function to close the modal and reset the state to its default.
 */
export const useRenameModal = create<IRenameModal>((set) => ({
  isOpen: false, // Modal is initially closed
  initialValues: defaultValues, // Initialize with default values
  onOpen: (id, title) =>
    set({
      isOpen: true,
      initialValues: { id, title }, // Set the board ID and title when the modal is opened
    }),
  onClose: () =>
    set({
      isOpen: false, // Close the modal
      initialValues: defaultValues, // Reset the values to defaults when modal is closed
    }),
}));
