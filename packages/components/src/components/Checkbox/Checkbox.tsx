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
     * Controls the checkbox size. `'default'` fits most layouts, `'large'` for touch-friendly environments or increased visual weight.
     * @default "default"
     */
    size?: 'default' | 'large';
    /**
     * Controls visual prominence. `'default'` is subtle for standard forms, `'weak'` for reduced visual weight.
     * @default "default"
     */
    emphasis?: 'default' | 'weak';
    /**
     * @default false
     */
    disabled?: boolean;
    /**
     * Marks the checkbox as required for form submission. The indicator should appear next to the label.
     * @default false
     */
    required?: boolean;
    /**
     * Makes the checkbox read-only. The checkbox is visible and focusable but its value cannot be changed by user interaction.
     * @default false
     */
    readOnly?: boolean;
    /**
     * Visual status of the checkbox. Use `'error'` to indicate a validation failure.
     * @default "default"
     */
    status?: 'default' | 'error';
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
        status = 'default',
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
            data-status={status}
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
            aria-invalid={status === 'error'}
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
