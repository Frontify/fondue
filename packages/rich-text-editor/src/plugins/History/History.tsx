/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowRoundAntiClockwise, IconArrowRoundClockwise } from '@frontify/fondue-icons';

import { type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/**
 * Undo and redo buttons, each off while there is nothing to take back or make
 * again. No hotkeys of its own: the editor binds Mod-z and Mod-Shift-z.
 */
export const historyPlugin = (): RtePlugin => ({
    id: 'history',
    toolbarGroup: 'history',
    toolbarItem: ({ api }) => (
        <>
            <ToolbarButton
                title="Undo"
                shortcut="Mod-z"
                disabled={!api.history.canUndo()}
                onClick={() => api.history.undo()}
            >
                <IconArrowRoundAntiClockwise size={20} />
            </ToolbarButton>
            <ToolbarButton
                title="Redo"
                shortcut="Mod-Shift-z"
                disabled={!api.history.canRedo()}
                onClick={() => api.history.redo()}
            >
                <IconArrowRoundClockwise size={20} />
            </ToolbarButton>
        </>
    ),
    floatingToolbar: 'hidden',
});
