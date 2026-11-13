/* (c) Copyright Frontify Ltd., all rights reserved. */

import { buildPluginRegistry, type RtePlugin, type RteShortcutOwner } from '#/core';

/**
 * What an action is called and every key that does it; each key is written as in a plugin's `hotkeys` (`Mod-b`)
 */
export type KeyboardRow = {
    keys: readonly string[];
    label: string;
};

export type KeyboardGroup = {
    owner: RteShortcutOwner;
    rows: readonly KeyboardRow[];
};

/**
 * A key that names one owner, for finding its group and for a React `key`
 */
export const ownerKeyOf = (owner: RteShortcutOwner): string => {
    switch (owner.kind) {
        case 'editor':
            return 'editor';
        case 'plugin':
            return `plugin ${owner.pluginId}`;
    }
};

/**
 * The rows of one owner with the keys of one action together, so Redo on two keys is one row
 */
const addRow = (rows: readonly KeyboardRow[], key: string, label: string): readonly KeyboardRow[] => {
    const sameAction = rows.find((row) => row.label === label);
    if (sameAction === undefined) {
        return [...rows, { keys: [key], label }];
    }
    return rows.map((row) => {
        if (row === sameAction) {
            return { keys: [...row.keys, key], label };
        }
        return row;
    });
};

/**
 * Every key the editor binds with these plugins, grouped by who binds it: the editor first, then each plugin in mount order.
 * Plugins that bind no key have no group, and keys with the same label share a row.
 */
export const keyboardReference = (plugins: readonly RtePlugin[]): readonly KeyboardGroup[] => {
    const groups = new Map<string, KeyboardGroup>();
    for (const { owner, key, label } of buildPluginRegistry(plugins).shortcuts) {
        const ownerKey = ownerKeyOf(owner);
        const group = groups.get(ownerKey) ?? { owner, rows: [] };
        groups.set(ownerKey, { owner, rows: addRow(group.rows, key, label) });
    }
    return [...groups.values()];
};
