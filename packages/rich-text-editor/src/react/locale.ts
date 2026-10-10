/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFondueTheme } from '@frontify/fondue-components';
import { useEffect, useState } from 'react';

import { enUS } from '#/locales/en-US';
import { type RichTextLocale } from '#/model';

// One `import()` per shipped locale, so only `enUS` is in the static graph (DR-012).
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

/**
 * The `locale` prop, else the shipped locale whose ID is the `ThemeProvider` locale's `lang`, else `enUS`
 * (SPEC-rich-text-react/AC-101). Until a theme locale loads, the editor shows the last one it had, first `enUS` (DR-079).
 */
export const useEditorLocale = (locale: RichTextLocale | undefined): RichTextLocale => {
    const { lang } = useFondueTheme().locale;
    let load: (() => Promise<RichTextLocale>) | undefined;
    if (locale === undefined && lang !== undefined) {
        load = LOADERS[lang];
    }
    const [loaded, setLoaded] = useState<RichTextLocale>(enUS);
    useEffect(() => {
        if (load === undefined) {
            return undefined;
        }
        let current = true;
        const show = (next: RichTextLocale) => {
            if (current) {
                setLoaded(next);
            }
        };
        // A chunk that fails to load leaves the strings the editor shows.
        load()
            .then(show)
            .catch(() => undefined);
        return () => {
            current = false;
        };
    }, [load]);
    if (locale !== undefined) {
        return locale;
    }
    if (load === undefined) {
        return enUS;
    }
    return loaded;
};
