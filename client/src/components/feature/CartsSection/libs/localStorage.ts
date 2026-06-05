import type { Product } from "@/types/cartProduct";
import {
  getItemsFromLocalStorage,
  removeItemsFromLocalStorage,
  setItemsToLocalStorage,
} from "@/utils/localStorage";

export const getCheckedItemsFromLocalStorage = () => {
  const checkedItems =
    getItemsFromLocalStorage<Product["id"][]>("checkedItems");
  return checkedItems || [];
};

export const setCheckedItemsToLocalStorage = (
  checkedItems: Product["id"][],
) => {
  setItemsToLocalStorage("checkedItems", [...new Set(checkedItems)]);
};

export const removeCheckedItemsFromLocalStorage = () => {
  removeItemsFromLocalStorage("checkedItems");
};
