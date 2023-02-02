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

export type CheckboxProps = {
    id?: string;
    state?: CheckboxState;
    emphasis?: CheckboxEmphasis;
    disabled?: boolean;
    required?: boolean;
    value?: string;
    onChange?: (isChecked: boolean) => void;
    label?: string;
    tooltip?: InputLabelTooltipProps;
    note?: string;
    ariaLabel?: string;
    groupInputProps?: HTMLAttributes<HTMLElement>;
};

const isCheckedOrMixed = (checked: CheckboxState): boolean => {
    return checked === CheckboxState.Checked || checked === CheckboxState.Mixed;
};

const CheckboxComponent: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
    {
        id: propId,
        emphasis = CheckboxEmphasis.Default,
        disabled,
        required,
        label,
        tooltip,
        note,
        ariaLabel,
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
            <label
                className={merge([
                    'tw-group tw-flex tw-items-center tw-gap-2 tw-select-none tw-outline-none',
                    !disabled && 'hover:tw-cursor-pointer',
                ])}
            >
                <input
                    {...mergeProps(groupInputProps || inputProps, focusProps)}
                    id={id}
                    ref={inputRef}
                    className="tw-sr-only"
                    data-test-id="checkbox-input"
                    required={required}
                />
                <span
                    aria-hidden="true"
                    className={merge([
                        'tw-p-2 tw-relative tw-flex tw-w-4 tw-h-4 tw-items-center tw-justify-center tw-rounded tw-border tw-shrink-0 tw-flex-none',
                        showFocus ? FOCUS_STYLE : '',
                        disabled
                            ? merge([
                                  'tw-text-white tw-pointer-events-none',
                                  !isCheckedOrMixed(state) && 'tw-bg-box-disabled-strong-inverse tw-border-line-strong',
                                  isCheckedOrMixed(state) &&
                                      'tw-bg-box-disabled-strong tw-text-box-disabled-strong-inverse',
                              ])
                            : merge([
                                  !isCheckedOrMixed(state) &&
                                      'tw-bg-box-positive-strong-inverse tw-border-line-xx-strong',
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
                <span className="tw-inline-flex tw-flex-col">
                    <span className="tw-inline-flex tw-flex-row">
                        {label && (
                            <InputLabel
                                disabled={disabled}
                                clickable
                                htmlFor={id}
                                tooltip={tooltip ?? undefined}
                                required={required}
                                bold={isCheckedOrMixed(state)}
                            >
                                <span className="tw-text-xs">{label}</span>
                            </InputLabel>
                        )}
                    </span>
                    {note && (
                        <span
                            data-test-id="checkbox-note"
                            className="tw-text-text-weak  tw-font-sans tw-text-xs tw-font-normal"
                        >
                            {note}
                        </span>
                    )}
                </span>
            </label>
        </div>
    );
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(CheckboxComponent);
