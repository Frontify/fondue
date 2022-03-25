import { useListBoxSection } from "@react-aria/listbox";
import React, { FC } from "react";
import { SearchResultSectionProps } from "../types";
import { SearchResultOption } from "./SearchResultOption";

export const SearchResultSection: FC<SearchResultSectionProps> = ({ section, state }) => {
    const { itemProps, groupProps } = useListBoxSection({
        heading: section.rendered,
        "aria-label": section["aria-label"],
    });

    return (
        <li {...itemProps} className="tw-border-b tw-border-b-black-10 last:tw-border-0">
            <ul
                {...groupProps}
                data-test-id="link-chooser-select-section"
                className="tw-py-2 tw-px-0 tw-m-0 tw-list-none"
            >
                {[...section.childNodes].map((node) => (
                    <SearchResultOption key={node.key} item={node} state={state} />
                ))}
            </ul>
        </li>
    );
};
