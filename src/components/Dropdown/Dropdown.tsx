/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as IconCaretDown } from "@components/Icon/Svg/CaretDown.svg";
import { ReactElement, useEffect, useState } from "react";
import css from "./Dropdown.module.css";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import DropdownMenuItem, { MenuItem, MenuItemVariant } from "./DropdownMenuItem/DropdownMenuItem";

export enum DropdownVariants {
    "Small",
    "Large",
}

export interface DropdownProps {
    menuItems: MenuItem[][] | MenuItem[];
    onChange: (id?: string) => void;
    activeItemId?: string;
    placeholder?: string;
    variant?: DropdownVariants;
}

const getActiveItem = (menuItems: MenuItem[] | MenuItem[][], id: string) =>
    menuItems.flat().find((item) => item.id === id) || null;

export default function Dropdown({
    menuItems,
    onChange,
    activeItemId = "",
    placeholder = "",
    variant = DropdownVariants.Small,
}: DropdownProps): ReactElement<DropdownProps> {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<MenuItem | null>(getActiveItem(menuItems, activeItemId));

    useEffect(() => {
        setActiveItem(getActiveItem(menuItems, activeItemId));
    }, [activeItemId]);

    const triggerPlaceholder = {
        id: "placeholder",
        title: placeholder,
        variant: variant === DropdownVariants.Small ? MenuItemVariant.Small : MenuItemVariant.Large,
    };

    return (
        <div data-test-id="dropdown" className={css.wrapper}>
            <div
                data-test-id="dropdown-trigger"
                onClick={() => setOpen(!open)}
                className={`${css.trigger} ${!activeItem ? css.inactive : ""} ${
                    variant === DropdownVariants.Large ? css.large : ""
                }`}
            >
                {activeItem ? (
                    <DropdownMenuItem {...activeItem} onClick={() => onChange(activeItem.id)} />
                ) : (
                    <DropdownMenuItem {...triggerPlaceholder} />
                )}
                <IconCaretDown size={IconSize.Size16} />
            </div>
            {open && (
                <DropdownMenu
                    items={menuItems}
                    activeItemId={activeItemId}
                    variant={variant}
                    onChange={(id) => {
                        onChange(id);
                        setOpen(!open);
                    }}
                />
            )}
        </div>
    );
}
