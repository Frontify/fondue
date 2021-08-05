/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { motion } from "framer-motion";
import { DropdownMenuItem } from "@components/Dropdown/DropdownMenuItem/DropdownMenuItem";
import { MenuItem } from "@components/Dropdown/MenuItemContent/MenuItemContent";

export type MenuBlock = {
    id: string;
    menuItems: MenuItem[];
};

export type DropdownMenuProps = {
    menuBlocks: MenuBlock[];
    onChange: (id: string) => void;
    activeItemId?: string;
};

export const DropdownMenu: FC<DropdownMenuProps> = ({ menuBlocks, onChange, activeItemId = "" }) => (
    <motion.ul
        className="absolute left-0 w-full overflow-hidden box-border p-0 border border-black-10 rounded shadow-mid list-none m-0 mt-2"
        key="content"
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        exit={{ height: 0 }}
        transition={{ ease: [0.04, 0.62, 0.23, 0.98] }}
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
    </motion.ul>
);
