/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FocusEvent, MouseEvent, ReactNode } from 'react';
import { merge } from '@utilities/merge';
import { IconCaretRight, IconCheckMark } from '@foundation/Icon/Generated';
import { IconSize } from '@foundation/Icon/IconSize';
import { MenuItemContent, MenuItemContentProps } from '@components/MenuItem/MenuItemContent';
import { MenuItemContentSize, MenuItemStyle, SelectionIndicatorIcon } from './types';
import { getItemElementType } from '@utilities/elements';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_STYLE_NO_OFFSET } from '@utilities/focusStyle';

export type MenuItemProps = {
    style?: MenuItemStyle;
    disabled?: boolean;
    active?: boolean;
    checked?: boolean;
    selectionIndicator?: SelectionIndicatorIcon;
    /** @deprecated this prop is not being used anymore */
    type?: string;
    link?: string;
    onBlur?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void;
    onClick?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onFocus?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void;
    onMouseEnter?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseOut?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseOver?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseLeave?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    children?: ReactNode;
    'data-test-id'?: string;
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
        [MenuItemTextColorState.Default]: 'tw-text-text-x-weak',
        [MenuItemTextColorState.Active]: 'tw-text-text',
        [MenuItemTextColorState.Disabled]: 'tw-text-text-disabled',
    },
    [MenuItemStyle.Danger]: {
        [MenuItemTextColorState.Default]: 'tw-text-red-60',
        [MenuItemTextColorState.Active]: 'tw-text-red-70',
        [MenuItemTextColorState.Disabled]: 'tw-text-text-disabled',
    },
    [MenuItemStyle.Warning]: {
        [MenuItemTextColorState.Default]: 'tw-text-text-warning',
        [MenuItemTextColorState.Active]: 'tw-text-yellow-90',
        [MenuItemTextColorState.Disabled]: 'tw-text-text-disabled',
    },
};

const menuItemHoverColorRecord: Record<MenuItemStyle, string> = {
    [MenuItemStyle.Primary]: 'hover:tw-text-text',
    [MenuItemStyle.Danger]: 'hover:tw-text-text-negative',
    [MenuItemStyle.Warning]: 'hover:tw-text-text-warning',
};

const ITEM_WRAPPER_CLASSES =
    'tw-cursor-pointer tw-flex tw-items-center tw-justify-between tw-transition-colors tw-gap-2';
const ITEM_HOVER_CLASSES = 'hover:tw-bg-box-neutral-hover hover:tw-text-box-neutral-inverse-hover';
const ITEM_BASE_CLASSES = merge(['tw-w-full tw-text-left tw-py-2 tw-px-5 tw-rounded', ITEM_HOVER_CLASSES]);
const ITEM_CHECKED_CLASSES = 'tw-bg-box-selected';

export const MenuItem = ({
    title,
    decorator,
    switchComponent,
    subtitle,
    size = MenuItemContentSize.Small,
    style = MenuItemStyle.Primary,
    disabled = false,
    active = false,
    checked = false,
    selectionIndicator = SelectionIndicatorIcon.Check,
    children,
    link,
    onBlur,
    onClick,
    onFocus,
    onMouseEnter,
    onMouseOut,
    onMouseOver,
    onMouseLeave,
    'data-test-id': dataTestId = 'menu-item',
}: MenuItemProps) => {
    const currentIconSize = size === MenuItemContentSize.XSmall ? IconSize.Size16 : IconSize.Size20;

    const currentIcon = {
        [SelectionIndicatorIcon.CaretRight]: (
            <IconCaretRight data-test-id={`${dataTestId}-caret`} size={currentIconSize} />
        ),
        [SelectionIndicatorIcon.Check]: active && (
            <IconCheckMark data-test-id={`${dataTestId}-active`} size={currentIconSize} />
        ),
        [SelectionIndicatorIcon.None]: null,
    }[selectionIndicator];

    const { isFocusVisible, focusProps } = useFocusRing();

    let textState = MenuItemTextColorState.Default;
    if (disabled) {
        textState = MenuItemTextColorState.Disabled;
    } else if (active) {
        textState = MenuItemTextColorState.Active;
    }

    const textClass = menuItemTextColorRecord[style][textState];

    const mainElementType = getItemElementType(link, onClick);

    return (
        <>
            {children && (
                <li
                    data-test-id={dataTestId}
                    role="menuitem"
                    className={merge([
                        'tw-text-sm tw-leading-4 tw-text-text-weak',
                        ITEM_WRAPPER_CLASSES,
                        checked ? ITEM_CHECKED_CLASSES : '',
                    ])}
                >
                    {mainElementType === 'a' && (
                        <a
                            href={link}
                            className={merge([ITEM_BASE_CLASSES, isFocusVisible && FOCUS_STYLE_NO_OFFSET])}
                            onBlur={onBlur}
                            onClick={onClick}
                            onFocus={onFocus}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            onMouseOut={onMouseOut}
                            onMouseOver={onMouseOver}
                            {...focusProps}
                        >
                            {children}
                        </a>
                    )}
                    {mainElementType === 'button' && (
                        <button
                            type="button"
                            disabled={disabled}
                            className={merge([ITEM_BASE_CLASSES, isFocusVisible && FOCUS_STYLE_NO_OFFSET])}
                            onBlur={onBlur}
                            onClick={onClick}
                            onFocus={onFocus}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            onMouseOut={onMouseOut}
                            onMouseOver={onMouseOver}
                            {...focusProps}
                        >
                            {children}
                        </button>
                    )}
                    {mainElementType === 'span' && <span className={ITEM_BASE_CLASSES}>{children}</span>}
                </li>
            )}
            {/* The implementation without children is the first behavior of the MenuItem component.
                This way we can introduce the new changes without breaking the current usage of it.
                In the future, this implementation should be replaced by the new one and the projects updated properly
            */}
            {!children && (
                <div
                    className={merge([
                        ITEM_WRAPPER_CLASSES,
                        menuItemHoverColorRecord[style],
                        menuItemSizeClassMap[size],
                        disabled && 'tw-bg-box-disabled tw-pointer-events-none',
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
MenuItem.displayName = 'FondueMenuItem';
