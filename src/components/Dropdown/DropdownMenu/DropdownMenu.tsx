/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Size } from "@utilities/enum";
import { ReactElement } from "react";
import DropdownMenuItem, { MenuItem } from "../DropdownMenuItem/DropdownMenuItem";

export type MenuBlock = {
    id: string;
    menuItems: MenuItem[];
};

export type DropdownMenuProps = {
    menuBlocks: MenuBlock[];
    onChange: (id: string) => void;
    size?: Size.Small | Size.Large;
    activeItemId?: string;
};

export default function DropdownMenu({
    menuBlocks,
    onChange,
    size = Size.Small,
    activeItemId = "",
}: DropdownMenuProps): ReactElement<DropdownMenuProps> {
    return (
        <ul
            className={`absolute left-0 w-full box-border p-0 border border-black-10 rounded shadow-mid list-none m-0 ${
                size === Size.Large ? "top-18" : "top-11"
            }`}
        >
            {menuBlocks.map(({ id, menuItems }) => (
                <li
                    key={id}
                    className="pb-2 border-b border-b-black-40 mb-2 last:pb-0 last:border-0 last:mb-0"
                    data-test-id="dropdown-divider"
                >
                    <ul className="py-2 px-0 m-0 list-none" data-test-id="dropdown-item-list">
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
