import { BookOpen, Feather, GraduationCap, Landmark, Sparkles, Users } from "lucide-react";
import type { IconComponent } from "@/types";

export interface LearnCategory {
  name: string;
  icon: IconComponent;
}

export const LEARN_CATEGORIES: LearnCategory[] = [
  { name: "Islamic Articles", icon: BookOpen },
  { name: "Short Lessons", icon: GraduationCap },
  { name: "Stories of the Prophets", icon: Sparkles },
  { name: "Stories of the Sahabah", icon: Users },
  { name: "Muslim Women in Islamic History", icon: Feather },
  { name: "Islamic History", icon: Landmark },
];
