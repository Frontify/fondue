/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEraser } from '@frontify/fondue-icons';

import { definePlugin, type EditorControlApi, type HotkeyHandler, PARAGRAPH, type ToolbarItemProps } from '#/core';
import { ToolbarButton } from '#/ui/ToolbarButton/ToolbarButton';
import { TOOLBAR_ICON_SIZE } from '#/ui/toolbarIconSize';

import { LINK_MARK } from '../shared/helpers/linkMark';

const CLEARED_ANNOUNCEMENT = 'Formatting cleared';

/**
 * What the toolbar button does: puts the selection back to plain text. Every
 * mark goes (links included; mentions are no marks and stay), block type back
 * to paragraph, alignment cleared, lists unwrapped, all as one undo step. At a
 * caret it acts on the whole text block. No schema of its own: it only drives
 * the control API.
 */
const reset = (api: EditorControlApi): void => {
    api.group(() => {
        api.marks.removeAll();
        api.blocks.setType(PARAGRAPH);
        // After `setType`, since unwrapping first moves the selection off the blocks before it; a range may span lists `setType` cannot lift.
        if (!api.selection.get().isCollapsed) {
            api.lists.unwrapAll();
        }
        // Whatever attributes plugins add to every block (alignment today) go back to their defaults, without this plugin having to name another's.
        api.blocks.resetAttributes();
    });
};

// The key is a literal because a computed key keeps this plugin in the renderer.
const hotkeys = {
    /** Clears the marks only, links excepted: block types, lists and alignment stay. Not what the toolbar button does. */
    'Mod-\\': (api) => {
        api.marks.removeAll({ except: [LINK_MARK] });
        api.announce(CLEARED_ANNOUNCEMENT);
    },
} satisfies Record<string, HotkeyHandler>;

const ResetFormattingButton = ({ api, label }: ToolbarItemProps) => (
    <ToolbarButton title={label} onClick={() => reset(api)}>
        <IconEraser size={TOOLBAR_ICON_SIZE} />
    </ToolbarButton>
);

/**
 * A toolbar button that strips the selection back to plain text, and `Mod-\`, which only clears its marks except links
 */
export const resetFormattingPlugin = /* @__PURE__ */ definePlugin({
    id: 'reset-formatting',
    toolbarGroup: 'marks',
    toolbar: [{ label: 'Reset formatting', render: ResetFormattingButton, floating: 'inline' }],
    hotkeys,
});
