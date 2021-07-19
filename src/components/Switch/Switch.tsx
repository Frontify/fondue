/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Size } from "@utilities/enum";
import { MouseEvent, ReactElement } from "react";
import css from "./Switch.module.css";

export type SwitchProps = {
    on?: boolean;
    disabled?: boolean;
    name?: string;
    size?: Size.Large | Size.Small;
    onChange?: (e: MouseEvent) => void;
};

const merge = (classNames: (string | undefined | boolean)[]) => classNames.filter(Boolean).join(" ");

export default function Switch({
    name,
    disabled,
    onChange,
    size = Size.Small,
    on = false,
}: SwitchProps): ReactElement<SwitchProps> {
    return (
        <button
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
            <span
                className={merge([
                    css.indicator,
                    size === Size.Small ? css.small : css.large,
                    on ? css.active : css.inactive,
                ])}
            />
        </button>
    );
}
