import { useState, useEffect } from "react";

// A generic function to debounce a value of any type
export function useDebounce<T>(value: T, delay: number): T {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout when the value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Run effect when either value or delay changes

  return debouncedValue;
}
