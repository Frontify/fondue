/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InputLabel } from "@elements/InputLabel/InputLabel";
import generateRandomId from "@utilities/generateRandomId";
import { merge } from "@utilities/merge";
import { MouseEvent, ReactElement } from "react";

export enum SwitchSize {
    Small = "Small",
    Large = "Large",
}

export type SwitchProps = {
    on?: boolean;
    disabled?: boolean;
    label?: string;
    name?: string;
    size?: SwitchSize;
    onChange?: (e: MouseEvent) => void;
};

export const Switch = ({
    name,
    label,
    disabled,
    onChange,
    size = SwitchSize.Small,
    on = false,
}: SwitchProps): ReactElement<SwitchProps> => {
    const id = label && generateRandomId();

    return (
        <div className="flex w-full items-center justify-between">
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
                    "inline-flex py-0 px-[0.125rem] border-0 rounded-full transition-colors",
                    disabled
                        ? "bg-black-10 pointer-events-none"
                        : on
                        ? "bg-black-90 hover:bg-black"
                        : "bg-black-30 hover:bg-black-60",
                    size === SwitchSize.Small ? "w-9 h-5" : "w-11 h-6",
                ])}
                value={on.toString()}
                onClick={onChange}
            >
                <div
                    className={merge([
                        "block self-center bg-white rounded-full transition-transform",
                        size === SwitchSize.Small ? "w-4 h-4" : "w-5 h-5",
                        on ? "translate-x-full" : "translate-x-0",
                    ])}
                />
            </button>
        </div>
    );
};
