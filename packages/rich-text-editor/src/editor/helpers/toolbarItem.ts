/* (c) Copyright Frontify Ltd., all rights reserved. */

// What a toolbar entry's `render` is handed, composed from the control API so it holds for any engine.

import {
    type EditorControlApi,
    type OwnType,
    type RteSelectionSnapshot,
    type SelectedNode,
    type ToolbarItemProps,
    toggleOwn,
} from '#/core';

/**
 * The props a toolbar entry's `render` is handed
 * @param own - What the entry acts on, resolved by the registry (`ownTypeOf`)
 */
export const toolbarItemProps = (
    own: OwnType,
    api: EditorControlApi,
    selection: RteSelectionSnapshot,
): ToolbarItemProps => {
    const selectedNode = selectedNodeOf(own, api, selection);
    const isActive = own.kind === 'mark' ? own.type in selection.marks : selectedNode !== null;

    const toggle = (value?: Record<string, unknown>): void => toggleOwn(own, api, selection, value);

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
