/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { frFR } from '#/locales/fr-FR';
import { labelContextOf, resolveLabel, translatorFor } from '#/ui/translation';

import { columnBreakPlugin } from './ColumnBreak';
import { tablePlugin } from './Table';

import { defaultPlugins } from './index';

describe('the shipped plugins', () => {
    it("name every toolbar entry and block command in the editor's language, never in fixed text", () => {
        const context = labelContextOf(frFR.lang ?? '', translatorFor(frFR.translationStrings));
        const french = new Set(Object.values(frFR.translationStrings));
        const labels = [...defaultPlugins, columnBreakPlugin(), tablePlugin()].flatMap((plugin) => [
            ...(plugin.toolbar ?? []).map((entry) => entry.label),
            ...(plugin.commands ?? []).map((command) => command.label),
        ]);

        expect(labels.length).toBeGreaterThan(0);
        expect(labels.filter((label) => typeof label === 'string')).toEqual([]);
        expect(labels.map((label) => resolveLabel(label, context)).filter((shown) => !french.has(shown))).toEqual([]);
    });
});
