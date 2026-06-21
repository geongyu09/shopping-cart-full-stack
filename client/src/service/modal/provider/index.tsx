"use client";

import { useCallback, type PropsWithChildren } from "react";

import CreatePortal from "../components/CreatePortal";
import ModalContext from "../context";
import getQueue from "../core";
import { useFlush } from "../hooks/useFlush";

export default function ModalProvider({ children }: PropsWithChildren) {
  const Queue = getQueue();
  const flush = useFlush();

  const addModalAsync = useCallback(
    (modalComponent: React.ReactNode) => {
      Queue.enqueue(modalComponent);
      flush();
    },
    [Queue, flush],
  );

  const closeModalAsync = useCallback(() => {
    Queue.dequeue();
    flush();
  }, [Queue, flush]);

  const value = { addModalAsync, closeModalAsync };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <CreatePortal />
    </ModalContext.Provider>
  );
}
