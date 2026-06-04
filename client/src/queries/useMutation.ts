import { queryStore } from "@/queries/instance";
import { useState } from "react";

interface UseMutationParams<T, Args extends unknown[]> {
  mutateFn: (...args: Args) => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
}

export default function useMutation<T, Args extends unknown[] = []>({
  mutateFn,
  onSuccess,
  onError,
}: UseMutationParams<T, Args>) {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (...args: Args) => {
    try {
      setIsLoading(true);
      const res = await mutateFn(...args);
      onSuccess?.(res);
    } catch (e) {
      onError?.(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, mutate, invalidate: queryStore.invalidate };
}
