/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEraser } from '@frontify/fondue-icons';

import { definePlugin, type EditorControlApi, PARAGRAPH, type RteHotkey, type ToolbarItemProps } from '#/core';
import { ToolbarButton } from '#/ui/ToolbarButton/ToolbarButton';
import { TOOLBAR_ICON_SIZE } from '#/ui/toolbarIconSize';

/** The name of `Mod-\`, and what the reset button and its key say to screen readers. `Mod-\` says nothing when it removed no mark. */
const RESET_FORMATTING_STRINGS = Object.freeze({
    clearMarksTitle: 'Clear inline formatting, keep links',
    cleared: 'Formatting cleared',
    reset: 'Formatting reset',
});

/**
 * Puts the selection back to plain text, as one undo step: marks gone, except
 * those that survive a clear (links), block type back to paragraph, alignment
 * cleared, lists unwrapped. No schema of its own — it only drives the control
 * API.
 */
const reset = (api: EditorControlApi): void => {
    api.group(() => {
        api.marks.removeAll({ scope: 'block', keepSurviving: true });
        api.blocks.setType(PARAGRAPH);
        // Whatever attributes plugins add to every block — alignment today — go
        // back to their defaults, without this plugin having to name another's.
        api.blocks.resetAttributes();
    });
};

const ResetFormattingButton = ({ api, label }: ToolbarItemProps) => {
    const onClick = (): void => {
        reset(api);
        // The API gives no signal for whether the whole reset changed anything, so this always announces.
        api.announce(RESET_FORMATTING_STRINGS.reset);
    };
    return (
        <ToolbarButton title={label} onClick={onClick}>
            <IconEraser size={TOOLBAR_ICON_SIZE} />
        </ToolbarButton>
    );
};

/** The key is a literal because a computed key keeps this plugin in the renderer. */
const hotkeys = {
    'Mod-\\': {
        label: RESET_FORMATTING_STRINGS.clearMarksTitle,
        // Marks only: block type, lists and alignment stay, which the toolbar button resets.
        run: (api) => {
            if (api.marks.removeAll({ scope: 'block', keepSurviving: true })) {
                api.announce(RESET_FORMATTING_STRINGS.cleared);
            }
        },
    },
} satisfies Record<string, RteHotkey>;

/**
 * A toolbar button that resets the selection, and `Mod-\`, which clears only its marks. Both keep the marks that survive a clear.
 */
export const resetFormattingPlugin = /* @__PURE__ */ definePlugin({
    id: 'reset-formatting',
    toolbarGroup: 'marks',
    toolbar: [{ label: 'Reset formatting', render: ResetFormattingButton, floating: 'inline' }],
    hotkeys,
});
