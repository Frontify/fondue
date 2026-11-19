/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEraser } from '@frontify/fondue-icons';

import { definePlugin, type EditorControlApi, PARAGRAPH, type ToolbarItemProps } from '#/core';
import { ToolbarButton } from '#/ui/ToolbarButton/ToolbarButton';
import { TOOLBAR_ICON_SIZE } from '#/ui/toolbarIconSize';
import { localeLabel } from '#/ui/translation';

/**
 * Puts the selection back to plain text, as one undo step: marks gone, except
 * those that survive a clear (links), block type back to paragraph, alignment
 * cleared, lists unwrapped. No schema of its own — it only drives the control
 * API.
 */
const reset = (api: EditorControlApi): void => {
    api.marks.removeAll({ scope: 'block', keepSurviving: true });
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
 * A toolbar button that puts the selection back to plain text, keeping the marks that survive a clear
 */
export const resetFormattingPlugin = () =>
    definePlugin({
        id: 'reset-formatting',
        toolbarGroup: 'marks',
        toolbar: [
            { label: localeLabel('RichTextEditor_resetFormatting'), render: ResetFormattingButton, floating: 'inline' },
        ],
    });
