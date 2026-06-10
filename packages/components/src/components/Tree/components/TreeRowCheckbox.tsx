/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, type FormEventHandler, type ForwardedRef } from 'react';

import { Checkbox } from '#/components/Checkbox/Checkbox';

import { type RowCheckedState } from '../utils/computeCheckedStates';

type CheckboxProps = {
    onChange?: FormEventHandler<HTMLButtonElement>;
    ref?: ForwardedRef<HTMLButtonElement>;
};

type TreeRowCheckboxProps = {
    checkedState: RowCheckedState;
    isFocused: boolean;
    isDisabled?: boolean;
    headlessProps: CheckboxProps;
};

export const TreeRowCheckbox = ({ checkedState, isFocused, isDisabled, headlessProps }: TreeRowCheckboxProps) => {
    const value: boolean | 'indeterminate' = checkedState;

    const elementRef = useRef<HTMLButtonElement | null>(null);

    const setRef = (el: HTMLButtonElement | null) => {
        elementRef.current = el;
        const ref = headlessProps.ref;
        if (typeof ref === 'function') {
            ref(el);
        } else if (ref) {
            ref.current = el;
        }
    };

    // Mirror the roving tabindex: only the focused row's checkbox is tabbable, otherwise
    // Tab leaks from checkbox to checkbox instead of leaving the tree.
    useEffect(() => {
        if (elementRef.current) {
            elementRef.current.tabIndex = isFocused ? 0 : -1;
        }
    }, [isFocused]);

    return (
        <Checkbox
            value={value}
            disabled={isDisabled}
            onChange={(event) => {
                // Don't let the click also fire the row's select/expand handler.
                event.stopPropagation();
                headlessProps.onChange?.(event);
            }}
            ref={setRef}
        />
    );
};
