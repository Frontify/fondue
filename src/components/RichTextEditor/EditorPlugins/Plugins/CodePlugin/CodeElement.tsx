/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderLeafProps } from '@udecode/plate';

export const CODE_CLASSES =
    'tw-table-cell tw-rounded tw-bg-box-neutral tw-text-box-neutral-inverse tw-m-0 tw-px-2 tw-py-0.5';

export const CodeElement = ({ attributes, children }: PlateRenderLeafProps) => (
    <span {...attributes} className={CODE_CLASSES}>
        {children}
    </span>
);
