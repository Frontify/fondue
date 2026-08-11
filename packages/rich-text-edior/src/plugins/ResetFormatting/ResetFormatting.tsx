/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEraser } from '@frontify/fondue-icons';

import { type EditorControlApi, type RtePlugin } from '#/RichTextEditor';

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
    api.blocks.setType('paragraph');
    api.blocks.updateAttributes({ align: null });
};

export const resetFormattingPlugin = (): RtePlugin => ({
    id: 'reset-formatting',
    toolbar: (api) => (
        <ToolbarButton title="Reset formatting" onClick={() => reset(api)}>
            <IconEraser size={16} />
        </ToolbarButton>
    ),
});
