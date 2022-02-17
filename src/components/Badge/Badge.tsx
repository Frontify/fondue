/* (c) Copyright Frontify Ltd., all rights reserved. */

import RejectIcon from "@foundation/Icon/Generated/IconReject";
import { IconProps } from "@foundation/Icon/IconProps";
import { IconSize } from "@foundation/Icon/IconSize";
import { getColorDisplayValue } from "@utilities/colors";
import { merge } from "@utilities/merge";
import React, { cloneElement, FC, PropsWithChildren, ReactElement, ReactNode } from "react";
import { Color, ColorFormat } from "../../types";

export enum BadgeStatus {
    Positive = "Positive",
    Progress = "Progress",
    Warning = "Warning",
    Danger = "Danger",
}

const statusClasses: Record<BadgeStatus, string> = {
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

const getStyleClasses = (style: BadgeStyle, hasHover: boolean, strong: boolean): string =>
    (strong
        ? {
              [BadgeStyle.Primary]: merge([
                  "tw-bg-box-neutral-strong tw-text-box-neutral-strong-inverse",
                  hasHover && "hover:tw-bg-box-neutral-strong-hover hover:tw-text-box-neutral-strong-inverse-hover",
              ]),
              [BadgeStyle.Positive]: merge([
                  "tw-bg-box-positive-strong tw-text-box-positive-strong-inverse",
                  hasHover && "hover:tw-bg-box-positive-strong-hover hover:tw-text-box-positive-strong-inverse-hover",
              ]),
              [BadgeStyle.Danger]: merge([
                  "tw-bg-box-negative-strong tw-text-box-negative-strong-inverse",
                  hasHover && "hover:tw-bg-box-negative-strong-hover hover:tw-text-box-negative-strong-inverse-hover",
              ]),
              [BadgeStyle.Progress]: merge([
                  "tw-bg-box-selected-strong tw-text-box-selected-strong-inverse",
                  hasHover && "hover:tw-bg-box-selected-strong-hover hover:tw-text-box-selected-strong-inverse-hover",
              ]),
              [BadgeStyle.Warning]: merge([
                  "tw-bg-box-warning-strong tw-text-box-warning-strong-inverse",
                  hasHover && "hover:tw-bg-box-warning-strong-hover hover:tw-text-box-warning-strong-inverse-hover",
              ]),
          }
        : {
              [BadgeStyle.Primary]: merge([
                  "tw-bg-box-neutral tw-text-text-weak",
                  hasHover && "hover:tw-bg-box-neutral-hover hover:tw-bg-box-neutral-inverse-hover",
              ]),
              [BadgeStyle.Positive]: merge([
                  "tw-bg-box-positive tw-text-box-positive-inverse",
                  hasHover && "hover:tw-bg-box-positive-hover hover:tw-text-box-positive-inverse-hover",
              ]),
              [BadgeStyle.Progress]: merge([
                  "tw-bg-box-selected tw-text-bg-box-selected-inverse",
                  hasHover && "hover:tw-bg-box-selected-hover hover:tw-text-box-selected-inverse-hover",
              ]),
              [BadgeStyle.Warning]: merge([
                  "tw-bg-box-warning tw-text-box-warning-inverse",
                  hasHover && "hover:tw-bg-box-warning-hover hover:tw-text-box-warning-inverse-hover",
              ]),
              [BadgeStyle.Danger]: merge([
                  "tw-bg-box-negative tw-text-box-negative-inverse",
                  hasHover && "hover:tw-bg-box-negative-hover hover:tw-text-box-negative-inverse-hover",
              ]),
          })[style] ?? "";

const isBadgeStatus = (style: BadgeStatus | Color): style is BadgeStatus =>
    Object.values(BadgeStatus).includes(style as BadgeStatus);

const getSizeClasses = (children: ReactNode, hasExtra: boolean, isSmall: boolean) => {
    const isCircular = !children && hasExtra;
    const sizeClasses = [isSmall ? "tw-h-5" : "tw-h-6"];

    if (isCircular) {
        sizeClasses.push(isSmall ? "tw-w-5" : "tw-w-6");
    } else {
        sizeClasses.push(...[isSmall ? "tw-px-1.5" : "tw-px-2.5", isSmall ? "tw-gap-x-0.5" : "tw-gap-x-1"]);
    }
    return sizeClasses.join(" ");
};

export type BadgeProps = PropsWithChildren<{
    style?: BadgeStyle;
    icon?: ReactElement<IconProps>;
    status?: BadgeStatus | Color;
    onClick?: () => void;
    onDismiss?: () => void;
    disabled?: boolean;
    emphasis?: "Strong" | "None";
    size?: "s" | "m";
}>;

export const Badge: FC<BadgeProps> = ({
    children,
    status,
    icon,
    style = BadgeStyle.Primary,
    size = "m",
    emphasis = "None",
    disabled = false,
    onClick,
    onDismiss,
}) => {
    if (!children && !icon && !status) {
        return null;
    }

    const Container = onClick ? "a" : "span";

    return (
        // This `tw-inline-block` and the `tw-float-left` on the first child was added, to remove
        // a 1px space before this component when using without the `icon`-prop
        <span className="tw-inline-block">
            <Container
                onClick={() => onClick && onClick()}
                className={merge([
                    "tw-float-left tw-inline-flex tw-items-center tw-justify-center tw-rounded-full tw-transition-color tw-select-none",
                    disabled
                        ? "tw-bg-box-disabled tw-text-box-disabled-inverse"
                        : getStyleClasses(style, !!onClick, emphasis === "Strong"),
                    onClick && !disabled ? "hover:tw-cursor-pointer" : "tw-cursor-default",
                    getSizeClasses(children, Boolean(status || icon), size === "s"),
                ])}
                data-test-id="badge"
            >
                {status && (
                    <span
                        data-test-id="badge-status"
                        className={merge([
                            "tw-w-2 tw-h-2 tw-rounded-full",
                            disabled && "tw-opacity-30",
                            isBadgeStatus(status) && statusClasses[status],
                        ])}
                        style={
                            isBadgeStatus(status)
                                ? {}
                                : { backgroundColor: getColorDisplayValue(status, ColorFormat.Rgba, true) }
                        }
                    />
                )}
                {icon && (
                    <span data-test-id="badge-icon" className={merge([disabled && "tw-opacity-30"])}>
                        {cloneElement(icon, { size: IconSize.Size16 })}
                    </span>
                )}
                <span className="tw-text-center tw-text-xxs tw-font-sans tw-font-normal">{children}</span>
                {onDismiss && (
                    <button
                        data-test-id="badge-dismiss"
                        onClick={(event) => {
                            event.stopPropagation();
                            onDismiss();
                        }}
                    >
                        <RejectIcon size={IconSize.Size12} />
                    </button>
                )}
            </Container>
        </span>
    );
};
