/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from "@utilities/merge";
import React, { FC } from "react";

export enum LoadingCircleStyle {
    Progress = "Progress",
    Positive = "Positive",
    Danger = "Danger",
}

export enum LoadingCircleSize {
    ExtraSmall = "ExtraSmall",
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
}

export type LoadingCircleProps = {
    style?: LoadingCircleStyle;
    size?: LoadingCircleSize;
};

export const statusClasses: Record<LoadingCircleStyle, string> = {
    [LoadingCircleStyle.Progress]: "tw-border-violet-60",
    [LoadingCircleStyle.Positive]: "tw-border-green-60",
    [LoadingCircleStyle.Danger]: "tw-border-red-60",
};

export const sizeClasses: Record<LoadingCircleSize, string> = {
    [LoadingCircleSize.ExtraSmall]: "tw-w-[16px] tw-h-[16px]",
    [LoadingCircleSize.Small]: "tw-w-[20px] tw-h-[20px]",
    [LoadingCircleSize.Medium]: "tw-w-[32px] tw-h-[32px]",
    [LoadingCircleSize.Large]: "tw-w-[64px] tw-h-[64px]",
};

export const LoadingCircle: FC<LoadingCircleProps> = ({
    style = LoadingCircleStyle.Progress,
    size = LoadingCircleSize.Medium,
}) => {
    return (
        <div
            data-test-id="loading-circle"
            style={{ borderTopColor: "transparent" }}
            className={merge([
                "tw-border-2 tw-border-solid tw-rounded-full tw-animate-spin",
                statusClasses[style],
                sizeClasses[size],
            ])}
        ></div>
    );
};
