import Image from "next/image";

/**
 * EmptySearch component displays a message and an image when no search results are found.
 * It prompts the user to try searching for something else.
 *
 * @returns {JSX.Element} The rendered component for displaying an empty state for search results
 */
export const EmptySearch = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/file.svg" height={140} width={140} alt="Empty" />

      <h2 className="text-2xl font-semibold mt-6">no results found</h2>

      <p className="text-muted-foreground text-sm mt-2">
        try searching for something else
      </p>
    </div>
  );
};
