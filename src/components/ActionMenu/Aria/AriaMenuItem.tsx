import { MenuItem } from "@components/MenuItem/MenuItem";
import { useFocusRing } from "@react-aria/focus";
import { useMenuItem } from "@react-aria/menu";
import { mergeProps } from "@react-aria/utils";
import { TreeState } from "@react-stately/tree";
import { FOCUS_STYLE_INSET } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, { FC, useRef } from "react";
import { ActionMenuItemType } from "../ActionMenu/ActionMenu";
import { MenuItemType } from "../../Dropdown/SelectMenu/SelectMenu";
import { Node } from "@react-types/shared";

export type AriaOptionProps = {
    menuItem: MenuItemType | ActionMenuItemType;
    node: Node<object>;
    isSelected?: boolean;
    state: TreeState<object>;
};

const isActionMenuItem = (menuItem: MenuItemType | ActionMenuItemType): menuItem is ActionMenuItemType =>
    typeof (menuItem as ActionMenuItemType).onClick !== "undefined";

export const AriaMenuItem: FC<AriaOptionProps> = ({ menuItem, node, state, isSelected }) => {
    const ref = useRef<HTMLLIElement | null>(null);
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
        ref,
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
                decoratorRight={menuItem.decoratorRight}
            />
        </li>
    );
};
