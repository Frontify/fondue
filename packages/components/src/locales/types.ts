/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Locale } from 'date-fns';

import { type enUS } from './en-US';

export type TranslationStrings = typeof enUS.translationStrings;
export type LocaleConfig = {
    translationStrings: TranslationStrings;
    dateLocale: Locale;
};
