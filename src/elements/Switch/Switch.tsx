/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { MouseEvent, FC } from "react";
import { InputLabel } from "@elements/InputLabel/InputLabel";
import generateRandomId from "@utilities/generateRandomId";
import { merge } from "@utilities/merge";

export enum SwitchSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
}

const lineSizeClasses: Record<SwitchSize, string> = {
    [SwitchSize.Small]: "w-5 h-2",
    [SwitchSize.Medium]: "w-9 h-5",
    [SwitchSize.Large]: "w-11 h-6",
};

const dotSizeClasses: Record<SwitchSize, string> = {
    [SwitchSize.Small]: "w-3 h-3",
    [SwitchSize.Medium]: "w-4 h-4",
    [SwitchSize.Large]: "w-5 h-5",
};

export type SwitchProps = {
    id?: string;
    on?: boolean;
    disabled?: boolean;
    label?: string;
    name?: string;
    size?: SwitchSize;
    onChange?: (e: MouseEvent) => void;
};

export const Switch: FC<SwitchProps> = ({
    id: propId,
    name,
    label,
    disabled,
    onChange,
    size = SwitchSize.Medium,
    on = false,
}) => {
    const id = propId || generateRandomId();

    return (
        <div className="flex w-full items-center justify-between gap-1">
            {label && id && (
                <InputLabel htmlFor={id} disabled={disabled}>
                    {label}
                </InputLabel>
            )}
            <button
                id={id}
                disabled={disabled}
                name={name}
                data-test-id="switch"
                className={merge([
                    "inline-flex border-0 rounded-full transition-colors",
                    size !== SwitchSize.Small ? "py-0 px-[0.125rem]" : "p-0",
                    disabled
                        ? "bg-black-10 pointer-events-none"
                        : on
                        ? "bg-black-90 hover:bg-black"
                        : "bg-black-30 hover:bg-black-60",
                    lineSizeClasses[size],
                ])}
                value={on.toString()}
                onClick={onChange}
            >
                <div
                    className={merge([
                        "block self-center bg-white rounded-full transition-transform",
                        size === SwitchSize.Small ? (disabled ? "border border-black-30" : "border border-black") : "",
                        dotSizeClasses[size],
                        on ? (size === SwitchSize.Small ? "translate-x-2" : "translate-x-full") : "translate-x-0",
                    ])}
                />
            </button>
        </div>
    );
};
