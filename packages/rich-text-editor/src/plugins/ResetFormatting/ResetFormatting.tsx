/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEraser } from '@frontify/fondue-icons';

import { definePlugin, type EditorControlApi, PARAGRAPH, type RteHotkey, type ToolbarItemProps } from '#/core';
import { ToolbarButton } from '#/ui/ToolbarButton/ToolbarButton';
import { TOOLBAR_ICON_SIZE } from '#/ui/toolbarIconSize';

const RESET_LABEL = 'Reset formatting';

const RESET_ANNOUNCEMENT = 'Formatting reset';

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
        // Whatever attributes plugins add to every block (alignment today) go back to their defaults, without this plugin having to name another's.
        api.blocks.resetAttributes();
    });
};

// The key is a literal because a computed key keeps this plugin in the renderer; SHORTCUT's type ties it to this key.
const hotkeys = {
    'Mod-\\': {
        label: RESET_LABEL,
        run: (api) => {
            reset(api);
            api.announce(RESET_ANNOUNCEMENT);
        },
    },
} satisfies Record<string, RteHotkey>;

const SHORTCUT: keyof typeof hotkeys = 'Mod-\\';

const ResetFormattingButton = ({ api, label, shortcut }: ToolbarItemProps) => (
    <ToolbarButton title={label} shortcut={shortcut} onClick={() => reset(api)}>
        <IconEraser size={TOOLBAR_ICON_SIZE} />
    </ToolbarButton>
);

/**
 * A toolbar button, and `Mod-\`, that strips the selection back to plain text
 */
export const resetFormattingPlugin = /* @__PURE__ */ definePlugin({
    id: 'reset-formatting',
    toolbar: [{ label: RESET_LABEL, shortcut: SHORTCUT, render: ResetFormattingButton, floating: 'inline' }],
    hotkeys,
});
