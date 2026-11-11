/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEraser } from '@frontify/fondue-icons';

import { definePlugin, type EditorControlApi, PARAGRAPH, type ToolbarItemProps } from '#/core';
import { ToolbarButton } from '#/ui/ToolbarButton/ToolbarButton';
import { TOOLBAR_ICON_SIZE } from '#/ui/toolbarIconSize';

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

const ResetFormattingButton = ({ api, label }: ToolbarItemProps) => (
    <ToolbarButton title={label} onClick={() => reset(api)}>
        <IconEraser size={TOOLBAR_ICON_SIZE} />
    </ToolbarButton>
);

/**
 * A toolbar button that puts the selection back to plain text
 */
export const resetFormattingPlugin = /* @__PURE__ */ definePlugin({
    id: 'reset-formatting',
    toolbarGroup: 'marks',
    toolbar: [{ label: 'Reset formatting', render: ResetFormattingButton, floating: 'inline' }],
});
