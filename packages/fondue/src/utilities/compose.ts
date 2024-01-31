/* (c) Copyright Frontify Ltd., all rights reserved. */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const compose = <T extends any[], R>(
    fn1: (...args: T) => R,
    ...fns: Array<(a: R) => R>
): ((...args: T) => R) => {
    const composed = fns.reduce(
        (prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
        (value) => value,
    );
    return (...args: T) => composed(fn1(...args));
};
