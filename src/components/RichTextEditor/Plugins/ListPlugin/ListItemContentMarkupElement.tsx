/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { TextStylesToDesignTokenMap } from '@components/RichTextEditor/types';
import { breakAfterClassNames } from '@components/RichTextEditor/utils/constants';
import { ELEMENT_LIC, PlateRenderElementProps, TNode } from '@udecode/plate';
import React from 'react';
import { MarkupElement } from '../MarkupElement';
import { TextStyles } from '../TextStylePlugin';
import { MARK_TEXT_STYLE } from './ListPlugin';

export const getTextStyle = (styledNode: TNode) => {
    const textStyles =
        Object.values(TextStyles).find((textStyle) => styledNode?.[MARK_TEXT_STYLE] === textStyle) ??
        TextStyles.ELEMENT_PARAGRAPH;

    return TextStylesToDesignTokenMap[textStyles];
};

export const ListItemContentMarkupElementNode = ({ attributes, children, element }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const hasColumn = element?.breakAfterColumn as boolean;

    return (
        <p
            style={{ textDecoration: designTokens[getTextStyle(element.children[0])]?.textDecoration }}
            className={hasColumn ? breakAfterClassNames : ''}
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
