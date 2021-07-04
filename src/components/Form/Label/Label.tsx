/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, ReactNode, useState } from "react";
import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as IconQuestion } from "@components/Icon/Svg/Question.svg";
import { usePopper } from "react-popper";
import css from "./Label.module.css";

export enum LabelTheme {
    Light = "Light",
    Dark = "Dark",
}

export interface LabelProps {
    children: ReactNode;
    htmlFor: string;
    required?: boolean;
    disabled?: boolean;
    tooltip?: ReactNode;
    theme?: LabelTheme;
}

export default function Label({
    children,
    htmlFor,
    required = false,
    disabled = false,
    tooltip,
    theme = LabelTheme.Light,
}: LabelProps): ReactElement<LabelProps> {
    const [iconElement, setIconElement] = useState<HTMLDivElement | null>(null);
    const [tooltipElement, setTooltipElement] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(iconElement, tooltipElement, {
        placement: "right",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 9],
                },
            },
        ],
    });
    const containerClasses = [css.container, css[`theme${theme}`], ...(disabled ? [css.disabled] : [])].join(" ");

    return (
        <div className={containerClasses}>
            <label htmlFor={htmlFor} data-test-id="label">
                {children}
            </label>
            {required && <span className={css.asterisk}>*</span>}
            {tooltip && (
                <>
                    <div ref={setIconElement} className={css.icon}>
                        <IconQuestion size={IconSize.Size16} />
                    </div>
                    <div className={css.tooltip} ref={setTooltipElement} style={styles.popper} {...attributes.popper}>
                        {tooltip}
                    </div>
                </>
            )}
        </div>
    );
}
