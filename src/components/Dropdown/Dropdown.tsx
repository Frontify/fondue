/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as IconCaretDown } from "@components/Icon/Svg/CaretDown.svg";
import { Size } from "@utilities/enum";
import { ReactElement, useState } from "react";
import css from "./Dropdown.module.css";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import DropdownMenuItem, { MenuItem } from "./DropdownMenuItem/DropdownMenuItem";

export interface DropdownProps {
    menuItems: MenuItem[][] | MenuItem[];
    onChange: (id?: string) => void;
    activeItemId?: string;
    placeholder?: string;
    size?: Size.Small | Size.Large;
}

const getActiveItem = (menuItems: MenuItem[] | MenuItem[][], id: string) =>
    menuItems.flat().find((item) => item.id === id) || null;

export default function Dropdown({
    menuItems,
    onChange,
    activeItemId = "",
    placeholder = "",
    size = Size.Small,
}: DropdownProps): ReactElement<DropdownProps> {
    const [open, setOpen] = useState(false);
    const activeItem = getActiveItem(menuItems, activeItemId);

    return (
        <div className={css.wrapper}>
            <div
                data-test-id="dropdown-trigger"
                onClick={() => setOpen(!open)}
                className={`${css.trigger} ${!activeItem ? css.inactive : ""} ${size === Size.Large ? css.large : ""}`}
            >
                {activeItem ? (
                    <DropdownMenuItem
                        title={activeItem.title}
                        icon={activeItem.icon}
                        subtitle={activeItem.subtitle}
                        size={activeItem.size}
                        warning={activeItem.warning}
                        disabled={activeItem.disabled}
                        active={false}
                    />
                ) : (
                    <DropdownMenuItem title={placeholder} size={size} />
                )}
                <IconCaretDown size={IconSize.Size16} />
            </div>
            {open && (
                <DropdownMenu
                    items={menuItems}
                    activeItemId={activeItemId}
                    size={size}
                    onChange={(id) => {
                        onChange(id);
                        setOpen(!open);
                    }}
                />
            )}
        </div>
    );
}
