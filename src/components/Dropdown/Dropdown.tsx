/* (c) Copyright Frontify Ltd., all rights reserved. */

import Divider, { DividerHeight } from "@components/Divider/Divider";
import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as IconCaretDown } from "@components/Icon/Svg/CaretDown.svg";
import { ReactElement, useEffect, useState } from "react";
import css from "./Dropdown.module.css";
import DropdownMenuItem, { MenuItem, MenuItemVariant } from "./DropdownMenuItem/DropdownMenuItem";
import MenuItemList from "./MenuItemList";

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

const hasSubarrays = (menuItems: MenuItem[] | MenuItem[][]): menuItems is MenuItem[][] =>
    (menuItems as MenuItem[][]).every(Array.isArray);
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
                onClick={() => setOpen(!open)}
                className={`${css.trigger} ${!activeItem ? css.inactive : ""} ${
                    variant === DropdownVariants.Large ? css.large : ""
                }`}
            >
                {activeItem ? (
                    <DropdownMenuItem item={activeItem} onClick={() => onChange(activeItem.id)} />
                ) : (
                    <DropdownMenuItem item={triggerPlaceholder} />
                )}
                <IconCaretDown size={IconSize.Size16} />
            </div>
            {open && (
                <div className={`${css.menu} ${variant === DropdownVariants.Large ? css.large : ""}`}>
                    {hasSubarrays(menuItems) ? (
                        menuItems.map((items, i) => (
                            <>
                                <MenuItemList
                                    items={items}
                                    onChange={(id) => {
                                        onChange(id);
                                        setOpen(!open);
                                    }}
                                />
                                {i < menuItems.length - 1 && (
                                    <Divider height={DividerHeight.Height10} color="rgb(234, 235, 235)" />
                                )}
                            </>
                        ))
                    ) : (
                        <MenuItemList
                            items={menuItems}
                            onChange={(id) => {
                                onChange(id);
                                setOpen(!open);
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
