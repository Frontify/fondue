/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useContext, useRef } from 'react';

import { SessionContext } from '#/bridge/session';
import { returnFocus, runItem, type ToolbarItem } from '#/ui/helpers/items';

/**
 * How a menu of More rows runs them: a row runs its command and sends focus to the surface; a row that opens a control
 * runs once the menu has closed, after `focusOpener` focused what the control then returns focus to.
 */
export const useRowRuns = (content: RefObject<HTMLDivElement | null>, focusOpener: () => void) => {
    const runtime = useContext(SessionContext);
    // A row that ran its command sends focus to the surface rather than back to the opener.
    const ranRef = useRef(false);
    const pendingRef = useRef<ToolbarItem | undefined>(undefined);
    const onRun = async (item: ToolbarItem) => {
        if (runtime === undefined) {
            return;
        }

        // A row that opens a control runs once the menu has closed, so the control does not open under the menu.
        if (item.opensControl === true) {
            pendingRef.current = item;

            return;
        }

        ranRef.current = true;
        await runItem(runtime, item, false);
        // The row sits in the menu's portal, outside the toolbar.
        returnFocus(runtime, [content.current]);
    };

    const onCloseAutoFocus = (event: Event) => {
        const pending = pendingRef.current;
        if (pending !== undefined) {
            event.preventDefault();
            pendingRef.current = undefined;
            focusOpener();
            runtime?.handle.execute(pending.command, pending.payload);

            return;
        }

        if (ranRef.current) {
            event.preventDefault();
            ranRef.current = false;
        }
    };

    /** Marks a row that ran outside `onRun`, as the toolbar mode switch does. */
    const ran = () => {
        ranRef.current = true;
    };

    return { onRun, onCloseAutoFocus, ran };
};
