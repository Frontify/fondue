/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRef } from 'react';

export const useDebounce = <T extends unknown[]>(callback: (...args: T) => void, timeout = 10) => {
    const timer = useRef<ReturnType<typeof setTimeout>>();

    const debouncedCallback = (...args: T) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => callback.apply(this, args), timeout);
    };

    return debouncedCallback;
};
