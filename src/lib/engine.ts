// One shared requestAnimationFrame loop for every character effect.
// A task returns true when it is finished. The loop stops when no task is left.

type Task = (now: number) => boolean;

const tasks = new Set<Task>();
let raf = 0;

function frame(now: number) {
  raf = 0;
  for (const task of Array.from(tasks)) {
    if (task(now)) tasks.delete(task);
  }
  if (tasks.size > 0) raf = requestAnimationFrame(frame);
}

export function addTask(task: Task): () => void {
  tasks.add(task);
  if (!raf) raf = requestAnimationFrame(frame);
  return () => {
    tasks.delete(task);
  };
}
