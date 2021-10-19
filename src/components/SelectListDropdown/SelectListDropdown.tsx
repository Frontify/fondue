/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconCaretDown from "@elements/Icon/Generated/IconCaretDown";
import { IconSize } from "@elements/Icon/IconSize";
import { Tag, TagType } from "@elements/Tag/Tag";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { useOverlay } from "@react-aria/overlays";
import { useButton } from "@react-aria/button";
import { Item } from "@react-stately/collections";
import { useListState } from "@react-stately/list";
import { merge } from "@utilities/merge";
import { mergeProps } from "@react-aria/utils";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import React, { FC, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SelectList } from "./SelectList";

const getAllItemNames = (items: SelectListItem[]) => items.map(({ name }) => name);

export type SelectListDropdownProps = {
    items: SelectListItem[];
    activeItemKeys: string[];
    disabled?: boolean;
    onSelectionChange: (keys: string[]) => void;
    ariaLabel?: string;
};

export type SelectListItem = {
    name: string;
};

export const SelectListDropdown: FC<SelectListDropdownProps> = ({
    items,
    activeItemKeys,
    ariaLabel = "Select list",
    disabled = false,
}) => {
    const [open, setOpen] = useState(false);

    const overlayRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLDivElement | null>(null);

    const state = useListState<SelectListItem>({
        children: items.map((item) => <Item key={item.name}>{item.name}</Item>),
        defaultSelectedKeys: activeItemKeys,
        onSelectionChange: (keys) => {
            keys === "all" ? getAllItemNames(items) : Array.from(keys);
        },
        selectionMode: "multiple",
    });
    const { overlayProps } = useOverlay(
        {
            isOpen: open,
            onClose: () => setOpen(false),
            shouldCloseOnBlur: true,
            isDismissable: true,
            shouldCloseOnInteractOutside: (element) =>
                element && element.tagName !== "BUTTON" && element.tagName !== "svg",
        },
        overlayRef,
    );
    const { buttonProps } = useButton(
        {
            onPress: () => {
                setOpen(true);
            },
            elementType: "div",
        },
        triggerRef,
    );
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <div className="tw-relative">
            <div
                {...mergeProps(buttonProps, focusProps)}
                ref={triggerRef}
                data-test-id="select-list-dropdown-trigger"
                className={merge([
                    "tw-group tw-relative tw-cursor-pointer tw-outline-none tw-flex tw-w-full tw-items-center tw-justify-between tw-border tw-border-black-40 tw-rounded tw-gap-2 tw-transition-colors tw-px-[19px] tw-py-[11px] tw-min-h-[50px]",
                    isFocusVisible && FOCUS_STYLE,
                    disabled
                        ? "tw-border-black-5 tw-bg-black-5 tw-pointer-events-none"
                        : merge([
                              "tw-bg-white hover:tw-border-black-90",
                              open ? "tw-border-black-90" : "tw-border-black-20",
                          ]),
                ])}
            >
                <div className="tw-flex-1 tw-flex tw-flex-wrap tw-gap-1" data-test-id="select-list-selected">
                    {[...state.selectionManager.selectedKeys].map((key) => (
                        <Tag
                            key={key}
                            type={TagType.SelectedWithFocus}
                            label={key.toString()}
                            onClick={() => state.selectionManager.toggleSelection(key)}
                        />
                    ))}
                </div>

                <button
                    aria-hidden="true"
                    tabIndex={-1}
                    className={merge([
                        "tw-p-0",
                        disabled
                            ? "tw-pointer-events-none tw-text-black-40"
                            : "tw-text-black-80 group-hover:tw-text-black",
                    ])}
                >
                    <div className={merge(["tw-transition-transform", open && "tw-rotate-180"])}>
                        <IconCaretDown size={IconSize.Size16} />
                    </div>
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="tw-absolute tw-left-0 tw-w-full tw-overflow-hidden tw-p-0 tw-shadow-mid tw-list-none tw-m-0 tw-mt-2 tw-z-10"
                        key="content"
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <FocusScope restoreFocus>
                            <div {...overlayProps} ref={overlayRef}>
                                <SelectList state={state} ariaLabel={ariaLabel} />
                            </div>
                        </FocusScope>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
