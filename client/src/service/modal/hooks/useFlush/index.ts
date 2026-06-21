import { useCallback, useState } from "react";

export const useFlush = () => {
  const setFlush = useState(0)[1];

  return useCallback(() => {
    setFlush((prev) => prev + 1);
  }, [setFlush]);
};
