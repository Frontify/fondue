/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps, IconSize } from "@components/Icon/Icon";
import { ReactComponent as Check } from "@components/Icon/Svg/Check.svg";
import { Size } from "@utilities/enum";
import { ReactElement } from "react";
import css from "./DropdownMenuItem.module.css";

type MenuItemBase = {
    id: string;
    title: string;
    icon?: ReactElement<IconProps>;
    warning?: boolean;
    disabled?: boolean;
    active?: boolean;
};

export type MenuItem =
    | (MenuItemBase & {
          subtitle: undefined;
          size?: Size.Small;
      })
    | (MenuItemBase & {
          subtitle?: string;
          size?: Size.Large;
      });

export type DropdownMenuItemProps = {
    onClick?: () => void;
} & Omit<MenuItem, "id">;

const getClassNames = (size: Size, warning: boolean, disabled: boolean, subtitle: string) => {
    const classNames = [css.item];
    if (size === Size.Small) {
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
    size = Size.Small,
    warning = false,
    disabled = false,
    active = false,
}: DropdownMenuItemProps): ReactElement<DropdownMenuItemProps> {
    return (
        <li
            data-test-id={icon !== undefined ? "dropdown-menu-item-icon" : "dropdown-menu-item-text"}
            className={getClassNames(size, warning, disabled, subtitle)}
            tabIndex={1}
            onClick={() => {
                if (onClick && !disabled) {
                    onClick();
                }
            }}
        >
            {icon}
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
