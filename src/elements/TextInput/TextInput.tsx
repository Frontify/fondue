/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconReject from "@elements/Icon/Generated/IconReject";
import IconView from "@elements/Icon/Generated/IconView";
import IconViewSlash from "@elements/Icon/Generated/IconViewSlash";
import { merge } from "@utilities/merge";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";

export enum TextInputType {
    Text = "text",
    Password = "password",
}

export enum Validation {
    Default = "Default",
    Success = "Success",
    Error = "Error",
}

const validationStyle: Record<Validation, string> = {
    [Validation.Default]: "border-black-10",
    [Validation.Success]: "border-green-50",
    [Validation.Error]: "border-red-50",
};

type TextInputBaseProps = {
    id?: string;
    type?: TextInputType;
    decorator?: ReactNode;
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

export default function TextInput({
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
    onInput,
    onBlur,
    onClear,
}: TextInputProps): ReactElement<TextInputProps> {
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
                "flex items-center py-2 gap-2 px-3 border rounded font-sans",
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
                    "flex-grow border-none outline-none placeholder-black-60",
                    disabled
                        ? "text-black-40 bg-black-5 dark:bg-transparent cursor-not-allowed"
                        : "text-black dark:text-white dark:bg-transparent",
                ])}
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
                >
                    {isObfuscated ? <IconView /> : <IconViewSlash />}
                </button>
            )}
        </div>
    );
}
