/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ELEMENT_LIC, PlateRenderElementProps } from '@udecode/plate';
import { MarkupElement } from '../types';

const ListItemContentMarkupElementTag = ({ attributes, children }: PlateRenderElementProps) => (
    <span {...attributes}>{children}</span>
);

export class ListItemContentMarkupElement implements MarkupElement {
    constructor(public id = ELEMENT_LIC, public elementTag = ListItemContentMarkupElementTag) {}
}
