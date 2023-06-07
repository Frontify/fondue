/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRef } from 'react';

export const useDebounce = <T extends unknown[]>(func: (...args: T) => void, timeout = 10) => {
    const timer = useRef<ReturnType<typeof setTimeout>>();

    const debouncedFunc = (...args: T) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => func.apply(this, args), timeout);
    };

    return debouncedFunc;
};
