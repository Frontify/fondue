/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSyncExternalStore } from 'react';

import { useOverlays } from './useOverlays';

const NO_FOCUS = () => null;

/** The focused element while focus is inside the editor's interaction scope, else `null`; each focus move rerenders. */
export const useScopedFocus = (): Element | null => {
    const { scope } = useOverlays();
    const read = () => {
        const active = scope.active();
        if (scope.contains(active)) {
            return active;
        }

        return null;
    };

    return useSyncExternalStore(scope.subscribe, read, NO_FOCUS);
};
