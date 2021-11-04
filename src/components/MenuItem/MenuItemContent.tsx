/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@foundation/Icon/IconSize";
import { merge } from "@utilities/merge";
import React, { cloneElement, FC, HTMLAttributes, ReactElement, ReactNode } from "react";

export enum MenuItemContentSize {
    Small = "Small",
    Large = "Large",
}

export enum MenuItemContentStyle {
    Primary = "Primary",
    Danger = "Danger",
}

export type MenuItemContentProps = {
    title: ReactNode;
    decorator?: ReactElement;
    iconLabel?: string;
    subtitle?: string;
    size?: MenuItemContentSize;
    ariaProps?: HTMLAttributes<HTMLElement>;
};

export const MenuItemContent: FC<MenuItemContentProps> = ({
    title,
    decorator,
    subtitle,
    ariaProps,
    size = MenuItemContentSize.Small,
}) => (
    <div
        {...ariaProps}
        data-test-id="menu-item-content"
        className={merge([
            "tw-flex tw-box-border tw-items-center tw-font-sans tw-text-s",
            size === MenuItemContentSize.Large ? "tw-gap-3" : "tw-gap-2",
        ])}
    >
        {decorator && (
            <span className="tw-flex-shrink-0" data-test-id="menu-item-decorator">
                {cloneElement(decorator, {
                    size: size === MenuItemContentSize.Small ? IconSize.Size16 : IconSize.Size20,
                })}
            </span>
        )}
        <div className="tw-flex-1 tw-overflow-hidden tw-overflow-ellipsis tw-whitespace-nowrap">
            <div
                data-test-id="menu-item-title"
                className="tw-select-none"
                title={typeof title === "string" ? title : ""}
            >
                {title}
            </div>
            {subtitle && size === MenuItemContentSize.Large && (
                <div data-test-id="menu-item-subtitle" className="tw-select-none tw-text-xxs" title={subtitle}>
                    {subtitle}
                </div>
            )}
        </div>
    </div>
);
