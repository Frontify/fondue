/* (c) Copyright Frontify Ltd., all rights reserved. */

import Divider, { DividerHeight } from "@components/Divider/Divider";
import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as IconCaretDown } from "@components/Icon/Svg/CaretDown.svg";
import { ReactElement, useState } from "react";
import css from "./Dropdown.module.css";
import DropdownMenuItem, { MenuItem } from "./DropdownMenuItem/DropdownMenuItem";

export interface DropdownProps {
    menuItems: MenuItem[][];
    onChange: (id?: string) => void;
    activeItemId?: string;
    placeholder?: string;
}

export default function Dropdown({
    menuItems,
    onChange,
    activeItemId = "",
    placeholder = "",
}: DropdownProps): ReactElement<DropdownProps> {
    const [open, setOpen] = useState(true);
    return (
        <div data-test-id="dropdown" className={css.wrapper}>
            <div onClick={() => setOpen(!open)} className={`${css.trigger} ${placeholder ? css.inactive : ""}`}>
                {/* TODO: Active Item */}
                <div>{placeholder ? placeholder : ""}</div>
                <IconCaretDown size={IconSize.Size16} />
            </div>
            {open && (
                <div className={css.menu}>
                    {menuItems.map((list) => (
                        <>
                            <ul>
                                {list.map((item) => (
                                    <DropdownMenuItem
                                        item={item}
                                        onClick={() => {
                                            onChange(item.id);
                                            setOpen(!open);
                                        }}
                                    />
                                ))}
                            </ul>
                            <Divider height={DividerHeight.Height10} color="rgb(234, 235, 235)" />
                        </>
                    ))}
                </div>
            )}
        </div>
    );
}
