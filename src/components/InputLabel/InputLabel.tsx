/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as IconQuestion } from "@components/Icon/Svg/Question.svg";
import { Theme } from "@utilities/enum";
import { ReactElement, ReactNode, useRef } from "react";
import { usePopper } from "react-popper";
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
    const tooltipIconRef = useRef(null);
    const tooltipRef = useRef(null);
    const { styles, attributes } = usePopper(tooltipIconRef.current, tooltipRef.current, {
        placement: "auto",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 9],
                },
            },
        ],
    });

    return (
        <div className={[css.container, css[`theme${theme}`], disabled && css.disabled].filter(Boolean).join(" ")}>
            <label
                htmlFor={htmlFor}
                className={[css.label, css[`theme${theme}`], disabled && css.disabled].filter(Boolean).join(" ")}
                data-test-id="input-label"
            >
                {children}
            </label>
            {required && <span className={css.asterisk}>*</span>}
            {tooltip && (
                <>
                    <div ref={tooltipIconRef} className={css.icon}>
                        <IconQuestion size={IconSize.Size16} />
                    </div>
                    <div className={css.tooltip} ref={tooltipRef} style={styles.popper} {...attributes.popper}>
                        {tooltip}
                    </div>
                </>
            )}
        </div>
    );
}
