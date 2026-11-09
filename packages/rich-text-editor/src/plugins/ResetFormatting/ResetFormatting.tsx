/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEraser } from '@frontify/fondue-icons';

import { definePlugin, type EditorControlApi, PARAGRAPH, type ToolbarItemProps } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/**
 * Puts the selection back to plain text: no marks, a paragraph, default attributes, no lists
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

const ResetFormattingButton = ({ api }: ToolbarItemProps) => (
    <ToolbarButton title="Reset formatting" onClick={() => reset(api)}>
        <IconEraser size={16} />
    </ToolbarButton>
);

/**
 * A toolbar button that puts the selection back to plain text
 */
export const resetFormattingPlugin = /* @__PURE__ */ definePlugin({
    id: 'reset-formatting',
    toolbar: [{ render: ResetFormattingButton, floating: 'inline' }],
});
