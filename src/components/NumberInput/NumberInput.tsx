/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useRef } from 'react';
import { NumberInputIncrement, NumberInputProps } from './types';
import { merge } from '@utilities/merge';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { useFocusRing } from '@react-aria/focus';
import { IconExclamationMarkTriangle16, IconMinus16, IconPlus16 } from '@foundation/Icon';
import { HelperText, HelperTextStyle } from '@utilities/input';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { InputTypes } from 'src/types/input';

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
    'data-test-id': dataTestId = 'fondue-number-input',
    ...props
}: NumberInputProps) => {
    const inputElement = useRef<HTMLInputElement | null>(null);
    const numberInputType: InputTypes = 'number';
    const buttonInputType: InputTypes = 'button';
    const { isFocusVisible, focusProps } = useFocusRing({ within: true, isTextInput: true });

    const handleOnChange = (value: string) => {
        onChange?.(value);
    };

    const handleCount = (value: string, type?: NumberInputIncrement) => {
        let newValue = Number(value) || 0;
        switch (type) {
            case NumberInputIncrement.DECREMENT:
                newValue -= 1;
                break;
            case NumberInputIncrement.INCREMENT:
                newValue += 1;
                break;
            default:
                newValue = Number(value);
        }
        if (inputElement.current) {
            inputElement.current.value = newValue.toString();
            handleOnChange(inputElement.current.value);
        }
    };

    return (
        <div data-test-id={`${dataTestId}-component`}>
            <div
                {...focusProps}
                className={merge([
                    'tw-flex tw-items-center tw-h-9 tw-gap-2 tw-px-3 tw-border tw-transition tw-rounded tw-text-s tw-font-sans tw-relative tw-bg-white dark:tw-bg-transparent',
                    'tw-border-solid',
                    'focus-within:tw-border-black-90 hover:tw-border-black-90',
                    isFocusVisible && FOCUS_STYLE,
                ])}
            >
                {!!decorator ? (
                    <div
                        className={merge([
                            'tw-flex tw-items-center tw-justify-center tw-pl-1',
                            disabled || readOnly ? 'tw-text-black-60' : 'tw-text-black-80',
                        ])}
                        data-test-id={`${dataTestId}-decorator`}
                    >
                        {decorator}
                    </div>
                ) : null}
                <input
                    {...props}
                    id={useMemoizedId(propId)}
                    ref={inputElement}
                    name="fondue-number-input"
                    type={numberInputType}
                    className={merge([
                        'tw-w-full tw-grow tw-border-none tw-outline-none tw-bg-transparent tw-hide-input-arrows',
                        disabled || readOnly
                            ? 'tw-text-black-40 tw-placeholder-black-30 dark:tw-text-black-30 dark:tw-placeholder-black-40'
                            : 'tw-text-black tw-placeholder-black-60 dark:tw-text-white',
                    ])}
                    onClick={() => inputElement.current?.focus()}
                    onChange={(event) => handleOnChange(event.currentTarget.value)}
                    data-test-id={`${dataTestId}-input`}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    required={required}
                    readOnly={readOnly}
                    disabled={disabled}
                    onFocus={(event) => (onFocus ? onFocus(event) : null)}
                    size={size}
                />
                {!!incrementable ? (
                    <>
                        <button
                            type={buttonInputType}
                            onClick={() => {
                                !!inputElement.current &&
                                    handleCount(inputElement.current.value, NumberInputIncrement.DECREMENT);
                            }}
                            data-test-id={`${dataTestId}-decrement`}
                        >
                            <IconMinus16 />
                        </button>
                        <button
                            type={buttonInputType}
                            onClick={() => {
                                !!inputElement.current &&
                                    handleCount(inputElement.current.value, NumberInputIncrement.INCREMENT);
                            }}
                            data-test-id={`${dataTestId}-increment`}
                        >
                            <IconPlus16 />
                        </button>
                    </>
                ) : null}

                {error ? (
                    <span className="tw-text-red-60">
                        <IconExclamationMarkTriangle16 data-test-id={`${dataTestId}-error-icon`} />
                    </span>
                ) : null}
            </div>
            {error && errorText ? (
                <HelperText
                    text={errorText}
                    style={HelperTextStyle.Danger}
                    disabled={disabled}
                    data-test-id={`${dataTestId}-error-text`}
                />
            ) : null}
        </div>
    );
};

NumberInput.displayName = 'FondueNumberInput';
