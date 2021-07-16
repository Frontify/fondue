/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ChangeEvent, FormEvent, ReactElement } from "react";
import css from "./Textarea.module.css";

export interface TextareaProps {
    children?: string | ReactElement | ReactElement[];
    required?: boolean;
    decorator?: ReactElement;
    placeholder?: string;
    disabled?: boolean;
    onInput?: (value: string) => void;
    onBlur?: (value: string) => void;
}

export default function Textarea({
    children,
    required = false,
    decorator,
    placeholder,
    disabled = false,
    onInput,
    onBlur,
}: TextareaProps): ReactElement<TextareaProps> {
    const onTextareaInput = (event: FormEvent) => {
        onInput && onInput((event.target as HTMLTextAreaElement).value);
    };

    const onTextareaBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
        onBlur && onBlur(event.target.value);
    };

    return (
        <div className={css.container}>
            {decorator && (
                <div className={css.decorator} data-test-id="decorator">
                    {decorator}
                </div>
            )}
            <textarea
                placeholder={placeholder}
                required={required}
                className={css.textarea}
                disabled={disabled}
                onBlur={onTextareaBlur}
                onInput={onTextareaInput}
            >
                {children}
            </textarea>
        </div>
    );
}
