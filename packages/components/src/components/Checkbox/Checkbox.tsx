/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark, IconMinus } from '@frontify/fondue-icons';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { forwardRef, type FormEvent, type ForwardedRef } from 'react';

import styles from './styles/checkbox.module.scss';

export type CheckboxProps = {
    id?: string;
    name?: string;
    /**
     * The default value of the checkbox
     * Used for uncontrolled components
     * @default false
     */
    defaultValue?: boolean | 'indeterminate';
    /**
     * The controlled value of the checkbox
     * @default false
     */
    value?: boolean | 'indeterminate';
    /**
     * The size of the checkbox
     * @default "default"
     */
    size?: 'default' | 'large';
    /**
     * The emphasis of the checkbox
     * @default "default"
     */
    emphasis?: 'default' | 'weak';
    /**
     * Disable the checkbox
     * @default false
     */
    disabled?: boolean;
    /**
     * Make the checkbox required in form
     * @default false
     */
    required?: boolean;
    /**
     * Make the checkbox read-only
     * @default false
     */
    readOnly?: boolean;
    className?: string;
    /**
     * Event handler called when the checkbox value changes
     */
    onChange?: (event: FormEvent<HTMLButtonElement>) => void;
    /**
     * Event handler called when the checkbox is blurred
     */
    onBlur?: (event: FormEvent<HTMLButtonElement>) => void;
    /**
     * Event handler called when the checkbox is focused
     */
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
        size = 'default',
        emphasis = 'default',
        'data-test-id': dataTestId = 'fondue-checkbox',
        readOnly,
        ...props
    }: CheckboxProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    return (
        <CheckboxPrimitive.Root
            ref={ref}
            checked={value}
            defaultChecked={defaultValue}
            className={[styles.root, className].filter(Boolean).join(' ')}
            data-size={size}
            data-emphasis={emphasis}
            data-readonly={readOnly}
            onClick={(event) => {
                if (readOnly) {
                    event.preventDefault();
                    return false;
                }
                onChange?.(event);
            }}
            onFocus={(event) => {
                if (readOnly) {
                    event.preventDefault();
                    event.target.blur();
                    return false;
                }
                props.onFocus?.(event);
            }}
            data-test-id={dataTestId}
            aria-readonly={readOnly}
            {...props}
        >
            <CheckboxPrimitive.Indicator className={styles.indicator}>
                <IconMinus
                    size={16}
                    className={[styles.icon, styles.iconIndeterminate].filter(Boolean).join(' ')}
                    data-test-id="icon-indeterminate"
                />

                <IconCheckMark
                    size={16}
                    className={[styles.icon, styles.iconChecked].filter(Boolean).join(' ')}
                    data-test-id="icon-checked"
                />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
};

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(CheckboxComponent);
Checkbox.displayName = 'Checkbox';
