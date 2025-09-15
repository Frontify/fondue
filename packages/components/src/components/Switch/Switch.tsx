/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixSwitch from '@radix-ui/react-switch';
import { type FormEvent, type ForwardedRef, forwardRef } from 'react';

import styles from './styles/switch.module.scss';

import { cn } from '#/utilities/styleUtilities';
import { type CommonAriaAttrs } from '#/utilities/types';

type SwitchProps = {
    id?: string;
    name?: string;
    /**
     * The size of the switch component.
     * @default medium
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * The active value in the select component. This is used to control the select externally.
     * @default false
     */
    value?: boolean;
    /**
     * The default value of the select component. Used for uncontrolled usages.
     * @default false
     */
    defaultValue?: boolean;
    /**
     * Disables the select component.
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the switch is required.
     * @default false
     */
    required?: boolean;
    /**
     * Callback function that is called when the switch is toggled.
     * @param checked - The new checked state of the switch
     */
    onChange?: (checked: boolean) => void;
    /**
     * Event handler called when the checkbox is blurred
     * @param event - The event object
     */
    onBlur?: (event: FormEvent<HTMLButtonElement>) => void;
    /**
     * Event handler called when the checkbox is focused
     * @param event - The event object
     */
    onFocus?: (event: FormEvent<HTMLButtonElement>) => void;
    'data-test-id'?: string;
} & CommonAriaAttrs;

const SwitchComponent = (
    {
        value,
        defaultValue,
        size = 'medium',
        onChange,
        'data-test-id': dataTestId = 'fondue-switch',
        'aria-label': ariaLabel = 'Switch',
        ...props
    }: SwitchProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => (
    <RadixSwitch.Root
        ref={ref}
        checked={value}
        defaultChecked={defaultValue}
        className={cn([styles.root, styles[size]])}
        onCheckedChange={onChange}
        aria-label={ariaLabel}
        data-test-id={dataTestId}
        {...props}
    >
        <RadixSwitch.Thumb className={styles.thumb} />
    </RadixSwitch.Root>
);

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(SwitchComponent);
Switch.displayName = 'Switch';
