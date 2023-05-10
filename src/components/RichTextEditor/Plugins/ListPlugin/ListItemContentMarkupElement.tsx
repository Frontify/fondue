/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LIC, PlateRenderElementProps, TElement } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React from 'react';
import { getColumnBreakClasses } from '../ColumnBreakPlugin/utils/getColumnBreakClasses';
import { MarkupElement } from '../MarkupElement';
import { getTextStyleCssProperties, justifyClassNames } from '../';

export const getLicElementClassNames = (element: TElement) =>
    merge([
        getColumnBreakClasses(element),
        element.align ? justifyClassNames[element.align as string] : 'tw-justify-start',
        'tw-grid tw-grid-cols-[min-content_repeat(3,_auto)]',
    ]);

export const ListItemContentMarkupElementNode = ({ attributes, children, element }: PlateRenderElementProps) => {
    return (
        <p className={getLicElementClassNames(element)} {...attributes}>
            <span
                className={merge(['tw-w-auto tw-min-w-[10px]'])}
                style={getTextStyleCssProperties(element.children[0].textStyle as string)}
            >
                {children}
            </span>
        </p>
    );
};

export class ListItemContentMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_LIC, node = ListItemContentMarkupElementNode) {
        super(id, node);
    }
}
