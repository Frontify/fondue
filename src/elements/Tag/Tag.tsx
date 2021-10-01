/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from "@utilities/merge";
import React, { FC } from "react";

export enum TagType {
    Suggested = "Suggested",
    Selected = "Selected",
    PreviouslySelected = "PreviouslySelected",
}

export const tagStyles: Record<TagType, string> = {
    [TagType.Suggested]:
        "tw-bg-white dark:tw-bg-black-100 hover:tw-bg-black-0 dark:hover:tw-bg-black-superdark tw-border-black-20 dark:tw-border-white hover:tw-border-black-40 dark:hover:tw-border-black-20 tw-text-black-80 dark:tw-text-white dark:hover:tw-text-black-20",
    [TagType.Selected]:
        "tw-bg-black-5 hover:tw-bg-black-10 dark:hover:tw-bg-black-20 tw-border-black-5 hover:tw-border-black-10 dark:hover:tw-border-black-20 tw-text-black-80 hover:tw-text-black-100",
    [TagType.PreviouslySelected]:
        "tw-bg-white dark:tw-bg-black-100 hover:tw-bg-black-0 dark:hover:tw-bg-black-superdark tw-text-violet-60 dark:tw-text-violet-50 hover:text-violet-70 dark:hover:tw-text-violet-60",
};

export type TagProps = {
    type: TagType;
    label: string;
};

export const Tag: FC<TagProps> = ({ type, label }) => {
    return (
        <span
            data-test-id="tag"
            className={merge([
                "tw-inline-flex tw-border tw-border-solid tw-rounded-full tw-text-xs tw-transition-colors tw-cursor-pointer tw-px-2.5 tw-py-1",
                tagStyles[type],
            ])}
        >
            {label}
        </span>
    );
};
