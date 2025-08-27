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
    required?: boolean;
    value?: string;
};
const RadioListRoot = ({
    asChild,
    children,
    className,
    disabled,
    emphasis = 'default',
    required,
    value,
}: RadioListRootProps) => {
    return (
        <RadioGroupPrimitve.Root
            asChild={asChild}
            className={className}
            data-emphasis={emphasis}
            disabled={disabled}
            required={required}
            value={value}
        >
            {children}
        </RadioGroupPrimitve.Root>
    );
};
RadioListRoot.displayName = 'RadioList.Root';

type RadioListRadioButtonProps = {
    id: string;
    value: string;
};
const RadioListRadioButton = ({ value, id }: RadioListRadioButtonProps) => {
    return (
        <RadioGroupPrimitve.Item id={id} className={`tw-peer ${styles.item}`} value={value}>
            <RadioGroupPrimitve.Indicator className={styles.indicator} />
        </RadioGroupPrimitve.Item>
    );
};
RadioListRadioButton.displayName = 'RadioList.RadioButton';

export const RadioList = {
    Root: RadioListRoot,
    RadioButton: RadioListRadioButton,
};
