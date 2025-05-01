"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { EmptyBoard } from "./empty-boards";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";
import { BoardCard } from "./board_card";
import { NewBoardButton } from "./new-board-button";

interface BoardListProps {
  /** Unique organization ID */
  orgId: string;

  /** Query parameters that determine the boards to display */
  query: {
    /** Search query for filtering boards */
    search?: string;

    /** Favorite boards flag for filtering by favorites */
    favorite?: string;
  };
}

/**
 * BoardList component fetches and displays a list of boards for a given organization.
 * It conditionally renders the list of boards or empty states based on the provided query.
 *
 * - Displays a loading skeleton when the data is being fetched.
 * - Shows an empty state when no boards are found, with different messages for search, favorites, or general cases.
 * - Displays a list of board cards when data is available.
 *
 * @param {BoardListProps} props - The properties for the BoardList component
 * @returns {JSX.Element} The rendered component
 */
export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId, ...query });

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl font-semibold text-gray-800">
          {query.favorite ? "Favorite Boards" : "Team Boards"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data.length && query.search) {
    return (<EmptySearch />);
  }

  if (!data.length && query.favorite) {
    return (<EmptyFavorites />);
  }

  if (!data.length) {
    return (<EmptyBoard />);
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800">
        {query.favorite ? "Favorite Boards" : "Team Boards"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} />
        {data.map((board: any) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            authorName={board.authorName}
            authorId={board.authorId}
            createdAt={board._creationTime}
            imageUrl={board.imageUrl}
            orgId={board.orgId}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};
