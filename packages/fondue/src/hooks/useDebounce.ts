/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useRef } from 'react';

export const useDebounce = <T extends unknown[]>(func: (...args: T) => void, timeout = 10) => {
    const timer = useRef<ReturnType<typeof setTimeout>>();

    const debouncedFunc = useCallback(
        (...args: T) => {
            clearTimeout(timer.current);
            // eslint-disable-next-line no-invalid-this
            timer.current = setTimeout(() => func.apply(this, args), timeout);
        },
        [func, timeout],
    );

    return debouncedFunc;
};
