/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEraser } from '@frontify/fondue-icons';

import { definePlugin, type EditorControlApi, PARAGRAPH, type ToolbarItemProps } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

const SHORTCUT = 'Mod-\\';

/**
 * Puts the selection back to plain text: marks gone (links stay, and so do
 * mentions, which are no marks), block type back to paragraph, alignment
 * cleared, lists unwrapped, all as one undo step. At a caret it acts on the
 * whole text block. No schema of its own: it only drives the control API.
 */
const reset = (api: EditorControlApi): void => {
    api.group(() => {
        api.marks.removeAll({ except: ['link'] });
        api.blocks.setType(PARAGRAPH);
        // After `setType`, since unwrapping first moves the selection off the blocks before it; a range may span lists `setType` cannot lift.
        if (!api.selection.get().isCollapsed) {
            api.lists.unwrapAll();
        }
        // Whatever attributes plugins add to every block (alignment today) go
        // back to their defaults, without this plugin having to name another's.
        api.blocks.resetAttributes();
    });
};

const ResetFormattingButton = ({ api }: ToolbarItemProps) => (
    <ToolbarButton title="Reset formatting" shortcut={SHORTCUT} onClick={() => reset(api)}>
        <IconEraser size={16} />
    </ToolbarButton>
);

/** A toolbar button, and Mod-\, that strips the selection back to plain text. */
export const resetFormattingPlugin = /* @__PURE__ */ definePlugin({
    id: 'reset-formatting',
    toolbar: [{ render: ResetFormattingButton, floating: 'inline' }],
    hotkeys: {
        [SHORTCUT]: (api) => {
            reset(api);
            api.announce('Formatting reset');
        },
    },
});
