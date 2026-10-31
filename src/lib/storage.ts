type Kind = "local" | "session";

const store = (kind: Kind) => (kind === "local" ? window.localStorage : window.sessionStorage);

export function safeGet(kind: Kind, key: string): string | null {
  try {
    return store(kind).getItem(key);
  } catch {
    return null;
  }
}

export function safeSet(kind: Kind, key: string, value: string): void {
  try {
    store(kind).setItem(key, value);
  } catch {
    // Storage can be blocked. The site works without it.
  }
}
