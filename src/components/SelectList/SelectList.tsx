import { Checkbox } from "@elements/Checkbox/Checkbox";
import { Tag, TagType } from "@elements/Tag/Tag";
import { FocusScope } from "@react-aria/focus";
import { useListBox, useOption } from "@react-aria/listbox";
import { useOverlay } from "@react-aria/overlays";
import { Item } from "@react-stately/collections";
import { useListState } from "@react-stately/list";
import { merge } from "@utilities/merge";
import React, { FC, forwardRef, HTMLAttributes, useRef, useState } from "react";
import { getKeyItemRecord } from "./helper";

type SelectableListItemProps = {
    item: SelectListItem;
    ariaProps: HTMLAttributes<HTMLElement>;
    isSelected?: boolean;
};

const SelectableListItem = forwardRef<HTMLLIElement | null, SelectableListItemProps>(({ item }, ref) => {
    return (
        <li ref={ref}>
            <Checkbox label={item.name} />
        </li>
    );
});

SelectableListItem.displayName = "SelectableListItem";

export type SelectListProps = {
    items: SelectListItem[];
    activeItemNames: string[];
    disabled?: boolean;
};

export type SelectListItem = {
    name: string;
};

export const SelectList: FC<SelectListProps> = (props) => {
    const { items, activeItemNames, disabled } = props;
    const keyItemRecord = getKeyItemRecord(items);

    const state = useListState<SelectListItem>({
        children: items.map((item) => <Item key={item.name}>{item.name}</Item>),
        selectedKeys: activeItemNames,
        selectionMode: "multiple",
    });
    const [open, setOpen] = useState(false);

    const ref = useRef<HTMLUListElement | null>(null);
    const { listBoxProps } = useListBox<SelectListItem>(props, state, ref);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const { overlayProps } = useOverlay(
        { isOpen: open, onClose: () => setOpen(false), shouldCloseOnBlur: true, isDismissable: true },
        overlayRef,
    );

    return (
        <>
            <div
                data-test-id="dropdown"
                className={merge([
                    "tw-group tw-relative tw-flex tw-w-full tw-items-center tw-justify-between tw-border tw-border-black-40 tw-rounded tw-gap-2 tw-transition-colors",
                    "tw-px-[19px] tw-py-[11px] tw-min-h-[36px]",
                    disabled
                        ? "tw-border-black-5 tw-bg-black-5 tw-pointer-events-none"
                        : merge([
                              "tw-bg-white hover:tw-border-black-90",
                              open ? "tw-border-black-90" : "tw-border-black-20",
                          ]),
                ])}
            >
                <div className="tw-flex-1">
                    <Tag
                        type={TagType.SelectedWithFocus}
                        label="Example"
                        onClick={() => {
                            console.log("click");
                        }}
                    />
                </div>
            </div>
            <FocusScope restoreFocus>
                <div {...overlayProps} ref={overlayRef} className="tw-mt-3">
                    <ul
                        {...listBoxProps}
                        ref={ref}
                        className="tw-border-black-10 tw-rounded tw-shadow-mid tw-p-4 tw-space-y-4"
                    >
                        {[...state.collection].map((item) => {
                            const optionRef = useRef<HTMLLIElement | null>(null);
                            const { optionProps, isSelected } = useOption(
                                { key: item.key, shouldFocusOnHover: false },
                                state,
                                optionRef,
                            );

                            return (
                                <SelectableListItem
                                    ref={optionRef}
                                    key={item.key}
                                    item={keyItemRecord[item.key]}
                                    ariaProps={optionProps}
                                    isSelected={isSelected}
                                />
                            );
                        })}
                    </ul>
                </div>
            </FocusScope>
        </>
    );
};
