import { Loader } from "lucide-react";
import { InfoSkeleton } from "./info";
import { ParticipantsSkeleton } from "./participants";
import { ToolBarSkeleton } from "./toolbar";

/**
 * `Loading` component is displayed while the main board content is being fetched or initialized.
 * 
 * It shows:
 * - A spinning loader icon for visual feedback
 * - Skeleton placeholders for `Info`, `Participants`, and `ToolBar` components
 *
 * @returns A full-screen loading UI with animated and placeholder elements.
 */
export const Loading = () => {
  return (
    <main className="h-full w-full relative bg-neutral-300 touch-none flex justify-center items-center">
      {/* Spinning loader icon */}
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />

      {/* Placeholder skeletons for UI sections */}
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolBarSkeleton />
    </main>
  );
};
