import { WineDTO } from '@koublis/api-client';

/**
 * Champs proposés par l'UX mais absents de l'entité Wine côté back.
 * Tant que l'API ne les porte pas, ils sont conservés en local, indexés par id de vin.
 */
export interface WineExtras {
  slot?: string;
  price?: number;
  peak?: string;
  notes?: string;
  photoUrl?: string;
}

export type WineView = WineDTO & WineExtras;

export type WineColor = 'red' | 'white' | 'rose' | 'sparkling';

export const WINE_COLORS: WineColor[] = ['red', 'white', 'rose', 'sparkling'];

export const WINE_COLOR_VAR: Record<WineColor, string> = {
  red: 'var(--kb-color-red)',
  white: 'var(--kb-color-white)',
  rose: 'var(--kb-color-rose)',
  sparkling: 'var(--kb-color-sparkling)',
};
