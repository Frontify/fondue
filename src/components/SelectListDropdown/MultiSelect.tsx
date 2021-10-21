/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tag, TagType } from "@elements/Tag/Tag";
import { Trigger } from "@elements/Trigger/Trigger";
import { useButton } from "@react-aria/button";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { useOverlay } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { Item } from "@react-stately/collections";
import { useListState } from "@react-stately/list";
import { AnimatePresence, motion } from "framer-motion";
import React, { FC, useRef, useState } from "react";
import { SelectList, SelectListItem } from "./SelectList";

const getAllItemNames = (items: SelectListItem[]) => items.map(({ name }) => name);

export type MultiSelectProps = {
    items: SelectListItem[];
    activeItemKeys: (string | number)[];
    disabled?: boolean;
    onSelectionChange: (keys: (string | number)[]) => void;
    ariaLabel?: string;
};

export const MultiSelect: FC<MultiSelectProps> = ({
    items,
    activeItemKeys,
    onSelectionChange,
    ariaLabel = "Select list",
    disabled = false,
}) => {
    const [open, setOpen] = useState(false);

    const overlayRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLDivElement | null>(null);

    const state = useListState<SelectListItem>({
        children: items.map((item) => <Item key={item.name}>{item.name}</Item>),
        defaultSelectedKeys: activeItemKeys,
        onSelectionChange: (keys) => onSelectionChange(keys === "all" ? getAllItemNames(items) : Array.from(keys)),
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
            onKeyDown: (e) => {
                if (e.key === "Escape") {
                    setOpen(false);
                }
            },
            elementType: "div",
        },
        triggerRef,
    );
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <div className="tw-relative">
            <Trigger disabled={disabled} buttonProps={buttonProps} isFocusVisible={isFocusVisible} isOpen={open}>
                <div
                    {...mergeProps(buttonProps, focusProps)}
                    ref={triggerRef}
                    className="tw-flex-1 tw-flex tw-flex-wrap tw-gap-1 tw-px-[19px] tw-py-[11px] tw-min-h-[50px] tw-outline-none"
                    data-test-id="select-list-selected"
                >
                    {[...state.selectionManager.selectedKeys].map((key) => (
                        <Tag
                            key={key}
                            type={TagType.SelectedWithFocus}
                            label={key.toString()}
                            onClick={() => state.selectionManager.toggleSelection(key)}
                        />
                    ))}
                </div>
            </Trigger>
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
