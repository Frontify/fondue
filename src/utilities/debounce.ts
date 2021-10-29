/* (c) Copyright Frontify Ltd., all rights reserved. */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type T = (...args: any[]) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = (func: (...args: any[]) => void, timeout = 10): T => {
    let timer: number;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = window.setTimeout(() => func.apply(this, args), timeout);
    };
};
