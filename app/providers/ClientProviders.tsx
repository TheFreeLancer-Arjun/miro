"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Authenticated, ConvexReactClient } from "convex/react";
import { AuthLoading } from "convex/react";
import Loading from "@/components/auth/loading"; // Loading component ka correct path dena

// Convex URL for client connection
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

/**
 * ClientProviders component wraps the children components with the necessary 
 * authentication and client providers, such as Clerk for authentication and 
 * Convex for backend interaction.
 * 
 * It provides the following functionality:
 * - Authenticates the user using Clerk
 * - Initializes Convex client with Clerk authentication
 * - Displays a loading component while the authentication status is being resolved
 * 
 * @param {React.ReactNode} children - The child components to be wrapped by the providers.
 * @returns A provider wrapper that includes Clerk and Convex authentication and backend services.
 */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>
          {children}
        </Authenticated>
        
        {/* Loading spinner while the authentication process is ongoing */}
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
