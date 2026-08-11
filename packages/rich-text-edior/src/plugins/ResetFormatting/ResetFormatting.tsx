/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEraser } from '@frontify/fondue-icons';

import { definePlugin, type EditorControlApi } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

/**
 * Puts the selection back to plain text: marks gone, block type back to
 * paragraph, alignment cleared, and lists unwrapped. It owns no schema of its
 * own — it only drives the control API.
 */
const reset = (api: EditorControlApi): void => {
    api.removeAllMarks();
    // Lists first: a block type change inside a list item would leave the item
    // (and its bullet) behind.
    api.unwrapLists();
    api.setBlockType('paragraph');
    api.updateBlockAttributes({ align: null });
};

export const ResetFormattingPlugin = definePlugin(() => ({
    id: 'reset-formatting',
    toolbar: (api) => (
        <ToolbarButton title="Reset formatting" onClick={() => reset(api)}>
            <IconEraser size={16} />
        </ToolbarButton>
    ),
}));
