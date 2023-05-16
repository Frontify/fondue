/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_PARAGRAPH, PlateRenderElementProps } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React from 'react';
import { getColumnBreakClasses } from '../ColumnBreakPlugin/utils/getColumnBreakClasses';
import { MarkupElement } from '../MarkupElement';
import { alignmentClassnames, getTextStyleCssProperties } from '../helper';

export const PARAGRAPH_CLASSES = 'tw-m-0 tw-px-0 tw-py-0';

export const ParagraphMarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;
    const className = merge([align && alignmentClassnames[align], PARAGRAPH_CLASSES, getColumnBreakClasses(element)]);
    return (
        <p {...attributes} className={className} style={getTextStyleCssProperties('body')}>
            {children}
        </p>
    );
};

export class ParagraphMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_PARAGRAPH, node = ParagraphMarkupElementNode) {
        super(id, node);
    }
}
