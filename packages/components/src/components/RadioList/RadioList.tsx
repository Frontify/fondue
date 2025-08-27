/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadioGroupPrimitve from '@radix-ui/react-radio-group';
import { type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

import styles from './styles/radiolist.module.scss';

type RadioListRootProps = {
    asChild?: boolean;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
    emphasis?: 'default' | 'highlight';
    onValueChange?: (value: string) => void;
    orientation?: 'vertical' | 'horizontal';
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
    orientation,
    required,
    value,
}: RadioListRootProps) => {
    return (
        <RadioGroupPrimitve.Root
            asChild={asChild}
            className={cn([className, asChild ? undefined : styles.root])}
            data-emphasis={emphasis}
            disabled={disabled}
            onValueChange={onValueChange}
            orientation={orientation}
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
