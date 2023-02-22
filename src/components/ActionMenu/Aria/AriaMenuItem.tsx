/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItem } from '@components/MenuItem/MenuItem';
import { Switch, SwitchSize } from '@components/Switch';
import { useFocusRing } from '@react-aria/focus';
import { useMenuItem } from '@react-aria/menu';
import { mergeProps } from '@react-aria/utils';
import { TreeState } from '@react-stately/tree';
import { Node } from '@react-types/shared';
import { FOCUS_STYLE_INSET } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { MenuItemType } from '@components/Dropdown';
import { ActionMenuItemType, ActionMenuSwitchItemType } from '@components/ActionMenu';

export type AriaOptionProps = {
    menuItem: MenuItemType | ActionMenuItemType | ActionMenuSwitchItemType;
    node: Node<object>;
    isSelected?: boolean;
    state: TreeState<object>;
    onClick?: () => void;
};

interface SwitchObject {
    switchComponent: ReactElement | undefined;
    switchValue: boolean | null;
    toggleSwitch: VoidFunction | null;
}

const isActionMenuItem = (
    menuItem: MenuItemType | ActionMenuItemType | ActionMenuSwitchItemType,
): menuItem is ActionMenuItemType =>
    typeof (menuItem as ActionMenuItemType).onClick !== 'undefined' && typeof menuItem.type === 'undefined';
const isActionMenuSwitchItem = (
    menuItem: MenuItemType | ActionMenuItemType | ActionMenuSwitchItemType,
): menuItem is ActionMenuSwitchItemType =>
    typeof (menuItem as ActionMenuSwitchItemType).onClick !== 'undefined' && menuItem.type === 'switch';

const useSwitch = (isSwitch: boolean, initialValue: boolean) => {
    const [switchValue, setSwitchValue] = useState<boolean>(initialValue ?? false);
    const [switchObject, setSwitchObject] = useState<SwitchObject>({
        switchComponent: undefined,
        switchValue: null,
        toggleSwitch: null,
    });

    useEffect(() => {
        if (isSwitch) {
            const toggleSwitch = () => setSwitchValue(!switchValue);
            const switchComponent = <Switch size={SwitchSize.Small} on={switchValue} />;

            setSwitchObject({
                switchComponent,
                switchValue,
                toggleSwitch,
            });
        }
    }, [isSwitch, switchValue]);

    return switchObject;
};

export const AriaMenuItem: FC<AriaOptionProps> = ({ menuItem, node, state, isSelected, onClick }) => {
    const ref = useRef<HTMLLIElement | null>(null);
    const initialValue = isActionMenuSwitchItem(menuItem) ? menuItem.initialValue : false;
    const {
        switchComponent = undefined,
        switchValue = null,
        toggleSwitch = null,
    } = useSwitch(isActionMenuSwitchItem(menuItem), initialValue) as SwitchObject;

    const { menuItemProps } = useMenuItem(
        {
            ...node,
            onAction: () => {
                if (isActionMenuItem(menuItem)) {
                    menuItem.onClick();
                }
                if (isActionMenuSwitchItem(menuItem)) {
                    toggleSwitch?.();
                    menuItem.onClick(Boolean(!switchValue));
                }
            },
            isDisabled: menuItem?.disabled || false,
            'aria-label': typeof menuItem?.title === 'string' ? menuItem?.title : 'Menu item',
        },
        state,
        ref,
    );
    const { title, decorator, subtitle, size, style, disabled, selectionIndicator } = menuItem;
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
        <li
            {...mergeProps(menuItemProps, focusProps)}
            data-test-id="menu-item"
            className={merge([
                'tw-relative hover:tw-bg-black-0 tw-list-none tw-outline-none',
                disabled && 'tw-pointer-events-none tw-top-px',
                isFocusVisible && FOCUS_STYLE_INSET,
            ])}
            ref={ref}
            onClick={(event) => {
                event.stopPropagation();
                if (onClick) {
                    onClick();
                }
            }}
        >
            <MenuItem
                title={title}
                decorator={decorator}
                subtitle={subtitle}
                size={size}
                style={style}
                disabled={disabled}
                active={isSelected}
                selectionIndicator={selectionIndicator}
                switchComponent={switchComponent}
            />
        </li>
    );
};
