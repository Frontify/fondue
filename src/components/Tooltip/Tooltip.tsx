/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as IconQuestion } from "@components/Icon/Svg/Question.svg";
import { Theme } from "@utilities/enum";
import { ReactElement, ReactNode, useRef } from "react";
import { usePopper } from "react-popper";
import css from "./Tooltip.module.css";

export interface TooltipProps {
    tooltip: ReactNode;
    theme?: Theme;
}

const TOOLTIP_DISTANCE = 9;
const TOOLTIP_SKIDDING = 0;

export default function Tooltip({ tooltip, theme = Theme.Light }: TooltipProps): ReactElement<TooltipProps> {
    const tooltipIconRef = useRef(null);
    const tooltipRef = useRef(null);
    const { styles, attributes } = usePopper(tooltipIconRef.current, tooltipRef.current, {
        placement: "auto-end",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [TOOLTIP_SKIDDING, TOOLTIP_DISTANCE],
                },
            },
        ],
    });

    return (
        <>
            <div
                data-test-id="tooltip-icon"
                ref={tooltipIconRef}
                className={[css[`theme${theme}`], css.icon].join(" ")}
            >
                <IconQuestion size={IconSize.Size16} />
            </div>
            <div
                data-test-id="tooltip"
                ref={tooltipRef}
                className={css.tooltip}
                style={styles.popper}
                {...attributes.popper}
            >
                {tooltip}
            </div>
        </>
    );
}
