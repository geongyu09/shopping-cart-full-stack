import {
  useEffect,
  useEffectEvent,
  useState,
  useSyncExternalStore,
} from "react";
import { queryStore } from "@/queries/instance";
interface UseQueryParams<T> {
  key: string;
  queryFn: () => Promise<T>;
}

export default function useQuery<T>({ key, queryFn }: UseQueryParams<T>) {
  const setFlush = useState(false)[1];
  const [error, setError] = useState<Error | null>(null);

  const data = useSyncExternalStore<T | undefined>(
    () => queryStore.subscribe(key, () => setFlush((prev) => !prev)),
    () => queryStore.getSnapshot(key) as T | undefined,
  );

  const queryFnEvent = useEffectEvent(queryFn);

  useEffect(() => {
    let isMounted = true;
    if (data) {
      return;
    }

    queryStore.fetch(key, queryFnEvent).catch((err) => {
      if (isMounted) {
        setError(err);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [key, data]);

  const isLoading = data === undefined && error === null;

  return { data, isLoading, error };
}
