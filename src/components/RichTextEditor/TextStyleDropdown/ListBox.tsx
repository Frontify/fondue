/* eslint-disable @typescript-eslint/no-use-before-define */
import { AriaListBoxOptions, useListBox, useListBoxSection, useOption } from "@react-aria/listbox";
import { ListState } from "@react-stately/list";
import type { Node } from "@react-types/shared";
import * as React from "react";

interface ListBoxProps extends AriaListBoxOptions<unknown> {
    listBoxRef?: React.RefObject<HTMLUListElement>;
    state: ListState<unknown>;
}

interface SectionProps {
    section: Node<unknown>;
    state: ListState<unknown>;
}

interface OptionProps {
    item: Node<unknown>;
    state: ListState<unknown>;
}

export function ListBox(props: ListBoxProps) {
    const ref = React.useRef<HTMLUListElement>(null);
    const { listBoxRef = ref, state } = props;
    const { listBoxProps } = useListBox(props, state, listBoxRef);

    return (
        <ul {...listBoxProps} ref={listBoxRef} className="tw-max-h-72 tw-overflow-auto tw-outline-none tw-rounded ">
            {[...state.collection].map((item) =>
                item.type === "section" ? (
                    <ListBoxSection key={item.key} section={item} state={state} />
                ) : (
                    <Option key={item.key} item={item} state={state} />
                ),
            )}
        </ul>
    );
}

function ListBoxSection({ section, state }: SectionProps) {
    const { itemProps, headingProps, groupProps } = useListBoxSection({
        heading: section.rendered,
        "aria-label": section["aria-label"],
    });

    return (
        <li {...itemProps} className="tw-pt-2">
            {section.rendered && (
                <span {...headingProps} className="tw-text-xs tw-font-bold tw-uppercase tw-text-gray-500 tw-mx-3">
                    {section.rendered}
                </span>
            )}
            <ul {...groupProps}>
                {[...section.childNodes].map((node) => (
                    <Option key={node.key} item={node} state={state} />
                ))}
            </ul>
        </li>
    );
}

function Option({ item, state }: OptionProps) {
    const ref = React.useRef<HTMLLIElement>(null);
    const { optionProps, isSelected, isFocused } = useOption(
        {
            key: item.key,
        },
        state,
        ref,
    );

    return (
        <li
            {...optionProps}
            ref={ref}
            className={`tw-border-b tw-p-3 tw-border-black-30 tw-text-sm tw-outline-none tw-cursor-default tw-flex tw-items-center tw-justify-between tw-truncate ${
                isFocused || isSelected ? "tw-bg-black-100 tw-text-white " : ""
            }`}
            data-test-id="menu-item-dropdown"
        >
            {item.rendered}
        </li>
    );
}
