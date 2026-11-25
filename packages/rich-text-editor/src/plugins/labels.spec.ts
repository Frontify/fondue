/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { frFR } from '#/locales/fr-FR';
import { labelContextOf, resolveLabel, translatorFor } from '#/ui/translation';

import { columnBreakPlugin } from './ColumnBreak';
import { horizontalRulePlugin } from './HorizontalRule';
import { tablePlugin } from './Table';

import { defaultPlugins } from './index';

describe('the shipped plugins', () => {
    it("name every toolbar entry and block command in the editor's language, never in fixed text", () => {
        const context = labelContextOf('fr-FR', translatorFor(frFR));
        const french = new Set(Object.values(frFR));
        const labels = [...defaultPlugins, columnBreakPlugin(), horizontalRulePlugin(), tablePlugin()].flatMap(
            (plugin) => [
                ...(plugin.toolbar ?? []).map((entry) => entry.label),
                ...(plugin.commands ?? []).map((command) => command.label),
            ],
        );

        expect(labels.length).toBeGreaterThan(0);
        expect(labels.filter((label) => typeof label === 'string')).toEqual([]);
        expect(labels.map((label) => resolveLabel(label, context)).filter((shown) => !french.has(shown))).toEqual([]);
    });
});
