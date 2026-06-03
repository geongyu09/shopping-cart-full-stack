export default class QueryStore {
  private queryCache: Map<string, unknown>;
  private promiseCache: Map<string, Promise<unknown>>;
  private listeners: Map<string, Set<() => void>>;

  constructor() {
    this.queryCache = new Map();
    this.promiseCache = new Map();
    this.listeners = new Map();
  }

  getSnapshot(key: string) {
    return this.queryCache.get(key);
  }

  fetch<T>(key: string, queryFn: () => Promise<T>): Promise<T> {
    const inFlight = this.promiseCache.get(key);
    if (inFlight) {
      return inFlight as Promise<T>;
    }

    const promise = queryFn().then((data) => {
      this.set(key, data);
      return data;
    });

    this.promiseCache.set(key, promise);

    return promise;
  }

  set(key: string, data: unknown) {
    this.queryCache.set(key, data);
    this.listeners.get(key)?.forEach((callback) => callback());
  }

  invalidate(key: string) {
    this.queryCache.delete(key);
    this.promiseCache.delete(key);
    this.listeners.get(key)?.forEach((callback) => callback());
  }

  subscribe(key: string, callback: () => void) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)?.add(callback);

    return () => {
      this.listeners.get(key)?.delete(callback);
    };
  }
}
