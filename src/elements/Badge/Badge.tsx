/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps, IconSize } from "@elements/Icon/Icon";
import RejectIcon from "@elements/Icon/Generated/IconReject";
import { merge } from "@utilities/merge";
import { cloneElement, FC, PropsWithChildren, ReactElement } from "react";

export enum Status {
    Positive = "Positive",
    Progress = "Progress",
    Warning = "Warning",
    Danger = "Danger",
}

const statusClasses: Record<Status, string> = {
    [Status.Positive]: "bg-green-60",
    [Status.Progress]: "bg-violet-60",
    [Status.Warning]: "bg-yellow-60",
    [Status.Danger]: "bg-red-60",
};

export enum Style {
    Primary = "Primary",
    Positive = "Positive",
    Progress = "Progress",
    Warning = "Warning",
    Danger = "Danger",
}

const styleClasses: Record<Style, string> = {
    [Style.Primary]: "bg-black-5 text-black-90 hover:bg-black-10 dark:text-black-10",
    [Style.Positive]: "bg-green-20 text-green-90 hover:bg-green-40 dark:text-green-50",
    [Style.Progress]: "bg-violet-20 text-violet-90 hover:bg-violet-40 dark:text-violet-40",
    [Style.Warning]: "bg-yellow-20 text-yellow-90 hover:bg-yellow-40 dark:text-yellow-50",
    [Style.Danger]: "bg-red-20 text-red-90 hover:bg-red-40 dark:text-red-50",
};

const dismissClasses: Record<Style, string> = {
    [Style.Primary]: "text-black-60 dark:text-black-40 dark:hover:text-white",
    [Style.Positive]: "text-green-90 dark:text-black-40 dark:hover:text-white",
    [Style.Progress]: "text-violet-90 dark:text-black-40 dark:hover:text-white",
    [Style.Warning]: "text-yellow-90 dark:text-black-40 dark:hover:text-white",
    [Style.Danger]: "text-red-90 dark:text-black-40 dark:hover:text-white",
};

export type BadgeProps = PropsWithChildren<{
    style?: Style;
    icon?: ReactElement<IconProps>;
    status?: Status;
    onClick?: () => void;
    onDismiss?: () => void;
}>;

const Badge: FC<BadgeProps> = ({ children, status, icon, style = Style.Primary, onClick, onDismiss }: BadgeProps) => {
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

export default Badge;
