/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, type MutableRefObject, useEffect, useRef } from 'react';

/**
 * @deprecated Please use a custom function instead.
 **/
export function useForwardedRef<T>(ref: ForwardedRef<T>): MutableRefObject<T | null> {
    const innerRef = useRef(null);

    useEffect(() => {
        if (!ref) {
            return;
        }

        if (typeof ref === 'function') {
            ref(innerRef.current);
        } else {
            // eslint-disable-next-line react-hooks/immutability
            ref.current = innerRef.current;
        }
    });

    return innerRef;
}
