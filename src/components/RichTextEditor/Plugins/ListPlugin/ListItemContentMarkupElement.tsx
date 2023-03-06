/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { TextStylesToDesignTokenMap } from '@components/RichTextEditor/types';
import { ELEMENT_LIC, PlateRenderElementProps, TNode } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React from 'react';
import { getColumnBreakClasses } from '../ColumnBreakPlugin/utils/getColumnBreakClasses';
import { MarkupElement } from '../MarkupElement';
import { TextStyles } from '../TextStylePlugin';
import { alignmentClassnames } from '../TextStylePlugin/TextStyles';
import { MARK_TEXT_STYLE } from './ListPlugin';

export const getTextStyle = (styledNode: TNode) => {
    const textStyles =
        Object.values(TextStyles).find((textStyle) => styledNode?.[MARK_TEXT_STYLE] === textStyle) ??
        TextStyles.ELEMENT_PARAGRAPH;

    return TextStylesToDesignTokenMap[textStyles];
};

export const ListItemContentMarkupElementNode = ({ attributes, children, element }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align;
    console.log('align', element);

    return (
        <p
            style={{ textDecoration: designTokens[getTextStyle(element.children[0])]?.textDecoration }}
            className={merge([getColumnBreakClasses(element), align && alignmentClassnames[align]])}
            {...attributes}
        >
            {children}
        </p>
    );
};

export class ListItemContentMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_LIC, node = ListItemContentMarkupElementNode) {
        super(id, node);
    }
}
