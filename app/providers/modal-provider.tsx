"use client";

import { useEffect, useState } from "react";
import { RenameModal } from "@/components/modals/rename-modal";

/**
 * ModalProvider component is responsible for conditionally rendering modals
 * only after the component has mounted in the client-side. It ensures that
 * modals, such as RenameModal, are rendered in the DOM only after the 
 * component has been fully mounted to avoid potential issues during server-side rendering (SSR).
 * 
 * It leverages the `useEffect` hook to set a flag (`isMounted`) which helps 
 * control when the modals should be rendered on the client.
 * 
 * @returns {React.ReactNode} A wrapped modal component that will be rendered after the component has mounted.
 */
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Ensure the component renders only after mounting
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RenameModal />
    </>
  );
};
