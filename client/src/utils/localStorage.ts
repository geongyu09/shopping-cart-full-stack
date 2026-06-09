export const getItemsFromLocalStorage = <T>(key: string) => {
  const items = localStorage.getItem(key);
  if (!items) return null;
  return JSON.parse(items) as T;
};

export const setItemsToLocalStorage = <T>(key: string, items: T) => {
  localStorage.setItem(key, JSON.stringify(items));
};

export const removeItemsFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
