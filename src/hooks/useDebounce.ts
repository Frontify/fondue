/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = <T extends (...args: any[]) => void>(func: T, timeout = 10) => {
    const timer = useRef<number | undefined>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const debouncedFunc = useCallback((...args: any[]) => {
        clearTimeout(timer.current);
        timer.current = window.setTimeout(() => func.apply(this, args), timeout);
    }, []);

    return debouncedFunc;
};
