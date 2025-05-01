"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useDebounce } from "@/hook/use-debounce-hook";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

/**
 * SearchInput component is used to provide a search functionality
 * within the UI. It allows users to search for boards and updates
 * the URL with the search query after a debounced delay.
 *
 * - The search query is debounced for 500ms to prevent excessive URL updates.
 * - It listens for changes in the input field and updates the URL with the
 *   search query.
 * - It displays an icon inside the input field.
 *
 * @returns {JSX.Element} The rendered search input field with an icon.
 */
export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Retrieves current search parameters from URL

  const [value, setValue] = useState(() => searchParams.get("search") ?? "");

  const debouncedValue = useDebounce(value, 500); // Debounces the search input value

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value); // Handles input field value change
  };

  useEffect(() => {
    // Updates the URL with the debounced search value
    const url = qs.stringifyUrl(
      { url: "/", query: { search: debouncedValue } },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, router]); // Re-runs effect when debouncedValue changes

  return (
    <div className="w-full relative">
      {/* Search icon inside the input field */}
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="w-full max-w-[516px] pl-9"
        placeholder="Search Boards"
        onChange={handleChange} // Handles input changes
        value={value} // Binds input field value to the component's state
      />
    </div>
  );
};
