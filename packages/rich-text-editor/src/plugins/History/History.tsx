/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowRoundAntiClockwise, IconArrowRoundClockwise } from '@frontify/fondue-icons';

import { definePlugin, REDO_HOTKEY, type ToolbarItemProps, UNDO_HOTKEY } from '#/core';
import { ToolbarButton } from '#/ui/ToolbarButton/ToolbarButton';
import { TOOLBAR_ICON_SIZE } from '#/ui/toolbarIconSize';

import * as TOOLBAR_GROUPS from '../shared/toolbarGroups';

const UndoButton = ({ api, selection, label }: ToolbarItemProps) => (
    <ToolbarButton
        title={label}
        shortcut={UNDO_HOTKEY}
        disabled={!selection.history.canUndo}
        onClick={() => api.history.undo()}
    >
        <IconArrowRoundAntiClockwise size={TOOLBAR_ICON_SIZE} />
    </ToolbarButton>
);

const RedoButton = ({ api, selection, label }: ToolbarItemProps) => (
    <ToolbarButton
        title={label}
        shortcut={REDO_HOTKEY}
        disabled={!selection.history.canRedo}
        onClick={() => api.history.redo()}
    >
        <IconArrowRoundClockwise size={TOOLBAR_ICON_SIZE} />
    </ToolbarButton>
);

/**
 * Undo and redo buttons, each off while there is nothing to take back or make
 * again. No hotkeys of its own: the editor binds Mod-z and Mod-Shift-z.
 */
export const historyPlugin = /* @__PURE__ */ definePlugin({
    id: 'history',
    toolbarGroup: TOOLBAR_GROUPS.history,
    toolbar: [
        { label: 'Undo', render: UndoButton, floating: 'hidden' },
        { label: 'Redo', render: RedoButton, floating: 'hidden' },
    ],
});
