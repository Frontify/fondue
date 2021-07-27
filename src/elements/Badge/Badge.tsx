/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps, IconSize } from "@elements/Icon/Icon";
import { Style } from "@utilities/enum";
import { merge } from "@utilities/merge";
import { cloneElement, FC, PropsWithChildren, ReactElement } from "react";

type StatusStyle = Style.Success | Style.Progress | Style.Warning | Style.Danger;

const statusClasses: Record<StatusStyle, string> = {
    [Style.Success]: "bg-green-60",
    [Style.Progress]: "bg-violet-60",
    [Style.Warning]: "bg-yellow-60",
    [Style.Danger]: "bg-red-60",
};

export type BadgeProps = PropsWithChildren<{
    icon?: ReactElement<IconProps>;
    status?: StatusStyle;
}>;

const Badge: FC<BadgeProps> = ({ children, status, icon }: BadgeProps) => {
    if (!children && !icon && !status) {
        return null;
    }

    return (
        <div
            className={merge([
                "h-6 bg-black-10 box-border text-black-80 dark:bg-black-100 dark:text-white inline-flex flex-auto gap-1 items-center justify-center rounded-full font-sans text-xxs font-normal text-center",
                (status && !icon && !children) || (!status && icon && !children) ? "w-6" : "px-2 py-1",
            ])}
            data-test-id="badge"
        >
            {status && (
                <i
                    data-test-id="badge-status"
                    className={`inline-block w-2 h-2 rounded-full ${statusClasses[status]}`}
                />
            )}
            {icon && <span data-test-id="badge-icon">{cloneElement(icon, { size: IconSize.Size12 })}</span>}
            {children}
        </div>
    );
};

export default Badge;
