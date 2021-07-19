/* (c) Copyright Frontify Ltd., all rights reserved. */

import Tooltip from "@components/Tooltip/Tooltip";
import { Theme } from "@utilities/enum";
import { ReactElement, ReactNode } from "react";
import css from "./InputLabel.module.css";

export interface InputLabelProps {
    children: ReactNode;
    htmlFor: string;
    required?: boolean;
    disabled?: boolean;
    tooltip?: ReactNode;
    theme?: Theme;
}

export default function InputLabel({
    children,
    htmlFor,
    required = false,
    disabled = false,
    tooltip,
    theme = Theme.Light,
}: InputLabelProps): ReactElement<InputLabelProps> {
    return (
        <div className={[css.container, css[`theme${theme}`], disabled && css.disabled].filter(Boolean).join(" ")}>
            <label
                htmlFor={htmlFor}
                className={[css.label, css[`theme${theme}`], disabled && css.disabled].filter(Boolean).join(" ")}
                data-test-id="input-label"
            >
                {children}
            </label>
            {required && (
                <span data-test-id="input-label-required" className={css.asterisk}>
                    *
                </span>
            )}
            {tooltip && <Tooltip tooltip={tooltip} theme={theme} />}
        </div>
    );
}
