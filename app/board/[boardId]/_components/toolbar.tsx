import { Skeleton } from "@/components/ui/skeleton";

/**
 * ToolBar component displays the tools available for the user to interact with.
 * 
 * It includes:
 * - A set of drawing tools (e.g., pencil, square, circle, line, etc.)
 * - Undo and redo buttons for action history
 * 
 * Positioned at the left side of the screen, vertically centered.
 *
 * @returns The UI for the toolbar with drawing tools and action buttons.
 */
export const ToolBar = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      {/* Drawing tools section */}
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <div>pencil</div>
        <div>square</div>
        <div>circle</div>
        <div>line</div>
        <div>ellipsis</div>
      </div>

      {/* Undo and redo buttons section */}
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <div>undo</div>
        <div>redo</div>
      </div>
    </div>
  );
};

/**
 * ToolBarSkeleton component is a placeholder UI for the toolbar, shown while data is loading.
 *
 * @returns A skeleton loading state for the toolbar with a fixed width and height.
 */
export const ToolBarSkeleton = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md" />
  );
};
