"use client";

import { useEffect, useState } from "react";

/**
 * Ticking clock. Client-only by nature (setInterval); this app renders
 * its whole tree with ssr:false (see app/page.tsx) specifically so
 * hooks like this never run during a server render and can't cause a
 * hydration mismatch.
 */
export function useNow(tickMs = 1000): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), tickMs);
    return () => clearInterval(id);
  }, [tickMs]);

  return now;
}
