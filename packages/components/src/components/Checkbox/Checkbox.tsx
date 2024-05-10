/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark, IconMinus } from '@frontify/fondue-icons';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { forwardRef, type FormEvent, type ForwardedRef } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { checkboxIndicatorStyles, checkboxStyles } from './styles/checkboxStyles';

export type CheckboxProps = {
    /**
     * Size of the checkbox
     * @default default
     */
    size?: 'default' | 'large';
    /**
     * Emphasis of the checkbox
     * @default default
     */
    emphasis?: 'default' | 'weak';
    /**
     * Initial State of the checkbox
     * @default false
     */
    defaultValue?: boolean | 'indeterminate';
    /**
     * Externally controlled state of the checkbox
     */
    value?: boolean | 'indeterminate';
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    id?: string;
    name?: string;
    /**
     * Function to be called when the checkbox is clicked
     * @default () => {}
     */
    onChange?: (event: FormEvent<HTMLButtonElement>) => void;
    /**
     * Function to be called when the checkbox is is unfocused
     * @default () => {}
     */
    onBlur?: (event: FormEvent<HTMLButtonElement>) => void;
    /**
     * Function to be called when the checkbox is focused
     * @default () => {}
     */
    onFocus?: (event: FormEvent<HTMLButtonElement>) => void;
    'data-test-id'?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    className?: string;
};

export const CheckboxComponent = (
    {
        className,
        value = false,
        onChange,
        defaultValue = false,
        'data-test-id': dataTestId = 'fondue-checkbox',
        ...props
    }: CheckboxProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    return (
        <CheckboxPrimitive.Root
            ref={ref}
            checked={value}
            defaultChecked={defaultValue}
            className={cn(checkboxStyles(props), className)}
            onClick={onChange}
            data-test-id={dataTestId}
            {...props}
        >
            <CheckboxPrimitive.Indicator className={checkboxIndicatorStyles}>
                <IconMinus
                    size={16}
                    className='tw-hidden tw-opacity-0 group-data-[state="indeterminate"]:tw-block group-data-[state="indeterminate"]:tw-opacity-100 tw-transition-opacity'
                    data-test-id="icon-indeterminate"
                />

                <IconCheckMark
                    size={16}
                    className='tw-hidden tw-opacity-0 group-data-[state="checked"]:tw-block group-data-[state="checked"]:tw-opacity-100 tw-transition-opacity'
                    data-test-id="icon-checked"
                />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
};

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(CheckboxComponent);
Checkbox.displayName = 'Checkbox';
