import Image from "next/image";

/**
 * EmptyFavorites component displays a message and an image when there are no favorite boards.
 * It informs the user to try favoriting a board.
 *
 * @returns {JSX.Element} The rendered component for displaying an empty state for favorite boards
 */
export const EmptyFavorites = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/file.svg" height={140} width={140} alt="Empty" />

      <h2 className="text-2xl font-semibold mt-6">No Favorites Boards</h2>

      <p className="text-muted-foreground text-sm mt-2">
        Try Favoriting a board
      </p>
    </div>
  );
};
