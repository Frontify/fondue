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
    const itemClassNames = [
        css.item,
        size === Size.Small ? css.small : css.large,
        warning ? css.warning : "",
        disabled ? css.disabled : "",
        subtitle.length > 0 ? css["has-subtitle"] : "",
    ].join(" ");
    const contentClassNames = [
        css.content,
        css.truncate,
        active ? css.active : "",
        warning ? css.warning : "",
        disabled ? css.disabled : "",
    ].join(" ");
    const subtitleClassNames = [css.subtitle, disabled ? css.disabled : "", warning ? css.warning : ""].join(" ");

    return (
        <li
            data-test-id={icon !== undefined ? "dropdown-menu-item-icon" : "dropdown-menu-item-text"}
            className={itemClassNames}
            tabIndex={1}
            onClick={() => {
                if (onClick && !disabled) {
                    onClick();
                }
            }}
        >
            {icon}
            {subtitle ? (
                <div className={contentClassNames}>
                    <div data-test-id="dropdown-menu-item-title" title={title}>
                        {title}
                    </div>
                    <div data-test-id="dropdown-menu-item-subtitle" className={subtitleClassNames} title={subtitle}>
                        {subtitle}
                    </div>
                </div>
            ) : (
                <div data-test-id="dropdown-menu-item-title" className={contentClassNames} title={title}>
                    {title}
                </div>
            )}
            {active && <Check data-test-id="dropdown-menu-item-active" size={IconSize.Size20} />}
        </li>
    );
}
