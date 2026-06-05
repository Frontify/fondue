/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckedState } from '@headless-tree/core';
import { useEffect, useRef, type FormEventHandler, type ForwardedRef } from 'react';

import { Checkbox } from '#/components/Checkbox/Checkbox';

type CheckboxProps = {
    onChange?: FormEventHandler<HTMLButtonElement>;
    ref?: ForwardedRef<HTMLButtonElement>;
};

type TreeRowCheckboxProps = {
    checkedState: CheckedState;
    isFocused: boolean;
    headlessProps: CheckboxProps;
};

export const TreeRowCheckbox = ({ checkedState, isFocused, headlessProps }: TreeRowCheckboxProps) => {
    const value: boolean | 'indeterminate' =
        checkedState === CheckedState.Indeterminate ? 'indeterminate' : checkedState === CheckedState.Checked;

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

    // Mirror headless-tree's roving tabindex onto the row's checkbox: only the checkbox
    // inside the focused row is in the tab order. Without this every Checkbox keeps its
    // native tabIndex=0, so Tab leaks straight from the focused row's checkbox into the
    // next row's checkbox instead of leaving the tree.
    useEffect(() => {
        if (elementRef.current) {
            elementRef.current.tabIndex = isFocused ? 0 : -1;
        }
    }, [isFocused]);

    return (
        <Checkbox
            value={value}
            onChange={(event) => {
                // The whole row also handles clicks (selection/expansion); stop the bubble so
                // checking a box doesn't simultaneously fire the row's select handler.
                event.stopPropagation();
                headlessProps.onChange?.(event);
            }}
            ref={setRef}
        />
    );
};
