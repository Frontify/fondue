/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, ChangeEvent, FormEvent, useState, useRef } from "react";
import { IconProps } from "@components/Icon/Icon";
import css from "./TextInput.module.css";
import { ReactComponent as IconReject } from "@components/Icon/Svg/Reject.svg";
import { ReactComponent as IconView } from "@components/Icon/Svg/View.svg";
import { ReactComponent as IconViewSlash } from "@components/Icon/Svg/ViewSlash.svg";

export enum TextInputType {
    Text = "text",
    Password = "password",
}

export interface TextInputProps {
    id?: string;
    type?: TextInputType;
    decorator?: ReactElement<IconProps>;
    clearable?: boolean;
    value?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    onInput?: (value: string) => void;
    onBlur?: (value: string) => void;
    onClear?: () => void;
}

export default function TextInput({
    id,
    type = TextInputType.Text,
    decorator,
    clearable = false,
    value,
    placeholder,
    required,
    disabled,
    onInput,
    onBlur,
    onClear,
}: TextInputProps): ReactElement<TextInputProps> {
    const inputElement = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState<string | undefined>(value);
    const [passwordVisible, setPasswordVisible] = useState(type === TextInputType.Password);
    const [inputType, setInputType] = useState<TextInputType>(type);

    const onInputInput = (event: FormEvent) => {
        const newInputValue = (event.target as HTMLInputElement).value;
        setInputValue(newInputValue);
        onInput && onInput(newInputValue);
    };

    const onInputBlur = (event: ChangeEvent<HTMLInputElement>) => {
        onBlur && onBlur(event.target.value);
    };

    const clearInput = () => {
        if (inputElement.current) {
            setInputValue("");
            onClear && onClear();
        }
    };

    const toggleVisibility = () => {
        setPasswordVisible((passwordVisible: boolean) => !passwordVisible);
        setInputType(passwordVisible ? TextInputType.Text : TextInputType.Password);
    };

    const containerClasses = [css.container, ...(disabled ? [css.disabled] : [])].join(" ");

    return (
        <div className={containerClasses}>
            {decorator && (
                <div className={css.decorator} data-test-id="decorator">
                    {decorator}
                </div>
            )}
            <input
                id={id}
                ref={inputElement}
                className={css.input}
                onInput={onInputInput}
                onBlur={onInputBlur}
                placeholder={placeholder}
                value={inputValue}
                type={inputType}
                required={required}
                disabled={disabled}
                data-test-id="text-input"
            />
            {clearable && (
                <div className={css.clear} onClick={clearInput} data-test-id="clear-icon">
                    <IconReject />
                </div>
            )}
            {type === TextInputType.Password && (
                <div className={css.toggleVisibility} onClick={toggleVisibility} data-test-id="visibility-icon">
                    {passwordVisible ? <IconViewSlash /> : <IconView />}
                </div>
            )}
        </div>
    );
}
