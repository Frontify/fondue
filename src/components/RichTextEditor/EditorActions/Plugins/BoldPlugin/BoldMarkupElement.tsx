/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MARK_BOLD, PlateRenderLeafProps } from '@udecode/plate';
import { MarkupElement } from '../types';

export const BOLD_CLASSES = 'tw-font-bold';

export const BoldMarkupElementTag = ({ attributes, children }: PlateRenderLeafProps) => (
    <span {...attributes} className={BOLD_CLASSES}>
        {children}
    </span>
);

export class BoldMarkupElement implements MarkupElement {
    constructor(public id = MARK_BOLD, public elementTag = BoldMarkupElementTag) {}
}
