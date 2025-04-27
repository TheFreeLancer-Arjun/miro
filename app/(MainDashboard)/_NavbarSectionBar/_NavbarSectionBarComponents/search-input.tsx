"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounce } from "@/hook/use-debounce-hook";
import { useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams here
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get the search parameters using useSearchParams hook
  const [value, setValue] = useState(searchParams.get("search") || ""); // Initialize state with the search parameter

  const debouncedValue = useDebounce(value, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    // Update the query parameter only when the debounced value changes
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="w-full max-w-[516px] pl-9"
        placeholder="Search Boards"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};
