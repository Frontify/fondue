/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Dispatch, type SetStateAction, useCallback, useMemo, useState, useRef, useEffect } from 'react';

// Radix UI handy hook for handling controlled and uncontrolled state
// Source: https://github.com/radix-ui/primitives/blob/main/packages/react/use-controllable-state/src/useControllableState.tsx

type UseControllableStateParams<TValue> = {
    prop?: TValue;
    defaultProp?: TValue;
    onChange?: (state: TValue) => void;
};

type SetStateFn<T> = (prevState?: T) => T;

export const useControllableState = <TValue>({
    prop,
    defaultProp,
    onChange = () => {},
}: UseControllableStateParams<TValue>) => {
    const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange });
    const isControlled = prop !== undefined;
    const value = isControlled ? prop : uncontrolledProp;
    const handleChange = useMemo(() => onChange, [onChange]);

    const setValue: Dispatch<SetStateAction<TValue | undefined>> = useCallback(
        (nextValue) => {
            if (isControlled) {
                const setter = nextValue as SetStateFn<TValue>;
                const value = typeof nextValue === 'function' ? setter(prop) : nextValue;
                if (value !== prop) {
                    handleChange(value as TValue);
                }
            } else {
                setUncontrolledProp(nextValue);
            }
        },
        [isControlled, prop, setUncontrolledProp, handleChange],
    );

    return [value, setValue] as const;
};

const useUncontrolledState = <TValue>({ defaultProp, onChange }: Omit<UseControllableStateParams<TValue>, 'prop'>) => {
    const [value, setValue] = useState<TValue | undefined>(defaultProp);
    const prevValueRef = useRef(value);
    const handleChange = useMemo(() => onChange, [onChange]);

    useEffect(() => {
        if (prevValueRef.current !== value) {
            handleChange?.(value as TValue);
            prevValueRef.current = value;
        }
    }, [value, prevValueRef, handleChange]);

    return [value, setValue] as const;
};
