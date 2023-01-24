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

export type CheckboxProps = {
    id?: string;
    state?: CheckboxState;
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
                />
                <span
                    aria-hidden="true"
                    className={merge([
                        'tw-relative tw-flex tw-w-4 tw-h-4 tw-items-center tw-justify-center tw-rounded tw-border tw-shrink-0 tw-flex-none',
                        showFocus ? FOCUS_STYLE : '',
                        disabled
                            ? merge([
                                  'tw-text-white tw-pointer-events-none',
                                  !isCheckedOrMixed(state) &&
                                      'tw-border-black-20 tw-bg-white dark:tw-border-black-80 dark:tw-bg-black-90',
                                  isCheckedOrMixed(state) &&
                                      'tw-border-black-40 tw-bg-black-40 dark:tw-border-black-60 dark:tw-bg-black-60',
                              ])
                            : merge([
                                  !isCheckedOrMixed(state) &&
                                      'tw-border-black-80 tw-bg-white hover:tw-border-black dark:tw-border-white dark:tw-bg-black dark:hover:tw-border-black-20 dark:hover:tw-bg-black-90 group-hover:tw-bg-white group-hover:tw-border-black dark:group-hover:tw-border-black-20 dark:group-hover:tw-bg-black-90',
                                  isCheckedOrMixed(state) &&
                                      'tw-border-violet-60 tw-bg-violet-60 tw-text-white hover:tw-border-violet-70 hover:tw-bg-violet-70 dark:tw-border-violet-50 dark:tw-bg-violet-50 dark:hover:tw-border-violet-60 dark:hover:tw-bg-violet-60 group-hover:tw-text-white group-hover:tw-border-violet-70 group-hover:tw-bg-violet-70 dark:group-hover:tw-border-violet-60 dark:group-hover:tw-bg-violet-60',
                              ]),
                    ])}
                >
                    {state === CheckboxState.Checked && <IconCheckMark />}
                    {state === CheckboxState.Mixed && <IconMinus />}
                </span>
                {label && (
                    <InputLabel
                        disabled={disabled}
                        clickable
                        htmlFor={id}
                        tooltip={tooltip ?? undefined}
                        required={required}
                        bold={isCheckedOrMixed(state)}
                    >
                        {label}
                    </InputLabel>
                )}
            </label>
            {note && <span className="tw-text-black-60 tw-font-sans tw-text-xs tw-font-normal">{note}</span>}
        </div>
    );
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(CheckboxComponent);
