/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, ReactElement } from "react";
import { merge } from "@utilities/merge";
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

type BrightHeaderProps = {
    variant: BrightHeaderVariants;
};

export const BrightHeader: FC<BrightHeaderProps> = ({ variant }) => {
    return (
        <div
            className={merge([
                "tw-h-9 tw-flex tw-justify-center tw-items-center tw-rounded-t-md tw-text-white",
                brightHeaderBackgroundColors[variant],
            ])}
        >
            {brightHeaderIcon[variant]}
        </div>
    );
};
