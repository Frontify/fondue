/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useRef, useState } from "react";
import { IconSize } from "@elements/Icon/IconSize";
import { DropdownMenu, MenuBlock } from "@components/Dropdown/DropdownMenu/DropdownMenu";
import { MenuItemContent, MenuItemContentSize } from "@components/Dropdown/MenuItemContent/MenuItemContent";
import IconCaretDown from "@elements/Icon/Generated/IconCaretDown";
import IconReject from "@elements/Icon/Generated/IconReject";
import useClickOutside from "@hooks/useClickOutside";
import { merge } from "@utilities/merge";
import { AnimatePresence } from "framer-motion";

export type DropdownProps = {
    menuBlocks: MenuBlock[];
    onChange: (id?: string) => void;
    activeItemId?: string;
    placeholder?: string;
    size?: MenuItemContentSize;
    disabled?: boolean;
    clearable?: boolean;
};

const getActiveItem = (menuBlocks: MenuBlock[], id: string) =>
    menuBlocks
        .map((block) => block.menuItems)
        .flat()
        .find((item) => item.id === id) || null;

export const Dropdown: FC<DropdownProps> = ({
    menuBlocks,
    onChange,
    activeItemId = "",
    placeholder = "Select item",
    size = MenuItemContentSize.Small,
    disabled = false,
    clearable = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownElement = useRef<HTMLDivElement | null>(null);
    useClickOutside(dropdownElement.current, () => setIsOpen(false));

    const activeItem = getActiveItem(menuBlocks, activeItemId);

    return (
        <div className="relative w-full font-sans text-s" ref={dropdownElement}>
            <div
                data-test-id="dropdown"
                className={`group relative flex w-full box-border items-center justify-between border border-black-40 rounded gap-2 transition-colors
                ${size === MenuItemContentSize.Large ? "pr-5" : "pr-2"}
                ${
                    disabled
                        ? "border-black-5 bg-black-5 pointer-events-none"
                        : `bg-white hover:border-black-90 ${isOpen ? "border-black-90" : "border-black-20"}`
                }`}
            >
                <button
                    data-test-id="dropdown-trigger"
                    onClick={() => setIsOpen(!isOpen)}
                    className="overflow-hidden flex-auto rounded text-left p-0"
                    disabled={disabled}
                >
                    <MenuItemContent
                        title={activeItem?.title || placeholder}
                        icon={activeItem?.icon}
                        subtitle={activeItem?.subtitle}
                        size={activeItem?.size || size}
                        style={activeItem?.style}
                        active={!!activeItem}
                        disabled={disabled}
                    />
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
                    className={`p-0 ${
                        disabled ? "pointer-events-none text-black-40" : "text-black-80 group-hover:text-black"
                    }`}
                    onClick={() => setIsOpen(!isOpen)}
                    disabled={disabled}
                >
                    <div className={merge(["transition-transform", isOpen && "rotate-180"])}>
                        <IconCaretDown size={IconSize.Size16} />
                    </div>
                </button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <DropdownMenu
                        menuBlocks={menuBlocks}
                        activeItemId={activeItemId}
                        onChange={(id) => {
                            onChange(id);
                            setIsOpen(!isOpen);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
