/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, type MutableRefObject, useEffect, useRef } from 'react';

export function useForwardedRef<T>(ref: ForwardedRef<T>): MutableRefObject<T | null> {
    const innerRef = useRef(null);

    useEffect(() => {
        if (!ref) {
            return;
        }

        if (typeof ref === 'function') {
            ref(innerRef.current);
        } else {
            ref.current = innerRef.current;
        }
    });

    return innerRef;
}
