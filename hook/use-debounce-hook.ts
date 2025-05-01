import { useState, useEffect } from "react";

/**
 * Custom hook to debounce a value.
 * 
 * This hook returns a debounced version of a given value that only updates
 * after a specified delay. The returned debounced value will remain unchanged
 * until the specified delay has passed since the last change to the input value.
 * This is useful for optimizing performance in scenarios like search input,
 * where you don't want to trigger an action (like an API call) on every keystroke.
 * 
 * @param value - The value to be debounced. This can be of any type.
 * @param delay - The delay in milliseconds before updating the debounced value.
 * 
 * @returns The debounced version of the value, which updates after the specified delay.
 * 
 * Usage:
 * ```js
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * ```
 */
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
