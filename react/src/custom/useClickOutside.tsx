import { RefObject, useEffect, useRef } from "react";

const useClickOutside = <T extends HTMLElement>(
  fn: () => void,
  bool: boolean
) => {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node) && bool) {
        console.log("click outside");
        setTimeout(() => {
          fn();
        }, 200);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, [ref, fn]);

  return ref;
};

export default useClickOutside;
