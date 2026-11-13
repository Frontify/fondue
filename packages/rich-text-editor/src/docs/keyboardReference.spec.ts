/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { alignPlugin, defaultPlugins, resetFormattingPlugin } from '#/plugins';

import { type KeyboardGroup, keyboardReference } from './keyboardReference';

const groupOfPlugin = (groups: readonly KeyboardGroup[], pluginId: string) =>
    groups.find(({ owner }) => owner.kind === 'plugin' && owner.pluginId === pluginId);

describe('keyboardReference', () => {
    const groups = keyboardReference(defaultPlugins);

    it('lists the editor first, with the keys of one action in one row', () => {
        expect(groups[0]?.owner).toEqual({ kind: 'editor' });
        expect(groups[0]?.rows).toEqual(
            expect.arrayContaining([
                { keys: ['Mod-z'], label: 'Undo' },
                { keys: ['Mod-y', 'Mod-Shift-z'], label: 'Redo' },
            ]),
        );
    });

    it('names the key a toolbar shortcut binds', () => {
        expect(groupOfPlugin(groups, 'bold')?.rows).toEqual([{ keys: ['Mod-b'], label: 'Bold' }]);
    });

    it('names the key a plugin hotkey binds', () => {
        expect(groupOfPlugin(groups, 'align')?.rows).toContainEqual({ keys: ['Mod-Shift-l'], label: 'Align left' });
    });

    it('lists a key both the toolbar and the plugin hotkeys bind once', () => {
        const rows = groups.flatMap((group) => group.rows);

        expect(rows.filter(({ keys }) => keys.includes('Mod-k'))).toEqual([{ keys: ['Mod-k'], label: 'Edit link' }]);
    });

    it('names a key with the words the host gave the plugin', () => {
        const translated = keyboardReference([
            alignPlugin({ leftTitle: 'Linksbündig' }),
            resetFormattingPlugin({ clearMarksLabel: 'Formatierung entfernen' }),
        ]);

        expect(groupOfPlugin(translated, 'align')?.rows).toContainEqual({
            keys: ['Mod-Shift-l'],
            label: 'Linksbündig',
        });
        expect(groupOfPlugin(translated, 'align')?.rows).toContainEqual({
            keys: ['Mod-Shift-e'],
            label: 'Align center',
        });
        expect(groupOfPlugin(translated, 'reset-formatting')?.rows).toEqual([
            { keys: ['Mod-\\'], label: 'Formatierung entfernen' },
        ]);
    });
});
