/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_SUBSCRIPT } from '@udecode/plate-basic-marks';
import { PlateRenderLeafProps } from '@udecode/plate-core';

import { MarkupElement } from '../../MarkupElement';

export const SubscriptMarkupElementNode = ({ attributes, children }: PlateRenderLeafProps) => (
    <sub {...attributes}>{children}</sub>
);

export class SubscriptMarkupElement extends MarkupElement {
    constructor(id = MARK_SUBSCRIPT, node = SubscriptMarkupElementNode) {
        super(id, node);
    }
}
