export default class QueryStore {
  private queryCache: Map<string, unknown>;
  private listeners: Map<string, Set<() => void>>;

  constructor() {
    this.queryCache = new Map();
    this.listeners = new Map();
  }

  getSnapshot(key: string) {
    return this.queryCache.get(key);
  }

  set(key: string, data: unknown) {
    this.queryCache.set(key, data);
    this.listeners.get(key)?.forEach((callback) => callback());
  }

  invalidate(key: string) {
    this.queryCache.delete(key);
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
