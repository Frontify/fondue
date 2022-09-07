/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MARK_BOLD, PlateRenderLeafProps } from '@udecode/plate';
import { MarkupElement } from '../MarkupElement';

export const BOLD_CLASSES = 'tw-font-bold';

export const BoldMarkupElementTag = ({ attributes, children }: PlateRenderLeafProps) => (
    <span {...attributes} className={BOLD_CLASSES}>
        {children}
    </span>
);

export class BoldMarkupElement extends MarkupElement {
    constructor(id = MARK_BOLD, elementTag = BoldMarkupElementTag) {
        super(id, elementTag);
    }
}
