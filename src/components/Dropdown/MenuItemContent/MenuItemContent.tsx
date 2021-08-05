/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, ReactElement } from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize } from "@elements/Icon/IconSize";
import IconCaretRight from "@elements/Icon/Generated/IconCaretRight";
import IconCheck from "@elements/Icon/Generated/IconCheck";

export enum SelectionIndicatorIcon {
    Check = "Check",
    CaretRight = "CaretRight",
}

export enum MenuItemContentSize {
    Small = "Small",
    Large = "Large",
}

export enum MenuItemContentStyle {
    Primary = "Primary",
    Danger = "Danger",
}

type MenuItemContentBase = {
    id: string;
    title: string;
    icon?: ReactElement<IconProps>;
    style?: MenuItemContentStyle;
    disabled?: boolean;
    active?: boolean;
    subtitle?: string;
    size?: MenuItemContentSize;
    selectionIndicator?: SelectionIndicatorIcon;
};

export type MenuItem =
    | (MenuItemContentBase & {
          size: MenuItemContentSize.Small;
          subtitle?: undefined;
      })
    | (MenuItemContentBase & {
          size: MenuItemContentSize.Large;
          subtitle: string;
      });

export type MenuItemContentProps = Omit<MenuItem, "id">;

export const MenuItemContent: FC<MenuItemContentProps> = ({
    title,
    icon,
    subtitle,
    size = MenuItemContentSize.Small,
    style = MenuItemContentStyle.Primary,
    disabled = false,
    active = false,
    selectionIndicator = SelectionIndicatorIcon.Check,
}) => {
    const isDanger = style === MenuItemContentStyle.Danger;
    /* eslint-disable jsx-a11y/no-noninteractive-tabindex,jsx-a11y/tabindex-no-positive */
    return (
        <div
            data-test-id={icon !== undefined ? "dropdown-menu-item-icon" : "dropdown-menu-item-text"}
            className={`relative flex box-border items-center rounded cursor-pointer font-sans text-s gap-3 transition-colors py-3 px-5
            ${size === MenuItemContentSize.Small ? "min-h-[36px]" : "min-h-[62px]"}
            ${
                disabled
                    ? `bg-black-0 pointer-events-none ${isDanger ? "text-red-40" : "text-black-40"}`
                    : active
                    ? `font-medium ${isDanger ? "text-red-70" : "text-black"}`
                    : isDanger
                    ? "text-red-60"
                    : "text-black-80"
            }
            ${isDanger ? "hover:text-red-70" : "hover:text-black"}`}
            tabIndex={1}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <div className="flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                <div data-test-id="dropdown-menu-item-title" className="select-none" title={title}>
                    {title}
                </div>
                {subtitle && (
                    <div data-test-id="dropdown-menu-item-subtitle" className="select-none text-xxs" title={subtitle}>
                        {subtitle}
                    </div>
                )}
            </div>
            {active &&
                (selectionIndicator === SelectionIndicatorIcon.Check ? (
                    <IconCheck data-test-id="dropdown-menu-item-active" size={IconSize.Size20} />
                ) : (
                    <IconCaretRight data-test-id="dropdown-menu-item-active" size={IconSize.Size20} />
                ))}
        </div>
    );
    /* eslint-enable jsx-a11y/no-noninteractive-tabindex,jsx-a11y/tabindex-no-positive */
};
