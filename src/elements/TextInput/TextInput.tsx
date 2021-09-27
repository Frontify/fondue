/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconReject from "@elements/Icon/Generated/IconReject";
import IconView from "@elements/Icon/Generated/IconView";
import IconViewSlash from "@elements/Icon/Generated/IconViewSlash";
import { useMemoizedId } from "@hooks/useMemoizedId";
import { useFocusRing } from "@react-aria/focus";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, { FC, FocusEvent, KeyboardEvent, ReactElement, ReactNode, useEffect, useRef, useState } from "react";

export enum TextInputType {
    Text = "text",
    Password = "password",
    Number = "number",
}

export enum Validation {
    Default = "Default",
    Loading = "Loading",
    Success = "Success",
    Error = "Error",
}

const validationStyle: Record<Validation, string> = {
    [Validation.Default]: "tw-border-black-20",
    [Validation.Loading]: "tw-border-black-10",
    [Validation.Success]: "tw-border-green-50",
    [Validation.Error]: "tw-border-red-60",
};

const Spinner = (): ReactElement => (
    <svg className="tw-animate-spin" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="7.5" fill="white" stroke="#EAEBEB" />
        <path
            fill="white"
            d="M16.3302 9.5C17.7109 11.8915 16.8915 14.9494 14.5 16.3301C12.1086 17.7108 9.05063 16.8915 7.66992 14.5"
            stroke="#9088FF"
        />
    </svg>
);

type TextInputBaseProps = {
    id?: string;
    type?: TextInputType;
    decorator?: ReactNode;
    dotted?: boolean;
    clearable?: boolean;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    validation?: Validation;
    value?: string;
    onChange?: (value: string) => void;
    onEnterPressed?: (event: KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    onClear?: () => void;
    size?: number;
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
    dotted = false,
    value = "",
    onChange,
    onEnterPressed,
    onBlur,
    onClear,
    size,
}) => {
    const { isFocusVisible, focusProps } = useFocusRing({ within: true, isTextInput: true });
    const { isFocusVisible: clearButtonIsFocusVisible, focusProps: clearButtonFocusProps } = useFocusRing();
    const { isFocusVisible: passwordButtonIsFocusVisible, focusProps: passwordButtonFocusProps } = useFocusRing();
    const inputElement = useRef<HTMLInputElement | null>(null);
    const [isObfuscated, setIsObfuscated] = useState(
        typeof obfuscated === "boolean" ? obfuscated : type === TextInputType.Password,
    );

    useEffect(() => {
        if (typeof obfuscated === "boolean") {
            setIsObfuscated(obfuscated);
        }
    }, [obfuscated]);

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onEnterPressed && onEnterPressed(event);
        }
    };

    const getInputType = () => {
        if (type === TextInputType.Password && isObfuscated) {
            return TextInputType.Password;
        } else if (type === TextInputType.Password) {
            return TextInputType.Text;
        }
        return type;
    };

    return (
        <div
            {...focusProps}
            className={merge([
                "tw-flex tw-items-center tw-h-9 tw-gap-2 tw-px-3 tw-border tw-rounded tw-text-s tw-font-sans tw-relative tw-bg-white dark:tw-bg-transparent",
                dotted ? "tw-border-dashed" : "tw-border-solid",
                disabled
                    ? "tw-border-black-5 tw-bg-black-5 dark:tw-bg-black-90 dark:tw-border-black-90 tw-cursor-not-allowed"
                    : merge([
                          "focus-within:tw-border-black-90",
                          validationStyle[validation],
                          isFocusVisible && FOCUS_STYLE,
                      ]),
            ])}
        >
            {decorator && (
                <div
                    className={merge([
                        "tw-flex tw-items-center tw-justify-center tw-pl-1",
                        disabled ? "tw-text-black-60" : "tw-text-black-80",
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
                    "tw-flex-grow tw-border-none tw-outline-none tw-bg-transparent tw-hide-input-arrows",
                    disabled
                        ? "tw-text-black-40 tw-placeholder-black-30 dark:tw-text-black-30 dark:tw-placeholder-black-40"
                        : "tw-text-black tw-placeholder-black-60 dark:tw-text-white",
                ])}
                onChange={(event) => onChange && onChange(event.currentTarget.value)}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                value={value}
                type={getInputType()}
                required={required}
                disabled={disabled}
                size={size}
                data-test-id="text-input"
            />
            {`${value}`.length !== 0 && clearable && (
                <button
                    className={merge([
                        "tw-flex tw-items-center tw-justify-center hover:tw-text-black-100 tw-transition-colors tw-rounded",
                        disabled ? "tw-pointer-events-none tw-text-black-40" : "tw-text-black-60",
                        clearButtonIsFocusVisible && FOCUS_STYLE,
                    ])}
                    onClick={() => {
                        inputElement.current?.focus();
                        inputElement.current?.setAttribute("value", "");

                        onChange && onChange("");
                        onClear && onClear();
                    }}
                    data-test-id="clear-icon"
                    title="Clear text input"
                    aria-label="clear text input"
                    disabled={disabled}
                    {...clearButtonFocusProps}
                >
                    <IconReject />
                </button>
            )}
            {type === TextInputType.Password && (
                <button
                    className={merge([
                        "tw-flex tw-items-center tw-justify-center hover:tw-text-black-100 tw-transition-colors tw-rounded",
                        disabled ? "tw-pointer-events-none tw-text-black-40" : "tw-text-black-60",
                        passwordButtonIsFocusVisible && FOCUS_STYLE,
                    ])}
                    onClick={() => setIsObfuscated(!isObfuscated)}
                    data-test-id="visibility-icon"
                    title="Toggle text visibility"
                    aria-label={`${isObfuscated ? "unveil" : "obfuscate"} text input`}
                    disabled={disabled}
                    {...passwordButtonFocusProps}
                >
                    {isObfuscated ? <IconView /> : <IconViewSlash />}
                </button>
            )}
            {validation === Validation.Loading && (
                <span className="tw-absolute tw-top-[-0.75rem] tw-right-[-0.75rem]">
                    <Spinner />
                </span>
            )}
        </div>
    );
};
