/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadioGroupPrimitve from '@radix-ui/react-radio-group';
import { type ReactNode } from 'react';

import { useFondueTheme } from '#/components/ThemeProvider/ThemeProvider';

import styles from './styles/radiolist.module.scss';

type RadioListRootProps = {
    /**
     * Merge props onto the child element instead of rendering a wrapper.
     * @default false
     */
    asChild?: boolean;
    /**
     * Should contain `RadioList.RadioButton` components paired with labels.
     */
    children?: ReactNode;
    className?: string;
    /**
     * Prevents interaction with all radio buttons in the group.
     * @default false
     */
    disabled?: boolean;
    /**
     * Controls the visual style. `'default'` for standard radio buttons, `'highlight'` for a more prominent selected state.
     * @default "default"
     */
    emphasis?: 'default' | 'highlight';
    /**
     * Callback fired when the selected value changes.
     * @param value - The value of the newly selected radio button
     */
    onValueChange?: (value: string) => void;
    /**
     * Controls the layout direction. `'vertical'` stacks options top-to-bottom, `'horizontal'` places them side by side.
     */
    orientation?: 'vertical' | 'horizontal';
    /**
     * When `true`, the radio group is visually interactive but cannot be changed. Useful for displaying a locked selection.
     * @default false
     */
    readOnly?: boolean;
    /**
     * Marks the radio group as required in a form context.
     * @default false
     */
    required?: boolean;
    /**
     * The controlled selected value. Use together with `onValueChange`.
     */
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
            className={[className, asChild ? undefined : styles.root].filter(Boolean).join(' ')}
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
            className={styles.item}
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

/**
 * A group of mutually exclusive radio options — only one can be selected at a time.
 * Use `RadioList.Root` as the container and `RadioList.RadioButton` for each option.
 */
export const RadioList = {
    Root: RadioListRoot,
    RadioButton: RadioListRadioButton,
};
