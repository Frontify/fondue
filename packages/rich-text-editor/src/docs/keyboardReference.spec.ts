/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { defaultPlugins } from '#/plugins';

import { type KeyboardGroup, keyboardReference } from './keyboardReference';

const groupOfPlugin = (groups: readonly KeyboardGroup[], pluginId: string) =>
    groups.find(({ owner }) => owner.kind === 'plugin' && owner.pluginId === pluginId);

describe('keyboardReference', () => {
    const groups = keyboardReference(defaultPlugins);

    it('lists the editor first, with undo and redo', () => {
        expect(groups[0]?.owner).toEqual({ kind: 'editor' });
        expect(groups[0]?.rows).toEqual(
            expect.arrayContaining([
                { key: 'Mod-z', label: 'Undo' },
                { key: 'Mod-y', label: 'Redo' },
                { key: 'Mod-Shift-z', label: 'Redo' },
            ]),
        );
    });

    it('names the key a toolbar shortcut binds', () => {
        expect(groupOfPlugin(groups, 'bold')?.rows).toEqual([{ key: 'Mod-b', label: 'Bold' }]);
    });

    it('names the key a plugin hotkey binds', () => {
        expect(groupOfPlugin(groups, 'align')?.rows).toContainEqual({ key: 'Mod-Shift-l', label: 'Align left' });
    });

    it('lists a key both the toolbar and the plugin hotkeys bind once', () => {
        const rows = groups.flatMap((group) => group.rows);

        expect(rows.filter(({ key }) => key === 'Mod-k')).toEqual([{ key: 'Mod-k', label: 'Edit link' }]);
    });
});
