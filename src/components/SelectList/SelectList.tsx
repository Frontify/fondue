import { Checkbox, CheckboxState } from "@elements/Checkbox/Checkbox";
import IconCaretDown from "@elements/Icon/Generated/IconCaretDown";
import { IconSize } from "@elements/Icon/IconSize";
import { Tag, TagType } from "@elements/Tag/Tag";
import { FocusScope } from "@react-aria/focus";
import { useOverlay } from "@react-aria/overlays";
import { useButton } from "@react-aria/button";
import { Item } from "@react-stately/collections";
import { useListState } from "@react-stately/list";
import { merge } from "@utilities/merge";
import React, { FC, forwardRef, HTMLAttributes, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getKeyItemRecord } from "./helper";
import { SelectListDropdown } from "./SelectListDropdown";

type SelectableListItemProps = {
    item: SelectListItem;
    ariaProps: HTMLAttributes<HTMLElement>;
    isSelected?: boolean;
};

const SelectableListItem = forwardRef<HTMLLIElement | null, SelectableListItemProps>(
    ({ item, isSelected, ariaProps }, ref) => {
        return (
            <li ref={ref} {...ariaProps}>
                <Checkbox label={item.name} state={isSelected ? CheckboxState.Checked : CheckboxState.Unchecked} />
            </li>
        );
    },
);

const getAllItemIds = (items: SelectListItem[]) => items.map(({ name }) => name);

SelectableListItem.displayName = "SelectableListItem";

export type SelectListProps = {
    items: SelectListItem[];
    activeItemKeys: string[];
    disabled?: boolean;
    onSelectionChange: (keys: string[]) => void;
    "aria-label"?: string;
};

export type SelectListItem = {
    name: string;
};

export const SelectList: FC<SelectListProps> = (props) => {
    const { items, activeItemKeys, disabled } = props;
    const keyItemRecord = getKeyItemRecord(items);

    const state = useListState<SelectListItem>({
        children: items.map((item) => <Item key={item.name}>{item.name}</Item>),
        defaultSelectedKeys: activeItemKeys,
        onSelectionChange: (keys) => {
            keys === "all" ? getAllItemIds(items) : Array.from(keys);
        },
        selectionMode: "multiple",
    });

    const [open, setOpen] = useState(false);

    const overlayRef = useRef<HTMLDivElement | null>(null);
    const { overlayProps } = useOverlay(
        { isOpen: open, onClose: () => setOpen(false), shouldCloseOnBlur: true, isDismissable: true },
        overlayRef,
    );

    const triggerRef = useRef<HTMLDivElement | null>(null);

    const { buttonProps } = useButton({ onPress: () => setOpen(true) }, triggerRef);

    return (
        <div className="tw-relative">
            <div
                {...buttonProps}
                ref={triggerRef}
                data-test-id="dropdown"
                className={merge([
                    "tw-group tw-relative tw-cursor-pointer tw-flex tw-w-full tw-items-center tw-justify-between tw-border tw-border-black-40 tw-rounded tw-gap-2 tw-transition-colors",
                    "tw-px-[19px] tw-py-[11px] tw-min-h-[50px]",
                    disabled
                        ? "tw-border-black-5 tw-bg-black-5 tw-pointer-events-none"
                        : merge([
                              "tw-bg-white hover:tw-border-black-90",
                              open ? "tw-border-black-90" : "tw-border-black-20",
                          ]),
                ])}
            >
                <div className="tw-flex-1 tw-flex tw-flex-wrap tw-gap-1">
                    {[...state.selectionManager.selectedKeys].map((key) => {
                        const item = keyItemRecord[key];
                        return (
                            <Tag
                                key={item.name}
                                type={TagType.SelectedWithFocus}
                                label={item.name}
                                onClick={() => {
                                    state.selectionManager.toggleSelection(item.name);
                                }}
                            />
                        );
                    })}
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
                                <SelectListDropdown state={state} items={items} activeItemKeys={activeItemKeys} />
                            </div>
                        </FocusScope>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
