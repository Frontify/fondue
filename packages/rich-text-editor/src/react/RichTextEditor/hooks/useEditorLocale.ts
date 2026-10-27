/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFondueTheme } from '@frontify/fondue-components';
import { useEffect, useState } from 'react';

import { enUS } from '#/locales/en-US';
import { type RichTextLocale } from '#/model';

import { LOADERS } from '../helpers/locale';

/**
 * The `locale` prop, else the shipped locale whose ID is the `ThemeProvider` locale's `lang`, else `enUS`.
 * Until a theme locale loads, the editor shows the last one it had, first `enUS`.
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
