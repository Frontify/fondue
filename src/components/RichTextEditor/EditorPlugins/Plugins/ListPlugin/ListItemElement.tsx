/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderElementProps } from '@udecode/plate';

export const ListItemElement = ({ attributes, children }: PlateRenderElementProps) => (
    <li {...attributes}>{children}</li>
);
