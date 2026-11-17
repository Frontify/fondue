/* (c) Copyright Frontify Ltd., all rights reserved. */

// What a toolbar entry's `render` is handed, composed from the control API so it holds for any engine.

import {
    type EditorControlApi,
    isOwnActive,
    type RteSelectionSnapshot,
    selectedNodeOf,
    toggleOwn,
    type ToolbarEntry,
    type ToolbarItemProps,
} from '#/core';

/**
 * The part of a registry toolbar entry its `render` props come from
 */
type ToolbarItemSource = Pick<ToolbarEntry, 'own' | 'label' | 'shortcut'>;

/**
 * The props a toolbar entry's `render` is handed, for what the entry acts on
 * (`own`, resolved by the registry's `ownTypeOf`).
 */
export const toolbarItemProps = (
    { own, label, shortcut }: ToolbarItemSource,
    api: EditorControlApi,
    selection: RteSelectionSnapshot,
): ToolbarItemProps => {
    const selectedNode = selectedNodeOf(own, api, selection);
    const isActive = isOwnActive(own, selection);

    const toggle = (value?: Record<string, unknown>): void => toggleOwn({ own, api, selection, value });

    return {
        api,
        label,
        shortcut,
        selectedNode,
        selection,
        isActive,
        toggle,
        openEditor: () => {
            if (own.kind !== 'none') {
                api.editors.open(own.type);
            }
        },
    };
};
