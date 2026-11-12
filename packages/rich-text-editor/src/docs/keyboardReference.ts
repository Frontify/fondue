/* (c) Copyright Frontify Ltd., all rights reserved. */

import { buildPluginRegistry, type RtePlugin, type RteShortcutOwner } from '#/core';

/**
 * One key and what it does; the key is written as in a plugin's `hotkeys` (`Mod-b`)
 */
export type KeyboardRow = {
    key: string;
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
 * Every key the editor binds with these plugins, grouped by who binds it: the editor first, then each plugin in mount order.
 * Plugins that bind no key have no group.
 */
export const keyboardReference = (plugins: readonly RtePlugin[]): readonly KeyboardGroup[] => {
    const groups = new Map<string, KeyboardGroup>();
    for (const { owner, key, label } of buildPluginRegistry(plugins).shortcuts) {
        const ownerKey = ownerKeyOf(owner);
        const group = groups.get(ownerKey) ?? { owner, rows: [] };
        groups.set(ownerKey, { owner, rows: [...group.rows, { key, label }] });
    }
    return [...groups.values()];
};
