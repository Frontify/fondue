/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject } from 'react';

import { type CheckedIssue, useClientLayoutEffect } from '#/bridge/pluginApi/plugin';

/**
 * When the focused row leaves the list, moves focus to the summary heading, which then reads the counts. Runs after
 * every commit, as the row can leave without a change this hook lists.
 */
export const useDepartedIssueFocus = (
    listed: readonly CheckedIssue[],
    focusedRef: { current: string | undefined },
    headingRef: RefObject<HTMLHeadingElement | null>,
    headingSpokeRef: { current: boolean },
) => {
    useClientLayoutEffect(() => {
        const focused = focusedRef.current;
        if (focused === undefined || listed.some(({ key }) => key === focused)) {
            return;
        }

        focusedRef.current = undefined;
        const heading = headingRef.current;
        const active = heading?.ownerDocument.activeElement;
        const focusLost =
            active === null || active === undefined || active === heading?.ownerDocument.body || !active.isConnected;
        if (heading !== null && focusLost) {
            heading.focus();
            headingSpokeRef.current = true;
        }
    });
};
