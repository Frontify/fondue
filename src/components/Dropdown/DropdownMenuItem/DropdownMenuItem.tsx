/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps } from "@components/Icon/Icon";
import { ReactElement } from "react";
import css from "./DropdownMenuItem.module.css";

export enum MenuItemVariant {
    "Small",
    "Large",
}

export interface MenuItem {
    id: string;
    title: string;
    subtitle?: string;
    icon?: ReactElement<IconProps>;
    variant?: MenuItemVariant;
    warning?: boolean;
    disabled?: boolean;
}

export interface DropdownMenuItemProps {
    item: MenuItem;
    onClick?: () => void;
}

const getClassNames = (variant: MenuItemVariant, warning: boolean, disabled: boolean, hasSubtitle: boolean) => {
    const classNames = [css.item];
    if (variant === MenuItemVariant.Small) {
        classNames.push(css.small);
    } else {
        classNames.push(css.large);
    }
    if (warning) {
        classNames.push(css.warning);
    }
    if (disabled) {
        classNames.push(css.disabled);
    }
    if (hasSubtitle) {
        classNames.push(css["has-subtitle"]);
    }
    return classNames.join(" ");
};

export default function DropdownMenuItem({
    item: { title, icon, subtitle = "", variant = MenuItemVariant.Small, warning = false, disabled = false },
    onClick,
}: DropdownMenuItemProps): ReactElement<DropdownMenuItemProps> {
    return (
        <li
            data-test-id="dropdown-menu-item"
            className={getClassNames(variant, warning, disabled, subtitle.length > 0)}
            tabIndex={1}
            onClick={onClick}
        >
            {icon !== undefined && icon}
            <div className={css.truncate} title={title}>
                {title}
                {subtitle && (
                    <div className={css.subtitle} title={subtitle}>
                        {subtitle}
                    </div>
                )}
            </div>
        </li>
    );
}
