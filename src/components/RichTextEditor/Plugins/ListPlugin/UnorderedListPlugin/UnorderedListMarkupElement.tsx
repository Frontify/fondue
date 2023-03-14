/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ELEMENT_UL, PlateRenderLeafProps } from '@udecode/plate';
import { MarkupElement } from '../../MarkupElement';
import './style.css';

export const UL_CLASSES = 'tw-list-none tw-pl-[10px] tw-mb-[10px] tw-ml-[15px]';

export const UnorderedListMarkupElementNode = ({ attributes, children }: PlateRenderLeafProps) => (
    <ul className={UL_CLASSES} {...attributes}>
        {children}
    </ul>
);

export class UnorderedListMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_UL, node = UnorderedListMarkupElementNode) {
        super(id, node);
    }
}
