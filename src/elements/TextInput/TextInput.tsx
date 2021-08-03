/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import IconReject from "@elements/Icon/Generated/IconReject";
import IconView from "@elements/Icon/Generated/IconView";
import IconViewSlash from "@elements/Icon/Generated/IconViewSlash";

export enum TextInputType {
    Text = "text",
    Password = "password",
}

export type TextInputProps = {
    id?: string;
    type?: TextInputType;
    decorator?: ReactNode;
    clearable?: boolean;
    defaultValue?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    onInput?: (value: string) => void;
    onBlur?: (value: string) => void;
    onClear?: () => void;
};

export const TextInput = ({
    id,
    type = TextInputType.Text,
    decorator,
    clearable = false,
    defaultValue,
    placeholder,
    required,
    disabled = false,
    onInput,
    onBlur,
    onClear,
}: TextInputProps): ReactElement<TextInputProps> => {
    const isTextInput = type === TextInputType.Text;
    const inputElement = useRef<HTMLInputElement | null>(null);
    const [inputValueVisible, setInputValueVisible] = useState(isTextInput);
    useEffect(() => setInputValueVisible(isTextInput), [isTextInput]);

    return (
        <div
            className={`flex items-center py-2 px-3 border rounded font-sans ${
                disabled ? "border-black-5 bg-black-5" : "border-black-10 focus-within:border-black-90"
            }`}
        >
            {decorator && (
                <div className="flex items-center justify-center pl-2 text-black-80" data-test-id="decorator">
                    {decorator}
                </div>
            )}
            <input
                id={id}
                ref={inputElement}
                className={`flex-grow border-none outline-none placeholder-black-60 ${
                    disabled ? "text-black-40" : "text-black"
                }`}
                onInput={(event) => onInput && onInput((event.target as HTMLInputElement).value)}
                onBlur={(event) => onBlur && onBlur(event.target.value)}
                placeholder={placeholder}
                defaultValue={defaultValue}
                type={inputValueVisible ? TextInputType.Text : TextInputType.Password}
                required={required}
                disabled={disabled}
                data-test-id="text-input"
            />
            {clearable && (
                <button
                    className={`flex items-center justify-center pl-2 ${
                        disabled ? "pointer-events-none text-black-40" : "text-black-60"
                    }`}
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
                    className="flex items-center justify-center pl-2 text-black-60"
                    onClick={() => setInputValueVisible(!inputValueVisible)}
                    data-test-id="visibility-icon"
                    title="toggle text visibility"
                >
                    {inputValueVisible ? <IconViewSlash /> : <IconView />}
                </button>
            )}
        </div>
    );
};
