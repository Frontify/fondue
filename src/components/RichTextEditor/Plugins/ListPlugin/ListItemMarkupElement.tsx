/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { ELEMENT_LI, PlateRenderElementProps, TDescendant } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React from 'react';
import { MarkupElement } from '../MarkupElement';
import { getTextStyle } from './ListItemContentMarkupElement';
import './OrderedListPlugin/styles.css';

export const ListItemMarkupElementNode = ({ attributes, children, element }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const licElement = (element.children[0]?.children as TDescendant[])?.[0];
    const tokenStyles = designTokens[getTextStyle(licElement)];

    return (
        <li
            style={tokenStyles}
            {...attributes}
            className={merge([
                tokenStyles?.textTransform === 'uppercase' && 'marker:tw-uppercase',
                '!tw-no-underline',
                'listElement',
            ])}
        >
            {children}
        </li>
    );
};

export class ListItemMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_LI, node = ListItemMarkupElementNode) {
        super(id, node);
    }
}
