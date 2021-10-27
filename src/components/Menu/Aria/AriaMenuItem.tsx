import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { FOCUS_STYLE_INSET } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, { forwardRef, HTMLAttributes } from "react";
import { MenuItem } from "../../../elements/MenuItem/MenuItem";
import { ActionMenuItemType } from "../ActionMenu/ActionMenu";
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
                {...mergeProps(ariaProps, focusProps)}
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
                />
            </li>
        );
    },
);

AriaMenuItem.displayName = "AriaMenuItem";
