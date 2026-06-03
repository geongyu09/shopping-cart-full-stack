import { useEffect, useEffectEvent, useState } from "react";

interface UseQueryParams<T> {
  queryFn: () => Promise<T>;
}

export default function useQuery<T>({ queryFn }: UseQueryParams<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const queryFnEvent = useEffectEvent(queryFn);

  useEffect(() => {
    let isMounted = true;

    queryFnEvent()
      .then((response) => {
        if (isMounted) {
          setData(response);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
}
