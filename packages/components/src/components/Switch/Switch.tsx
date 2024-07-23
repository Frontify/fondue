/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixSwitch from '@radix-ui/react-switch';
import { type FormEvent, type ForwardedRef, forwardRef } from 'react';

import { type CommonAriaAttrs } from '#/utilities/types';

import styles from './styles/switch.module.scss';

type SwitchProps = {
    id?: string;
    name?: string;
    /**
     * The size of the switch component.
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Whether the switch should be full width.
     */
    hug?: boolean;
    /**
     * The active value in the select component. This is used to control the select externally.
     */
    value?: boolean;
    /**
     * The default value of the select component. Used for uncontrolled usages.
     */
    defaultValue?: boolean;
    /**
     * Disables the select component.
     */
    disabled?: boolean;
    /**
     * Whether the switch is required.
     */
    required?: boolean;
    /**
     * Callback function that is called when the switch is toggled.
     */
    onChange?: (checked: boolean) => void;
    /**
     * Event handler called when the checkbox is blurred
     */
    onBlur?: (event: FormEvent<HTMLButtonElement>) => void;
    /**
     * Event handler called when the checkbox is focused
     */
    onFocus?: (event: FormEvent<HTMLButtonElement>) => void;
    'data-test-id'?: string;
} & CommonAriaAttrs;

const SwitchComponent = (
    {
        value,
        defaultValue,
        size = 'medium',
        hug = false,
        onChange,
        'data-test-id': dataTestId = 'fondue-switch',
        'aria-label': ariaLabel = 'Switch',
        ...props
    }: SwitchProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    const rootClasses = [styles.root, styles[size], hug && styles.fullwidth].join(' ');

    return (
        <RadixSwitch.Root
            ref={ref}
            checked={value}
            defaultChecked={defaultValue}
            className={rootClasses}
            onCheckedChange={onChange}
            aria-label={ariaLabel}
            data-test-id={dataTestId}
            {...props}
        >
            <RadixSwitch.Thumb className={styles.thumb} />
        </RadixSwitch.Root>
    );
};

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(SwitchComponent);
Switch.displayName = 'Switch';
