/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark, IconMinus } from '@foundation/Icon/Generated';
import { InputLabel, InputLabelTooltipProps } from '@components/InputLabel/InputLabel';
import React, { ForwardRefRenderFunction, HTMLAttributes, ReactNode, forwardRef, useEffect, useState } from 'react';

import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import { mergeProps } from '@react-aria/utils';
import { useCheckbox } from '@react-aria/checkbox';
import { useFocusRing } from '@react-aria/focus';
import { useForwardedRef } from '@utilities/useForwardedRef';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { useToggleState } from '@react-stately/toggle';

export enum CheckboxState {
    Checked = 'Checked',
    Unchecked = 'Unchecked',
    Mixed = 'Mixed',
}

export enum CheckboxEmphasis {
    Default = 'Default',
    Weak = 'Weak',
    Strong = 'Strong',
}

export enum CheckboxSize {
    Default = 'Default',
    Large = 'Large',
    XLarge = 'XLarge',
}

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
};

const isCheckedOrMixed = (checked: CheckboxState): boolean => {
    return checked === CheckboxState.Checked || checked === CheckboxState.Mixed;
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
        'aria-label': ariaLabel = 'Checkbox',
        value,
        groupInputProps,
        onChange,
        state = CheckboxState.Unchecked,
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
    const [listeningForKeyboardEvents, setListeningForKeyboardEvents] = useState<Nullable<boolean>>();

    const tabFocusListener = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
            setShowFocus(true);
        }
    };

    const blurListener = () => {
        setShowFocus(false);
    };

    useEffect(() => {
        if (!listeningForKeyboardEvents) {
            inputRef?.current?.removeEventListener('keyup', tabFocusListener);
            inputRef?.current?.addEventListener('keyup', tabFocusListener);
            inputRef?.current?.removeEventListener('blur', blurListener);
            inputRef?.current?.addEventListener('blur', blurListener);

            setListeningForKeyboardEvents(true);
        }
    }, [listeningForKeyboardEvents, inputRef]);

    const { inputProps } = useCheckbox(
        {
            isDisabled: disabled,
            isRequired: required,
            isIndeterminate: state === CheckboxState.Mixed,
            'aria-label': ariaLabel || label,
            value,
        },
        toggleState,
        inputRef,
    );

    const sizeClassesMap: Record<CheckboxSize, string> = {
        [CheckboxSize.Default]: 'tw-h-4 tw-w-4',
        [CheckboxSize.Large]: 'tw-h-5 tw-w-5',
        [CheckboxSize.XLarge]: 'tw-h-8 tw-w-8',
    };

    const stateMap: Record<CheckboxState, ReactNode> = {
        [CheckboxState.Checked]: <IconCheckMark />,
        [CheckboxState.Mixed]: <IconMinus />,
        [CheckboxState.Unchecked]: null,
    };

    const checkedOrMixed = isCheckedOrMixed(state);

    const disabledClasses = merge([
        'tw-bg-box-disabled tw-pointer-events-none',
        !checkedOrMixed && 'tw-bg-box-disabled tw-text-box-disabled-inverse tw-border-line-strong',
        checkedOrMixed && 'tw-bg-box-disabled tw-text-box-disabled-inverse tw-border-line-strong',
    ]);

    const enabledClasses = merge([
        !checkedOrMixed && 'tw-bg-base hover:tw-bg-box-neutral',
        !checkedOrMixed && emphasis !== CheckboxEmphasis.Strong && 'tw-border tw-border-line-xx-strong',
        !checkedOrMixed && emphasis === CheckboxEmphasis.Strong && 'tw-border-2 tw-border-box-selected-strong',
        checkedOrMixed &&
            emphasis === CheckboxEmphasis.Weak &&
            'tw-bg-box-neutral-strong tw-text-box-neutral-strong-inverse hover:tw-bg-box-neutral-strong-hover',
        checkedOrMixed &&
            emphasis === CheckboxEmphasis.Default &&
            'tw-bg-box-selected-strong tw-text-box-selected-strong-inverse hover:tw-bg-box-selected-strong-hover',
        checkedOrMixed &&
            emphasis === CheckboxEmphasis.Strong &&
            'tw-bg-box-selected-strong tw-text-box-selected-strong-inverse hover:tw-bg-box-selected-strong-hover',
    ]);

    return (
        <div className="tw-gap-1 tw-transition-colors" data-test-id="checkbox">
            <div className={merge(['tw-inline-flex tw-flex-row tw-rounded', showFocus ? FOCUS_STYLE : ''])}>
                <InputLabel
                    disabled={disabled}
                    clickable
                    htmlFor={id}
                    tooltip={tooltip ?? undefined}
                    required={required}
                    bold={checkedOrMixed}
                >
                    <span className="tw-flex tw-items-center">
                        <span className="tw-inline-flex tw-mr-1.5">
                            <input
                                {...mergeProps(groupInputProps || inputProps, focusProps)}
                                id={id}
                                ref={inputRef}
                                className="tw-sr-only"
                                data-test-id="checkbox-input"
                                aria-label={ariaLabel}
                                role="checkbox"
                                aria-checked={state === CheckboxState.Checked ? true : false}
                                required={required}
                            />
                            <span
                                data-test-id="checkbox-icon-box"
                                aria-hidden="true"
                                className={merge([
                                    'tw-leading-3 tw-p-2 tw-relative tw-flex tw-items-center tw-justify-center tw-rounded tw-shrink-0 tw-flex-none',
                                    sizeClassesMap[size],
                                    disabled ? disabledClasses : enabledClasses,
                                ])}
                            >
                                {stateMap[state]}
                            </span>
                        </span>
                        <span className="tw-inline-flex tw-flex-col">
                            {label && !hideLabel && (
                                <span
                                    data-test-id="checkbox-label"
                                    className={merge([
                                        'tw-text-xs tw-select-none hover:tw-cursor-pointer hover:tw-text-black dark:hover:tw-text-white group-hover:tw-text-black dark:group-hover:tw-text-white',
                                        checkedOrMixed ? 'tw-font-medium' : '',
                                    ])}
                                >
                                    {label}
                                </span>
                            )}
                            {helperText && !hideLabel && (
                                <span
                                    data-test-id="checkbox-helper-text"
                                    className={merge([
                                        'tw-font-sans tw-text-xs tw-font-normal',
                                        disabled ? 'text-disabled' : 'tw-text-text-weak',
                                    ])}
                                >
                                    {helperText}
                                </span>
                            )}
                        </span>
                    </span>
                </InputLabel>
            </div>
        </div>
    );
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(CheckboxComponent);
Checkbox.displayName = 'FondueCheckbox';
