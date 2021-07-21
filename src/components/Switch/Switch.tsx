/* (c) Copyright Frontify Ltd., all rights reserved. */

import InputLabel from "@components/InputLabel/InputLabel";
import { Size } from "@utilities/enum";
import generateRandomId from "@utilities/generateRandomId";
import { merge } from "@utilities/merge";
import { MouseEvent, ReactElement } from "react";
import css from "./Switch.module.css";

export type SwitchProps = {
    on?: boolean;
    disabled?: boolean;
    label?: string;
    name?: string;
    size?: Size.Large | Size.Small;
    onChange?: (e: MouseEvent) => void;
};

export default function Switch({
    name,
    label,
    disabled,
    onChange,
    size = Size.Small,
    on = false,
}: SwitchProps): ReactElement<SwitchProps> {
    const id = label && generateRandomId();

    return (
        <div className={css.container}>
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
                    css.switch,
                    on ? css.active : css.inactive,
                    disabled && css.disabled,
                    size === Size.Small ? css.small : css.large,
                ])}
                value={on.toString()}
                onClick={onChange}
            >
                <div
                    className={merge([
                        css.indicator,
                        size === Size.Small ? css.small : css.large,
                        on ? css.active : css.inactive,
                    ])}
                />
            </button>
        </div>
    );
}
