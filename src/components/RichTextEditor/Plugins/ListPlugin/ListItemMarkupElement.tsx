/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { DesignTokens } from '@components/RichTextEditor/types';
import { ELEMENT_LI, PlateRenderElementProps, TDescendant, TElement } from '@udecode/plate';
import React, { CSSProperties } from 'react';
import { MarkupElement } from '../MarkupElement';
import { getTextStyle } from './ListItemContentMarkupElement';

export const LI_CLASSNAMES =
    '[&>p]:before:tw-flex [&>p]:before:tw-justify-end [&>p]:before:tw-w-[1.2em] !tw-no-underline';
export const getLiStyles = (designTokens: DesignTokens, element: TElement): CSSProperties => {
    const licElement = (element.children[0]?.children as TDescendant[])?.[0];
    const tokenStyles = designTokens[getTextStyle(licElement)];

    return {
        ...tokenStyles,
        counterIncrement: 'count',
    };
};
export const ListItemMarkupElementNode = ({ attributes, children, element }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();

    return (
        <li style={getLiStyles(designTokens, element)} {...attributes} className={LI_CLASSNAMES}>
            {children}
        </li>
    );
};

export class ListItemMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_LI, node = ListItemMarkupElementNode) {
        super(id, node);
    }
}
