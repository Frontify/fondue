/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject } from 'react';

import { useClientLayoutEffect } from '#/bridge/session/hooks/useClientLayoutEffect';

/** Places a docked toolbar above the on-screen keyboard. */
export const useDockedToolbar = (toolbarRef: MutableRefObject<HTMLDivElement | null>, docked: number | undefined) => {
    // A transformed ancestor, as a host dialog's, moves the origin of fixed positioning, so it is measured first, as
    // Fondue's `Dropdown` places its virtual trigger.
    useClientLayoutEffect(() => {
        const element = toolbarRef.current;
        const view = element?.ownerDocument.defaultView;
        if (element === null || view === null || view === undefined || docked === undefined) {
            return undefined;
        }

        element.style.insetBlockStart = '0px';
        const { top, height } = element.getBoundingClientRect();
        element.style.insetBlockStart = `${view.innerHeight - docked - height - top}px`;

        return () => {
            element.style.insetBlockStart = '';
        };
    }, [toolbarRef, docked]);
};
