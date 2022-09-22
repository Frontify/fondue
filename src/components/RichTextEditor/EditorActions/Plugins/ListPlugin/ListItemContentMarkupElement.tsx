/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ELEMENT_LIC, PlateRenderElementProps } from '@udecode/plate';
import { MarkupElement } from '../MarkupElement';

const ListItemContentMarkupElementNode = ({ attributes, children }: PlateRenderElementProps) => (
    <span {...attributes}>{children}</span>
);

export class ListItemContentMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_LIC, node = ListItemContentMarkupElementNode) {
        super(id, node);
    }
}
