/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckedState } from '@headless-tree/core';
import { type FormEventHandler, type ForwardedRef } from 'react';

import { Checkbox } from '#/components/Checkbox/Checkbox';

type CheckboxProps = {
    onChange?: FormEventHandler<HTMLButtonElement>;
    ref?: ForwardedRef<HTMLButtonElement>;
};

type TreeRowCheckboxProps = {
    checkedState: CheckedState;
    headlessProps: CheckboxProps;
};

export const TreeRowCheckbox = ({ checkedState, headlessProps }: TreeRowCheckboxProps) => {
    const value: boolean | 'indeterminate' =
        checkedState === CheckedState.Indeterminate ? 'indeterminate' : checkedState === CheckedState.Checked;

    return (
        <Checkbox
            value={value}
            onChange={(event) => {
                // The whole row also handles clicks (selection/expansion); stop the bubble so
                // checking a box doesn't simultaneously fire the row's select handler.
                event.stopPropagation();
                headlessProps.onChange?.(event);
            }}
            ref={headlessProps.ref}
        />
    );
};
