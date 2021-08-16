/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InputLabel } from "@elements/InputLabel/InputLabel";
import generateRandomId from "@utilities/generateRandomId";
import { merge } from "@utilities/merge";
import React, { FC, MouseEvent, useState } from "react";

export enum SwitchSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
}

export enum SwitchLabelLayout {
    Fill = "Fill",
    Hug = "Hug",
}

const lineSizeClasses: Record<SwitchSize, string> = {
    [SwitchSize.Small]: "tw-w-5 tw-h-2",
    [SwitchSize.Medium]: "tw-w-9 tw-h-5",
    [SwitchSize.Large]: "tw-w-11 tw-h-6",
};

const dotSizeClasses: Record<SwitchSize, string> = {
    [SwitchSize.Small]: "tw-w-3 tw-h-3",
    [SwitchSize.Medium]: "tw-w-4 tw-h-4",
    [SwitchSize.Large]: "tw-w-5 tw-h-5",
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
    const [id] = useState(propId || generateRandomId());

    return (
        <div className="tw-flex tw-w-full tw-items-center tw-justify-between tw-gap-2">
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
                    "tw-inline-flex tw-border-0 tw-rounded-full tw-transition-colors tw-flex-shrink-0",
                    size !== SwitchSize.Small ? "tw-py-0 tw-px-[0.125rem]" : "tw-p-0",
                    disabled
                        ? "tw-bg-black-10 tw-pointer-events-none"
                        : on
                        ? "tw-bg-black-90 hover:tw-bg-black"
                        : "tw-bg-black-30 hover:tw-bg-black-60",
                    lineSizeClasses[size],
                ])}
                value={on.toString()}
                onClick={onChange}
            >
                <div
                    className={merge([
                        "tw-block tw-self-center tw-bg-white tw-rounded-full tw-transition-transform",
                        size === SwitchSize.Small
                            ? disabled
                                ? "tw-border tw-border-black-30"
                                : "tw-border tw-border-black"
                            : "",
                        dotSizeClasses[size],
                        on
                            ? size === SwitchSize.Small
                                ? "tw-translate-x-2"
                                : "tw-translate-x-full"
                            : "tw-translate-x-0",
                    ])}
                />
            </button>
        </div>
    );
};
