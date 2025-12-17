/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadioGroupPrimitve from '@radix-ui/react-radio-group';
import { type ReactNode } from 'react';

import { useFondueTheme } from '#/components/ThemeProvider/ThemeProvider';
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
    readOnly?: boolean;
    required?: boolean;
    value?: string;
    'data-test-id'?: string;
};
export const RadioListRoot = ({
    asChild,
    children,
    className,
    disabled,
    emphasis = 'default',
    onValueChange,
    orientation,
    readOnly,
    required,
    value,
    'data-test-id': dataTestId,
}: RadioListRootProps) => {
    const { dir } = useFondueTheme();

    return (
        <RadioGroupPrimitve.Root
            aria-readonly={readOnly}
            asChild={asChild}
            className={cn([className, asChild ? undefined : styles.root])}
            data-emphasis={emphasis}
            data-readonly={readOnly}
            data-test-id={dataTestId}
            dir={dir}
            disabled={disabled}
            onValueChange={onValueChange}
            orientation={orientation}
            required={required}
            value={value}
            onFocus={(event) => {
                if (readOnly) {
                    event.preventDefault();
                    event.target.blur();
                    return false;
                }
            }}
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
    readOnly?: boolean;
    'data-test-id'?: string;
} & React.ComponentProps<typeof RadioGroupPrimitve.Item>;

const RadioListRadioButton = ({
    readOnly,
    disabled,
    value,
    id,
    'data-test-id': dataTestId,
    ...restProps
}: RadioListRadioButtonProps) => {
    return (
        <RadioGroupPrimitve.Item
            onFocus={(event) => {
                if (readOnly) {
                    event.preventDefault();
                    event.target.blur();
                    return false;
                }
            }}
            aria-readonly={readOnly}
            className={`tw-peer ${styles.item}`}
            data-readonly={readOnly}
            data-test-id={dataTestId}
            disabled={disabled}
            id={id}
            value={value}
            {...restProps}
        >
            <RadioGroupPrimitve.Indicator className={styles.indicator} />
        </RadioGroupPrimitve.Item>
    );
};
RadioListRadioButton.displayName = 'RadioList.RadioButton';

export const RadioList = {
    Root: RadioListRoot,
    RadioButton: RadioListRadioButton,
};
