/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateRenderElementProps } from '@udecode/plate-core';
import { ELEMENT_LIC } from '@udecode/plate-list';
import { type TElement } from '@udecode/slate';

import { merge } from '@utilities/merge';

import { getColumnBreakClasses } from '../ColumnBreakPlugin/utils/getColumnBreakClasses';
import { MarkupElement } from '../MarkupElement';
import { justifyClassNames } from '../helper';

export const LIST_ITEM_SPAN_CLASSES = 'tw-w-auto tw-min-w-[10px]';

export const getLicElementClassNames = (element: TElement) =>
    merge([
        getColumnBreakClasses(element),
        element.align ? justifyClassNames[element.align as string] : 'tw-justify-start',
        'tw-grid tw-grid-cols-[min-content_repeat(3,_auto)]',
    ]);

export const ListItemContentMarkupElementNode = ({ attributes, children, element }: PlateRenderElementProps) => {
    return (
        <p className={getLicElementClassNames(element)} {...attributes}>
            <span className={LIST_ITEM_SPAN_CLASSES}>{children}</span>
        </p>
    );
};

export class ListItemContentMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_LIC, node = ListItemContentMarkupElementNode) {
        super(id, node);
    }
}
