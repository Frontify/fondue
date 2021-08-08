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
        className="tw-absolute tw-z-20 tw-bg-white tw-left-0 tw-w-full tw-overflow-hidden tw-box-border tw-p-0 tw-border tw-border-black-10 tw-rounded tw-shadow-mid tw-list-none tw-m-0 tw-mt-2"
        key="content"
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        exit={{ height: 0 }}
        transition={{ ease: [0.04, 0.62, 0.23, 0.98] }}
    >
        {menuBlocks.map(({ id, menuItems }) => (
            <li
                key={id}
                className="tw-pb-2 tw-border-b tw-border-b-black-40 tw-mb-2 last:tw-pb-0 last:tw-border-0 last:tw-mb-0"
                data-test-id="dropdown-divider"
            >
                <ul className="tw-py-2 tw-px-0 tw-m-0 tw-list-none" data-test-id="dropdown-item-list">
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
