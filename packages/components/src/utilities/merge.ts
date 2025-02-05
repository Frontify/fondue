/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject, type Ref, type RefCallback } from 'react';

/**
 * Cleans and joins an array of inputs with possible undefined or boolean values.
 *
 * @param classNames Array of class names
 * @returns Clean string to be used for class name
 */
export const merge = (classNames: (string | undefined | boolean)[]): string => classNames.filter(Boolean).join(' ');

export const mergeRefs = <T>(...inputRefs: (Ref<T> | undefined)[]): Ref<T> | RefCallback<T> => {
    const filteredInputRefs = inputRefs.filter(Boolean);

    if (filteredInputRefs.length <= 1) {
        const firstRef = filteredInputRefs[0];

        return firstRef ?? null;
    }

    return function mergedRefs(ref) {
        for (const inputRef of filteredInputRefs) {
            if (typeof inputRef === 'function') {
                inputRef(ref);
            } else if (inputRef) {
                (inputRef as MutableRefObject<T | null>).current = ref;
            }
        }
    };
};
