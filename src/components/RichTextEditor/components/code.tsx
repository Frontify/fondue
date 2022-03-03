/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderLeafProps } from "@udecode/plate";
import React, { FC } from "react";

export const CodeMark: FC<PlateRenderLeafProps> = ({ attributes, children }) => (
    <span
        {...attributes}
        className="tw-table-cell tw-rounded tw-text-xs tw-bg-black-5 tw-text-violet-90 tw-m-0 tw-px-2 tw-py-0.5"
    >
        {children}
    </span>
);
