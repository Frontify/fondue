/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ELEMENT_PARAGRAPH, PlateRenderElementProps } from '@udecode/plate';
import { merge } from '@utilities/merge';
import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { MarkupElement } from '../MarkupElement';
import { alignmentClassnames } from '../TextStylePlugin/TextStyles';
import {
    COLUMN_BREAK_CLASS_NAMES as ACTIVE_COLUMN_BREAK_CLASS_NAMES,
    INVISIBLE_COLUMN_BREAK_CLASS_NAMES as INACTIVE_COLUMN_BREAK_CLASS_NAMES,
} from '@components/RichTextEditor/utils/constants';

export const PARAGRAPH_CLASSES = 'tw-m-0 tw-px-0 tw-py-0';

export const ParagraphMarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as string;
    const breakAfterColumn = element.breakAfterColumn;
    const className = merge([
        align && alignmentClassnames[align],
        breakAfterColumn === 'active' && ACTIVE_COLUMN_BREAK_CLASS_NAMES,
        breakAfterColumn === 'inactive' && INACTIVE_COLUMN_BREAK_CLASS_NAMES,
        PARAGRAPH_CLASSES,
    ]);

    return (
        <p {...attributes} className={className} style={designTokens.p}>
            {children}
        </p>
    );
};

export class ParagraphMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_PARAGRAPH, node = ParagraphMarkupElementNode) {
        super(id, node);
    }
}
