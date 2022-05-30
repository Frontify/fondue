/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItemContent, MenuItemContentProps, MenuItemContentSize } from '@components/MenuItem/MenuItemContent';
import IconCaretRight from '@foundation/Icon/Generated/IconCaretRight';
import IconCheck from '@foundation/Icon/Generated/IconCheck';
import { IconSize } from '@foundation/Icon/IconSize';
import { merge } from '@utilities/merge';
import React, { FC } from 'react';

export enum MenuItemStyle {
    Primary = 'Primary',
    Danger = 'Danger',
}

export enum SelectionIndicatorIcon {
    Check = 'Check',
    CaretRight = 'CaretRight',
    None = 'None',
}

export type MenuItemProps = {
    style?: MenuItemStyle;
    size?: MenuItemContentSize;
    disabled?: boolean;
    active?: boolean;
    selectionIndicator?: SelectionIndicatorIcon;
    type?: string;
} & Omit<MenuItemContentProps, 'iconSize'>;

export const menuItemSizeClassMap: Record<MenuItemContentSize, string> = {
    [MenuItemContentSize.XSmall]: 'tw-px-5 tw-py-2 tw-min-h-[36px]',
    [MenuItemContentSize.Small]: 'tw-px-5 tw-py-2.5 tw-min-h-[36px]',
    [MenuItemContentSize.Large]: 'tw-px-5 tw-py-3 tw-min-h-[60px]',
};

export enum MenuItemTextColorState {
    Default = 'Default',
    Active = 'Active',
    Disabled = 'Disabled',
}

export const menuItemTextColorRecord: Record<MenuItemStyle, Record<MenuItemTextColorState, string>> = {
    [MenuItemStyle.Primary]: {
        [MenuItemTextColorState.Default]: 'tw-text-black-80',
        [MenuItemTextColorState.Active]: 'tw-text-black',
        [MenuItemTextColorState.Disabled]: 'tw-text-black-40',
    },
    [MenuItemStyle.Danger]: {
        [MenuItemTextColorState.Default]: 'tw-text-red-60',
        [MenuItemTextColorState.Active]: 'tw-text-red-70',
        [MenuItemTextColorState.Disabled]: 'tw-text-red-40',
    },
};

export const MenuItem: FC<MenuItemProps> = ({
    title,
    decorator,
    switchComponent,
    subtitle,
    size = MenuItemContentSize.Small,
    style = MenuItemStyle.Primary,
    disabled = false,
    active = false,
    selectionIndicator = SelectionIndicatorIcon.Check,
}) => {
    const isDangerStyle = style === MenuItemStyle.Danger;

    const currentIconSize = size === MenuItemContentSize.XSmall ? IconSize.Size16 : IconSize.Size20;

    const currentIcon = {
        [SelectionIndicatorIcon.CaretRight]: <IconCaretRight data-test-id="menu-item-caret" size={currentIconSize} />,
        [SelectionIndicatorIcon.Check]: active && <IconCheck data-test-id="menu-item-active" size={currentIconSize} />,
        [SelectionIndicatorIcon.None]: null,
    }[selectionIndicator];

    let textState = MenuItemTextColorState.Default;
    if (disabled) {
        textState = MenuItemTextColorState.Disabled;
    } else if (active) {
        textState = MenuItemTextColorState.Active;
    }

    const textClass = menuItemTextColorRecord[style][textState];

    return (
        <div
            className={merge([
                'tw-rounded tw-cursor-pointer tw-flex tw-items-center tw-justify-between tw-transition-colors tw-gap-2',
                isDangerStyle ? 'hover:tw-text-red-70' : 'hover:tw-text-black',
                menuItemSizeClassMap[size],
                disabled && 'tw-bg-black-0 tw-pointer-events-none',
                active && 'tw-font-medium',
                textClass,
            ])}
        >
            <MenuItemContent
                title={title}
                decorator={decorator}
                subtitle={size === MenuItemContentSize.Large ? subtitle : undefined}
                size={size}
                switchComponent={switchComponent}
            />
            <div className="tw-flex-none">{currentIcon}</div>
        </div>
    );
};
