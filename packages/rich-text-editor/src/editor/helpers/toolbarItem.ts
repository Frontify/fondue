/* (c) Copyright Frontify Ltd., all rights reserved. */

// What a plugin's `toolbarItem` is handed, composed from the control API so it holds for any engine.

import {
    type EditorControlApi,
    type OwnType,
    PARAGRAPH,
    type RteSelectionSnapshot,
    type SelectedNode,
    type ToolbarItemProps,
} from '#/core';

/** `own` is what the plugin acts on, resolved by the registry (`ownTypeOf`). */
export const toolbarItemProps = (
    own: OwnType,
    api: EditorControlApi,
    selection: RteSelectionSnapshot,
): ToolbarItemProps => {
    const selectedNode = selectedNodeOf(own, api, selection);
    const isActive = own.kind === 'mark' ? own.type in selection.marks : selectedNode !== null;

    const toggle = (value?: Record<string, unknown>): void => {
        switch (own.kind) {
            case 'mark':
                api.marks.toggle(own.type, value);
                break;
            case 'list':
                api.lists.toggle(own.type);
                break;
            case 'textBlock':
                api.blocks.setType(isActive ? PARAGRAPH : own.type, value);
                break;
            case 'voidBlock':
            case 'inline':
                api.insert(own.type, value);
                break;
            // A block holding other blocks is not something a selection turns
            // into, so there is nothing to toggle.
            case 'container':
            case 'none':
                break;
        }
    };

    return {
        api,
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

const attributesOf = (block: Record<string, unknown>): Record<string, unknown> =>
    Object.fromEntries(Object.entries(block).filter(([name]) => name !== 'type' && name !== 'children'));

const selectedNodeOf = (own: OwnType, api: EditorControlApi, selection: RteSelectionSnapshot): SelectedNode | null => {
    switch (own.kind) {
        case 'mark': {
            const run = api.marks.getRun(own.type);
            return run === null ? null : { type: own.type, value: run.value, text: run.text };
        }
        // The selection sits beside an inline, never in one.
        case 'inline':
        case 'none':
            return null;
        default: {
            // Innermost first, so a list nested in a list finds the inner one.
            const block = selection.blocks.find((candidate) => candidate.type === own.type);
            return block ? { type: own.type, value: attributesOf(block), text: selection.text } : null;
        }
    }
};
