export type SeasonKey = "normal" | "ramadan-approaching" | "ramadan-active";

export interface ActiveSeason {
  key: SeasonKey;
  label: string | null;
  daysToRamadan?: number;
}
