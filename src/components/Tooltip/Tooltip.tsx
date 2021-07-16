/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@elements/Icon/Icon";
import { ReactComponent as IconQuestion } from "@elements/Icon/Svg/Question.svg";
import { Theme } from "@utilities/enum";
import { ReactElement, ReactNode, useState } from "react";
import { usePopper } from "react-popper";
import css from "./Tooltip.module.css";

export interface TooltipProps {
    tooltip: ReactNode;
    theme?: Theme;
}

const TOOLTIP_DISTANCE = 9;
const TOOLTIP_SKIDDING = 0;

export default function Tooltip({ tooltip, theme = Theme.Light }: TooltipProps): ReactElement<TooltipProps> {
    const [tooltipTriggerElement, setTooltipTriggerElement] = useState<HTMLDivElement | null>(null);
    const [tooltipElement, setTooltipElement] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(tooltipTriggerElement, tooltipElement, {
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
                ref={setTooltipTriggerElement}
                className={[css[`theme${theme}`], css.icon].join(" ")}
            >
                <IconQuestion size={IconSize.Size16} />
            </div>
            <div
                data-test-id="tooltip"
                ref={setTooltipElement}
                className={css.tooltip}
                style={styles.popper}
                {...attributes.popper}
            >
                {tooltip}
            </div>
        </>
    );
}
