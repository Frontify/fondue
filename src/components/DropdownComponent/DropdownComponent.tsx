/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, useRef, useState } from "react";
import { MenuItem, MenuItemProps } from "@components/MenuItem";
import { Validation } from "@utilities/validation";
import { merge } from "@utilities/merge";
import IconCaretDown from "@foundation/Icon/Generated/IconCaretDown";
import { IconSize } from "@foundation/Icon";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { VariationPlacement } from "@popperjs/core";
import { usePopper } from "react-popper";
import { FOCUS_VISIBLE_STYLE } from "@utilities/focusStyle";

export type MenuItemType = Omit<MenuItemProps, "switchComponent"> & { id: string | number; link?: string };
export type MenuBlock = {
    id: string;
    menuItems: MenuItemType[];
    ariaLabel?: string;
};

export enum DropdownSize {
    Small = "Small",
    Large = "Large",
}

export enum DropdownAlignment {
    Start = "Start",
    End = "End",
}

export enum DropdownPosition {
    Top = "Top",
    Bottom = "Bottom",
}

export type DropdownComponentProps = {
    menuBlocks: MenuBlock[];
    activeItemId?: string | number;
    onChange: (id?: string | number) => void;
    placeholder?: string;
    size?: DropdownSize;
    disabled?: boolean;
    clearable?: boolean;
    decorator?: ReactElement;
    validation?: Validation;
    alignment?: DropdownAlignment;
    position?: DropdownPosition;
};

const getActiveItem = (blocks: MenuBlock[], activeId: string | number): MenuItemType | null => {
    return (
        blocks
            .map(({ menuItems }) => menuItems)
            .flat()
            .find(({ id }) => id.toString() === activeId?.toString()) || null
    );
};

export const DropdownComponent = ({
    menuBlocks = [],
    activeItemId,
    onChange,
    size = DropdownSize.Small,
    placeholder = "Select an option",
    position = DropdownPosition.Bottom,
    alignment = DropdownAlignment.Start,
}: DropdownComponentProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const activeItem = activeItemId ? getActiveItem(menuBlocks, activeItemId) : null;

    const placementMap: Record<string, VariationPlacement> = {
        ["Top-Start"]: "top-start",
        ["Top-End"]: "top-end",
        ["Bottom-Start"]: "bottom-start",
        ["Bottom-End"]: "bottom-end",
    };

    const popperInstance = usePopper(triggerRef?.current, dropdownRef.current, {
        placement: placementMap[`${position}-${alignment}`],
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 8],
                },
            },
            {
                name: "flip",
                enabled: false,
            },
        ],
    });

    return (
        <div data-test-id="dropdown-component">
            <button
                className={merge([
                    "tw-relative tw-flex tw-justify-between tw-items-center tw-w-full tw-text-left tw-outline-none tw-border tw-rounded tw-transition-colors",
                    size === DropdownSize.Small ? "tw-py-2 tw-px-3 tw-min-h-[36px]" : "tw-pl-5 tw-py-4 tw-min-h-[60px]",
                    FOCUS_VISIBLE_STYLE,
                ])}
                data-test-id="dropdown-trigger"
                placeholder={placeholder}
                onClick={() => setIsOpen(!isOpen)}
                ref={triggerRef}
                aria-expanded={isOpen}
            >
                <div className="tw-flex tw-items-center">
                    {activeItem?.decorator}
                    <span className="tw-ml-2.5">{activeItem?.title ?? placeholder}</span>
                </div>

                <div className={merge(["tw-transition-transform", isOpen && "tw-rotate-180"])}>
                    <IconCaretDown size={IconSize.Size16} />
                </div>
            </button>
            {createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            ref={dropdownRef}
                            {...popperInstance.attributes.popper}
                            style={{
                                width: triggerRef.current?.getBoundingClientRect().width,
                                minWidth: "fit-content",
                            }}
                            className="tw-absolute tw-p-0 tw-shadow-mid tw-m-0 tw-z-[50] tw-overflow-hidden"
                            key="content"
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            transition={{ ease: [0.04, 0.62, 0.23, 0.98], duration: 0.5 }}
                        >
                            {menuBlocks.length &&
                                menuBlocks.map((block, index) => (
                                    <div
                                        className={merge([
                                            "tw-pb-2",
                                            index < menuBlocks.length - 1 ? "tw-border-b" : "",
                                        ])}
                                        key={block.id}
                                    >
                                        {block.menuItems.map((menuItem) => {
                                            return (
                                                <button
                                                    className={merge(["tw-w-full tw-text-left tw-outline-none"])}
                                                    tabIndex={0}
                                                    key={menuItem.id}
                                                    onClick={() => {
                                                        if (!menuItem.disabled) {
                                                            onChange(menuItem.id);
                                                            setIsOpen(false);
                                                        }
                                                    }}
                                                >
                                                    <MenuItem
                                                        title={menuItem.title}
                                                        decorator={menuItem.decorator}
                                                        size={menuItem.size}
                                                        style={menuItem.style}
                                                        disabled={menuItem.disabled}
                                                    ></MenuItem>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body,
            )}
        </div>
    );
};
