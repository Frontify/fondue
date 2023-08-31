/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useRef } from 'react';
import { NumberInputIncrement, NumberInputProps } from './types';
import { merge } from '@utilities/merge';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { useFocusRing } from '@react-aria/focus';
import { InputTypes } from '../../types/inupt';
import { IconExclamationMarkTriangle16, IconMinus16, IconPlus16 } from '@foundation/Icon';
import { HelperText, HelperTextStyle } from '@utilities/input';
import { useMemoizedId } from '@hooks/useMemoizedId';

export const NumberInput = ({
    id: propId,
    size,
    error,
    disabled = false,
    required,
    readOnly,
    errorText,
    decorator,
    incrementable,
    onChange,
    onKeyDown,
    onBlur,
    onFocus,
    ...props
}: NumberInputProps) => {
    const inputEl = useRef<HTMLInputElement | null>(null);
    const dataTestId = propId ? propId : 'fondue-number-input';
    const { isFocusVisible, focusProps } = useFocusRing({ within: true, isTextInput: true });

    const handleOnChange = (value: string) => (onChange ? onChange(value) : null);

    const handleCount = (value: string, type?: NumberInputIncrement) => {
        let newValue = value ? +value : 0;
        switch (type) {
            case NumberInputIncrement.DECREMENT:
                newValue -= 1;
                break;
            case NumberInputIncrement.INCREMENT:
                newValue += 1;
                break;
            default:
                newValue = +value;
        }
        if (inputEl.current) {
            inputEl.current.value = newValue.toString();
            handleOnChange(inputEl.current.value);
        }
    };

    return (
        <div data-test-id={`${dataTestId}-component`}>
            <div
                {...focusProps}
                className={merge([
                    'tw-flex tw-items-center tw-h-9 tw-gap-2 tw-px-3 tw-border tw-transition tw-rounded tw-text-s tw-font-sans tw-relative tw-bg-white dark:tw-bg-transparent',
                    'tw-border-solid',
                    merge(['focus-within:tw-border-black-90 hover:tw-border-black-90', isFocusVisible && FOCUS_STYLE]),
                ])}
            >
                {!!decorator && (
                    <div
                        className={merge([
                            'tw-flex tw-items-center tw-justify-center tw-pl-1',
                            disabled || readOnly ? 'tw-text-black-60' : 'tw-text-black-80',
                        ])}
                        data-test-id={`${dataTestId}-decorator`}
                    >
                        {decorator}
                    </div>
                )}
                <input
                    {...props}
                    id={useMemoizedId(propId)}
                    ref={inputEl}
                    name={'numberInput'}
                    type={InputTypes.Number}
                    className={merge([
                        'tw-w-full tw-grow tw-border-none tw-outline-none tw-bg-transparent tw-hide-input-arrows',
                        disabled || readOnly
                            ? 'tw-text-black-40 tw-placeholder-black-30 dark:tw-text-black-30 dark:tw-placeholder-black-40'
                            : 'tw-text-black tw-placeholder-black-60 dark:tw-text-white',
                    ])}
                    onClick={() => inputEl.current?.focus()}
                    onChange={(e) => handleOnChange(e.currentTarget.value)}
                    data-test-id={`${dataTestId}-input`}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    required={required}
                    readOnly={readOnly}
                    disabled={disabled}
                    onFocus={(e) => (onFocus ? onFocus(e) : null)}
                    size={size}
                />
                {!!incrementable && (
                    <>
                        <button
                            type={InputTypes.Button}
                            onClick={() => {
                                !!inputEl.current && handleCount(inputEl.current.value, NumberInputIncrement.DECREMENT);
                            }}
                            data-test-id={`${dataTestId}-decrement`}
                        >
                            <IconMinus16 />
                        </button>
                        <button
                            type={InputTypes.Button}
                            onClick={() => {
                                !!inputEl.current && handleCount(inputEl.current.value, NumberInputIncrement.INCREMENT);
                            }}
                            data-test-id={`${dataTestId}-increment`}
                        >
                            <IconPlus16 />
                        </button>
                    </>
                )}

                {error && (
                    <span className="tw-text-red-60">
                        <IconExclamationMarkTriangle16 data-test-id={`${dataTestId}-error-icon`} />
                    </span>
                )}
            </div>
            {!!(error && !!errorText) && (
                <HelperText
                    text={errorText}
                    style={HelperTextStyle.Danger}
                    disabled={disabled}
                    data-test-id={`${dataTestId}-error-text`}
                />
            )}
        </div>
    );
};

NumberInput.displayName = 'FondueNumberInput';
