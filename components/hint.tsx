import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Props for the `Hint` component.
 * 
 * @param {string} label - The text to be displayed inside the tooltip.
 * @param {React.ReactNode} children - The element that triggers the tooltip when hovered or focused.
 * @param {"top" | "bottom" | "left" | "right"} [side] - The side of the trigger element where the tooltip will appear. Defaults to "top".
 * @param {"start" | "center" | "end"} [align] - The alignment of the tooltip relative to the trigger. Defaults to "center".
 * @param {number} [sideOffset] - The offset distance between the tooltip and the trigger element along the side axis.
 * @param {number} [alignOffset] - The offset distance between the tooltip and the trigger element along the alignment axis.
 */
export interface HintProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end"; // also fixed space after "center"
  sideOffset?: number;
  alignOffset?: number;
}

/**
 * A component that displays a tooltip when the user hovers or focuses on the child element.
 * The tooltip's position and alignment can be customized.
 * 
 * @param {HintProps} props - The properties for the tooltip, including the label, alignment, side, and offsets.
 * 
 * @returns {JSX.Element} The rendered `Hint` component, with a tooltip shown on trigger.
 */
export const Hint = ({
  label,
  children,
  side,
  align,
  sideOffset,
  alignOffset,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className="text-white bg-black border-black"
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <p className="font-semibold capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
