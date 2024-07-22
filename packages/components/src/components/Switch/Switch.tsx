/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixSwitch from '@radix-ui/react-switch';
import { ForwardedRef, forwardRef, MouseEventHandler, useState } from 'react';

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
    hugWidth?: boolean;
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
     * The aria label of the select component.
     */
    'aria-label'?: string;
    /**
     * The data test id of the select component.
     */
    'data-test-id'?: string;
};

const SwitchComponent = (
    {
        value,
        defaultValue,
        size = 'medium',
        hugWidth = false,
        onChange,
        'data-test-id': dataTestId = 'fondue-switch',
        'aria-label': ariaLabel = 'Switch',
        ...props
    }: SwitchProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    const [defaultChecked, setDefaultChecked] = useState(defaultValue);

    const isStateIndeterminate = value === undefined && defaultChecked === undefined;

    const rootClasses = [
        styles.root,
        styles[size],
        hugWidth && styles.fullwidth,
        isStateIndeterminate && styles.indeterminate,
    ].join(' ');

    const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        if (isStateIndeterminate) {
            setDefaultChecked(true);
        }
    };

    return (
        <RadixSwitch.Root
            ref={ref}
            checked={value}
            defaultChecked={defaultChecked}
            className={rootClasses}
            onCheckedChange={onChange}
            onClick={onClick}
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
