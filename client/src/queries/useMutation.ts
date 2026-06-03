import { queryStore } from "@/queries/instance";
import { useState } from "react";

interface UseMutationParams<T> {
  mutateFn: () => Promise<T>;
}

export default function useMutation<T>({ mutateFn }: UseMutationParams<T>) {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async ({
    onSuccess,
    onError,
  }: {
    onSuccess: (data: unknown) => void;
    onError: (error: unknown) => void;
  }) => {
    try {
      setIsLoading(true);
      const res = await mutateFn();
      onSuccess(res);
    } catch (e) {
      onError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, mutate, invalidate: queryStore.invalidate };
}
