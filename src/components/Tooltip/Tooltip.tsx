/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconQuestion from "@elements/Icon/Generated/IconQuestion";
import { IconSize } from "@elements/Icon/IconSize";
import { merge } from "@utilities/merge";
import { FC, ReactNode, useState } from "react";
import { usePopper } from "react-popper";

export type TooltipProps = {
    tooltip: ReactNode;
};

const TOOLTIP_DISTANCE = 9;
const TOOLTIP_SKIDDING = 0;

export const Tooltip: FC<TooltipProps> = ({ tooltip }) => {
    const [tooltipTriggerElement, setTooltipTriggerElement] = useState<HTMLElement | null>(null);
    const [tooltipElement, setTooltipElement] = useState<HTMLDivElement | null>(null);
    const [showTooltip, setShowTooltip] = useState(false);
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
            <i
                data-test-id="tooltip-icon"
                ref={setTooltipTriggerElement}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="inline-flex items-center justify-center text-black-60 hover:text-black dark:text-black-40 dark:hover:white"
            >
                <IconQuestion size={IconSize.Size16} />
            </i>
            <div
                data-test-id="tooltip"
                ref={setTooltipElement}
                style={styles.popper}
                {...attributes.popper}
                className={merge([
                    "p-4 border border-black-10 bg-white rounded-md shadow-mid dark:bg-black-90 dark:text-white",
                    showTooltip ? "visible" : "invisible",
                ])}
            >
                {tooltip}
            </div>
        </>
    );
};
