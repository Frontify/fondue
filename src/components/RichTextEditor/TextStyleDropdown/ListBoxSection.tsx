import { useListBoxSection } from "@react-aria/listbox";
import { ListState } from "@react-stately/list";
import type { Node } from "@react-types/shared";
import React, { FC } from "react";
import { Option } from "./Option";

type SectionProps = {
    section: Node<unknown>;
    state: ListState<unknown>;
};

export const ListBoxSection: FC<SectionProps> = ({ section, state }) => {
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
};
