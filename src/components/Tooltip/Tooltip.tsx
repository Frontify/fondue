/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, ReactNode, useState } from "react";
import IconQuestion from "@elements/Icon/Generated/IconQuestion";
import { IconSize } from "@elements/Icon/IconSize";
import { merge } from "@utilities/merge";
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
                className="tw-inline-flex tw-items-center tw-justify-center tw-text-black-60 hover:tw-text-black dark:tw-text-black-40 dark:hover:white"
            >
                <IconQuestion size={IconSize.Size16} />
            </i>
            <div
                data-test-id="tooltip"
                ref={setTooltipElement}
                style={styles.popper}
                {...attributes.popper}
                className={merge([
                    "tw-p-4 tw-border tw-border-black-10 tw-bg-white tw-rounded-md tw-shadow-mid dark:tw-bg-black-90 dark:tw-text-white tw-z-20",
                    showTooltip ? "tw-visible" : "tw-invisible",
                ])}
            >
                {tooltip}
            </div>
        </>
    );
};
