/* (c) Copyright Frontify Ltd., all rights reserved. */

import { deCH } from './de-CH';
import { deDE } from './de-DE';
import { enUS } from './en-US';
import { esES } from './es-ES';
import { frCH } from './fr-CH';
import { frFR } from './fr-FR';
import { itCH } from './it-CH';
import { itIT } from './it-IT';
import { nlNL } from './nl-NL';
import { plPL } from './pl-PL';
import { ptPT } from './pt-PT';

export { deCH, deDE, enUS, esES, frCH, frFR, itCH, itIT, nlNL, plPL, ptPT };

export { type Translations } from './types';

export const availableLocales = [
    'en-US',
    'de-DE',
    'de-CH',
    'fr-FR',
    'fr-CH',
    'it-IT',
    'it-CH',
    'es-ES',
    'pt-PT',
    'nl-NL',
    'pl-PL',
] as const;

export type Locale = (typeof availableLocales)[number];
