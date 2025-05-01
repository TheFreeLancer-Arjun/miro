import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Props for the Footer component.
 */
interface FooterProps {
  /** The title or name to be displayed (e.g., board title) */
  title: string;

  /** Label for the author of the item */
  authorLabel: string;

  /** Label showing when the item was created */
  createdAtLabel: string;

  /** Indicates if the item is marked as favorite */
  isFavorite: boolean;

  /** Callback when the favorite/star button is clicked */
  onClick: () => void;

  /** Whether the button is disabled (e.g., during a loading state) */
  disabled: boolean;
}

/**
 * Footer component for displaying board metadata and a favorite toggle button.
 *
 * Includes:
 * - Title and metadata (author, creation date)
 * - Star icon for marking as favorite
 * - Hover effects for improved interactivity
 *
 * @param {FooterProps} props - Component props
 * @returns React component
 */
export const Footer = ({
  title,
  authorLabel,
  createdAtLabel,
  isFavorite,
  onClick,
  disabled,
}: FooterProps) => {
  /**
   * Handles click on the star icon, preventing propagation to parent elements.
   * @param {React.MouseEvent<HTMLButtonElement>} event - Mouse click event
   */
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    onClick();
  };

  return (
    <div className="relative bg-white p-3">
      {/* Title */}
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">
        {title}
      </p>

      {/* Author and Created At (visible on hover) */}
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
        {authorLabel}, {createdAtLabel}
      </p>

      {/* Favorite (Star) Button */}
      <button
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600",
          disabled && "cursor-not-allowed opacity-75"
        )}
        disabled={disabled}
        onClick={handleClick}
      >
        <Star
          className={cn(
            "h-4 w-4",
            isFavorite && "fill-blue-600 text-blue-600"
          )}
        />
      </button>
    </div>
  );
};
