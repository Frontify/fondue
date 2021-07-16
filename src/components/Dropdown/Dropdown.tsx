/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as IconCaretDown } from "@components/Icon/Svg/CaretDown.svg";
import { ReactComponent as IconCaretUp } from "@components/Icon/Svg/CaretUp.svg";
import { ReactComponent as IconReject } from "@components/Icon/Svg/Reject.svg";
import { Size } from "@utilities/enum";
import { ReactElement, useEffect, useRef, useState } from "react";
import css from "./Dropdown.module.css";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import DropdownMenuItem, { MenuItem } from "./DropdownMenuItem/DropdownMenuItem";

export interface ItemBlock {
    id: string;
    menuItems: MenuItem[];
}

export interface DropdownProps {
    itemBlocks: ItemBlock[];
    onChange: (id?: string) => void;
    activeItemId?: string;
    placeholder?: string;
    size?: Size.Small | Size.Large;
    disabled?: boolean;
    clearable?: boolean;
}

const getActiveItem = (itemBlocks: ItemBlock[], id: string) =>
    itemBlocks
        .map((block) => block.menuItems)
        .flat()
        .find((item) => item.id === id) || null;

export default function Dropdown({
    itemBlocks,
    onChange,
    activeItemId = "",
    placeholder = "Select item",
    size = Size.Small,
    disabled = false,
    clearable = false,
}: DropdownProps): ReactElement<DropdownProps> {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const activeItem = getActiveItem(itemBlocks, activeItemId);
    const wrapperClassNames = [
        css["trigger-wrapper"],
        size === Size.Large ? css.large : "",
        disabled ? css.disabled : "",
    ].join(" ");
    const triggerClassNames = [css.trigger, !activeItem ? css.placeholder : "", disabled ? css.disabled : ""].join(" ");
    const clearButtonClassNames = [css.clear, disabled ? css.disabled : ""].join(" ");

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && !ref.current?.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={css.dropdown} ref={ref}>
            <div data-test-id="dropdown" className={wrapperClassNames}>
                <button
                    data-test-id="dropdown-trigger"
                    onClick={() => setOpen(!open)}
                    className={triggerClassNames}
                    disabled={disabled}
                >
                    {activeItem ? (
                        <DropdownMenuItem
                            title={activeItem.title}
                            icon={activeItem.icon}
                            subtitle={activeItem.subtitle}
                            size={activeItem.size}
                            style={activeItem.style}
                            disabled={disabled}
                            active
                        />
                    ) : (
                        <DropdownMenuItem title={placeholder} size={size} disabled={disabled} />
                    )}
                </button>
                {clearable && activeItem && (
                    <button
                        data-test-id="dropdown-clear-button"
                        className={clearButtonClassNames}
                        onClick={() => onChange("")}
                        disabled={disabled}
                    >
                        <IconReject size={IconSize.Size13} />
                    </button>
                )}
                <button className={disabled ? css.disabled : ""} onClick={() => setOpen(!open)} disabled={disabled}>
                    {open ? <IconCaretUp size={IconSize.Size16} /> : <IconCaretDown size={IconSize.Size16} />}
                </button>
            </div>
            {open && (
                <DropdownMenu
                    itemBlocks={itemBlocks}
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
