/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { TextStylesToDesignTokenMap } from '@components/RichTextEditor/types';
import { ELEMENT_LIC, PlateRenderElementProps, TNode } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React from 'react';
import { getColumnBreakClasses } from '../ColumnBreakPlugin/utils/getColumnBreakClasses';
import { MarkupElement } from '../MarkupElement';
import { TextStyles } from '../TextStylePlugin';
import { justifyClassNames } from '../TextStylePlugin/TextStyles/alignment';
import { MARK_TEXT_STYLE } from './ListPlugin';
import './OrderedListPlugin/style.css';

export const getTextStyle = (styledNode: TNode) => {
    const textStyles =
        Object.values(TextStyles).find((textStyle) => styledNode?.[MARK_TEXT_STYLE] === textStyle) ??
        TextStyles.ELEMENT_PARAGRAPH;

    return TextStylesToDesignTokenMap[textStyles];
};

export const ListItemContentMarkupElementNode = ({ attributes, children, element }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as unknown as string;
    const isEmpty = element.children.every((child) => child.text === '');

    return (
        <p
            style={{ textDecoration: designTokens[getTextStyle(element.children[0])]?.textDecoration }}
            className={merge([
                getColumnBreakClasses(element),
                align ? justifyClassNames[align] : 'tw-justify-start tw-flex',
            ])}
            {...attributes}
        >
            <span className={isEmpty ? 'tw-w-4' : ''}>{children}</span>
        </p>
    );
};

export class ListItemContentMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_LIC, node = ListItemContentMarkupElementNode) {
        super(id, node);
    }
}
