/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import { merge } from '@utilities/merge';
import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { TextStyles } from './textStyles';
import { alignmentClassnames } from './alignment';
import { columnBreakClassNames } from '../../../utils/constants';

export const Heading4MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as string;
    const hasColumn = element.columnBreak as boolean;

    return (
        <h4
            {...attributes}
            className={merge([align && alignmentClassnames[align], hasColumn && columnBreakClassNames])}
            style={designTokens.heading4}
        >
            {children}
        </h4>
    );
};

export const createHeading4Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_HEADING4,
    isElement: true,
    component: Heading4MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h4', 'H4'] }],
    },
});
