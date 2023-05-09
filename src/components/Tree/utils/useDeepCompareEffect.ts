/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DependencyList, EffectCallback, useEffect, useRef } from 'react';
import isEqual from 'react-fast-compare';

const isPrimitive = (val: unknown): boolean => val !== Object(val);

export const useDeepCompareEffect = (effect: EffectCallback, deps: unknown[]): void => {
    if (process.env.NODE_ENV !== 'production') {
        if (!deps || deps.length === 0) {
            console.warn(
                '`useDeepCompareEffect` should not be used with no dependencies. Use React.useEffect instead.',
            );
        }

        if (deps.every(isPrimitive)) {
            console.warn(
                '`useDeepCompareEffect` should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
            );
        }
    }

    const ref = useRef<DependencyList | undefined>(undefined);

    if (!isEqual(deps, ref.current)) {
        ref.current = deps;
    }

    // Intended eslint disable, it doesn't pick ref.current as dependencies array
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, ref.current);
};
