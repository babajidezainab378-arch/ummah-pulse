export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function formatClock(date: Date, timeFormat: "12" | "24"): string {
  return date.toLocaleTimeString("en-US", {
    hour: timeFormat === "24" ? "2-digit" : "numeric",
    minute: "2-digit",
    hour12: timeFormat !== "24",
  });
}

export function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
}

export interface DiffParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  past: boolean;
}

export function diffParts(target: Date, now: Date): DiffParts {
  let ms = target.getTime() - now.getTime();
  const past = ms < 0;
  ms = Math.abs(ms);
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return { days, hours, minutes, seconds, past };
}
