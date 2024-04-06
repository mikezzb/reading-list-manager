import { day2min, min2ms } from "./util";

export const EXPIRE_CHECK_INTERVAL = 1000;

export const TIME_UNIT_TO_MS: Record<string, number> = {
  'minute': min2ms(1),
  'hour': min2ms(60),
  'day': min2ms(day2min(1)),
}

export const TIME_UNIT_OPTIONS = Object.keys(TIME_UNIT_TO_MS);
export const DEFAULT_TIME_UNIT = 'day';
