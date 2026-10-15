"use client";

import { Sprout } from "lucide-react";
import { DESKTOP_NAV_ITEMS } from "@/data/navigation";
import type { TabKey } from "@/types";

interface TopBarProps {
  tab: TabKey;
  setTab: (tab: TabKey) => void;
}

export default function TopBar({ tab, setTab }: TopBarProps) {
  return (
    <header className="up-topbar">
      <div className="up-topbar-brand">
        <span className="up-mark" aria-hidden="true" />
        <span className="up-topbar-name">UmmahPulse</span>
      </div>
      <nav className="up-topbar-nav">
        {DESKTOP_NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={"up-topbar-link" + (tab === item.key ? " up-topbar-link-active" : "")}
            onClick={() => setTab(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <button
        className={"up-topbar-journey" + (tab === "journey" ? " up-topbar-journey-active" : "")}
        onClick={() => setTab("journey")}
        aria-label="My Journey"
      >
        <Sprout size={17} />
        <span className="up-topbar-journey-label">My Journey</span>
      </button>
    </header>
  );
}
