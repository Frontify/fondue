/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import { merge } from '@utilities/merge';
import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { TextStyles } from './textStyles';
import { alignmentClassnames } from './alignment';
import { COLUMN_BREAK_CLASS_NAMES } from '../../../utils/constants';

export const Heading1MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as string;
    const hasColumn = element.breakAfterColumn as boolean;

    return (
        <h1
            {...attributes}
            className={merge([align && alignmentClassnames[align], hasColumn && COLUMN_BREAK_CLASS_NAMES])}
            style={designTokens.heading1}
        >
            {children}
        </h1>
    );
};

export const createHeading1Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_HEADING1,
    isElement: true,
    component: Heading1MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h1', 'H1'] }],
    },
});
