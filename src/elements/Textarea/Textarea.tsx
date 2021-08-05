/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from "@utilities/merge";
import { FC, PropsWithChildren, ReactNode } from "react";

export type TextareaProps = PropsWithChildren<{
    required?: boolean;
    decorator?: ReactNode;
    placeholder?: string;
    disabled?: boolean;
    onInput?: (value: string) => void;
    onBlur?: (value: string) => void;
}>;

export const Textarea: FC<TextareaProps> = ({
    children,
    required = false,
    decorator,
    placeholder,
    disabled = false,
    onInput,
    onBlur,
}) => {
    return (
        <div className="relative">
            {decorator && (
                <div className="absolute top-2 left-2 inline-flex items-end text-black-80" data-test-id="decorator">
                    {decorator}
                </div>
            )}
            <textarea
                placeholder={placeholder}
                required={required}
                className={merge([
                    "p-2 border rounded text-s outline-none transition placeholder-black-60",
                    !!decorator && "pl-7 ",
                    disabled
                        ? "border-black-5 bg-black-5 text-black-40"
                        : "text-black border-black-40 hover:border-black-90",
                ])}
                disabled={disabled}
                onBlur={(event) => onBlur && onBlur(event.target.value)}
                onInput={(event) => onInput && onInput((event.target as HTMLTextAreaElement).value)}
            >
                {children}
            </textarea>
        </div>
    );
};
