/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import IconCheckMark from '@foundation/Icon/Generated/IconCheckMark';
import IconMinus from '@foundation/Icon/Generated/IconMinus';
import { InputLabel, InputLabelTooltipProps } from '@components/InputLabel/InputLabel';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { useCheckbox } from '@react-aria/checkbox';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { useToggleState } from '@react-stately/toggle';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import { useForwardedRef } from '@utilities/useForwardedRef';
import React, { ForwardRefRenderFunction, HTMLAttributes, forwardRef } from 'react';

export enum CheckboxState {
    Checked = 'Checked',
    Unchecked = 'Unchecked',
    Mixed = 'Mixed',
}

export enum CheckboxEmphasis {
    Default = 'Default',
    Weak = 'Weak',
}

export enum CheckboxSize {
    Default = 'Default',
    Large = 'Large',
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

    return (
        <div className="tw-flex tw-flex-col tw-gap-1 tw-transition-colors" data-test-id="checkbox">
            <div className="tw-inline-flex tw-flex-row">
                <InputLabel
                    disabled={disabled}
                    clickable
                    htmlFor={id}
                    tooltip={tooltip ?? undefined}
                    required={required}
                    bold={isCheckedOrMixed(state)}
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
                                required={required}
                            />
                            <span
                                aria-hidden="true"
                                className={merge([
                                    'tw-p-2 tw-leading-4 tw-relative tw-flex tw-items-center tw-justify-center tw-rounded tw-border tw-shrink-0 tw-flex-none',
                                    size === 'Default' ? 'tw-h-4 tw-w-4' : 'tw-h-5 tw-w-5',
                                    showFocus ? FOCUS_STYLE : '',
                                    disabled
                                        ? merge([
                                              'tw-bg-box-disabled tw-pointer-events-none',
                                              !isCheckedOrMixed(state) &&
                                                  'tw-bg-box-disabled tw-text-box-disabled-inverse tw-border-line-strong',
                                              isCheckedOrMixed(state) &&
                                                  'tw-bg-box-disabled tw-text-box-disabled-inverse tw-border-line-strong',
                                          ])
                                        : merge([
                                              !isCheckedOrMixed(state) && 'tw-bg-box-neutral tw-border-line-xx-strong',
                                              isCheckedOrMixed(state) &&
                                                  emphasis === CheckboxEmphasis.Weak &&
                                                  'tw-bg-box-neutral-strong tw-text-box-neutral-strong-inverse hover:tw-bg-box-neutral-strong-hover',
                                              isCheckedOrMixed(state) &&
                                                  emphasis === CheckboxEmphasis.Default &&
                                                  'tw-bg-box-selected-strong tw-text-box-selected-strong-inverse hover:tw-bg-box-selected-strong-hover',
                                          ]),
                                ])}
                            >
                                {state === CheckboxState.Checked && <IconCheckMark />}
                                {state === CheckboxState.Mixed && <IconMinus />}
                            </span>
                        </span>
                        <span className="tw-inline-flex tw-flex-col">
                            {label && (
                                <span
                                    className={merge([
                                        'tw-text-xs tw-select-none hover:tw-cursor-pointer hover:tw-text-black dark:hover:tw-text-white group-hover:tw-text-black dark:group-hover:tw-text-white',
                                        isCheckedOrMixed(state) ? 'tw-font-medium' : '',
                                    ])}
                                >
                                    {label}
                                </span>
                            )}
                            {helperText && (
                                <span
                                    data-test-id="checkbox-note"
                                    className={merge([
                                        'tw-font-sans tw-text-xs tw-font-normal',
                                        disabled ? 'text-disabled' : 'tw-text-text-x-weak',
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
