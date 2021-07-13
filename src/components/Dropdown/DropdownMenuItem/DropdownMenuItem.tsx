/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps } from "@components/Icon/Icon";
import { ReactElement } from "react";
import css from "./DropdownMenuItem.module.css";

export enum MenuItemVariant {
    "Small",
    "Large",
}

export type MenuItem = {
    id: string;
    title: string;
    subtitle?: string;
    icon?: ReactElement<IconProps>;
    variant?: MenuItemVariant;
    warning?: boolean;
    disabled?: boolean;
};

export type DropdownMenuItemProps = {
    onClick?: () => void;
} & Omit<MenuItem, "id">;

const getClassNames = (variant: MenuItemVariant, warning: boolean, disabled: boolean, subtitle: string) => {
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
    if (subtitle.length > 0) {
        classNames.push(css["has-subtitle"]);
    }
    return classNames.join(" ");
};

export default function DropdownMenuItem({
    title,
    icon,
    subtitle = "",
    variant = MenuItemVariant.Small,
    warning = false,
    disabled = false,
    onClick,
}: DropdownMenuItemProps): ReactElement<DropdownMenuItemProps> {
    return (
        <li
            data-test-id="dropdown-menu-item"
            className={getClassNames(variant, warning, disabled, subtitle)}
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
