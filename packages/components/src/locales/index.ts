/* (c) Copyright Frontify Ltd., all rights reserved. */

import { en } from './en';

export { en };

export type Translations = typeof en;

export const availableLocales = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'pl'] as const;

export type Locale = (typeof availableLocales)[number];
