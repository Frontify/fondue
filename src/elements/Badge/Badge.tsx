/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cloneElement, FC, PropsWithChildren, ReactElement } from "react";
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
    [BadgeStatus.Positive]: "bg-green-60",
    [BadgeStatus.Progress]: "bg-violet-60",
    [BadgeStatus.Warning]: "bg-yellow-60",
    [BadgeStatus.Danger]: "bg-red-60",
};

export enum BadgeStyle {
    Primary = "Primary",
    Positive = "Positive",
    Progress = "Progress",
    Warning = "Warning",
    Danger = "Danger",
}

const styleClasses: Record<BadgeStyle, string> = {
    [BadgeStyle.Primary]: "bg-black-5 text-black-90 hover:bg-black-10 dark:text-black-10",
    [BadgeStyle.Positive]: "bg-green-20 text-green-90 hover:bg-green-40 dark:text-green-50",
    [BadgeStyle.Progress]: "bg-violet-20 text-violet-90 hover:bg-violet-40 dark:text-violet-40",
    [BadgeStyle.Warning]: "bg-yellow-20 text-yellow-90 hover:bg-yellow-40 dark:text-yellow-50",
    [BadgeStyle.Danger]: "bg-red-20 text-red-90 hover:bg-red-40 dark:text-red-50",
};

const dismissClasses: Record<BadgeStyle, string> = {
    [BadgeStyle.Primary]: "text-black-60 dark:text-black-40 dark:hover:text-white",
    [BadgeStyle.Positive]: "text-green-90 dark:text-black-40 dark:hover:text-white",
    [BadgeStyle.Progress]: "text-violet-90 dark:text-black-40 dark:hover:text-white",
    [BadgeStyle.Warning]: "text-yellow-90 dark:text-black-40 dark:hover:text-white",
    [BadgeStyle.Danger]: "text-red-90 dark:text-black-40 dark:hover:text-white",
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
        // This `inline-block` and the `float-left` on the first child was added, to remove
        // a 1px space before this component when using without the `icon`-prop
        <span className="inline-block">
            <Container
                onClick={() => onClick && onClick()}
                className={merge([
                    "float-left h-6 inline-flex items-center justify-center rounded-full transition-color dark:bg-black-95 dark:hover:bg-black-superdark",
                    styleClasses[style],
                    onClick && "hover:cursor-pointer",
                    !children && (!status || !icon)
                        ? "w-6"
                        : children && !icon && !status
                        ? "gap-x-1 px-2"
                        : "gap-x-1 pl-2 pr-[0.625rem]",
                ])}
                data-test-id="badge"
            >
                {status && (
                    <span data-test-id="badge-status" className={`w-2 h-2 rounded-full ${statusClasses[status]}`} />
                )}
                {icon && <span data-test-id="badge-icon">{cloneElement(icon, { size: IconSize.Size12 })}</span>}
                <span className="text-center text-xxs font-sans font-normal">{children}</span>
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
