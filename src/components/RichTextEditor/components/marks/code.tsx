/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderLeafProps } from "@udecode/plate";
import React from "react";

export const CodeMark = (props: PlateRenderLeafProps) => {
    return (
        <span
            {...props.attributes}
            className="tw-table-cell tw-rounded tw-text-xs tw-bg-black-5 tw-text-violet-90 tw-m-0 tw-px-2 tw-py-0.5"
        >
            {props.children}
        </span>
    );
};
