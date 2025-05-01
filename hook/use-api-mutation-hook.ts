import { useState } from "react";
import { useMutation } from "convex/react";

/**
 * Custom hook for handling API mutations with loading state management.
 * 
 * This hook wraps the `useMutation` hook from Convex to allow mutation operations
 * with automatic loading state management. It provides a `mutate` function that
 * can be called with the mutation's payload, and it tracks the pending state during
 * the mutation's execution.
 * 
 * @param mutationFunction - The mutation function that will be used to make the API request.
 * 
 * @returns An object containing:
 *   - `mutate`: A function that triggers the mutation with a given payload.
 *   - `pending`: A boolean indicating whether the mutation is in progress.
 * 
 * Usage:
 * ```js
 * const { mutate, pending } = useApiMutationHook(myMutationFunction);
 * ```
 */
export const useApiMutationHook = (mutationFunction: any) => {
  const [pending, setPending] = useState(false); // State to track if the mutation is in progress
  const apiMutation = useMutation(mutationFunction); // Initialize mutation function

  /**
   * Trigger the mutation with the provided payload.
   * 
   * This function sets the `pending` state to `true` when the mutation is initiated
   * and sets it back to `false` once the mutation is completed or if there is an error.
   * 
   * @param payload - The data to be sent with the mutation request.
   * 
   * @returns The result of the mutation.
   * @throws Error if the mutation fails.
   */
  const mutate = (payload: any) => {
    setPending(true); // Set loading state
    return apiMutation(payload)
      .finally(() => setPending(false)) // Reset loading state when mutation is complete
      .then((result) => {
        return result; // Return the result of the mutation
      })
      .catch((error) => {
        throw error; // Rethrow error if mutation fails
      });
  };

  return {
    mutate, // The mutate function to trigger the mutation
    pending, // Boolean state to indicate if mutation is pending
  };
};
