/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEraser } from '@frontify/fondue-icons';

import { type EditorControlApi, PARAGRAPH, type RtePlugin } from '#/domain';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/**
 * Puts the selection back to plain text: marks gone, block type back to
 * paragraph, alignment cleared, and lists unwrapped. It owns no schema of its
 * own — it only drives the control API.
 */
const reset = (api: EditorControlApi): void => {
    api.marks.removeAll();
    // Lists first: a block type change inside a list item would leave the item
    // (and its bullet) behind.
    api.lists.unwrapAll();
    api.blocks.setType(PARAGRAPH);
    // Whatever attributes plugins add to every block — alignment today — go back
    // to their defaults. Naming them here would be this plugin knowing another's.
    api.blocks.resetAttributes();
};

export const resetFormattingPlugin = (): RtePlugin => ({
    id: 'reset-formatting',
    toolbar: (api) => (
        <ToolbarButton title="Reset formatting" onClick={() => reset(api)}>
            <IconEraser size={16} />
        </ToolbarButton>
    ),
});
