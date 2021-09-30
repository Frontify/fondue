/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";

export type TagProps = {
    label: string;
};

export const Tag: FC<TagProps> = ({ label }) => {
    return (
        <span
            data-test-id="tag"
            className="tw-inline-flex tw-bg-white dark:tw-bg-black-100 hover:tw-bg-black-0 dark:hover:tw-bg-black-superdark tw-border tw-border-solid tw-border-black-20 dark:tw-border-white hover:tw-border-black-40 dark:hover:tw-border-black-20 tw-rounded-full tw-text-xs tw-text-black-80 dark:tw-text-white dark:hover:tw-text-black-20 tw-transition-colors tw-px-2.5 tw-py-1"
        >
            {label}
        </span>
    );
};
