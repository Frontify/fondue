/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixSwitch from '@radix-ui/react-switch';
import { type FormEvent, type ForwardedRef, forwardRef } from 'react';

import { useTranslation } from '#/hooks/useTranslation';
import { type CommonAriaAttrs } from '#/utilities/types';

import styles from './styles/switch.module.scss';

type SwitchProps = {
    id?: string;
    name?: string;
    /**
     * Controls the switch size. `'small'` for tight spaces, `'medium'` for most layouts, `'large'` for prominent toggles.
     * @default "medium"
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * The controlled checked state of the switch. Use together with `onChange` for controlled usage.
     * @default false
     */
    value?: boolean;
    /**
     * The initial checked state for uncontrolled usage.
     * @default false
     */
    defaultValue?: boolean;
    /**
     * Prevents interaction and dims the switch visually.
     * @default false
     */
    disabled?: boolean;
    /**
     * Marks the switch as required in a form context.
     * @default false
     */
    required?: boolean;
    /**
     * Callback fired when the switch is toggled.
     * @param checked - The new checked state
     */
    onChange?: (checked: boolean) => void;
    /**
     * Event handler called when the switch loses focus.
     */
    onBlur?: (event: FormEvent<HTMLButtonElement>) => void;
    /**
     * Event handler called when the switch receives focus.
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
        'aria-label': ariaLabel,
        ...props
    }: SwitchProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    const { t } = useTranslation();

    return (
        <RadixSwitch.Root
            ref={ref}
            checked={value}
            defaultChecked={defaultValue}
            className={styles.root}
            onCheckedChange={onChange}
            aria-label={ariaLabel ?? t('Switch_defaultLabel')}
            data-test-id={dataTestId}
            data-size={size}
            {...props}
        >
            <RadixSwitch.Thumb className={styles.thumb} />
        </RadixSwitch.Root>
    );
};

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(SwitchComponent);
Switch.displayName = 'Switch';
