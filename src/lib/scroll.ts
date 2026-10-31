// One scroll and resize listener shared by everything that follows scroll position.
// Callbacks run at most once per animation frame.

type Fn = () => void;

const subs = new Set<Fn>();
let queued = false;

function run() {
  queued = false;
  subs.forEach((fn) => fn());
}

function schedule() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(run);
}

export function onScroll(fn: Fn): () => void {
  if (subs.size === 0) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  subs.add(fn);
  fn();
  return () => {
    subs.delete(fn);
    if (subs.size === 0) {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    }
  };
}
