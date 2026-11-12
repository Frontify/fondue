/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowRoundAntiClockwise, IconArrowRoundClockwise } from '@frontify/fondue-icons';

import { REDO_HOTKEY, type RtePlugin, UNDO_HOTKEY } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/**
 * Undo and redo buttons, each off while there is nothing to take back or make
 * again. No hotkeys of its own: the editor binds Mod-z and Mod-Shift-z.
 */
export const historyPlugin = (): RtePlugin => ({
    id: 'history',
    toolbarGroup: 'history',
    toolbarItem: ({ api, selection }) => (
        <>
            <ToolbarButton
                title="Undo"
                shortcut={UNDO_HOTKEY}
                disabled={!selection.history.canUndo}
                onClick={() => api.history.undo()}
            >
                <IconArrowRoundAntiClockwise size={20} />
            </ToolbarButton>
            <ToolbarButton
                title="Redo"
                shortcut={REDO_HOTKEY}
                disabled={!selection.history.canRedo}
                onClick={() => api.history.redo()}
            >
                <IconArrowRoundClockwise size={20} />
            </ToolbarButton>
        </>
    ),
    floatingToolbar: 'hidden',
});
