import { useState } from "react";

export default function useCheckedItems<T>(initialCheckedItems?: T[]) {
  const [checkedItems, setCheckedItems] = useState<T[]>(
    initialCheckedItems || [],
  );

  const select = (item: T) => {
    setCheckedItems((prev) => [...new Set([...prev, item])]);
  };

  const unselect = (item: T) => {
    setCheckedItems((prev) =>
      prev.filter((prevItem) => !Object.is(prevItem, item)),
    );
  };

  const unselectAll = () => {
    setCheckedItems([]);
  };

  return { checkedItems, select, unselect, unselectAll };
}
