/* (c) Copyright Frontify Ltd., all rights reserved. */

import Divider, { DividerHeight } from "@components/Divider/Divider";
import { ReactElement } from "react";
import { DropdownVariants } from "../Dropdown";
import { MenuItem } from "../DropdownMenuItem/DropdownMenuItem";
import DropdownMenuItemList from "../DropdownMenuItemList/DropdownMenuItemList";
import css from "./DropdownMenu.module.css";

export interface DropdownMenuProps {
    items: MenuItem[] | MenuItem[][];
    onChange: (id: string) => void;
    variant?: DropdownVariants;
    activeItemId?: string;
}

const hasSubarrays = (items: MenuItem[] | MenuItem[][]): items is MenuItem[][] =>
    (items as MenuItem[][]).every(Array.isArray);

export default function DropdownMenu({
    items,
    onChange,
    variant = DropdownVariants.Small,
    activeItemId = "",
}: DropdownMenuProps): ReactElement<DropdownMenuProps> {
    return (
        <div className={`${css.menu} ${variant === DropdownVariants.Large ? css.large : ""}`}>
            {hasSubarrays(items) ? (
                items.map((menuItems, i) => (
                    <>
                        <DropdownMenuItemList items={menuItems} onChange={onChange} activeItemId={activeItemId} />
                        {i < items.length - 1 && <Divider height={DividerHeight.Height10} color="rgb(234, 235, 235)" />}
                    </>
                ))
            ) : (
                <DropdownMenuItemList items={items} onChange={onChange} activeItemId={activeItemId} />
            )}
        </div>
    );
}
