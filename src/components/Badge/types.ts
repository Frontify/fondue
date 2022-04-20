/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps } from "@foundation/Icon/IconProps";
import { PropsWithChildren, ReactElement } from "react";
import { Color } from "../../types";

export type BadgeProps = PropsWithChildren<{
    style?: BadgeStyle;
    icon?: ReactElement<IconProps>;
    status?: BadgeStatus | Color | string;
    onClick?: () => void;
    onDismiss?: () => void;
    disabled?: boolean;
    emphasis?: BadgeEmphasis;
    size?: "s" | "m";
}>;

export enum BadgeStatus {
    Positive = "Positive",
    Progress = "Progress",
    Warning = "Warning",
    Danger = "Danger",
}

export const badgeStatusClasses: Record<BadgeStatus, string> = {
    [BadgeStatus.Positive]: "tw-bg-green-60",
    [BadgeStatus.Progress]: "tw-bg-violet-60",
    [BadgeStatus.Warning]: "tw-bg-yellow-60",
    [BadgeStatus.Danger]: "tw-bg-red-60",
};

export enum BadgeStyle {
    Primary = "Primary",
    Positive = "Positive",
    Progress = "Progress",
    Warning = "Warning",
    Danger = "Danger",
}

export enum BadgeEmphasis {
    Strong = "Strong",
    None = "None",
}
