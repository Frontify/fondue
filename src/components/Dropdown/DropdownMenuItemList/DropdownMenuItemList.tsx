/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from "react";
import DropdownMenuItem, { MenuItem } from "../DropdownMenuItem/DropdownMenuItem";
import css from "./DropdownMenuItemList.module.css";

export interface DropdownMenuItemListProps {
    items: MenuItem[];
    onChange: (id: string) => void;
    activeItemId?: string;
}

export default function DropdownMenuItemList({
    items,
    onChange,
    activeItemId = "",
}: DropdownMenuItemListProps): ReactElement<DropdownMenuItemListProps> {
    return (
        <ul className={css.list}>
            {items.map(({ id, title, icon, subtitle, size, warning, disabled }) => (
                <DropdownMenuItem
                    key={id}
                    onClick={() => onChange(id)}
                    title={title}
                    icon={icon}
                    subtitle={subtitle}
                    size={size}
                    warning={warning}
                    disabled={disabled}
                    active={id === activeItemId}
                />
            ))}
        </ul>
    );
}
