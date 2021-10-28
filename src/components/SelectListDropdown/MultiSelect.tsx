/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checklist, ChecklistDirection } from "@compositions/Checklist/Checklist";
import { Tag, TagType } from "@elements/Tag/Tag";
import { Trigger } from "@elements/Trigger/Trigger";
import { useButton } from "@react-aria/button";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { useOverlay } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { FC, useRef, useState } from "react";

export type MultiSelectItem = {
    value: string;
    ariaLabel?: string;
};

export type MultiSelectProps = {
    items: MultiSelectItem[];
    activeItemKeys: (string | number)[];
    disabled?: boolean;
    onSelectionChange: (keys: (string | number)[]) => void;
    ariaLabel?: string;
    placeholder?: string;
};

export const MultiSelect: FC<MultiSelectProps> = ({
    items,
    activeItemKeys,
    onSelectionChange,
    ariaLabel = "Select list",
    disabled = false,
    placeholder,
}) => {
    const [open, setOpen] = useState(false);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const { isFocusVisible, focusProps } = useFocusRing();
    const checkboxes = items.map((item) => ({ ...item, label: item.value }));

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

    const toggleSelection = (key: string | number) => {
        const keySet = new Set(activeItemKeys);

        if (keySet.has(key)) {
            keySet.delete(key);
        } else {
            keySet.add(key);
        }

        onSelectionChange(Array.from(keySet));
    };

    return (
        <div className="tw-relative">
            <Trigger disabled={disabled} buttonProps={buttonProps} isFocusVisible={isFocusVisible} isOpen={open}>
                <div
                    {...mergeProps(buttonProps, focusProps)}
                    ref={triggerRef}
                    className="tw-flex-1 tw-flex tw-flex-wrap tw-gap-1 tw-px-[19px] tw-py-[11px] tw-min-h-[34px] tw-outline-none"
                >
                    {activeItemKeys.map((key) => (
                        <Tag
                            key={key}
                            type={open ? TagType.SelectedWithFocus : TagType.Selected}
                            label={key.toString()}
                            onClick={() => toggleSelection(key)}
                        />
                    ))}
                    {activeItemKeys.length === 0 && placeholder && (
                        <div className="tw-text-black-60 tw-text-s">{placeholder}</div>
                    )}
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
                            <div {...overlayProps} ref={overlayRef} className="tw-p-4">
                                <Checklist
                                    activeValues={activeItemKeys.map((key) => key.toString())}
                                    setActiveValues={onSelectionChange}
                                    checkboxes={checkboxes}
                                    direction={ChecklistDirection.Vertical}
                                    ariaLabel={ariaLabel}
                                />
                            </div>
                        </FocusScope>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
