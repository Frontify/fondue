/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_ITALIC, PlateRenderLeafProps } from '@udecode/plate';
import { MarkupElement } from '../../MarkupElement';

export const ITALIC_CLASSES = 'tw-italic';

export const ItalicMarkupElementNode = ({ attributes, children }: PlateRenderLeafProps) => (
    <span {...attributes} className={ITALIC_CLASSES}>
        {children}
    </span>
);

export class ItalicMarkupElement extends MarkupElement {
    constructor(id = MARK_ITALIC, node = ItalicMarkupElementNode) {
        super(id, node);
    }
}
