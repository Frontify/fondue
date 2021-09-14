/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { cloneElement, FC, ReactElement, ReactNode } from "react";
import { merge } from "@utilities/merge";
import { Button, ButtonStyle, ButtonSize } from "@elements/Button/Button";
import { IconSize } from "@elements/Icon/IconSize";
import IconInfo from "@elements/Icon/Generated/IconInfo";
import IconCheck from "@elements/Icon/Generated/IconCheck";
import IconCallout from "@elements/Icon/Generated/IconCallout";
import IconDocument from "@elements/Icon/Generated/IconDocument";

export enum BrightHeaderVariants {
    Information = "information",
    Warning = "warning",
    Tip = "tip",
    Note = "note",
}

const brightHeaderBackgroundColors: Record<BrightHeaderVariants, string> = {
    [BrightHeaderVariants.Information]: "tw-bg-violet-60",
    [BrightHeaderVariants.Warning]: "tw-bg-red-60",
    [BrightHeaderVariants.Tip]: "tw-bg-green-60",
    [BrightHeaderVariants.Note]: "tw-bg-yellow-60",
};

const brightHeaderIcon: Record<BrightHeaderVariants, ReactElement> = {
    [BrightHeaderVariants.Information]: <IconInfo />,
    [BrightHeaderVariants.Warning]: <IconCallout />,
    [BrightHeaderVariants.Tip]: <IconCheck />,
    [BrightHeaderVariants.Note]: <IconDocument />,
};

export type TooltipProps = {
    tooltip: ReactNode;
    brightHeader?: BrightHeaderVariants;
    buttons?: boolean;
    heading?: ReactNode;
};

export const Tooltip: FC<TooltipProps> = ({ tooltip, brightHeader, buttons, heading }) => {
    return (
        <>
            {/* Bright Header */}
            <div className="tw-inline-block tw-max-w-[200px] tw-bg-black-100 dark:tw-bg-white tw-rounded-md tw-shadow-mid tw-text-white dark:tw-text-black-100 tw-z-20">
                {brightHeader && (
                    <div
                        className={merge([
                            "tw-h-9 tw-flex tw-justify-center tw-items-center tw-rounded-t-md tw-text-white",
                            brightHeaderBackgroundColors[brightHeader],
                        ])}
                    >
                        {cloneElement(brightHeaderIcon[brightHeader], { size: IconSize.Size20 })}
                    </div>
                )}
                {/* Tooltip body */}
                <div data-test-id="tooltip" className="tw-p-4">
                    {/* Heading */}
                    {heading && <h4 className="tw-text-m tw-font-bold">{heading}</h4>}
                    {/* Tooltip message */}
                    <p>{tooltip}</p>
                    {/* Controls (buttons) */}
                    {buttons && (
                        <div className="tw-grid tw-grid-cols-2 tw-gap-1 tw-mt-4">
                            <Button style={ButtonStyle.Secondary} size={ButtonSize.Small}>
                                Secondary
                            </Button>
                            <Button style={ButtonStyle.Primary} size={ButtonSize.Small}>
                                Primary
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
