/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RichTextLocale } from '#/model';

// One `import()` per shipped locale, so only `enUS` is in the static graph.
export const LOADERS: Readonly<Record<string, () => Promise<RichTextLocale>>> = {
    'de-CH': () => import('#/locales/de-CH').then(({ deCH }) => deCH),
    'de-DE': () => import('#/locales/de-DE').then(({ deDE }) => deDE),
    'es-ES': () => import('#/locales/es-ES').then(({ esES }) => esES),
    'fr-CH': () => import('#/locales/fr-CH').then(({ frCH }) => frCH),
    'fr-FR': () => import('#/locales/fr-FR').then(({ frFR }) => frFR),
    'it-CH': () => import('#/locales/it-CH').then(({ itCH }) => itCH),
    'it-IT': () => import('#/locales/it-IT').then(({ itIT }) => itIT),
    'nl-NL': () => import('#/locales/nl-NL').then(({ nlNL }) => nlNL),
    'pl-PL': () => import('#/locales/pl-PL').then(({ plPL }) => plPL),
    'pt-PT': () => import('#/locales/pt-PT').then(({ ptPT }) => ptPT),
};
