/* (c) Copyright Frontify Ltd., all rights reserved. */

import { buildPluginRegistry, type RtePlugin } from '#/core';
import { EDITOR_SHORTCUTS, type EditorShortcut } from '#/editor/port';

/**
 * Who binds the keys of a group: the editor itself, or one plugin
 */
export type KeyboardGroupOwner = { kind: 'editor' } | { kind: 'plugin'; pluginId: string };

/**
 * One key and what it does; the key is written as in a plugin's `hotkeys` (`Mod-b`)
 */
export type KeyboardRow = EditorShortcut;

export type KeyboardGroup = {
    owner: KeyboardGroupOwner;
    rows: readonly KeyboardRow[];
};

/**
 * Every key the editor binds with these plugins, grouped by who binds it: the editor first, then each plugin in mount order.
 * Plugins that bind no key have no group.
 */
export const keyboardReference = (plugins: readonly RtePlugin[]): readonly KeyboardGroup[] => {
    const rowsByPlugin = new Map<string, KeyboardRow[]>();
    for (const { pluginId, key, label } of buildPluginRegistry(plugins).shortcuts) {
        const rows = rowsByPlugin.get(pluginId) ?? [];
        rows.push({ key, label });
        rowsByPlugin.set(pluginId, rows);
    }

    const groups: KeyboardGroup[] = [{ owner: { kind: 'editor' }, rows: Object.values(EDITOR_SHORTCUTS) }];
    for (const [pluginId, rows] of rowsByPlugin) {
        groups.push({ owner: { kind: 'plugin', pluginId }, rows });
    }
    return groups;
};
