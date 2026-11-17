/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import * as shipped from '#/locales/index';

import { LOCALE_LOADERS } from './useEditorLocale';

const ENGLISH = 'en-US';

describe('LOCALE_LOADERS', () => {
    it('loads every shipped locale but English through an import of its own, for its own lang', async () => {
        const ids = Object.values(shipped)
            .map((locale) => locale.lang)
            .filter((id) => id !== ENGLISH)
            .sort();

        expect([...LOCALE_LOADERS.keys()].sort()).toEqual(ids);
        for (const [id, load] of LOCALE_LOADERS) {
            const locale = await load();
            expect(locale.lang).toBe(id);
        }
    });
});
