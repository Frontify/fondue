/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { cloneElement, FC, ReactElement, ReactNode } from "react";
import { IconSize } from "@elements/Icon/IconSize";
import { BrightHeader, BrightHeaderStyle } from "./BrightHeader";
import { Button, ButtonStyle, ButtonSize } from "@elements/Button/Button";

export type TooltipButton = {
    label: string;
    action: () => void;
};

export type TooltipProps = {
    tooltip: ReactNode;
    tooltipIcon?: ReactElement;
    heading?: ReactNode;
    headingIcon?: ReactElement;
    linkUrl?: string;
    linkLabel?: string;
    brightHeader?: BrightHeaderStyle;
    buttons?: [TooltipButton, TooltipButton];
};

export const Tooltip: FC<TooltipProps> = ({
    tooltip,
    tooltipIcon,
    heading,
    headingIcon,
    linkUrl,
    linkLabel,
    brightHeader,
    buttons,
}) => {
    return (
        <>
            <div className="tw-inline-block tw-max-w-[200px] tw-bg-black-100 dark:tw-bg-white tw-rounded-md tw-shadow-mid tw-text-white dark:tw-text-black-100 tw-z-20">
                {brightHeader && <BrightHeader headerStyle={brightHeader} />}
                <div data-test-id="tooltip" className="tw-p-4">
                    {heading && headingIcon && (
                        <h4 className="tw-flex tw-text-m tw-font-bold tw-mb-1">
                            <span className="tw-mr-1.5">
                                {headingIcon && cloneElement(headingIcon, { size: IconSize.Size20 })}
                            </span>
                            {heading}
                        </h4>
                    )}
                    <div className="tw-flex">
                        {tooltipIcon && (
                            <span className="tw-flex-shrink-0 tw-mr-1">
                                {cloneElement(tooltipIcon, { size: IconSize.Size16 })}
                            </span>
                        )}
                        <p className="tw-text-s">{tooltip}</p>
                    </div>
                    {linkUrl && (
                        <a
                            data-test-id="tooltip-link"
                            href={linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tw-text-xs tw-text-black-40 dark:tw-text-black-80 tw-underline tw-mt-1"
                        >
                            {linkLabel ?? "Click here to learn more."}
                        </a>
                    )}
                    {buttons && buttons.length > 0 && (
                        <div className="tw-grid tw-grid-cols-2 tw-gap-x-1 tw-mt-4">
                            <Button style={ButtonStyle.Secondary} size={ButtonSize.Small} onClick={buttons[0].action}>
                                {buttons[0].label}
                            </Button>
                            <Button style={ButtonStyle.Primary} size={ButtonSize.Small} onClick={buttons[1].action}>
                                {buttons[1].label}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
