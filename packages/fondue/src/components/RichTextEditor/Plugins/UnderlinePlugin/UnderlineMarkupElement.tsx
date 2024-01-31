/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_UNDERLINE, PlateRenderLeafProps } from '@udecode/plate';
import { MarkupElement } from '../MarkupElement';

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
