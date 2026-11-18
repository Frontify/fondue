/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { enUS } from '#/locales/en-US';

import { columnBreakPlugin } from './ColumnBreak';
import { tablePlugin } from './Table';

import { defaultPlugins } from './index';

describe('the shipped plugins', () => {
    it("name every toolbar entry and block command by a key of the editor's locale", () => {
        const labels = [...defaultPlugins, columnBreakPlugin(), tablePlugin()].flatMap((plugin) => [
            ...(plugin.toolbar ?? []).map((entry) => entry.label),
            ...(plugin.commands ?? []).map((command) => command.label),
        ]);

        expect(labels.length).toBeGreaterThan(0);
        expect(labels.filter((label) => !Object.keys(enUS.translationStrings).includes(label))).toEqual([]);
    });
});
