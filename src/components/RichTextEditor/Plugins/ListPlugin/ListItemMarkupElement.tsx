/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ELEMENT_LI, PlateRenderElementProps } from '@udecode/plate';
import { MarkupElement } from '../MarkupElement';

export const ListItemMarkupElementNode = ({ attributes, children }: PlateRenderElementProps) => (
    <li {...attributes}>{children}</li>
);

export class ListItemMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_LI, node = ListItemMarkupElementNode) {
        super(id, node);
    }
}
