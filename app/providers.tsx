"use client";

import React from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ModalProvider } from "./providers/modal-provider";

// Convex client initialization
/**
 * Initializes Convex React client with the provided environment URL.
 * The client is used to interact with Convex backend services.
 */
const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
);

/**
 * Providers component that wraps the application with various context providers.
 * This includes authentication, backend services, and UI components.
 * 
 * @param children - The child components that will be rendered inside the Providers component.
 * @returns The children wrapped with ClerkProvider, ConvexProviderWithClerk, Toaster, and ModalProvider.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Toaster />
        <ModalProvider />
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
