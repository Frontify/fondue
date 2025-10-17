/* (c) Copyright Frontify Ltd., all rights reserved. */

export { en, type Translations } from './en';
export { de } from './de';
export { fr } from './fr';
export { it } from './it';
export { es } from './es';
export { pt } from './pt';
export { nl } from './nl';
export { pl } from './pl';

export const availableLocales = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'pl'] as const;

export type Locale = (typeof availableLocales)[number];
