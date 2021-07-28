/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps, IconSize } from "@elements/Icon/Icon";
import { merge } from "@utilities/merge";
import { cloneElement, FC, PropsWithChildren, ReactElement } from "react";

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

export type BadgeProps = PropsWithChildren<{
    icon?: ReactElement<IconProps>;
    status?: BadgeStatus;
}>;

const Badge: FC<BadgeProps> = ({ children, status, icon }: BadgeProps) => {
    if (!children && !icon && !status) {
        return null;
    }

    return (
        // This `inline-block` and the `float-left` on the child `<span>` was added, to remove
        // a 1px space before this component when using without the `icon`-prop
        <span className="inline-block">
            <span
                className={merge([
                    "float-left h-6 bg-black-10 text-black-80 dark:bg-black-100 dark:text-white inline-flex items-center justify-center rounded-full",
                    !children && (!status || !icon) ? "w-6" : "gap-x-1 pl-2 pr-[0.625rem]",
                ])}
                data-test-id="badge"
            >
                {status && (
                    <span data-test-id="badge-status" className={`w-2 h-2 rounded-full ${statusClasses[status]}`} />
                )}
                {icon && <span data-test-id="badge-icon">{cloneElement(icon, { size: IconSize.Size12 })}</span>}
                <span className="text-center text-xxs font-sans font-normal">{children}</span>
            </span>
        </span>
    );
};

export default Badge;
