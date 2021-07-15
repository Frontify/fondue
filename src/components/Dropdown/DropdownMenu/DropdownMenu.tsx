/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Size } from "@utilities/enum";
import { ReactElement } from "react";
import DropdownMenuItem, { MenuItem } from "../DropdownMenuItem/DropdownMenuItem";
import css from "./DropdownMenu.module.css";

export interface DropdownMenuProps {
    items: MenuItem[][];
    onChange: (id: string) => void;
    size?: Size.Small | Size.Large;
    activeItemId?: string;
}

export default function DropdownMenu({
    items,
    onChange,
    size = Size.Small,
    activeItemId = "",
}: DropdownMenuProps): ReactElement<DropdownMenuProps> {
    return (
        <ul className={`${css.menu} ${size === Size.Large ? css.large : ""}`}>
            {items.map((menuItems, i) => (
                <li key={i} className={css.divider} data-test-id="dropdown-divider">
                    <ul className={css.list} data-test-id="dropdown-item-list">
                        {menuItems.map((menuItem) => (
                            <DropdownMenuItem
                                key={menuItem.id}
                                onClick={() => onChange(menuItem.id)}
                                title={menuItem.title}
                                icon={menuItem.icon}
                                subtitle={menuItem.subtitle}
                                size={menuItem.size}
                                style={menuItem.style}
                                disabled={menuItem.disabled}
                                active={menuItem.id === activeItemId}
                            />
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}
