/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSyncExternalStore } from 'react';

const COARSE_POINTER = '(pointer: coarse)';

const subscribePointer = (onChange: () => void) => {
    const query = globalThis.matchMedia?.(COARSE_POINTER);
    // Some test DOMs stub `matchMedia` with a bare `{ matches }`.
    if (typeof query?.addEventListener !== 'function') {
        return () => undefined;
    }

    query.addEventListener('change', onChange);

    return () => query.removeEventListener('change', onChange);
};

/** Whether the primary pointer is coarse, as on a touch device; `false` on the server and in the hydrating render. */
export const useCoarsePointer = (): boolean =>
    useSyncExternalStore(
        subscribePointer,
        () => globalThis.matchMedia?.(COARSE_POINTER).matches === true,
        () => false,
    );
