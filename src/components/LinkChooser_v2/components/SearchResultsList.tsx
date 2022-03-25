/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useListBox } from "@react-aria/listbox";
import React, { FC, useRef } from "react";
import { SearchResultListProps } from "../types";
import { SearchResultSection } from "./SearchResultSection";

export const SearchResultsList: FC<SearchResultListProps> = (props) => {
    const ref = useRef<HTMLUListElement>(null);
    const { listBoxRef = ref, state } = props;
    const { listBoxProps } = useListBox(props, state, listBoxRef);

    return (
        <ul
            {...listBoxProps}
            data-test-id="link-chooser-results-list"
            ref={listBoxRef}
            className="tw-list-none tw-p-0 tw-m-0 tw-bg-white tw-z-20 focus-visible:tw-outline-none"
        >
            {[...state.collection].map((section) => (
                <SearchResultSection key={section.key} section={section} state={state} />
            ))}
        </ul>
    );
};
