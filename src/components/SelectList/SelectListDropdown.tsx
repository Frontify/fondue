/* react-aria hook props types are inexplicitly typed */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, CheckboxState } from "@elements/Checkbox/Checkbox";
import { useListBox, useOption } from "@react-aria/listbox";
import { ListState } from "@react-stately/list";
import React, { FC, forwardRef, HTMLAttributes, useRef } from "react";
import { getKeyItemRecord } from "./helper";

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

SelectableListItem.displayName = "SelectableListItem";

export type SelectListDropdownProps = {
    state: ListState<any>;
    items: SelectListItem[];
    activeItemKeys: string[];
    "aria-label"?: string;
};

export type SelectListItem = {
    name: string;
};

export const SelectListDropdown: FC<SelectListDropdownProps> = (props) => {
    const { state, items, "aria-label": ariaLabel = "Select list" } = props;
    const keyItemRecord = getKeyItemRecord(items);

    const ref = useRef<HTMLUListElement | null>(null);
    const { listBoxProps } = useListBox<SelectListItem>({ "aria-label": ariaLabel }, state, ref);

    return (
        <ul {...listBoxProps} ref={ref} className="tw-border-black-10 tw-rounded tw-shadow-mid tw-p-4 tw-space-y-4">
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
    );
};
