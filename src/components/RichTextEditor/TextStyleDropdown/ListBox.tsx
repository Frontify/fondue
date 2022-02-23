/* eslint-disable @typescript-eslint/no-use-before-define */
import { AriaListBoxOptions, useListBox } from "@react-aria/listbox";
import { ListState } from "@react-stately/list";
import React, { FC, RefObject, useRef } from "react";
import { ListBoxSection } from "./ListBoxSection";
import { Option } from "./Option";

interface ListBoxProps extends AriaListBoxOptions<unknown> {
    listBoxRef?: RefObject<HTMLUListElement>;
    state: ListState<unknown>;
}

export const ListBox: FC<ListBoxProps> = (props) => {
    const ref = useRef<HTMLUListElement>(null);
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
};
