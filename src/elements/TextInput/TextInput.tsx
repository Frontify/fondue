/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import IconReject from "@elements/Icon/Generated/IconReject";
import IconView from "@elements/Icon/Generated/IconView";
import IconViewSlash from "@elements/Icon/Generated/IconViewSlash";
import { merge } from "@utilities/merge";

export enum TextInputType {
    Text = "text",
    Password = "password",
}

export enum Validation {
    Default = "Default",
    Loading = "Loading",
    Success = "Success",
    Error = "Error",
}

const validationStyle: Record<Validation, string> = {
    [Validation.Default]: "border-black-10",
    [Validation.Loading]: "border-black-10",
    [Validation.Success]: "border-green-50",
    [Validation.Error]: "border-red-50",
};

const Spinner = (): ReactElement => (
    <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
    defaultValue?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    validation?: Validation;
    onInput?: (value: string) => void;
    onBlur?: (value: string) => void;
    onClear?: () => void;
};

export type TextInputProps =
    | ({
          type?: TextInputType.Text;
          obfuscated?: false;
      } & TextInputBaseProps)
    | ({
          type: TextInputType.Password;
          obfuscated?: boolean;
      } & TextInputBaseProps);

export const TextInput: FC<TextInputProps> = ({
    id,
    type = TextInputType.Text,
    decorator,
    validation = Validation.Default,
    clearable = false,
    defaultValue,
    placeholder,
    required,
    obfuscated,
    disabled = false,
    dotted = false,
    onInput,
    onBlur,
    onClear,
}) => {
    const inputElement = useRef<HTMLInputElement | null>(null);
    const [isObfuscated, setIsObfuscated] = useState(
        typeof obfuscated === "boolean" ? obfuscated : type === TextInputType.Password,
    );
    useEffect(() => {
        if (typeof obfuscated === "boolean") {
            setIsObfuscated(obfuscated);
        }
    }, [obfuscated]);

    return (
        <div
            className={merge([
                "flex items-center py-2 gap-2 px-3 border rounded font-sans relative",
                dotted ? "border-dashed" : "border-solid",
                disabled
                    ? "border-black-5 bg-black-5 dark:bg-black-90 dark:border-black-90 cursor-not-allowed"
                    : `${validationStyle[validation]} focus-within:border-black-90`,
            ])}
        >
            {decorator && (
                <div
                    className={merge([
                        "flex items-center justify-center pl-1",
                        disabled ? "text-black-60" : "text-black-80",
                    ])}
                    data-test-id="decorator"
                >
                    {decorator}
                </div>
            )}
            <input
                id={id}
                ref={inputElement}
                className={merge([
                    "flex-grow border-none outline-none bg-transparent",
                    disabled
                        ? "text-black-40 placeholder-black-30 dark:text-black-30 dark:placeholder-black-40 cursor-not-allowed"
                        : "text-black placeholder-black-60 dark:text-white",
                ])}
                onClick={() => {
                    inputElement.current?.focus();
                }}
                onInput={(event) => onInput && onInput((event.target as HTMLInputElement).value)}
                onBlur={(event) => onBlur && onBlur(event.target.value)}
                placeholder={placeholder}
                defaultValue={defaultValue}
                type={isObfuscated ? TextInputType.Password : TextInputType.Text}
                required={required}
                disabled={disabled}
                data-test-id="text-input"
            />
            {clearable && (
                <button
                    className={merge([
                        "flex items-center justify-center",
                        disabled ? "pointer-events-none text-black-40" : "text-black-60",
                    ])}
                    onClick={() => {
                        if (inputElement.current) {
                            inputElement.current.value = "";
                            inputElement.current.focus();
                            onClear && onClear();
                        }
                    }}
                    data-test-id="clear-icon"
                    title="clear input"
                    aria-label="clear input"
                    disabled={disabled}
                >
                    <IconReject />
                </button>
            )}
            {type === TextInputType.Password && (
                <button
                    className={merge([
                        "flex items-center justify-center",
                        disabled ? "pointer-events-none text-black-40" : "text-black-60",
                    ])}
                    onClick={() => setIsObfuscated(!isObfuscated)}
                    data-test-id="visibility-icon"
                    title="toggle text visibility"
                    aria-label={`${isObfuscated ? "unveil" : "obfuscate"} text input`}
                >
                    {isObfuscated ? <IconView /> : <IconViewSlash />}
                </button>
            )}
            {validation === Validation.Loading && (
                <span className="absolute top-[-0.75rem] right-[-0.75rem]">
                    <Spinner />
                </span>
            )}
        </div>
    );
};
