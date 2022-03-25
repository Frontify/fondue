import { useOption } from "@react-aria/listbox";
import { merge } from "@utilities/merge";
import React, { FC, useRef } from "react";
import { SearchResultOptionProps } from "../types";

export const SearchResultOption: FC<SearchResultOptionProps> = ({ item, state }) => {
    const ref = useRef<HTMLLIElement | null>(null);
    const { optionProps, isDisabled, isSelected, isFocused } = useOption(
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
            className={merge([
                "tw-relative hover:tw-bg-black-10 tw-list-none tw-outline-none",
                isDisabled && "tw-pointer-events-none tw-top-px",
                isFocused && "tw-bg-black-10",
                isSelected && "tw-text-violet-90 tw-font-bold",
            ])}
        >
            {item.rendered}
        </li>
    );
};
