/* (c) Copyright Frontify Ltd., all rights reserved. */

import Divider, { DividerHeight } from "@components/Divider/Divider";
import { Size } from "@utilities/enum";
import { ReactElement } from "react";
import { MenuItem } from "../DropdownMenuItem/DropdownMenuItem";
import DropdownMenuItemList from "../DropdownMenuItemList/DropdownMenuItemList";
import css from "./DropdownMenu.module.css";

export interface DropdownMenuProps {
    items: MenuItem[] | MenuItem[][];
    onChange: (id: string) => void;
    size?: Size.Small | Size.Large;
    activeItemId?: string;
}

const hasSubarrays = (items: MenuItem[] | MenuItem[][]): items is MenuItem[][] =>
    (items as MenuItem[][]).every(Array.isArray);

export default function DropdownMenu({
    items,
    onChange,
    size = Size.Small,
    activeItemId = "",
}: DropdownMenuProps): ReactElement<DropdownMenuProps> {
    return (
        <div className={`${css.menu} ${size === Size.Large ? css.large : ""}`}>
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
