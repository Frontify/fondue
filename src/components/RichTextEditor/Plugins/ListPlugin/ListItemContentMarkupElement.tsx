/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { DesignTokens, TextStylesToDesignTokenMap } from '@components/RichTextEditor/types';
import { ELEMENT_LIC, PlateRenderElementProps, TElement, TNode } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React from 'react';
import { getColumnBreakClasses } from '../ColumnBreakPlugin/utils/getColumnBreakClasses';
import { MarkupElement } from '../MarkupElement';
import { TextStyles } from '../TextStylePlugin';
import { justifyClassNames } from '../TextStylePlugin/TextStyles/alignment';
import { MARK_TEXT_STYLE } from './ListPlugin';

export const getTextStyle = (styledNode: TNode) => {
    const textStyles =
        Object.values(TextStyles).find((textStyle) => styledNode?.[MARK_TEXT_STYLE] === textStyle) ??
        TextStyles.ELEMENT_PARAGRAPH;

    return TextStylesToDesignTokenMap[textStyles];
};

export const getUnderlineClassNames = (designTokens: DesignTokens, element: TElement) =>
    designTokens[getTextStyle(element.children[0])]?.textDecoration === 'underline' ? 'tw-underline' : '';

export const getLicElementClassNames = (element: TElement) =>
    merge([
        getColumnBreakClasses(element),
        element.align ? justifyClassNames[element.align as string] : 'tw-justify-start',
        'tw-grid tw-grid-cols-[min-content_repeat(3,_auto)]',
    ]);

export const ListItemContentMarkupElementNode = ({ attributes, children, element }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();

    return (
        <p className={getLicElementClassNames(element)} {...attributes}>
            <span className={merge(['tw-w-auto tw-min-w-[10px]', getUnderlineClassNames(designTokens, element)])}>
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
