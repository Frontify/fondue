import { MenuItem } from "@components/MenuItem/MenuItem";
import { useFocusRing } from "@react-aria/focus";
import { useMenuItem } from "@react-aria/menu";
import { mergeProps } from "@react-aria/utils";
import { FOCUS_STYLE_INSET } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, { FC, useRef } from "react";
import { ActionMenuItemType } from "../ActionMenu/ActionMenu";
import { MenuItemType } from "../SelectMenu";

export type AriaOptionProps = {
    menuItem: MenuItemType | ActionMenuItemType;
    node: any;
    // ariaProps: HTMLAttributes<HTMLElement>;
    isSelected?: boolean;
    state: any;
};

const isActionMenuItem = (menuItem: MenuItemType | ActionMenuItemType): menuItem is ActionMenuItemType => {
    return typeof (menuItem as any).onClick !== "undefined";
};

export const AriaMenuItem: FC<AriaOptionProps> = ({ menuItem, node, state, isSelected }) => {
    const itemRef = useRef<HTMLLIElement | null>(null);
    const { menuItemProps } = useMenuItem(
        {
            ...node,
            onAction: () => {
                if (isActionMenuItem(menuItem)) {
                    menuItem?.onClick();
                }
            },
            isDisabled: menuItem?.disabled || false,
            "aria-label": typeof menuItem?.title === "string" ? menuItem?.title : "Menu item",
        },
        state,
        itemRef,
    );
    const { title, decorator, subtitle, size, style, disabled, selectionIndicator } = menuItem;
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <li
            {...mergeProps(menuItemProps, focusProps)}
            data-test-id="menu-item"
            className={merge([
                "tw-relative hover:tw-bg-black-0 tw-list-none tw-outline-none",
                disabled && "tw-pointer-events-none tw-top-px",
                isFocusVisible && FOCUS_STYLE_INSET,
            ])}
            ref={itemRef}
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
            />
        </li>
    );
};

// AriaMenuItem.displayName = "AriaMenuItem";
