import type { Product } from "@/types/cartProduct";
import { getItemsFromLocalStorage } from "@/utils/localStorage";

export const getCheckedItemsFromLocalStorage = () => {
  const checkedItems =
    getItemsFromLocalStorage<Product["id"][]>("checkedItems");
  return checkedItems || [];
};
