/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderElementProps } from '@udecode/plate';
import { merge } from '@utilities/merge';
import { useRichTextEditorContext } from '../../../../context/RichTextEditorContext';
import { MarkupElement } from '../../MarkupElement';
import { TextStyles } from '../TextStyleDropdown/types';
import { alignmentClassnames } from '../TextStyleElements/alignment';

export const Heading1MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as string;

    return (
        <h1 {...attributes} className={merge([align && alignmentClassnames[align]])} style={designTokens.heading1}>
            {children}
        </h1>
    );
};

export class Heading1MarkupElement extends MarkupElement {
    constructor(id = TextStyles.ELEMENT_HEADING1, node = Heading1MarkupElementNode) {
        super(id, node);
    }
}
