import { useFocusRing } from "@react-aria/focus";
import { merge } from "@utilities/merge";
import React, { forwardRef, HTMLAttributes } from "react";
import { ActionMenuItemType } from "../ActionMenu/ActionMenu";
import { MenuItem } from "../MenuItem/MenuItem";
import { MenuItemType } from "../SelectMenu";

export type AriaOptionProps = {
    menuItem: MenuItemType | ActionMenuItemType;
    ariaProps: HTMLAttributes<HTMLElement>;
    isSelected?: boolean;
};

export const AriaMenuItem = forwardRef<HTMLLIElement | null, AriaOptionProps>(
    ({ menuItem, ariaProps, isSelected }, ref) => {
        const { title, decorator, subtitle, size, style, disabled, selectionIndicator } = menuItem;
        const { isFocusVisible, focusProps } = useFocusRing();

        return (
            <li
                {...ariaProps}
                {...focusProps}
                data-test-id="menu-item"
                className={merge([
                    "tw-relative hover:tw-bg-black-0 tw-list-none hover:tw-outline-none",
                    disabled && "tw-pointer-events-none tw-top-px",
                    isFocusVisible ? "tw-outline-violet" : "tw-outline-none",
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
                />
            </li>
        );
    },
);

AriaMenuItem.displayName = "AriaMenuItem";
