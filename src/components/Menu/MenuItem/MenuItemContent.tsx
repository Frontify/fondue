/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@elements/Icon/IconSize";
import React, { cloneElement, FC, HTMLAttributes, ReactElement } from "react";

export enum MenuItemContentSize {
    Small = "Small",
    Large = "Large",
}

export enum MenuItemContentStyle {
    Primary = "Primary",
    Danger = "Danger",
}

type MenuItemContentBase = {
    title: string;
    decorator?: ReactElement;
    subtitle?: string;
    size?: MenuItemContentSize;
    ariaProps?: HTMLAttributes<HTMLElement>;
};

export type MenuItemContentProps =
    | (MenuItemContentBase & {
          size: MenuItemContentSize.Small;
          subtitle?: undefined;
      })
    | (MenuItemContentBase & {
          size: MenuItemContentSize.Large;
          subtitle?: string;
      });

export const MenuItemContent: FC<MenuItemContentProps> = ({ title, decorator, subtitle, size, ariaProps }) => {
    return (
        <div
            {...ariaProps}
            data-test-id="menu-item-content"
            className="tw-flex tw-gap-3 tw-box-border tw-items-center tw-font-sans tw-text-s"
        >
            {decorator && (
                <span className="tw-flex-shrink-0" data-test-id="menu-item-decorator">
                    {cloneElement(decorator, {
                        size: size === MenuItemContentSize.Small ? IconSize.Size16 : IconSize.Size20,
                    })}
                </span>
            )}
            <div className="tw-flex-1 tw-overflow-hidden tw-overflow-ellipsis tw-whitespace-nowrap">
                <div data-test-id="menu-item-title" className="tw-select-none" title={title}>
                    {title}
                </div>
                {subtitle && (
                    <div data-test-id="menu-item-subtitle" className="tw-select-none tw-text-xxs" title={subtitle}>
                        {subtitle}
                    </div>
                )}
            </div>
        </div>
    );
};
