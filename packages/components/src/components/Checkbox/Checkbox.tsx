/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark, IconMinus } from '@frontify/fondue-icons';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { type FormEvent, forwardRef, type ForwardedRef } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { checkboxIndicatorStyles, checkboxStyles } from './styles/checkboxStyles';

export type CheckboxProps = {
    id?: string;
    name?: string;
    defaultValue?: boolean | 'indeterminate';
    value?: boolean | 'indeterminate';
    size?: 'default' | 'large';
    emphasis?: 'default' | 'weak';
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    className?: string;
    onChange?: (event: FormEvent<HTMLButtonElement>) => void;
    onBlur?: (event: FormEvent<HTMLButtonElement>) => void;
    onFocus?: (event: FormEvent<HTMLButtonElement>) => void;
    'data-test-id'?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
};

export const CheckboxComponent = (
    {
        className,
        value,
        onChange,
        defaultValue,
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
