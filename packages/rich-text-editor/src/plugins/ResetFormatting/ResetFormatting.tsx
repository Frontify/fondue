/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEraser } from '@frontify/fondue-icons';

import { definePlugin, type EditorControlApi, PARAGRAPH, type RteHotkey, type ToolbarItemProps } from '#/core';
import { ToolbarButton } from '#/ui/ToolbarButton/ToolbarButton';
import { TOOLBAR_ICON_SIZE } from '#/ui/toolbarIconSize';

import * as TOOLBAR_GROUPS from '../shared/toolbarGroups';

/**
 * The words the reset button and its key say: what the keyboard reference calls the key, and what screen readers hear
 */
export type ResetFormattingLabels = {
    /**
     * What the keyboard reference calls `Mod-\`.
     *
     * @default 'Clear inline formatting, keep links'
     */
    clearMarksTitle: string;
    /**
     * Said after `Mod-\` removed a mark. It says nothing when there was no mark to remove.
     *
     * @default 'Formatting cleared'
     */
    cleared: string;
    /**
     * Said after the Reset formatting button ran.
     *
     * @default 'Formatting reset'
     */
    reset: string;
};

const DEFAULT_RESET_FORMATTING_LABELS: ResetFormattingLabels = {
    clearMarksTitle: 'Clear inline formatting, keep links',
    cleared: 'Formatting cleared',
    reset: 'Formatting reset',
};

export type ResetFormattingPluginOptions = {
    /**
     * The words the plugin says. Each one left out stays English.
     */
    labels?: Partial<ResetFormattingLabels>;
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

type ResetFormattingButtonProps = ToolbarItemProps & { labels: ResetFormattingLabels };

const ResetFormattingButton = ({ api, label, labels }: ResetFormattingButtonProps) => {
    const onClick = (): void => {
        reset(api);
        // The API gives no signal for whether the whole reset changed anything, so this always announces.
        api.announce(labels.reset);
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
export const resetFormattingPlugin = (options: ResetFormattingPluginOptions = {}) => {
    const labels: ResetFormattingLabels = { ...DEFAULT_RESET_FORMATTING_LABELS, ...options.labels };
    return definePlugin({
        id: 'reset-formatting',
        toolbarGroup: TOOLBAR_GROUPS.marks,
        toolbar: [
            {
                label: 'Reset formatting',
                render: (props) => <ResetFormattingButton {...props} labels={labels} />,
                floating: 'inline',
            },
        ],
        // The key is a literal because a computed key keeps this plugin in the renderer.
        hotkeys: {
            'Mod-\\': {
                label: labels.clearMarksTitle,
                // Clears the marks only, those that survive a clear (links) excepted: block types, lists and alignment stay, which the toolbar button resets.
                run: (api) => {
                    if (api.marks.removeAll({ scope: 'block', keepSurviving: true })) {
                        api.announce(labels.cleared);
                    }
                },
            },
        } satisfies Record<string, RteHotkey>,
    });
};
