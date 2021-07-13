/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps, IconSize } from "@components/Icon/Icon";
import { ReactComponent as Check } from "@components/Icon/Svg/Check.svg";
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
    active?: boolean;
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
    onClick,
    subtitle = "",
    variant = MenuItemVariant.Small,
    warning = false,
    disabled = false,
    active = false,
}: DropdownMenuItemProps): ReactElement<DropdownMenuItemProps> {
    return (
        <li
            data-test-id={icon !== undefined ? "dropdown-menu-item-icon" : "dropdown-menu-item-text"}
            className={getClassNames(variant, warning, disabled, subtitle)}
            tabIndex={1}
            onClick={onClick}
        >
            {icon !== undefined && icon}
            <div className={`${css.truncate} ${css.content}`} title={title}>
                {title}
                {subtitle && (
                    <div className={css.subtitle} title={subtitle}>
                        {subtitle}
                    </div>
                )}
            </div>
            {active && <Check size={IconSize.Size20} />}
        </li>
    );
}
