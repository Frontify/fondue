/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderElementProps } from '@udecode/plate';

export const ListItemContentElement = ({ attributes, children }: PlateRenderElementProps) => (
    <span {...attributes}>{children}</span>
);
