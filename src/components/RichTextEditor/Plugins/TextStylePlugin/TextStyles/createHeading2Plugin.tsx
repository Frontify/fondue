/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import { merge } from '@utilities/merge';
import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { TextStyles } from './textStyles';
import { alignmentClassnames } from './alignment';
import { COLUMN_BREAK_CLASS_NAMES } from '../../../utils/constants';

const Heading2MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as string;
    const hasColumn = element.breakAfterColumn as boolean;

    return (
        <h2
            {...attributes}
            className={merge([align && alignmentClassnames[align], hasColumn && COLUMN_BREAK_CLASS_NAMES])}
            style={designTokens.heading2}
        >
            {children}
        </h2>
    );
};

export const createHeading2Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_HEADING2,
    isElement: true,
    component: Heading2MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h2', 'H2'] }],
    },
});
