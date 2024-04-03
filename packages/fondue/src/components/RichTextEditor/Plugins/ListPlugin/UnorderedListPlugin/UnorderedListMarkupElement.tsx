/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateRenderLeafProps } from '@udecode/plate-core';
import { ELEMENT_UL } from '@udecode/plate-list';

import { MarkupElement } from '../../MarkupElement';

export const UL_CLASSES =
    "[&>li>p]:before:tw-content-['•'] [&>li>p]:before:tw-px-2 tw-list-none tw-pl-[10px] tw-mb-[10px] tw-ml-[15px]";

export const UnorderedListMarkupElementNode = ({ attributes, children }: PlateRenderLeafProps) => (
    <ul className={UL_CLASSES} {...attributes}>
        {children}
    </ul>
);

export class UnorderedListMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_UL, node: (props: PlateRenderLeafProps) => JSX.Element = UnorderedListMarkupElementNode) {
        super(id, node);
    }
}
