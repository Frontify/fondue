import { ReactElement } from "react";
import css from "./Dropdown.module.css";
import DropdownMenuItem, { MenuItem } from "./DropdownMenuItem/DropdownMenuItem";

export interface MenuItemListProps {
    items: MenuItem[];
    onChange: (id: string) => void;
}

export default function MenuItemList({ items, onChange }: MenuItemListProps): ReactElement<MenuItemListProps> {
    return (
        <ul className={css.list}>
            {items.map((item) => (
                <DropdownMenuItem key={item.id} item={item} onClick={() => onChange(item.id)} />
            ))}
        </ul>
    );
}
