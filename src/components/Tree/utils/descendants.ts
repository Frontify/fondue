/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useEffect, useRef } from 'react';

export const createNamedContext = <ContextValueType>(
    name: string,
    defaultValue: ContextValueType,
): React.Context<ContextValueType> => {
    const Ctx = createContext<ContextValueType>(defaultValue);
    Ctx.displayName = name;
    return Ctx;
};

/**
 * No-op function.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = (): void => {};

/**
 * Returns the previous value of a reference after a component update.
 *
 * @param value
 */
export const usePrevious = <ValueType = unknown>(value: ValueType) => {
    const ref = useRef<ValueType | null>(null);
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
};
