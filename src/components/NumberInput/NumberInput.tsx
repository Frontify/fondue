/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useCallback, useEffect, useRef } from 'react';
import { NumberInputIncrement, NumberInputProps } from './types';
import { merge } from '@utilities/merge';
import { IconCheckMark16, IconExclamationMarkTriangle16, IconMinus16, IconPlus16 } from '@foundation/Icon';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { FOCUS_WITHIN_STYLE } from '@utilities/focusStyle';
import { Validation, validationClassMap } from '@utilities/validation';
import { KeyboardEvent } from '@react-types/shared';

const INCREMENT_KEYS = ['ArrowUp', 'ArrowRight'];
const DECREMENT_KEYS = ['ArrowDown', 'ArrowLeft'];

export const NumberInput = ({
    id: propId,
    size,
    disabled = false,
    required,
    readOnly,
    status = Validation.Default,
    decorator,
    incrementable,
    placeholder,
    stepInterval = 10,
    title,
    onChange,
    onKeyDown,
    onBlur,
    onFocus,
    'aria-label': ariaLabel,
    'data-test-id': dataTestId = 'fondue-number-input',
    ...props
}: NumberInputProps) => {
    const inputElement = useRef<HTMLInputElement | null>(null);
    const timer = useRef<number>(0);

    const handleOnChange = useCallback(
        (value: string) => {
            onChange?.(Number(value));
        },
        [onChange],
    );

    const handleCount = (type: NumberInputIncrement, changeValue = 1, isShift?: boolean, toParent?: boolean) => {
        const value = inputElement.current?.value;
        const getNewInputValue = () => {
            const currentValue = Number(value) || 0;
            changeValue = isShift ? stepInterval : changeValue;
            switch (type) {
                case NumberInputIncrement.DECREMENT:
                    return currentValue - changeValue;
                case NumberInputIncrement.INCREMENT:
                    return currentValue + changeValue;
                default:
                    return currentValue;
            }
        };
        if (inputElement.current) {
            const newValue = getNewInputValue();
            inputElement.current.value = newValue.toString();
            if (toParent) {
                handleOnChange(inputElement.current.value);
            }
        }
    };

    const onHoldCount = (type: NumberInputIncrement) => {
        const getNewInputValue = () => {
            let elapsedSeconds = 0;
            let changeValue = 0;
            timer.current = window.setInterval(() => {
                switch (true) {
                    case elapsedSeconds > 2000:
                        changeValue += 5;
                        break;
                    case elapsedSeconds > 5000:
                        changeValue += 10;
                        break;
                    default:
                        changeValue = 1;
                }

                handleCount(type, changeValue);
                elapsedSeconds += 250;
            }, 250);
        };
        getNewInputValue();
    };

    const startIncrement = (type: NumberInputIncrement) => {
        if (inputElement.current && !disabled) {
            onHoldCount(type);
        }
    };

    const stopIncrement = () => {
        clearInterval(timer.current);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        const { key, shiftKey } = event;
        if (key === 'Backspace' || !isNaN(Number(key))) {
            return;
        }

        event.preventDefault();

        switch (true) {
            case DECREMENT_KEYS.includes(key):
                handleCount(NumberInputIncrement.DECREMENT, 1, shiftKey);
                break;

            case INCREMENT_KEYS.includes(key):
                handleCount(NumberInputIncrement.INCREMENT, 1, shiftKey);
                break;
            default:
                break;
        }

        if (onKeyDown) {
            onKeyDown(event);
        }
    };

    const handleKeyUp = () => {
        if (inputElement.current) {
            handleOnChange(inputElement.current.value);
        }
    };

    const getStatusIcon = (status: Validation) => {
        switch (status) {
            case Validation.Success:
                return (
                    <span className={validationClassMap[status]} data-test-id={`${dataTestId}-status-icon`}>
                        <IconCheckMark16 />
                    </span>
                );
            case Validation.Error:
                return (
                    <span className={validationClassMap[status]} data-test-id={`${dataTestId}-status-icon`}>
                        <IconExclamationMarkTriangle16 />
                    </span>
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        clearInterval(timer.current);
    }, []);

    return (
        <div
            className={merge([
                'tw-flex tw-items-center tw-h-9 tw-gap-2 tw-px-3 tw-transition tw-text-s tw-font-sans tw-relative tw-bg-white dark:tw-bg-transparent tw-border tw-rounded tw-line-strong hover:tw-line-x-strong focus-within:tw-line-xx-strong',
                FOCUS_WITHIN_STYLE,
                status ? validationClassMap[status] : '',
            ])}
            data-test-id={dataTestId}
        >
            {decorator ? (
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
                name={dataTestId}
                type="number"
                placeholder={placeholder}
                className={merge([
                    'tw-w-full tw-grow tw-border-none tw-outline-none tw-bg-transparent tw-hide-input-arrows',
                    disabled || readOnly
                        ? 'tw-text-black-40 tw-placeholder-black-30 dark:tw-text-black-30 dark:tw-placeholder-black-40'
                        : 'tw-text-black tw-placeholder-black-60 dark:tw-text-white',
                ])}
                onClick={() => inputElement.current?.focus()}
                onChange={(event) => handleOnChange(event.currentTarget.value)}
                onBlur={onBlur}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                required={required}
                readOnly={readOnly}
                disabled={disabled}
                onFocus={onFocus}
                size={size}
                aria-label={ariaLabel}
                title={title}
                data-test-id={`${dataTestId}-input`}
            />
            {incrementable ? (
                <>
                    <button
                        type="button"
                        onClick={(event) => handleCount(NumberInputIncrement.DECREMENT, 1, event.shiftKey, true)}
                        onMouseDown={(event) =>
                            event.shiftKey ? null : startIncrement(NumberInputIncrement.DECREMENT)
                        }
                        onMouseUp={stopIncrement}
                        onTouchStart={(event) =>
                            event.shiftKey ? null : startIncrement(NumberInputIncrement.DECREMENT)
                        }
                        onTouchEnd={stopIncrement}
                        aria-label="Decrement value"
                        title="Decrement value"
                        data-test-id={`${dataTestId}-decrement`}
                    >
                        <IconMinus16 />
                    </button>
                    <button
                        type="button"
                        onClick={(event) => handleCount(NumberInputIncrement.INCREMENT, 1, event.shiftKey, true)}
                        onMouseDown={(event) =>
                            event.shiftKey ? null : startIncrement(NumberInputIncrement.INCREMENT)
                        }
                        onMouseUp={stopIncrement}
                        onTouchStart={(event) =>
                            event.shiftKey ? null : startIncrement(NumberInputIncrement.INCREMENT)
                        }
                        onTouchEnd={stopIncrement}
                        aria-label="Increment value"
                        title="Increment value"
                        data-test-id={`${dataTestId}-increment`}
                    >
                        <IconPlus16 />
                    </button>
                </>
            ) : null}

            {status ? getStatusIcon(status) : null}
        </div>
    );
};

NumberInput.displayName = 'FondueNumberInput';
