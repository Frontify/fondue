import { useOption } from "@react-aria/listbox";
import { ListState } from "@react-stately/list";
import type { Node } from "@react-types/shared";
import React, { FC, useRef } from "react";

interface OptionProps {
    item: Node<unknown>;
    state: ListState<unknown>;
}

export const Option: FC<OptionProps> = ({ item, state }) => {
    const ref = useRef<HTMLLIElement>(null);
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
            data-test-id="select-option"
        >
            {item.rendered}
        </li>
    );
};
