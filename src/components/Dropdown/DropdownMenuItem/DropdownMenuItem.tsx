/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DividerProps } from "@components/Divider/Divider";
import { IconProps } from "@components/Icon/Icon";
import { ReactElement } from "react";
import css from "./DropdownMenuItem.module.css";

export interface MenuItem {
    id: string;
    title: string;
    subtitle?: string;
    icon?: ReactElement<IconProps>;
    warning?: boolean;
    disabled?: boolean;
}

export interface DropdownMenuItemProps {
    item: MenuItem;
    onClick: () => void;
}

export const isMenuItem = (item: MenuItem | ReactElement<DividerProps>): item is MenuItem =>
    (item as MenuItem).id !== undefined;

export default function DropdownMenuItem({
    item: { title, icon, subtitle = "", warning = false, disabled = false },
    onClick,
}: DropdownMenuItemProps): ReactElement<DropdownMenuItemProps> {
    return (
        <li
            data-test-id="dropdown-menu-item"
            className={`${css.item} ${warning ? css.warning : ""} ${disabled ? css.disabled : ""} ${
                subtitle ? css.large : css.small
            }`}
            tabIndex={1}
            onClick={onClick}
        >
            {icon !== undefined && icon}
            <div>
                <div>{title}</div>
                {subtitle && <div className={css.subtitle}>{subtitle}</div>}
            </div>
        </li>
    );
}
