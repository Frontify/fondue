/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_UNDERLINE } from '@udecode/plate-basic-marks';
import { type PlateRenderLeafProps } from '@udecode/plate-core';

import { MarkupElement } from '../../MarkupElement';

export const UNDERLINE_CLASSES = 'tw-underline';

export const UnderlineMarkupElementNode = ({ attributes, children }: PlateRenderLeafProps) => (
    <span {...attributes} className={UNDERLINE_CLASSES}>
        {children}
    </span>
);

export class UnderlineMarkupElement extends MarkupElement {
    constructor(id = MARK_UNDERLINE, node = UnderlineMarkupElementNode) {
        super(id, node);
    }
}
