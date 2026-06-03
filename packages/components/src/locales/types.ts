/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Locale } from 'date-fns';

import { type enUS } from './en-US';

export type TranslationStrings = typeof enUS.translationStrings;
export type LocaleConfig = {
    translationStrings: TranslationStrings;
    dateLocale: Locale;
};

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

export type LocaleIdentifier = (typeof availableLocales)[number];
