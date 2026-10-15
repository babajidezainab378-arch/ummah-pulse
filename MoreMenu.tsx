"use client";

import { ChevronRight } from "lucide-react";
import { MORE_MENU_ITEMS } from "@/data/navigation";
import SectionHeading from "@/components/ui/SectionHeading";
import type { TabKey } from "@/types";

interface MoreMenuProps {
  setTab: (tab: TabKey) => void;
}

export default function MoreMenu({ setTab }: MoreMenuProps) {
  return (
    <div className="up-dash">
      <SectionHeading title="More" note="Learn, Calendar, Community and Prayer Settings." />
      <section className="up-card" style={{ padding: 6 }}>
        <ul className="up-occasion-list">
          {MORE_MENU_ITEMS.map(({ key, label, note, icon: Icon }) => (
            <li key={key} className="up-occasion-item up-more-item" onClick={() => setTab(key)}>
              <span className="up-occasion-icon">{Icon && <Icon size={16} />}</span>
              <div className="up-occasion-text">
                <p className="up-occasion-name">{label}</p>
                <p className="up-occasion-date">{note}</p>
              </div>
              <ChevronRight size={16} className="up-occasion-chevron" />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
