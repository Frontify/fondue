/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect, useRef, useState } from 'react';
import { NumberInputIncrement, NumberInputProps } from './types';
import { merge } from '@utilities/merge';
import { IconCross16, IconMinus16, IconPlus16 } from '@foundation/Icon';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { Validation, validationClassMap } from '@utilities/validation';
import { KeyboardEvent } from '@react-types/shared';
import { GetStatusIcon } from '@utilities/input';
import { FOCUS_WITHIN_STYLE } from '@utilities/focusStyle';

const INCREMENT_KEYS = ['ArrowUp', 'ArrowRight'];
const DECREMENT_KEYS = ['ArrowDown', 'ArrowLeft'];
const SPECIAL_KEYS = ['Backspace', 'Tab'];
type FocusedState = {
    isFocused: boolean;
    isClick: boolean;
};

export const NumberInput = ({
    id: propId,
    size,
    disabled = false,
    required,
    readOnly,
    status = Validation.Default,
    decorator,
    suffix = '',
    controls,
    clearable,
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
    const timer = useRef<number>(0);
    const isShift = useRef<boolean>(false);
    const isMouseHold = useRef<boolean>(false);
    const inputElement = useRef<HTMLInputElement | null>(null);
    const [focusState, setFocusState] = useState<FocusedState>({ isFocused: false, isClick: false });

    const getCurrentValueWithoutSuffix = useCallback(() => {
        if (suffix) {
            return inputElement.current?.value.replace(`${suffix}`, '');
        }
        return inputElement.current?.value;
    }, [inputElement, suffix]);

    const stopIncrement = () => {
        clearInterval(timer.current);
        isMouseHold.current = false;
    };

    const startIncrement = (type: NumberInputIncrement) => {
        if (inputElement.current && !disabled) {
            isMouseHold.current = true;
            onHoldCount(type);
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

    const handleKeyDown = (event: KeyboardEvent) => {
        const { key, shiftKey } = event;
        if (SPECIAL_KEYS.includes(key) || !isNaN(Number(key))) {
            const currentValue = getCurrentValueWithoutSuffix();
            if (currentValue?.length === 0) {
                handleClear();
            }
            return;
        }
        event.preventDefault();
        isShift.current = shiftKey;
        if (DECREMENT_KEYS.includes(key)) {
            handleCount(NumberInputIncrement.DECREMENT);
        } else if (INCREMENT_KEYS.includes(key)) {
            handleCount(NumberInputIncrement.INCREMENT);
        }
        if (onKeyDown) {
            onKeyDown(event);
        }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        event.preventDefault();
        isShift.current = event.shiftKey;
        if (inputElement.current) {
            handleOnChange();
        }
    };

    const handleCount = (type: NumberInputIncrement, changeValue = 1) => {
        const getNewInputValue = () => {
            const value = getCurrentValueWithoutSuffix();
            const currentValue = Number(value) || 0;
            changeValue = isShift.current ? stepInterval : changeValue;
            switch (type) {
                case NumberInputIncrement.DECREMENT:
                    return currentValue - changeValue;
                case NumberInputIncrement.INCREMENT:
                    return currentValue + changeValue;
                default:
                    return currentValue;
            }
        };

        const newValue = getNewInputValue();
        setValue(newValue);
    };

    const setValue = (value: number) => {
        if (inputElement.current) {
            const newValue = value.toString();
            inputElement.current.value = `${newValue}${suffix}`;
            if (isMouseHold.current) {
                return;
            }
            handleOnChange();
        }
    };

    const handleOnChange = useCallback(() => {
        const valueWithoutSuffix = getCurrentValueWithoutSuffix();
        onChange?.(Number(valueWithoutSuffix));
    }, [onChange, getCurrentValueWithoutSuffix]);

    const handleClear = () => {
        if (inputElement.current) {
            inputElement.current.value = '';
        }
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        if (!focusState.isClick && !focusState.isFocused) {
            setFocusState({ isFocused: true, isClick: false });
        }
        if (onFocus) {
            onFocus(event);
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        if (focusState.isClick || focusState.isFocused) {
            setFocusState({ isFocused: false, isClick: false });
        }
        if (onBlur) {
            onBlur(event);
        }
    };

    useEffect(() => {
        clearInterval(timer.current);
    }, []);

    return (
        <div
            className={merge([
                'tw-w-full tw-flex tw-items-center tw-justify-between tw-h-9 tw-gap-2 tw-px-3 tw-transition tw-text-s tw-font-sans tw-relative tw-bg-white dark:tw-bg-transparent tw-border tw-rounded tw-line-strong hover:tw-border-line-x-strong focus-within:tw-border-line-xx-strong',
                focusState.isFocused ? FOCUS_WITHIN_STYLE : '',
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
                type={suffix ? 'text' : 'number'}
                placeholder={placeholder}
                className={merge([
                    'tw-w-full tw-border-none tw-outline-none tw-bg-transparent tw-hide-input-arrows',
                    disabled || readOnly
                        ? 'tw-text-black-40 tw-placeholder-black-30 dark:tw-text-black-30 dark:tw-placeholder-black-40'
                        : 'tw-text-black tw-placeholder-black-60 dark:tw-text-white',
                ])}
                onMouseDown={() => setFocusState({ isFocused: false, isClick: true })}
                onChange={() => setValue(Number(getCurrentValueWithoutSuffix()))}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onFocus={handleFocus}
                onBlur={handleBlur}
                size={size}
                title={title}
                aria-label={ariaLabel}
                required={required}
                readOnly={readOnly}
                disabled={disabled}
                data-test-id={`${dataTestId}-input`}
            />
            <span className={'tw-flex tw-items-center'}>
                {controls ? (
                    <>
                        <button
                            className={
                                'tw-p-1 hover:tw-bg-box-neutral hover:tw-text-box-selected-inverse focus:tw-ring-line-xx-strong focus:tw-bg-box-neutral'
                            }
                            type="button"
                            onClick={(event) => {
                                if (event.button === 0) {
                                    const changeValue = event.shiftKey ? stepInterval : 1;
                                    handleCount(NumberInputIncrement.DECREMENT, changeValue);
                                }
                            }}
                            onMouseDown={(event) =>
                                event.shiftKey || event.button > 0
                                    ? null
                                    : startIncrement(NumberInputIncrement.DECREMENT)
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
                            className={
                                'tw-p-1 hover:tw-bg-box-neutral hover:tw-text-box-selected-inverse focus:tw-ring-line-xx-strong focus:tw-bg-box-neutral'
                            }
                            type="button"
                            onClick={(event) => {
                                if (event.button === 0) {
                                    const changeValue = event.shiftKey ? stepInterval : 1;
                                    handleCount(NumberInputIncrement.INCREMENT, changeValue);
                                }
                            }}
                            onMouseDown={(event) =>
                                event.shiftKey || event.button > 0
                                    ? null
                                    : startIncrement(NumberInputIncrement.INCREMENT)
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
                {clearable ? (
                    <button
                        type="button"
                        onClick={handleClear}
                        className={
                            'tw-p-1 hover:tw-bg-box-neutral hover:tw-text-box-selected-inverse focus:tw-ring-line-xx-strong focus:tw-bg-box-neutral'
                        }
                    >
                        <IconCross16 />
                    </button>
                ) : null}
                {status ? GetStatusIcon(status, dataTestId) : null}
            </span>
        </div>
    );
};

NumberInput.displayName = 'FondueNumberInput';
