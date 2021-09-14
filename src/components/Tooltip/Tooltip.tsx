/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, ReactElement, ReactNode } from "react";
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
    [BrightHeaderVariants.Information]: <IconInfo size={IconSize.Size20} />,
    [BrightHeaderVariants.Warning]: <IconCallout size={IconSize.Size20} />,
    [BrightHeaderVariants.Tip]: <IconCheck size={IconSize.Size20} />,
    [BrightHeaderVariants.Note]: <IconDocument size={IconSize.Size20} />,
};

export type TooltipProps = {
    tooltip: ReactNode;
    brightHeader?: BrightHeaderVariants;
    heading?: ReactNode;
    headingIcon?: ReactElement;
    buttons: [TooltipButton, TooltipButton];
};

export type TooltipButton = {
    label: string;
    action: () => void;
};

export const Tooltip: FC<TooltipProps> = ({ tooltip, brightHeader, buttons, heading, headingIcon }) => {
    // to refactor using union types
    let headingAndIconArePresent = false;

    if (heading !== null || ("undefined" && headingIcon !== null) || "undefined") {
        headingAndIconArePresent = true;
    }

    const showButtons = buttons !== undefined && Object.keys(buttons).length === 2;

    return (
        <>
            <div className="tw-inline-block tw-max-w-[200px] tw-bg-black-100 dark:tw-bg-white tw-rounded-md tw-shadow-mid tw-text-white dark:tw-text-black-100 tw-z-20">
                {brightHeader && (
                    <div
                        className={merge([
                            "tw-h-9 tw-flex tw-justify-center tw-items-center tw-rounded-t-md tw-text-white",
                            brightHeaderBackgroundColors[brightHeader],
                        ])}
                    >
                        {brightHeaderIcon[brightHeader]}
                    </div>
                )}
                <div data-test-id="tooltip" className="tw-p-4">
                    {headingAndIconArePresent && (
                        <h4 className="tw-text-m tw-font-bold">
                            {/* {cloneElement(headingIcon, { size: IconSize.Size20 })} */}
                            {heading}
                        </h4>
                    )}
                    <p>{tooltip}</p>
                    {showButtons && (
                        <div className="tw-grid tw-grid-cols-2 tw-gap-1 tw-mt-4">
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
