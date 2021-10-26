/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef, RefObject } from "react";
import type { AriaListBoxOptions } from "@react-aria/listbox";
import type { ListState } from "@react-stately/list";
import type { Node } from "@react-types/shared";
import { useListBox, useListBoxSection, useOption } from "@react-aria/listbox";
import { FC } from "react";
import { merge } from "@utilities/merge";
import { getKeyItemRecord, getMenuItems } from "@components/Menu/Aria/helper";
import { MenuItem } from "@components/Menu/MenuItem/MenuItem";
import { MenuBlock, MenuItemType } from "@components/Menu/SelectMenu";

interface ListBoxProps extends AriaListBoxOptions<unknown> {
    listBoxRef?: RefObject<HTMLUListElement>;
    state: ListState<unknown>;
    menuBlocks: MenuBlock[];
    noBottomBorder?: boolean;
}

interface SectionProps {
    section: Node<unknown>;
    state: ListState<unknown>;
    keyItemRecord: Record<string, MenuItemType>;
}

interface OptionProps {
    item: Node<unknown>;
    state: ListState<unknown>;
    keyItemRecord: Record<string, MenuItemType>;
}
export const ListBox: FC<ListBoxProps> = (props: ListBoxProps) => {
    const ref = useRef<HTMLUListElement>(null);
    const { listBoxRef = ref, state, menuBlocks, noBottomBorder } = props;
    const { listBoxProps } = useListBox(props, state, listBoxRef);
    const items = getMenuItems(menuBlocks);
    const keyItemRecord = getKeyItemRecord(items);

    return (
        <ul
            {...listBoxProps}
            ref={listBoxRef}
            className={merge([
                "tw-list-none tw-p-0 tw-m-0 tw-bg-white tw-border tw-border-black-10 tw-rounded tw-z-20 focus-visible:tw-outline-none",
                noBottomBorder && "tw-rounded-b-none",
            ])}
        >
            {[...state.collection].map((item) => (
                <ListBoxSection key={item.key} section={item} state={state} keyItemRecord={keyItemRecord} />
            ))}
        </ul>
    );
};

const ListBoxSection = ({ section, state, keyItemRecord }: SectionProps) => {
    const { itemProps, groupProps } = useListBoxSection({
        heading: section.rendered,
        "aria-label": section["aria-label"],
    });

    return (
        <>
            <li {...itemProps} className="tw-border-b tw-border-b-black-10 last:tw-border-0">
                <ul {...groupProps} className="tw-py-2 tw-px-0 tw-m-0 tw-list-none">
                    {[...section.childNodes].map((node) => (
                        <Option key={node.key} item={node} state={state} keyItemRecord={keyItemRecord} />
                    ))}
                </ul>
            </li>
        </>
    );
};

const Option = ({ item, state, keyItemRecord }: OptionProps) => {
    const ref = useRef<HTMLLIElement>(null);
    const { optionProps, isDisabled, isSelected } = useOption(
        {
            key: item.key,
        },
        state,
        ref,
    );

    const menuItem = keyItemRecord[item.key];

    return (
        <li
            {...optionProps}
            ref={ref}
            className={merge([
                "tw-relative hover:tw-bg-black-0 tw-list-none tw-outline-none",
                isDisabled && "tw-pointer-events-none tw-top-px",
            ])}
        >
            <MenuItem {...menuItem} active={isSelected} />
        </li>
    );
};
