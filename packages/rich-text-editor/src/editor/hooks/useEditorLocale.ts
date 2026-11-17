/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFondueTheme } from '@frontify/fondue-components';
import { useEffect, useRef, useState } from 'react';

import { enUS } from '#/locales/en-US';
import { type RichTextLocale } from '#/locales/types';

/** One `import()` per shipped locale but `enUS`, keyed by language tag, so a host bundles only the languages it shows. */
export const LOCALE_LOADERS: ReadonlyMap<string, () => Promise<RichTextLocale>> = new Map([
    ['de-CH', () => import('#/locales/de-CH').then(({ deCH }) => deCH)],
    ['de-DE', () => import('#/locales/de-DE').then(({ deDE }) => deDE)],
    ['es-ES', () => import('#/locales/es-ES').then(({ esES }) => esES)],
    ['fr-CH', () => import('#/locales/fr-CH').then(({ frCH }) => frCH)],
    ['fr-FR', () => import('#/locales/fr-FR').then(({ frFR }) => frFR)],
    ['it-CH', () => import('#/locales/it-CH').then(({ itCH }) => itCH)],
    ['it-IT', () => import('#/locales/it-IT').then(({ itIT }) => itIT)],
    ['nl-NL', () => import('#/locales/nl-NL').then(({ nlNL }) => nlNL)],
    ['pl-PL', () => import('#/locales/pl-PL').then(({ plPL }) => plPL)],
    ['pt-PT', () => import('#/locales/pt-PT').then(({ ptPT }) => ptPT)],
]);

/**
 * The `locale` prop, else the shipped locale for the `ThemeProvider`'s `lang`,
 * else `enUS`. Until that locale has loaded, the editor shows the one it
 * showed before, first `enUS`; a locale that fails to load keeps it, and the
 * failure goes to `onError`.
 */
export const useEditorLocale = (
    locale: RichTextLocale | undefined,
    onError: ((error: Error) => void) | undefined,
): RichTextLocale => {
    const { lang } = useFondueTheme();
    let load: (() => Promise<RichTextLocale>) | undefined;
    if (locale === undefined && lang !== undefined) {
        load = LOCALE_LOADERS.get(lang);
    }

    // The newest callback, without loading the locale again when the host passes a new one.
    const onErrorRef = useRef(onError);
    useEffect(() => {
        onErrorRef.current = onError;
    });

    const [loaded, setLoaded] = useState<RichTextLocale>(enUS);
    useEffect(() => {
        if (load === undefined) {
            return undefined;
        }
        let current = true;
        const show = async (): Promise<void> => {
            const next = await load();
            if (current) {
                setLoaded(next);
            }
        };
        show().catch((error: unknown) => {
            if (current) {
                onErrorRef.current?.(toError(error));
            }
        });
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

const toError = (thrown: unknown): Error => {
    if (thrown instanceof Error) {
        return thrown;
    }
    return new Error(String(thrown));
};
