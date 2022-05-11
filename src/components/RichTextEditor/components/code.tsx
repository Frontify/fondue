/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderLeafProps } from '@udecode/plate';
import React, { FC } from 'react';

//TODO pass a prop classNames
//    classNames = "tw-table-cell tw-rounded tw-bg-base-alt tw-text-text-interactive tw-m-0 tw-px-2 tw-py-0.5",
export const CodeMark: FC<PlateRenderLeafProps> = ({ attributes, children }) => (
    <span
        {...attributes}
        className="tw-table-cell tw-rounded tw-bg-base-alt tw-text-text-interactive tw-m-0 tw-px-2 tw-py-0.5"
    >
        {children}
    </span>
);
