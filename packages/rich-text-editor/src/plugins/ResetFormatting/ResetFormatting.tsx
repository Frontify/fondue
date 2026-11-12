/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEraser } from '@frontify/fondue-icons';

import { definePlugin, type EditorControlApi, PARAGRAPH, type RteHotkey, type ToolbarItemProps } from '#/core';
import { ToolbarButton } from '#/ui/ToolbarButton/ToolbarButton';
import { TOOLBAR_ICON_SIZE } from '#/ui/toolbarIconSize';

const RESET_LABEL = 'Reset formatting';
const CLEAR_MARKS_LABEL = 'Clear inline formatting, keep links';
const CLEARED_ANNOUNCEMENT = 'Formatting cleared';
const RESET_ANNOUNCEMENT = 'Formatting reset';

/**
 * What the toolbar button does: the selection back to plain text, links included, as one undo step. Mentions stay because they are no marks.
 */
const reset = (api: EditorControlApi): void => {
    api.group(() => {
        api.marks.removeAll({ scope: 'block' });
        api.blocks.setType(PARAGRAPH);
        // Whatever attributes plugins add to every block (alignment today) go back to their defaults, without this plugin having to name another's.
        api.blocks.resetAttributes();
    });
};

/** The key is a literal because a computed key keeps this plugin in the renderer. */
const hotkeys = {
    'Mod-\\': {
        label: CLEAR_MARKS_LABEL,
        // Clears the marks only, those that survive a clear excepted (links): block types, lists and alignment stay. Not what the toolbar button does.
        run: (api) => {
            if (api.marks.removeAll({ scope: 'block', keepSurviving: true })) {
                api.announce(CLEARED_ANNOUNCEMENT);
            }
        },
    },
} satisfies Record<string, RteHotkey>;

const ResetFormattingButton = ({ api, label }: ToolbarItemProps) => {
    const onClick = (): void => {
        reset(api);
        // The API gives no signal for whether the whole reset changed anything, so this always announces.
        api.announce(RESET_ANNOUNCEMENT);
    };
    return (
        <ToolbarButton title={label} onClick={onClick}>
            <IconEraser size={TOOLBAR_ICON_SIZE} />
        </ToolbarButton>
    );
};

/**
 * A toolbar button that strips the selection back to plain text, and `Mod-\`, which only clears its marks except those that survive a clear
 */
export const resetFormattingPlugin = /* @__PURE__ */ definePlugin({
    id: 'reset-formatting',
    toolbarGroup: 'marks',
    toolbar: [{ label: RESET_LABEL, render: ResetFormattingButton, floating: 'inline' }],
    hotkeys,
});
