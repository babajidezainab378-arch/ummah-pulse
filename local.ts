/**
 * SSR-safe localStorage helpers. `typeof window === "undefined"` guards
 * every access so these are safe to call from code that might ever run
 * during a server render; in practice this app only calls them from
 * client-only hooks (see hooks/usePrayerEngine.ts), but the guard costs
 * nothing and removes an entire class of SSR crashes.
 */

export function readLocal<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeLocal<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* best-effort — a private-browsing quota error shouldn't crash the app */
  }
}
