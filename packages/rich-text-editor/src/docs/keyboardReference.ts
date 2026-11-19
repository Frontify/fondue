/* (c) Copyright Frontify Ltd., all rights reserved. */

import { buildPluginRegistry, type RtePlugin, type RteShortcutOwner } from '#/core';
import { EDITOR_STRINGS } from '#/locales/en-US';
import { labelContextOf, resolveLabel, translatorFor } from '#/ui/translation';

/** The reference is documentation, written in English like the rest of Fondue's. */
const ENGLISH_LABELS = labelContextOf('en-US', translatorFor(EDITOR_STRINGS));

/** Each key is written as in a plugin's `hotkeys` (`Mod-b`). */
export type KeyboardRow = {
    keys: readonly string[];
    label: string;
};

export type KeyboardGroup = {
    owner: RteShortcutOwner;
    rows: readonly KeyboardRow[];
};

export const ownerKeyOf = (owner: RteShortcutOwner): string => {
    switch (owner.kind) {
        case 'editor':
            return 'editor';
        case 'plugin':
            return `plugin ${owner.pluginId}`;
    }
};

/** Adds the key to the row with the same label, so Redo on two keys is one row. */
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

/** The editor group first, then one group per plugin that binds a key, in mount order. */
export const keyboardReference = (plugins: readonly RtePlugin[]): readonly KeyboardGroup[] => {
    const groups = new Map<string, KeyboardGroup>();
    for (const { owner, key, label } of buildPluginRegistry(plugins).shortcuts) {
        const ownerKey = ownerKeyOf(owner);
        const group = groups.get(ownerKey) ?? { owner, rows: [] };
        groups.set(ownerKey, { owner, rows: addRow(group.rows, key, resolveLabel(label, ENGLISH_LABELS)) });
    }
    return [...groups.values()];
};
