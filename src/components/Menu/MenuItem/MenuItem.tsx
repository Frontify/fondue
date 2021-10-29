/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItemContent, MenuItemContentProps, MenuItemContentSize } from "@components/Menu/MenuItem/MenuItemContent";
import IconCaretRight from "@elements/Icon/Generated/IconCaretRight";
import IconCheck from "@elements/Icon/Generated/IconCheck";
import { IconSize } from "@elements/Icon/IconSize";
import { merge } from "@utilities/merge";
import React, { FC } from "react";

export enum MenuItemStyle {
    Primary = "Primary",
    Danger = "Danger",
}

export enum SelectionIndicatorIcon {
    Check = "Check",
    CaretRight = "CaretRight",
    None = "None",
}

export type MenuItemProps = {
    style?: MenuItemStyle;
    size?: MenuItemContentSize;
    disabled?: boolean;
    active?: boolean;
    selectionIndicator?: SelectionIndicatorIcon;
} & Omit<MenuItemContentProps, "iconSize">;

export const MenuItem: FC<MenuItemProps> = ({
    title,
    decorator,
    subtitle,
    size = MenuItemContentSize.Small,
    style = MenuItemStyle.Primary,
    disabled = false,
    active = false,
    selectionIndicator = SelectionIndicatorIcon.Check,
}) => {
    const isDangerStyle = style === MenuItemStyle.Danger;

    const currentIcon = {
        [SelectionIndicatorIcon.CaretRight]: <IconCaretRight data-test-id="menu-item-caret" size={IconSize.Size20} />,
        [SelectionIndicatorIcon.Check]: active && <IconCheck data-test-id="menu-item-active" size={IconSize.Size20} />,
        [SelectionIndicatorIcon.None]: null,
    }[selectionIndicator];

    return (
        <div
            className={merge([
                "tw-rounded tw-cursor-pointer tw-flex tw-items-center tw-justify-between tw-transition-colors",
                isDangerStyle ? "hover:tw-text-red-70" : "hover:tw-text-black",
                size === MenuItemContentSize.Small
                    ? "tw-px-5 tw-py-2.5 tw-min-h-[36px]"
                    : "tw-px-5 tw-py-3 tw-min-h-[60px]",
                disabled &&
                    `tw-bg-black-0 tw-pointer-events-none ${isDangerStyle ? "tw-text-red-40" : "tw-text-black-40"}`,
                active && `tw-font-medium ${isDangerStyle ? "tw-text-red-70" : "tw-text-black"}`,
                !disabled && !active && (isDangerStyle ? "tw-text-red-60" : "tw-text-black-80"),
            ])}
        >
            {size === MenuItemContentSize.Small ? (
                <MenuItemContent title={title} decorator={decorator} size={size} />
            ) : (
                <MenuItemContent title={title} decorator={decorator} subtitle={subtitle} size={size} />
            )}
            {currentIcon}
        </div>
    );
};
