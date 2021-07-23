/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@elements/Icon/Icon";
import { ReactComponent as IconCaretDown } from "@elements/Icon/Svg/CaretDown.svg";
import { ReactComponent as IconCaretUp } from "@elements/Icon/Svg/CaretUp.svg";
import { ReactComponent as IconReject } from "@elements/Icon/Svg/Reject.svg";
import useClickOutside from "@hooks/useClickOutside";
import { Size } from "@utilities/enum";
import { ReactElement, useRef, useState } from "react";
import DropdownMenu, { MenuBlock } from "./DropdownMenu/DropdownMenu";
import DropdownMenuItem from "./DropdownMenuItem/DropdownMenuItem";

export type DropdownProps = {
    menuBlocks: MenuBlock[];
    onChange: (id?: string) => void;
    activeItemId?: string;
    placeholder?: string;
    size?: Size.Small | Size.Large;
    disabled?: boolean;
    clearable?: boolean;
};

const getActiveItem = (menuBlocks: MenuBlock[], id: string) =>
    menuBlocks
        .map((block) => block.menuItems)
        .flat()
        .find((item) => item.id === id) || null;

export default function Dropdown({
    menuBlocks,
    onChange,
    activeItemId = "",
    placeholder = "Select item",
    size = Size.Small,
    disabled = false,
    clearable = false,
}: DropdownProps): ReactElement<DropdownProps> {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const dropdownElement = useRef<HTMLDivElement | null>(null);
    useClickOutside(dropdownElement.current, () => setMenuIsOpen(false));

    const activeItem = getActiveItem(menuBlocks, activeItemId);

    return (
        <div className="relative w-full font-sans text-s" ref={dropdownElement}>
            <div
                data-test-id="dropdown"
                className={`relative flex w-full box-border items-center justify-between border border-black-40 rounded gap-2 ${
                    size === Size.Large ? "pr-5" : "pr-2"
                } ${
                    disabled
                        ? "border-black-5 bg-black-5 text-black-40 pointer-events-none"
                        : "border-black-20 bg-white text-black-80 focus-within:border-black-90"
                }`}
            >
                <button
                    data-test-id="dropdown-trigger"
                    onClick={() => setMenuIsOpen(!menuIsOpen)}
                    className={`overflow-hidden flex-auto rounded text-left p-0`}
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
                        className={`p-0 ${disabled ? "pointer-events-none text-black-40" : "text-black-80"}`}
                        onClick={() => onChange("")}
                        disabled={disabled}
                    >
                        <IconReject size={IconSize.Size12} />
                    </button>
                )}
                <button
                    className={`p-0 ${disabled ? "pointer-events-none text-black-40" : "text-black-80"}`}
                    onClick={() => setMenuIsOpen(!menuIsOpen)}
                    disabled={disabled}
                >
                    {menuIsOpen ? <IconCaretUp size={IconSize.Size16} /> : <IconCaretDown size={IconSize.Size16} />}
                </button>
            </div>
            {menuIsOpen && (
                <DropdownMenu
                    menuBlocks={menuBlocks}
                    activeItemId={activeItemId}
                    size={size}
                    onChange={(id) => {
                        onChange(id);
                        setMenuIsOpen(!menuIsOpen);
                    }}
                />
            )}
        </div>
    );
}
