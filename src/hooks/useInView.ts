import { RefObject, useEffect, useState } from "react";

interface Options {
  threshold?: number;
  rootMargin?: string;
}

// True once the element has been visible. It never resets, so effects run once.
export function useInView(
  ref: RefObject<Element | null>,
  { threshold = 0.2, rootMargin = "0px" }: Options = {}
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, rootMargin]);

  return inView;
}
