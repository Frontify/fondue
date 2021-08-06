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
    id?: string;
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
    id,
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
        <div className="tw-relative tw-w-full tw-font-sans tw-text-s" ref={dropdownElement}>
            <div
                data-test-id="dropdown"
                className={`group tw-relative tw-flex tw-w-full tw-box-border tw-items-center tw-justify-between tw-border tw-border-black-40 tw-rounded tw-gap-2 tw-transition-colors
                ${size === MenuItemContentSize.Large ? "tw-pr-5" : "tw-pr-2"}
                ${
                    disabled
                        ? "tw-border-black-5 tw-bg-black-5 tw-pointer-events-none"
                        : `tw-bg-white hover:tw-border-black-90 ${isOpen ? "tw-border-black-90" : "tw-border-black-20"}`
                }`}
            >
                <button
                    id={id}
                    data-test-id="dropdown-trigger"
                    onClick={() => setIsOpen(!isOpen)}
                    className="tw-overflow-hidden tw-flex-auto tw-rounded tw-text-left tw-p-0"
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
                        className={`tw-p-0 ${
                            disabled ? "tw-pointer-events-none tw-text-black-40" : "tw-text-black-80"
                        }`}
                        onClick={() => onChange("")}
                        disabled={disabled}
                    >
                        <IconReject size={IconSize.Size12} />
                    </button>
                )}
                <button
                    className={`p-0 ${
                        disabled
                            ? "tw-pointer-events-none tw-text-black-40"
                            : "tw-text-black-80 group-hover:tw-text-black"
                    }`}
                    onClick={() => setIsOpen(!isOpen)}
                    disabled={disabled}
                >
                    <div className={merge(["tw-transition-transform", isOpen && "tw-rotate-180"])}>
                        <IconCaretDown size={IconSize.Size16} />
                    </div>
                </button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <DropdownMenu
                        menuBlocks={menuBlocks}
                        activeItemId={activeItemId}
                        onChange={(itemId) => {
                            onChange(itemId);
                            setIsOpen(!isOpen);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
