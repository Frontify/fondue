/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEraser } from '@frontify/fondue-icons';

import { type EditorControlApi, PARAGRAPH, type RtePlugin } from '#/domain';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/**
 * Puts the selection back to plain text: marks gone, block type back to
 * paragraph, alignment cleared, lists unwrapped. No schema of its own — it only
 * drives the control API.
 */
const reset = (api: EditorControlApi): void => {
    api.marks.removeAll();
    // Lists first: a block type change inside a list item would leave the item
    // (and its bullet) behind.
    api.lists.unwrapAll();
    api.blocks.setType(PARAGRAPH);
    // Whatever attributes plugins add to every block — alignment today — go
    // back to their defaults, without this plugin having to name another's.
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
