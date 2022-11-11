/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { merge } from '@utilities/merge';
import { IconCaretRight, IconCheckMark, IconSize } from '@foundation/Icon';
import { MenuItemContent, MenuItemContentProps } from '@components/MenuItem/MenuItemContent';
import { MenuItemContentSize, MenuItemStyle, SelectionIndicatorIcon } from './types';
import { getItemElementType } from '@utilities/elements';

export type MenuItemProps = {
    style?: MenuItemStyle;
    disabled?: boolean;
    active?: boolean;
    selectionIndicator?: SelectionIndicatorIcon;
    /** @deprecated this prop is not being used anymore */
    type?: string;
    link?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
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

const ITEM_BASE_CLASSES = 'tw-cursor-pointer tw-flex tw-items-center tw-justify-between tw-transition-colors tw-gap-2';
const ITEM_PADDING_X = 'tw-py-2 tw-px-5';

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
    children,
    link,
    onClick,
}) => {
    const isDangerStyle = style === MenuItemStyle.Danger;

    const currentIconSize = size === MenuItemContentSize.XSmall ? IconSize.Size16 : IconSize.Size20;

    const currentIcon = {
        [SelectionIndicatorIcon.CaretRight]: <IconCaretRight data-test-id="menu-item-caret" size={currentIconSize} />,
        [SelectionIndicatorIcon.Check]: active && (
            <IconCheckMark data-test-id="menu-item-active" size={currentIconSize} />
        ),
        [SelectionIndicatorIcon.None]: null,
    }[selectionIndicator];

    let textState = MenuItemTextColorState.Default;
    if (disabled) {
        textState = MenuItemTextColorState.Disabled;
    } else if (active) {
        textState = MenuItemTextColorState.Active;
    }

    const textClass = menuItemTextColorRecord[style][textState];

    const [mainElementType, setMainElementType] = useState('span');

    useEffect(() => {
        if (link || onClick) {
            setMainElementType(getItemElementType(link, onClick));
        }
    }, [link, onClick]);

    return (
        <>
            {children && (
                <li role="menuitem" className={merge(['tw-text-sm tw-leading-4 tw-text-text-weak', ITEM_BASE_CLASSES])}>
                    {mainElementType === 'a' && (
                        <a href={link} className={merge([ITEM_PADDING_X])}>
                            {children}
                        </a>
                    )}
                    {mainElementType === 'button' && (
                        <button onClick={onClick} className={merge([ITEM_PADDING_X])}>
                            {children}
                        </button>
                    )}
                    {mainElementType === 'span' && <span className={merge([ITEM_PADDING_X])}>{children}</span>}
                </li>
            )}
            {/* The implementation without children is the first behavior of the MenuItem component.
                This way we can introduce the new changes without breaking the current usage of it.
                In the future, this implementation should be replaced by the new one and the projects updated properly
            */}
            {!children && (
                <div
                    className={merge([
                        ITEM_BASE_CLASSES,
                        'tw-rounded',
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
            )}
        </>
    );
};
