export const RADIOGRAPH_TYPES = [
  'PANORAMIC',
  'BITEWING',
  'PERIAPICAL',
] as const;

export type RadiographTypeValue = (typeof RADIOGRAPH_TYPES)[number];
