/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from "react";
import DropdownMenuItem, { MenuItem } from "../DropdownMenuItem/DropdownMenuItem";
import css from "./DropdownMenuItemList.module.css";

export interface DropdownMenuItemListProps {
    items: MenuItem[];
    onChange: (id: string) => void;
}

export default function DropdownMenuItemList({
    items,
    onChange,
}: DropdownMenuItemListProps): ReactElement<DropdownMenuItemListProps> {
    return (
        <ul className={css.list}>
            {items.map(({ id, title, icon, subtitle, variant, warning, disabled }) => (
                <DropdownMenuItem
                    key={id}
                    onClick={() => onChange(id)}
                    title={title}
                    icon={icon}
                    subtitle={subtitle}
                    variant={variant}
                    warning={warning}
                    disabled={disabled}
                />
            ))}
        </ul>
    );
}
