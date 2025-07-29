/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCheckbox } from '@react-aria/checkbox';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { useToggleState } from '@react-stately/toggle';
import {
    forwardRef,
    useCallback,
    useEffect,
    useRef,
    useState,
    type ForwardRefRenderFunction,
    type HTMLAttributes,
    type ReactNode,
} from 'react';

import { InputLabel, type InputLabelTooltipProps } from '@components/InputLabel/InputLabel';
import IconCheckMark from '@foundation/Icon/Generated/IconCheckMark';
import IconMinus from '@foundation/Icon/Generated/IconMinus';
import { IconSize } from '@foundation/Icon/IconSize';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import { useForwardedRef } from '@utilities/useForwardedRef';

/**
 * @deprecated Use `Checkbox` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#checkbox the migration guide}.
 */
export enum CheckboxState {
    Checked = 'Checked',
    Unchecked = 'Unchecked',
    Mixed = 'Mixed',
}

/**
 * @deprecated Use `Checkbox` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#checkbox the migration guide}.
 */
export enum CheckboxEmphasis {
    Default = 'Default',
    Weak = 'Weak',
    Strong = 'Strong',
}

/**
 * @deprecated Use `Checkbox` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#checkbox the migration guide}.
 */
export enum CheckboxSize {
    Default = 'Default',
    Large = 'Large',
    XLarge = 'XLarge',
}

/**
 * @deprecated Use `Checkbox` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#checkbox the migration guide}.
 */
export type CheckboxProps = {
    id?: string;
    state?: CheckboxState;
    emphasis?: CheckboxEmphasis;
    size?: CheckboxSize;
    disabled?: boolean;
    required?: boolean;
    value?: string;
    onChange?: (isChecked: boolean) => void;
    label?: string;
    hideLabel?: boolean;
    tooltip?: InputLabelTooltipProps;
    helperText?: string;
    'aria-label'?: string;
    groupInputProps?: HTMLAttributes<HTMLElement>;
    'data-test-id'?: string;
};

const isCheckedOrMixed = (checked: CheckboxState): boolean => {
    return checked === CheckboxState.Checked || checked === CheckboxState.Mixed;
};

const emphasisDefaultClasses =
    'tw-bg-box-selected-strong tw-text-box-selected-strong-inverse hover:tw-bg-box-selected-strong-hover';

const emphasisCheckedClassesMap: Record<CheckboxEmphasis, string> = {
    [CheckboxEmphasis.Weak]:
        'tw-bg-box-neutral-strong tw-text-box-neutral-strong-inverse hover:tw-bg-box-neutral-strong-hover',
    [CheckboxEmphasis.Default]: emphasisDefaultClasses,
    [CheckboxEmphasis.Strong]: emphasisDefaultClasses,
};

const sizeClassesMap: Record<CheckboxSize, string> = {
    [CheckboxSize.Default]: 'tw-h-4 tw-w-4',
    [CheckboxSize.Large]: 'tw-h-5 tw-w-5',
    [CheckboxSize.XLarge]: 'tw-h-8 tw-w-8',
};

const CheckboxComponent: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
    {
        id: propId,
        emphasis = CheckboxEmphasis.Default,
        size = CheckboxSize.Default,
        disabled,
        required,
        label,
        hideLabel,
        tooltip,
        helperText,
        'aria-label': ariaLabel,
        value,
        groupInputProps,
        onChange,
        state = CheckboxState.Unchecked,
        'data-test-id': dataTestId = 'checkbox',
    },
    ref,
) => {
    const id = useMemoizedId(propId);
    const inputRef = useForwardedRef<HTMLInputElement | null>(ref);
    const { focusProps } = useFocusRing();
    const toggleState = useToggleState({
        onChange: disabled ? undefined : onChange,
        isSelected: state === CheckboxState.Checked,
    });
    const [showFocus, setShowFocus] = useState<Nullable<boolean>>();
    const labelContainer = useRef<HTMLSpanElement>(null);
    const helperTextContainer = useRef<HTMLSpanElement>(null);
    const [isLabelOverflowing, setIsLabelOverflowing] = useState(false);
    const [isHelperTextOverflowing, setIsHelperTextOverflowing] = useState(false);

    const tabFocusListener = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
            setShowFocus(true);
        }
    };

    const blurListener = () => {
        setShowFocus(false);
    };

    useEffect(() => {
        inputRef?.current?.addEventListener('keyup', tabFocusListener);
        inputRef?.current?.addEventListener('blur', blurListener);

        return () => {
            inputRef?.current?.removeEventListener('keyup', tabFocusListener);
            inputRef?.current?.removeEventListener('blur', blurListener);
        };
    }, []);

    const { inputProps } = useCheckbox(
        {
            isDisabled: disabled,
            isRequired: required,
            isIndeterminate: state === CheckboxState.Mixed,
            'aria-label': ariaLabel,
            value,
        },
        toggleState,
        inputRef,
    );

    const stateMap: Record<CheckboxState, ReactNode> = {
        [CheckboxState.Checked]: (
            <IconCheckMark size={size === CheckboxSize.XLarge ? IconSize.Size24 : IconSize.Size16} />
        ),
        [CheckboxState.Mixed]: <IconMinus />,
        [CheckboxState.Unchecked]: null,
    };

    const checkedOrMixed = isCheckedOrMixed(state);

    const disabledClasses = merge([
        'tw-bg-box-disabled tw-pointer-events-none tw-text-box-disabled-inverse tw-border-line-strong',
        checkedOrMixed && 'tw-text-box-disabled-inverse tw-border-line-strong',
    ]);

    const enabledClasses = checkedOrMixed
        ? emphasisCheckedClassesMap[emphasis]
        : merge([
              'tw-bg-base hover:tw-bg-box-neutral',
              emphasis === CheckboxEmphasis.Strong
                  ? 'tw-border-2 tw-border-box-selected-strong'
                  : 'tw-border tw-border-line-xx-strong',
          ]);

    const checkOverflowing = useCallback(() => {
        if (labelContainer.current) {
            setIsLabelOverflowing(labelContainer.current?.scrollWidth > labelContainer.current?.clientWidth);
        }

        if (helperTextContainer.current) {
            setIsHelperTextOverflowing(
                helperTextContainer.current?.scrollWidth > helperTextContainer.current?.clientWidth,
            );
        }
    }, [labelContainer, helperTextContainer]);

    useEffect(() => {
        if ((!label && !helperText) || hideLabel) {
            return;
        }
        checkOverflowing();

        window.removeEventListener('resize', checkOverflowing);
        window.addEventListener('resize', checkOverflowing);

        return () => {
            window.removeEventListener('resize', checkOverflowing);
        };
    }, [label, helperText, hideLabel, checkOverflowing]);

    return (
        <div className="tw-gap-1 tw-transition-colors tw-w-full" data-test-id={dataTestId}>
            <div className={merge(['tw-inline-flex tw-flex-row tw-rounded tw-w-full', showFocus ? FOCUS_STYLE : ''])}>
                <InputLabel
                    id={`${id}-label`}
                    disabled={disabled}
                    clickable
                    htmlFor={id}
                    tooltip={tooltip}
                    required={required}
                    bold={checkedOrMixed}
                >
                    <span className="tw-flex tw-items-center tw-whitespace-nowrap">
                        <span className="tw-inline-flex">
                            <input
                                {...mergeProps(groupInputProps || inputProps, focusProps)}
                                id={id}
                                ref={inputRef}
                                className="tw-sr-only"
                                data-test-id={`${dataTestId}-input`}
                                role="checkbox"
                                aria-checked={state === CheckboxState.Checked}
                                required={required}
                                aria-label={ariaLabel}
                                aria-labelledby={label ? `${id}-label` : undefined}
                            />
                            <span
                                data-test-id={`${dataTestId}-icon-box`}
                                aria-hidden="true"
                                className={merge([
                                    'tw-leading-3 tw-relative tw-flex tw-items-center tw-justify-center tw-rounded tw-shrink-0 tw-flex-none',
                                    sizeClassesMap[size],
                                    disabled ? disabledClasses : enabledClasses,
                                ])}
                            >
                                {stateMap[state]}
                            </span>
                        </span>
                        {!hideLabel && (
                            <span className="tw-inline-flex tw-flex-col tw-min-w-0 tw-ml-1.5">
                                {label && (
                                    <span
                                        ref={labelContainer}
                                        data-test-id={`${dataTestId}-label`}
                                        className={merge([
                                            'tw-text-ellipsis tw-overflow-hidden',
                                            'tw-text-xs tw-select-none hover:tw-cursor-pointer hover:tw-text-black dark:hover:tw-text-white group-hover:tw-text-black dark:group-hover:tw-text-white',
                                            checkedOrMixed && 'tw-font-medium',
                                        ])}
                                        title={isLabelOverflowing ? label : undefined}
                                    >
                                        {label}
                                    </span>
                                )}
                                {helperText && (
                                    <span
                                        ref={helperTextContainer}
                                        data-test-id={`${dataTestId}-helper-text`}
                                        className={merge([
                                            'tw-text-ellipsis tw-overflow-hidden',
                                            'tw-font-sans tw-text-xs tw-font-normal',
                                            disabled ? 'text-disabled' : 'tw-text-text-weak',
                                        ])}
                                        title={isHelperTextOverflowing ? helperText : undefined}
                                    >
                                        {helperText}
                                    </span>
                                )}
                            </span>
                        )}
                    </span>
                </InputLabel>
            </div>
        </div>
    );
};

/**
 * @deprecated Use `Checkbox` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#checkbox the migration guide}.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(CheckboxComponent);
Checkbox.displayName = 'FondueCheckbox';
