/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross16, IconEye, IconEyeOff } from '@foundation/Icon';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { GetStatusIcon } from '@utilities/input';
import { merge } from '@utilities/merge';
import { Validation, validationClassMap } from '@utilities/validation';
import { useCallback, useRef, useState } from 'react';
import { InputBaseProps, InputTypes } from '../../types/input';
import { useMemoizedId } from '@hooks/useMemoizedId';

export type PasswordInputProps = { obfuscated?: boolean } & Omit<
    InputBaseProps<string>,
    'valueSelect' | 'decorator' | 'suffix'
>;

export const PasswordInput = ({
    autocomplete = false,
    clearable,
    disabled,
    id: propId,
    obfuscated = true,
    placeholder,
    readOnly,
    required,
    status = Validation.Default,
    size,
    value,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    'data-test-id': dataTestId = 'fondue-password-input',
}: PasswordInputProps) => {
    const inputElementRef = useRef<HTMLInputElement | null>(null);
    const [isObfuscated, setIsObfuscated] = useState<boolean>(obfuscated);

    const { isFocusVisible, focusProps } = useFocusRing();
    const { isFocusVisible: passwordButtonIsFocusVisible, focusProps: passwordButtonFocusProps } = useFocusRing();

    const handleOnChange = useCallback(() => {
        onChange?.(inputElementRef.current?.value);
    }, [inputElementRef, onChange]);

    const handleClear = () => {
        if (inputElementRef.current) {
            inputElementRef.current.value = '';
            onChange?.(inputElementRef.current.value);
        }
    };

    return (
        <div
            {...focusProps}
            className={merge([
                'tw-flex tw-items-center tw-justify-between tw-h-9 tw-gap-2 tw-px-3 tw-py-3 tw-transition tw-text-s tw-font-sans tw-relative tw-bg-white dark:tw-bg-transparent tw-border tw-rounded tw-line-strong',
                size ? '' : 'tw-w-full',
                disabled
                    ? 'tw-border-line-x-strong'
                    : 'hover:tw-border-line-x-strong focus-within:tw-border-line-xx-strong focus-within:hover:tw-border-line-xx-strong',
                status ? validationClassMap[status] : '',
                isFocusVisible && FOCUS_STYLE,
            ])}
            data-test-id={dataTestId}
        >
            <input
                aria-label="Password Input"
                autoComplete={autocomplete ? 'on' : 'off'}
                data-test-id={`${dataTestId}-input`}
                disabled={disabled}
                id={useMemoizedId(propId)}
                onBlur={onBlur}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                onChange={handleOnChange}
                onClick={() => inputElementRef.current?.focus()}
                placeholder={placeholder}
                readOnly={readOnly}
                ref={inputElementRef}
                required={required}
                size={size}
                type={isObfuscated ? InputTypes.Password : InputTypes.Text}
                value={value}
                className={merge([
                    'tw-w-full tw-border-none tw-outline-none tw-bg-transparent tw-hide-input-arrows tw-text-[16px]',
                    disabled || readOnly
                        ? 'tw-text-black-40 tw-placeholder-black-30 dark:tw-text-black-30 dark:tw-placeholder-black-40 hover:tw-cursor-not-allowed'
                        : 'tw-text-black tw-placeholder-black-60 dark:tw-text-white',
                ])}
            />
            <span className="tw-flex tw-justify-between tw-items-center t-max-w-sm">
                <button
                    aria-label={`${isObfuscated ? 'show' : 'hide'} text input`}
                    onClick={() => setIsObfuscated(!isObfuscated)}
                    data-test-id={`${dataTestId}-visibility-icon`}
                    disabled={disabled}
                    title="Toggle text visibility"
                    type="button"
                    className={merge([
                        'tw-flex tw-items-center tw-justify-center tw-transition-colors tw-rounded tw-text-text-weak tw-p-1',
                        disabled
                            ? 'tw-cursor-default tw-text-black-40 hover:tw-cursor-not-allowed'
                            : 'tw-text-black-60 hover:tw-text-black-100 hover:tw-rounded-sm hover:tw-bg-box-neutral hover:tw-text-box-neutral-inverse focus:tw-ring-line-xx-strong focus:tw-bg-box-neutral',
                        passwordButtonIsFocusVisible && FOCUS_STYLE,
                    ])}
                    {...passwordButtonFocusProps}
                >
                    {isObfuscated ? <IconEye /> : <IconEyeOff />}
                </button>
                {clearable ? (
                    <button
                        aria-label="Clear value"
                        onClick={handleClear}
                        data-test-id={`${dataTestId}-clear`}
                        title="Clear value"
                        type="button"
                        className={merge([
                            'tw-text-text-weak tw-p-1',
                            disabled
                                ? 'tw-cursor-default tw-text-black-40 hover:tw-cursor-not-allowed'
                                : 'tw-text-black-60 hover:tw-text-black-100 hover:tw-rounded-sm hover:tw-bg-box-neutral hover:tw-text-box-neutral-inverse focus:tw-ring-line-xx-strong focus:tw-bg-box-neutral',
                        ])}
                    >
                        <IconCross16 />
                    </button>
                ) : null}
                {status ? GetStatusIcon(status, dataTestId) : null}
            </span>
        </div>
    );
};

PasswordInput.displayName = 'FonduePasswordInput';
