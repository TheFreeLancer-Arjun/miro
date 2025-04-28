"use client";

import React from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ModalProvider } from "./providers/modal-provider";

// Convex client init
const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      // अगर जरूरी हो तो publishableKey पास कर सकते हैं, Next.js auto-detect कर लेगा
    >
      {/* Clerk के useAuth hook को Convex में पास करते हैं */}
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Toaster />
        <ModalProvider/>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
