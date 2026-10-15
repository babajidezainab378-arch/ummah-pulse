"use client";

import { MOBILE_NAV_ITEMS } from "@/data/navigation";
import type { TabKey } from "@/types";

interface BottomNavProps {
  tab: TabKey;
  setTab: (tab: TabKey) => void;
  isSubScreen: boolean;
}

export default function BottomNav({ tab, setTab, isSubScreen }: BottomNavProps) {
  return (
    <nav className="up-bottomnav" aria-label="Primary">
      {MOBILE_NAV_ITEMS.map(({ key, label, icon: Icon }) => {
        const active = key === "more" ? isSubScreen || tab === "more" : tab === key;
        return (
          <button
            key={key}
            className={"up-navitem" + (active ? " up-navitem-active" : "")}
            onClick={() => setTab(key)}
            aria-current={active ? "page" : undefined}
          >
            {Icon && <Icon size={20} strokeWidth={active ? 2.4 : 1.9} />}
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
