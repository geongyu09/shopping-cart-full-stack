import {
  useEffect,
  useEffectEvent,
  useState,
  useSyncExternalStore,
} from "react";
import QueryStore from "./stores/queryStore";
interface UseQueryParams<T> {
  key: string;
  queryFn: () => Promise<T>;
}

const queryStore = new QueryStore();

export default function useQuery<T>({ key, queryFn }: UseQueryParams<T>) {
  const setFlush = useState(false)[1];
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const data = useSyncExternalStore<T | undefined>(
    () => queryStore.subscribe(key, () => setFlush((prev) => !prev)),
    () => queryStore.getSnapshot(key) as T | undefined,
  );

  const queryFnEvent = useEffectEvent(queryFn);

  useEffect(() => {
    let isMounted = true;
    if (data) {
      Promise.resolve(() => setIsLoading(false));
      return;
    }

    queryFnEvent()
      .then((response) => {
        if (isMounted) {
          queryStore.set(key, response);
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
  }, [key, data]);

  return { data, isLoading, error };
}
