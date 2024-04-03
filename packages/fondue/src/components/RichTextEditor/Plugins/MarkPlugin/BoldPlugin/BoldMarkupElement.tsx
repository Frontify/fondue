/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_BOLD } from '@udecode/plate-basic-marks';
import { type PlateRenderLeafProps } from '@udecode/plate-core';

import { MarkupElement } from '../../MarkupElement';

export const BOLD_CLASSES = 'tw-font-bold';

export const BoldMarkupElementNode = ({ attributes, children }: PlateRenderLeafProps) => (
    <span {...attributes} className={BOLD_CLASSES}>
        {children}
    </span>
);

export class BoldMarkupElement extends MarkupElement {
    constructor(id = MARK_BOLD, node = BoldMarkupElementNode) {
        super(id, node);
    }
}
