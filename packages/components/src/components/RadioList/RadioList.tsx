/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark } from '@frontify/fondue-icons';
import * as RadioGroupPrimitve from '@radix-ui/react-radio-group';
import { createContext, forwardRef, type ForwardedRef, type ReactNode, useContext } from 'react';

import { useFondueTheme } from '#/components/ThemeProvider/ThemeProvider';
import { type OptionalCommonAriaAttrs } from '#/utilities/types';

import styles from './styles/radiolist.module.scss';

type RadioListVariant = 'default' | 'pill';

const RadioListVariantContext = createContext<RadioListVariant>('default');
RadioListVariantContext.displayName = 'RadioListVariantContext';

export type RadioListRootProps = {
    asChild?: boolean;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
    emphasis?: 'default' | 'highlight';
    id?: string;
    onValueChange?: (value: string) => void;
    orientation?: 'vertical' | 'horizontal';
    readOnly?: boolean;
    required?: boolean;
    value?: string;
    /**
     * The visual style of the radio buttons. With `pill`, each radio button renders its children inside a pill
     * and shows a checkmark when selected, so no separate `Label` is needed.
     * @default 'default'
     */
    variant?: RadioListVariant;
    'data-test-id'?: string;
} & OptionalCommonAriaAttrs;
export const RadioListRoot = ({
    asChild,
    children,
    className,
    disabled,
    emphasis = 'default',
    id,
    onValueChange,
    orientation,
    readOnly,
    required,
    value,
    variant = 'default',
    'data-test-id': dataTestId,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
}: RadioListRootProps) => {
    const { dir } = useFondueTheme();

    return (
        <RadioListVariantContext.Provider value={variant}>
            <RadioGroupPrimitve.Root
                aria-describedby={ariaDescribedby}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledby}
                aria-readonly={readOnly}
                asChild={asChild}
                className={[className, asChild ? undefined : styles.root].filter(Boolean).join(' ')}
                data-emphasis={emphasis}
                data-readonly={readOnly}
                data-test-id={dataTestId}
                data-variant={variant}
                dir={dir}
                disabled={disabled}
                id={id}
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
        </RadioListVariantContext.Provider>
    );
};
RadioListRoot.displayName = 'RadioList.Root';

type RadioListRadioButtonProps = {
    disabled?: boolean;
    /**
     * Required with the `default` variant, where a `Label` points at the radio button through `htmlFor`.
     */
    id?: string;
    value: string;
    readOnly?: boolean;
    /**
     * The content of the pill. Only rendered with the `pill` variant.
     */
    children?: ReactNode;
    'data-test-id'?: string;
} & Omit<React.ComponentProps<typeof RadioGroupPrimitve.Item>, 'children'>;

const RadioListRadioButton = (
    { readOnly, disabled, value, id, children, 'data-test-id': dataTestId, ...restProps }: RadioListRadioButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    const variant = useContext(RadioListVariantContext);
    const isPill = variant === 'pill';

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
            className={isPill ? styles.pill : styles.item}
            data-readonly={readOnly}
            data-test-id={dataTestId}
            disabled={disabled}
            id={id}
            value={value}
            {...restProps}
            ref={ref}
        >
            {isPill ? (
                <>
                    <RadioGroupPrimitve.Indicator className={styles.pillIndicator}>
                        <IconCheckMark size={16} />
                    </RadioGroupPrimitve.Indicator>
                    {children}
                </>
            ) : (
                <RadioGroupPrimitve.Indicator className={styles.indicator} />
            )}
        </RadioGroupPrimitve.Item>
    );
};
RadioListRadioButton.displayName = 'RadioList.RadioButton';

type RadioListCountProps = {
    children: ReactNode;
};

const RadioListCount = ({ children }: RadioListCountProps) => <span className={styles.pillCount}>{children}</span>;
RadioListCount.displayName = 'RadioList.Count';

export const RadioList = {
    Root: RadioListRoot,
    RadioButton: forwardRef(RadioListRadioButton),
    Count: RadioListCount,
};
