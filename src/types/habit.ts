export type Frequency = "daily" | "weekly";

export interface Habit {
  id: string;
  name: string;
  description?: string;
  emoji: string;
  color: string; // hex
  frequency: Frequency;
  goalPerWeek: number; // for weekly target; daily=7
  createdAt: string; // iso date
  archived?: boolean;
  category?: string;
}

export interface CompletionMap {
  // habitId -> dateKey(YYYY-MM-DD) -> true
  [habitId: string]: { [date: string]: boolean };
}

export interface Settings {
  reminderEnabled: boolean;
  reminderTime: string; // HH:MM
  lastBackup?: string;
}
