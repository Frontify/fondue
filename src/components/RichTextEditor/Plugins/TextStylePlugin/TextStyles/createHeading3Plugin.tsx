/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import { merge } from '@utilities/merge';
import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { TextStyles } from './textStyles';
import { alignmentClassnames } from './alignment';
import { columnBreakClassNames } from '../../../utils/constants';

export const Heading3MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as string;
    const hasColumn = element.breakAfterColumn as boolean;

    return (
        <h3
            {...attributes}
            className={merge([align && alignmentClassnames[align], hasColumn && columnBreakClassNames])}
            style={designTokens.heading3}
        >
            {children}
        </h3>
    );
};

export const createHeading3Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_HEADING3,
    isElement: true,
    component: Heading3MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h3', 'H3'] }],
    },
});
