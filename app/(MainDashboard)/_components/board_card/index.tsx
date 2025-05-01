"use client";

import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutationHook } from "@/hook/use-api-mutation-hook";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

// Assuming you have an Id type defined somewhere (e.g., in the api.ts)
type Id<T extends string> = { __tableName: T; _id: string };

// Props for the BoardCard component
interface BoardCardProps {
  /** Unique identifier for the board */
  id: string;

  /** Title of the board */
  title: string;

  /** Name of the author of the board */
  authorName: string;

  /** Unique identifier for the author */
  authorId: string;

  /** Timestamp of when the board was created */
  createdAt: number;

  /** URL of the board's image */
  imageUrl: string;

  /** Organization ID associated with the board */
  orgId: string;

  /** Whether the board is marked as favorite */
  isFavorite: boolean;
}

/**
 * BoardCard component displays a board's image, title, author info, and its 
 * favorite state with a toggle button. It also provides navigation to the board page.
 * 
 * @param {string} id - Unique identifier for the board.
 * @param {string} title - Title of the board.
 * @param {string} authorName - Name of the author of the board.
 * @param {string} authorId - Unique identifier for the author.
 * @param {number} createdAt - Timestamp of when the board was created.
 * @param {string} imageUrl - URL of the board's image.
 * @param {string} orgId - Organization ID associated with the board.
 * @param {boolean} isFavorite - Whether the board is marked as favorite.
 * 
 * @returns {JSX.Element} - A JSX element that represents the board card UI.
 */
export const BoardCard = ({
  id,
  title,
  authorName,
  authorId,
  createdAt,
  imageUrl,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();

  // Calculate the author label and the creation time label
  const authorLabel = userId === authorId ? "you" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  // Hook for handling board favorite/unfavorite actions
  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutationHook(api.board.favorites);
  const { mutate: onUnFavorite, pending: pendingUnFavorite } = useApiMutationHook(api.board.unfavorites);

  /**
   * Toggles the favorite state of the board.
   * - If the board is already marked as favorite, it unfavorites it.
   * - If the board is not a favorite, it marks it as favorite.
   * 
   * @returns {void}
   */
  const toggleFavorite = () => {
    if (isFavorite) {
      // Pass just the _id to the mutation for unfavoriting the board
      onUnFavorite({ id: id }).catch(() => toast.error("Failed to unfavorite"));
    } else {
      // Pass just the _id and orgId to the mutation for favoriting the board
      onFavorite({ id: id, orgId }).catch(() => toast.error("Failed to favorite"));
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden hover:shadow-md transition">
        <div className="relative flex-1 bg-amber-50">
          <Image
            src={imageUrl || "/placeholder-board.png"}
            alt={title}
            fill
            className="object-cover"
          />
          <Overlay />
          <Actions id={{ __tableName: "boards", _id: id }} title={title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity-100 px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>

        {/* Footer with favorite button */}
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnFavorite}
        />
      </div>
    </Link>
  );
};

/**
 * Skeleton component for the BoardCard to display while the actual data is loading.
 * @returns {JSX.Element} - A JSX element that represents the skeleton loader for BoardCard.
 */
BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
