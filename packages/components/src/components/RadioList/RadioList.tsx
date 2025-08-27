/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadioGroupPrimitve from '@radix-ui/react-radio-group';
import { type ReactNode } from 'react';

import styles from './styles/radiolist.module.scss';

type RadioListRootProps = {
    asChild?: boolean;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
    emphasis?: 'default' | 'highlight';
    onValueChange?: (value: string) => void;
    required?: boolean;
    value?: string;
};
const RadioListRoot = ({
    asChild,
    children,
    className,
    disabled,
    emphasis = 'default',
    onValueChange,
    required,
    value,
}: RadioListRootProps) => {
    return (
        <RadioGroupPrimitve.Root
            asChild={asChild}
            className={className}
            data-emphasis={emphasis}
            disabled={disabled}
            onValueChange={onValueChange}
            required={required}
            value={value}
        >
            {children}
        </RadioGroupPrimitve.Root>
    );
};
RadioListRoot.displayName = 'RadioList.Root';

type RadioListRadioButtonProps = {
    disabled?: boolean;
    id: string;
    value: string;
};
const RadioListRadioButton = ({ disabled, value, id }: RadioListRadioButtonProps) => {
    return (
        <RadioGroupPrimitve.Item id={id} className={`tw-peer ${styles.item}`} value={value} disabled={disabled}>
            <RadioGroupPrimitve.Indicator className={styles.indicator} />
        </RadioGroupPrimitve.Item>
    );
};
RadioListRadioButton.displayName = 'RadioList.RadioButton';

export const RadioList = {
    Root: RadioListRoot,
    RadioButton: RadioListRadioButton,
};
