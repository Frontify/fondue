/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { merge } from "@utilities/merge";
import { IconSize } from "@elements/Icon/IconSize";
import IconReject from "@elements/Icon/Generated/IconReject";

export enum TagType {
    Suggested = "Suggested",
    Selected = "Selected",
    SelectedWithFocus = "SelectedWithFocus",
    PreviouslySelected = "PreviouslySelected",
}

export const tagStyles: Record<TagType, string> = {
    [TagType.Suggested]:
        "tw-bg-white dark:tw-bg-black-100 hover:tw-bg-black-0 dark:hover:tw-bg-black-superdark tw-border-black-20 dark:tw-border-white hover:tw-border-black-40 dark:hover:tw-border-black-20 tw-text-black-80 dark:tw-text-white dark:hover:tw-text-black-20",
    [TagType.Selected]:
        "tw-bg-black-5 hover:tw-bg-black-10 dark:hover:tw-bg-black-20 tw-border-black-5 hover:tw-border-black-10 dark:hover:tw-border-black-20 tw-text-black-80 hover:tw-text-black-100",
    [TagType.SelectedWithFocus]:
        "tw-bg-violet-60 dark:tw-bg-violet-50 hover:tw-bg-violet-70 dark:hover:tw-bg-violet-60 tw-border-violet-60 dark:tw-border-violet-50 hover:tw-border-violet-70 dark:hover:tw-border-violet-60 tw-text-white",
    [TagType.PreviouslySelected]:
        "tw-bg-white dark:tw-bg-black-100 hover:tw-bg-black-0 dark:hover:tw-bg-black-superdark tw-text-violet-60 dark:tw-text-violet-50 hover:text-violet-70 dark:hover:tw-text-violet-60",
};

export type TagProps = {
    type: TagType;
    label: string;
    onClick?: () => void;
};

export const Tag: FC<TagProps> = ({ type, label, onClick }) => {
    const isSelectedType = type === TagType.Selected || type === TagType.SelectedWithFocus;

    return (
        <button
            data-test-id="tag"
            className={merge([
                "tw-inline-flex tw-items-center tw-border tw-border-solid tw-rounded-full tw-text-xs tw-transition-colors tw-cursor-pointer tw-px-2.5 tw-py-1",
                tagStyles[type],
            ])}
            onClick={onClick}
        >
            {label}
            {isSelectedType && (
                <span data-test-id="tag-reject-icon" className="tw-ml-1">
                    <IconReject size={IconSize.Size12} />
                </span>
            )}
        </button>
    );
};
