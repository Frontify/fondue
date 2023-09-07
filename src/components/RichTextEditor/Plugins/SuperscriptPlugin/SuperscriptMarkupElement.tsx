/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_SUPERSCRIPT, PlateRenderLeafProps } from '@udecode/plate';
import { MarkupElement } from '../MarkupElement';

export const SuperscriptMarkupElementNode = ({ attributes, children }: PlateRenderLeafProps) => (
    <sup {...attributes}>{children}</sup>
);

export class SuperscriptMarkupElement extends MarkupElement {
    constructor(id = MARK_SUPERSCRIPT, node = SuperscriptMarkupElementNode) {
        super(id, node);
    }
}
