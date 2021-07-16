/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps, IconSize } from "@components/Icon/Icon";
import { ReactComponent as CaretRightIcon } from "@components/Icon/Svg/CaretRight.svg";
import { ReactComponent as CheckIcon } from "@components/Icon/Svg/Check.svg";
import { Size, Style } from "@utilities/enum";
import { ReactElement } from "react";
import css from "./DropdownMenuItem.module.css";

export enum SelectionIndicatorIcon {
    Check = "Check",
    CaretRight = "CaretRight",
}

type MenuItemBase = {
    id: string;
    title: string;
    icon?: ReactElement<IconProps>;
    style?: Style.Primary | Style.Danger;
    disabled?: boolean;
    active?: boolean;
    selectionIndicator?: SelectionIndicatorIcon;
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

export default function DropdownMenuItem({
    title,
    icon,
    onClick,
    subtitle = "",
    size = Size.Small,
    style = Style.Primary,
    disabled = false,
    active = false,
    selectionIndicator = SelectionIndicatorIcon.Check,
}: DropdownMenuItemProps): ReactElement<DropdownMenuItemProps> {
    const itemClassNames = [
        css.item,
        size === Size.Small ? css.small : css.large,
        active ? css.active : "",
        style === Style.Danger ? css.danger : "",
        disabled ? css.disabled : "",
    ].join(" ");
    const contentClassNames = [css.content, css.truncate].join(" ");

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
                    <div data-test-id="dropdown-menu-item-title" className={css.title} title={title}>
                        {title}
                    </div>
                    <div data-test-id="dropdown-menu-item-subtitle" className={css.subtitle} title={subtitle}>
                        {subtitle}
                    </div>
                </div>
            ) : (
                <div data-test-id="dropdown-menu-item-title" className={contentClassNames} title={title}>
                    {title}
                </div>
            )}
            {active &&
                (selectionIndicator === SelectionIndicatorIcon.Check ? (
                    <CheckIcon data-test-id="dropdown-menu-item-active" size={IconSize.Size20} />
                ) : (
                    <CaretRightIcon data-test-id="dropdown-menu-item-active" size={IconSize.Size20} />
                ))}
        </li>
    );
}
