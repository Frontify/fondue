/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEraser } from '@frontify/fondue-icons';

import { definePlugin, type EditorControlApi, type HotkeyHandler, PARAGRAPH, type ToolbarItemProps } from '#/core';
import { ToolbarButton } from '#/ui/ToolbarButton/ToolbarButton';
import { TOOLBAR_ICON_SIZE } from '#/ui/toolbarIconSize';

const DEFAULT_CLEARED_ANNOUNCEMENT = 'Formatting cleared';
const DEFAULT_RESET_ANNOUNCEMENT = 'Formatting reset';

/**
 * What the reset button and its key say to screen readers, with a default of English.
 */
export type ResetFormattingPluginOptions = {
    /**
     * Said after `Mod-\` removed a mark. It says nothing when there was no mark to remove.
     *
     * @default 'Formatting cleared'
     */
    clearedAnnouncement?: string;
    /**
     * Said after the Reset formatting button ran.
     *
     * @default 'Formatting reset'
     */
    resetAnnouncement?: string;
};

/**
 * What the toolbar button does: the selection back to plain text as one undo step. Marks that survive a clear (links) and mentions stay.
 */
const reset = (api: EditorControlApi): void => {
    api.group(() => {
        api.marks.removeAll({ scope: 'block', keepSurviving: true });
        api.blocks.setType(PARAGRAPH);
        // Whatever attributes plugins add to every block (alignment today) go back to their defaults, without this plugin having to name another's.
        api.blocks.resetAttributes();
    });
};

type ResetFormattingButtonProps = ToolbarItemProps & { resetAnnouncement: string };

const ResetFormattingButton = ({ api, label, resetAnnouncement }: ResetFormattingButtonProps) => {
    const onClick = (): void => {
        reset(api);
        // The API gives no signal for whether the whole reset changed anything, so this always announces.
        api.announce(resetAnnouncement);
    };
    return (
        <ToolbarButton title={label} onClick={onClick}>
            <IconEraser size={TOOLBAR_ICON_SIZE} />
        </ToolbarButton>
    );
};

/**
 * A toolbar button that resets the selection's marks, lists, block types and attributes, and `Mod-\`, which only clears its marks. Both keep the marks that survive a clear
 */
export const resetFormattingPlugin = ({
    clearedAnnouncement = DEFAULT_CLEARED_ANNOUNCEMENT,
    resetAnnouncement = DEFAULT_RESET_ANNOUNCEMENT,
}: ResetFormattingPluginOptions = {}) =>
    definePlugin({
        id: 'reset-formatting',
        toolbarGroup: 'marks',
        toolbar: [
            {
                label: 'Reset formatting',
                render: (props) => <ResetFormattingButton {...props} resetAnnouncement={resetAnnouncement} />,
                floating: 'inline',
            },
        ],
        // The key is a literal because a computed key keeps this plugin in the renderer.
        hotkeys: {
            /** Clears the marks only, those that survive a clear (links) excepted: block types, lists and alignment stay, which the toolbar button resets. */
            'Mod-\\': (api) => {
                if (api.marks.removeAll({ scope: 'block', keepSurviving: true })) {
                    api.announce(clearedAnnouncement);
                }
            },
        } satisfies Record<string, HotkeyHandler>,
    });
