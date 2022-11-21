/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LoadingCircle, LoadingCircleSize } from '@components/LoadingCircle';
import { useCopy } from '@hooks/useCopy';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import { Validation, validationClassMap } from '@utilities/validation';
import React, { FC, FocusEvent, KeyboardEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { IconCheckMark, IconClipboard, IconCross, IconCrossCircle, IconEye, IconEyeOff } from '@foundation/Icon';

export enum TextInputType {
    Text = 'text',
    Password = 'password',
    Number = 'number',
}

export type TextInputBaseProps = {
    id?: string;
    type?: TextInputType;
    decorator?: ReactNode;
    dotted?: boolean;
    clearable?: boolean;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    autocomplete?: boolean;
    readonly?: boolean;
    validation?: Validation;
    copyable?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    onEnterPressed?: (event: KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    onClear?: () => void;
    size?: number;
    spellcheck?: boolean;
    focusOnMount?: boolean;
};

export type TextInputProps =
    | ({
          type?: TextInputType.Text;
          obfuscated?: false;
      } & TextInputBaseProps)
    | ({
          type?: TextInputType.Number;
          obfuscated?: false;
          min?: number;
          max?: number;
      } & TextInputBaseProps)
    | ({
          type: TextInputType.Password;
          obfuscated?: boolean;
      } & TextInputBaseProps);

export const TextInput: FC<TextInputProps> = ({
    id: propId,
    type = TextInputType.Text,
    decorator,
    validation = Validation.Default,
    clearable = false,
    placeholder,
    required,
    obfuscated,
    disabled = false,
    autocomplete = false,
    dotted = false,
    value = '',
    copyable = false,
    onChange,
    onEnterPressed,
    onBlur,
    onClear,
    size,
    spellcheck,
    readonly,
    focusOnMount,
}) => {
    const { isFocusVisible, focusProps } = useFocusRing({ within: true, isTextInput: true });
    const { isFocusVisible: clearButtonIsFocusVisible, focusProps: clearButtonFocusProps } = useFocusRing();
    const { isFocusVisible: passwordButtonIsFocusVisible, focusProps: passwordButtonFocusProps } = useFocusRing();
    const { isFocusVisible: copyButtonIsFocusVisible, focusProps: copyButtonFocusProps } = useFocusRing();

    const { copy, status } = useCopy();

    const inputElement = useRef<HTMLInputElement | null>(null);
    const [isObfuscated, setIsObfuscated] = useState(
        typeof obfuscated === 'boolean' ? obfuscated : type === TextInputType.Password,
    );

    useEffect(() => {
        setTimeout(() => {
            focusOnMount && inputElement.current?.focus();
        }, 0);
    }, [focusOnMount]);

    useEffect(() => {
        if (typeof obfuscated === 'boolean') {
            setIsObfuscated(obfuscated);
        }
    }, [obfuscated]);

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onEnterPressed && onEnterPressed(event);
        }
    };

    const getInputType = () => {
        if (type === TextInputType.Password) {
            return isObfuscated ? TextInputType.Password : TextInputType.Text;
        }
        return type;
    };

    const spellcheckProp = typeof spellcheck === 'boolean' ? { spellCheck: spellcheck } : null;

    return (
        <div
            {...focusProps}
            className={merge([
                'tw-flex tw-items-center tw-h-9 tw-gap-2 tw-px-3 tw-border tw-transition tw-rounded tw-text-s tw-font-sans tw-relative tw-bg-white dark:tw-bg-transparent',
                dotted ? 'tw-border-dashed' : 'tw-border-solid',
                disabled || readonly
                    ? 'tw-border-black-5 tw-bg-black-5 dark:tw-bg-black-90 dark:tw-border-black-90'
                    : merge([
                          'focus-within:tw-border-black-90 hover:tw-border-black-90',
                          validationClassMap[validation],
                          isFocusVisible &&
                              !clearButtonIsFocusVisible &&
                              !passwordButtonIsFocusVisible &&
                              !copyButtonIsFocusVisible &&
                              FOCUS_STYLE,
                      ]),
            ])}
        >
            {decorator && (
                <div
                    className={merge([
                        'tw-flex tw-items-center tw-justify-center tw-pl-1',
                        disabled ? 'tw-text-black-60' : 'tw-text-black-80',
                    ])}
                    data-test-id="decorator"
                >
                    {decorator}
                </div>
            )}
            <input
                id={useMemoizedId(propId)}
                ref={inputElement}
                className={merge([
                    'tw-w-full tw-grow tw-border-none tw-outline-none tw-bg-transparent tw-hide-input-arrows',
                    disabled || readonly
                        ? 'tw-text-black-40 tw-placeholder-black-30 dark:tw-text-black-30 dark:tw-placeholder-black-40'
                        : 'tw-text-black tw-placeholder-black-60 dark:tw-text-white',
                ])}
                onClick={() => inputElement.current?.focus()}
                onChange={(event) => onChange && onChange(event.currentTarget.value)}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                value={value}
                type={getInputType()}
                required={required}
                readOnly={readonly}
                disabled={disabled}
                autoComplete={autocomplete ? 'on' : 'off'}
                size={size}
                data-test-id="text-input"
                {...spellcheckProp}
            />
            {`${value}`.length > 0 && clearable && (
                <button
                    className={merge([
                        'tw-flex tw-items-center tw-justify-center tw-transition-colors tw-rounded',
                        disabled ? 'tw-cursor-default tw-text-black-40' : 'tw-text-black-60  hover:tw-text-black-100',
                        clearButtonIsFocusVisible && FOCUS_STYLE,
                    ])}
                    onClick={() => {
                        inputElement.current?.focus();
                        inputElement.current?.setAttribute('value', '');

                        onChange && onChange('');
                        onClear && onClear();
                    }}
                    data-test-id="clear-icon"
                    title="Clear text input"
                    aria-label="clear text input"
                    disabled={disabled}
                    type="button"
                    {...clearButtonFocusProps}
                >
                    <IconCross />
                </button>
            )}
            {type === TextInputType.Password && (
                <button
                    className={merge([
                        'tw-flex tw-items-center tw-justify-center tw-transition-colors tw-rounded',
                        disabled ? 'tw-cursor-default tw-text-black-40' : 'tw-text-black-60 hover:tw-text-black-100',
                        passwordButtonIsFocusVisible && FOCUS_STYLE,
                    ])}
                    onClick={() => setIsObfuscated(!isObfuscated)}
                    data-test-id="visibility-icon"
                    title="Toggle text visibility"
                    type="button"
                    aria-label={`${isObfuscated ? 'unveil' : 'obfuscate'} text input`}
                    disabled={disabled}
                    {...passwordButtonFocusProps}
                >
                    {isObfuscated ? <IconEye /> : <IconEyeOff />}
                </button>
            )}
            {validation === Validation.Loading && (
                <span className="tw-absolute tw-top-[-0.55rem] tw-right-[-0.55rem] tw-bg-white tw-rounded-full tw-p-[2px] tw-border tw-border-black-10">
                    <LoadingCircle size={LoadingCircleSize.ExtraSmall} />
                </span>
            )}
            {copyable && (
                <button
                    className={merge([
                        'tw-flex tw-items-center tw-justify-center tw-transition-colors tw-rounded',
                        disabled ? 'tw-cursor-default tw-text-black-40' : 'tw-text-black-60 hover:tw-text-black-100',
                        copyButtonIsFocusVisible && FOCUS_STYLE,
                    ])}
                    onClick={() => copy(value)}
                    data-test-id="copy-icon"
                    title="Copy input text"
                    disabled={disabled}
                    type="button"
                    {...copyButtonFocusProps}
                >
                    {status === 'error' && (
                        <span className="tw-text-box-negative-strong">
                            <IconCrossCircle />
                        </span>
                    )}
                    {status === 'idle' && <IconClipboard />}
                    {status === 'success' && (
                        <span className="tw-text-box-positive-strong">
                            <IconCheckMark />
                        </span>
                    )}
                </button>
            )}
        </div>
    );
};
