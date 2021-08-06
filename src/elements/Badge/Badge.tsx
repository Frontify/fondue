/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { cloneElement, FC, PropsWithChildren, ReactElement } from "react";
import RejectIcon from "@elements/Icon/Generated/IconReject";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize } from "@elements/Icon/IconSize";
import { merge } from "@utilities/merge";

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

const styleClasses: Record<BadgeStyle, string> = {
    [BadgeStyle.Primary]: "tw-bg-black-5 tw-text-black-90 hover:tw-bg-black-10 dark:tw-text-black-10",
    [BadgeStyle.Positive]: "tw-bg-green-20 tw-text-green-90 hover:tw-bg-green-40 dark:tw-text-green-50",
    [BadgeStyle.Progress]: "tw-bg-violet-20 tw-text-violet-90 hover:tw-bg-violet-40 dark:tw-text-violet-40",
    [BadgeStyle.Warning]: "tw-bg-yellow-20 tw-text-yellow-90 hover:tw-bg-yellow-40 dark:tw-text-yellow-50",
    [BadgeStyle.Danger]: "tw-bg-red-20 tw-text-red-90 hover:tw-bg-red-40 dark:tw-text-red-50",
};

const dismissClasses: Record<BadgeStyle, string> = {
    [BadgeStyle.Primary]: "tw-text-black-60 dark:tw-text-black-40 dark:hover:tw-text-white",
    [BadgeStyle.Positive]: "tw-text-green-90 dark:tw-text-black-40 dark:hover:tw-text-white",
    [BadgeStyle.Progress]: "tw-text-violet-90 dark:tw-text-black-40 dark:hover:tw-text-white",
    [BadgeStyle.Warning]: "tw-text-yellow-90 dark:text-black-40 dark:hover:tw-text-white",
    [BadgeStyle.Danger]: "tw-text-red-90 dark:text-black-40 dark:hover:tw-text-white",
};

export type BadgeProps = PropsWithChildren<{
    style?: BadgeStyle;
    icon?: ReactElement<IconProps>;
    status?: BadgeStatus;
    onClick?: () => void;
    onDismiss?: () => void;
}>;

export const Badge: FC<BadgeProps> = ({ children, status, icon, style = BadgeStyle.Primary, onClick, onDismiss }) => {
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
                    "tw-float-left tw-h-6 tw-inline-flex tw-items-center tw-justify-center tw-rounded-full transition-color dark:tw-bg-black-95 dark:hover:tw-bg-black-superdark",
                    styleClasses[style],
                    onClick && "hover:tw-cursor-pointer",
                    !children && (!status || !icon)
                        ? "tw-w-6"
                        : children && !icon && !status
                        ? "tw-gap-x-1 tw-px-2"
                        : "tw-gap-x-1 tw-pl-2 pr-[0.625rem]",
                ])}
                data-test-id="badge"
            >
                {status && (
                    <span data-test-id="badge-status" className={`tw-w-2 tw-h-2 tw-rounded-full ${statusClasses[status]}`} />
                )}
                {icon && <span data-test-id="badge-icon">{cloneElement(icon, { size: IconSize.Size12 })}</span>}
                <span className="tw-text-center tw-text-xxs tw-font-sans tw-font-normal">{children}</span>
                {onDismiss && (
                    <button
                        data-test-id="badge-icon"
                        className={dismissClasses[style]}
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
