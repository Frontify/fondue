/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject } from 'react';

import { useClientLayoutEffect } from '#/bridge/pluginApi/plugin';

/** Moves focus to the issue last acted on when the panel's command runs again while it is open. */
export const useRequestedIssueFocus = (
    requestedRef: { current: number },
    requested: number,
    lastActive: string | undefined,
    listRef: RefObject<HTMLOListElement | null>,
    headingRef: RefObject<HTMLHeadingElement | null>,
) => {
    useClientLayoutEffect(() => {
        if (requestedRef.current === requested) {
            return;
        }

        requestedRef.current = requested;
        const list = listRef.current;
        let items: Element[] = [];
        if (list !== null) {
            items = [...list.querySelectorAll('[data-rte-row]')];
        }

        const item = items.find((element) => element.getAttribute('data-rte-row') === lastActive);
        const button = item?.querySelector('button');
        const target = button ?? headingRef.current;
        target?.focus();
    }, [requested, lastActive]);
};
