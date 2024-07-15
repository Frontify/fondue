/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixSwitch from '@radix-ui/react-switch';
import { type FC } from 'react';

import { Label } from '../Label/Label';

import styles from './styles/switch.module.scss';

type SwitchProps = {
    id?: string;
    label?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    required?: boolean;
    onChange?: (checked: boolean) => void;
    'aria-label': string;
    'data-test-id'?: string;
};

export const Switch: FC<SwitchProps> = ({
    id = 'fondue-switch',
    label,
    checked,
    defaultChecked,
    disabled,
    required,
    onChange,
    'data-test-id': dataTestId = 'fondue-switch',
    'aria-label': ariaLabel = 'Switch',
}) => {
    return (
        <div className={styles.root} data-test-id={dataTestId}>
            {label && (
                <Label className={styles.label} htmlFor={id}>
                    {label}
                </Label>
            )}
            <RadixSwitch.Root
                id="airplane-mode"
                className={styles.switch}
                checked={checked}
                defaultChecked={defaultChecked}
                disabled={disabled}
                required={required}
                onCheckedChange={onChange}
                aria-label={ariaLabel}
            >
                <RadixSwitch.Thumb className={styles.thumb} />
            </RadixSwitch.Root>
        </div>
    );
};
