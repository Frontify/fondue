import { useFocus } from "@react-aria/interactions";
import { getFocusStyle } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, { forwardRef, HTMLAttributes, useState } from "react";
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
        const [isFocused, setFocused] = useState(false);
        const { focusProps } = useFocus({ onFocusChange: setFocused });
        return (
            <li
                {...ariaProps}
                {...focusProps}
                data-test-id="menu-item"
                className={merge([
                    "tw-relative hover:tw-bg-black-0 tw-list-none tw-outline-none",
                    disabled && "tw-pointer-events-none tw-top-px",
                    isFocused && getFocusStyle(false, true),
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
