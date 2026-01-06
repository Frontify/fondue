/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFocusRing } from '@react-aria/focus';
import { useMenuItem } from '@react-aria/menu';
import { mergeProps } from '@react-aria/utils';
import { type TreeState } from '@react-stately/tree';
import { type Node } from '@react-types/shared';
import { type ReactElement, useEffect, useRef, useState } from 'react';

import { type ActionMenuItemType, type ActionMenuSwitchItemType } from '@components/ActionMenu/ActionMenu';
import { type MenuItemType } from '@components/Dropdown';
import { MenuItem } from '@components/MenuItem/MenuItem';
import { Switch } from '@components/Switch/Switch';
import { FOCUS_STYLE_INSET } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

/**
 * @deprecated Please use a custom component instead.
 */
export type AriaOptionProps = {
    menuItem: MenuItemType | ActionMenuItemType | ActionMenuSwitchItemType;
    node: Node<object>;
    isSelected?: boolean;
    state: TreeState<object>;
    /**
     *  @deprecated Use `menuItem.onClick` instead
     *  */
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
            const switchComponent = <Switch size="small" mode={switchValue ? 'on' : 'off'} />;

            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSwitchObject({
                switchComponent,
                switchValue,
                toggleSwitch,
            });
        }
    }, [isSwitch, switchValue]);

    return switchObject;
};

/**
 * @deprecated Please use a custom component instead.
 */
export const AriaMenuItem = ({ menuItem, node, state, isSelected, onClick }: AriaOptionProps): ReactElement => {
    const ref = useRef<HTMLLIElement | null>(null);
    const initialValue = isActionMenuSwitchItem(menuItem) ? menuItem.initialValue : false;
    const {
        switchComponent = undefined,
        switchValue = null,
        toggleSwitch = null,
    } = useSwitch(isActionMenuSwitchItem(menuItem), initialValue);

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
        <li
            {...mergeProps(menuItemProps, focusProps, { onClick: () => onClick?.() })}
            data-test-id="menu-item"
            className={merge([
                'tw-relative hover:tw-bg-box-neutral-hover tw-list-none tw-outline-none',
                disabled && 'tw-pointer-events-none tw-top-px',
                isFocusVisible && FOCUS_STYLE_INSET,
            ])}
            ref={ref}
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
AriaMenuItem.displayName = 'FondueAriaMenuItem';
