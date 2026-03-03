/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Locale } from 'date-fns';

import { type enUS } from './en-US';

export type Translations = {
    translationStrings: typeof enUS.translationStrings;
    dateLocale: Locale;
};
