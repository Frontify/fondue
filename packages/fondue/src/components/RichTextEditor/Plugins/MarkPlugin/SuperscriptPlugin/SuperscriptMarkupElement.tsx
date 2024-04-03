/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_SUPERSCRIPT } from '@udecode/plate-basic-marks';
import { type PlateRenderLeafProps } from '@udecode/plate-core';

import { MarkupElement } from '../../MarkupElement';

export const SuperscriptMarkupElementNode = ({ attributes, children }: PlateRenderLeafProps) => (
    <sup {...attributes}>{children}</sup>
);

export class SuperscriptMarkupElement extends MarkupElement {
    constructor(id = MARK_SUPERSCRIPT, node = SuperscriptMarkupElementNode) {
        super(id, node);
    }
}
