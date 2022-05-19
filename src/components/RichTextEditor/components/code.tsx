/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderLeafProps } from '@udecode/plate';
import React, { FC } from 'react';

export const CodeMark: FC<PlateRenderLeafProps> = ({ attributes, children }) => (
    <span
        {...attributes}
        className="tw-table-cell tw-rounded tw-bg-box-neutral tw-text-box-neutral-inverse tw-m-0 tw-px-2 tw-py-0.5"
    >
        {children}
    </span>
);
