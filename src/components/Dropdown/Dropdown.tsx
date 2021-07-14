/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as IconCaretDown } from "@components/Icon/Svg/CaretDown.svg";
import { ReactComponent as IconCaretUp } from "@components/Icon/Svg/CaretUp.svg";
import { Size } from "@utilities/enum";
import { ReactElement, useState } from "react";
import css from "./Dropdown.module.css";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import DropdownMenuItem, { MenuItem } from "./DropdownMenuItem/DropdownMenuItem";

export interface DropdownProps {
    menuItems: MenuItem[][];
    onChange: (id?: string) => void;
    activeItemId?: string;
    placeholder?: string;
    size?: Size.Small | Size.Large;
    disabled?: boolean;
}

const getActiveItem = (menuItems: MenuItem[][], id: string) => menuItems.flat().find((item) => item.id === id) || null;
const getClassNames = (size: Size, active: boolean, disabled: boolean) => {
    const classNames = [css.trigger];
    if (size === Size.Large) {
        classNames.push(css.large);
    }
    if (!active) {
        classNames.push(css.inactive);
    }
    if (disabled) {
        classNames.push(css.disabled);
    }
    return classNames.join(" ");
};

export default function Dropdown({
    menuItems,
    onChange,
    activeItemId = "",
    placeholder = "",
    size = Size.Small,
    disabled = false,
}: DropdownProps): ReactElement<DropdownProps> {
    const [open, setOpen] = useState(false);
    const activeItem = getActiveItem(menuItems, activeItemId);

    return (
        <div className={css.wrapper}>
            <button
                data-test-id="dropdown-trigger"
                onClick={() => setOpen(!open)}
                className={getClassNames(size, !!activeItem, disabled)}
                disabled={disabled}
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
                {open ? <IconCaretUp size={IconSize.Size16} /> : <IconCaretDown size={IconSize.Size16} />}
            </button>
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
