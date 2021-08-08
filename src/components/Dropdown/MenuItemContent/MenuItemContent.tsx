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
            className={`tw-relative tw-flex tw-box-border tw-items-center tw-rounded tw-cursor-pointer tw-font-sans tw-text-s tw-gap-3 tw-transition-colors tw-py-3 tw-px-5
            ${size === MenuItemContentSize.Small ? "tw-min-h-[36px]" : "tw-min-h-[62px]"}
            ${
                disabled
                    ? `tw-bg-black-0 tw-pointer-events-none ${isDanger ? "tw-text-red-40" : "tw-text-black-40"}`
                    : active
                    ? `tw-font-medium ${isDanger ? "tw-text-red-70" : "tw-text-black"}`
                    : isDanger
                    ? "tw-text-red-60"
                    : "tw-text-black-80"
            }
            ${isDanger ? "hover:tw-text-red-70" : "hover:tw-text-black"}`}
            tabIndex={1}
        >
            {icon && <span className="tw-flex-shrink-0">{icon}</span>}
            <div className="tw-flex-1 tw-overflow-hidden tw-overflow-ellipsis tw-whitespace-nowrap">
                <div data-test-id="dropdown-menu-item-title" className="tw-select-none" title={title}>
                    {title}
                </div>
                {subtitle && (
                    <div
                        data-test-id="dropdown-menu-item-subtitle"
                        className="tw-select-none tw-text-xxs"
                        title={subtitle}
                    >
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
