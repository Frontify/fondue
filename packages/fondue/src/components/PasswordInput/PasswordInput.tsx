/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFocusRing } from '@react-aria/focus';
import { useCallback, useRef, useState } from 'react';

import { Button } from '@components/Button/Button';
import { ButtonEmphasis, ButtonSize, ButtonStyle } from '@components/Button/ButtonTypes';
import IconCross16 from '@foundation/Icon/Generated/IconCross16';
import IconEye16 from '@foundation/Icon/Generated/IconEye16';
import IconEyeOff16 from '@foundation/Icon/Generated/IconEyeOff16';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { GetStatusIcon } from '@utilities/input';
import { merge } from '@utilities/merge';
import { Validation, validationClassMap } from '@utilities/validation';

import { type InputBaseProps, InputTypes } from '../../types/input';

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

    const { isFocusVisible, focusProps } = useFocusRing({ isTextInput: true });

    const handleOnChange = useCallback(() => {
        onChange?.(inputElementRef.current?.value);
    }, [inputElementRef, onChange]);

    const handleClear = () => {
        if (inputElementRef.current) {
            inputElementRef.current.value = '';
            handleOnChange();
        }
    };

    return (
        <div
            className={merge([
                'tw-flex tw-items-center tw-justify-between tw-h-9 tw-gap-2 tw-px-3 tw-py-3 tw-transition tw-text-s tw-font-sans tw-relative tw-border tw-rounded',
                size ? '' : 'tw-w-full',
                disabled
                    ? 'tw-bg-box-disabled dark:tw-bg-box-disabled hover:tw-cursor-not-allowed tw-border-line-weak dark:tw-border-line-weak'
                    : 'tw-bg-base dark:tw-bg-base tw-border-line-strong dark:tw-border-line-strong hover:tw-border-line-x-strong dark:hover:tw-border-line-x-strong focus-within:tw-border-line-xx-strong dark:focus-within:tw-border-line-xx-strong focus-within:hover:tw-border-line-xx-strong dark:focus-within:hover:tw-border-line-xx-strong',
                isFocusVisible && FOCUS_STYLE,
                status ? validationClassMap[status] : '',
            ])}
            data-test-id={dataTestId}
        >
            <input
                size={size}
                value={value}
                onBlur={onBlur}
                onFocus={onFocus}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                ref={inputElementRef}
                onKeyDown={onKeyDown}
                onChange={handleOnChange}
                placeholder={placeholder}
                id={useMemoizedId(propId)}
                aria-label="Password Input"
                autoComplete={autocomplete ? 'on' : 'off'}
                onClick={() => inputElementRef.current?.focus()}
                type={isObfuscated ? InputTypes.Password : InputTypes.Text}
                className={merge([
                    'tw-w-full tw-border-none tw-outline-none tw-bg-transparent tw-hide-input-arrows tw-text-sm',
                    disabled || readOnly
                        ? 'tw-text-text-disabled tw-placeholder-text-disabled dark:tw-text-black-30 dark:tw-placeholder-black-40 hover:tw-cursor-not-allowed'
                        : 'tw-text-text dark:tw-text-weak tw-placeholder-text-x-weak dark:tw-placeholder-text-x-weak ',
                ])}
                data-test-id={`${dataTestId}-input`}
                {...focusProps}
            />
            <span className="tw-flex tw-justify-between tw-items-center t-max-w-sm">
                <Button
                    disabled={disabled}
                    size={ButtonSize.Small}
                    style={ButtonStyle.Default}
                    emphasis={ButtonEmphasis.Weak}
                    onClick={() => setIsObfuscated(!isObfuscated)}
                    aria-label={`${isObfuscated ? 'show' : 'hide'} text input`}
                    icon={isObfuscated ? <IconEye16 /> : <IconEyeOff16 />}
                    data-test-id={`${dataTestId}-visibility-icon`}
                />
                {clearable ? (
                    <Button
                        disabled={disabled}
                        onClick={handleClear}
                        icon={<IconCross16 />}
                        size={ButtonSize.Small}
                        aria-label="Clear value"
                        style={ButtonStyle.Default}
                        emphasis={ButtonEmphasis.Weak}
                        data-test-id={`${dataTestId}-clear`}
                    />
                ) : null}
                {status ? GetStatusIcon(status, dataTestId) : null}
            </span>
        </div>
    );
};

PasswordInput.displayName = 'FonduePasswordInput';
