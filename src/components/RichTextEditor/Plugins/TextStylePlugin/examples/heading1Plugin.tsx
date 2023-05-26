/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { MarkupElement, Plugin, PluginProps, getColumnBreakClasses, useRichTextEditorContext } from '../../../';
import { alignmentClassnames } from '../../helper';
import { merge } from '@utilities/merge';
import { TextStyles } from '../types';

const ID = 'textstyle-heading1-plugin';

export class Heading1Plugin extends Plugin {
    constructor(props?: PluginProps) {
        super(TextStyles.heading1, {
            markupElement: new Heading1MarkupElement(),
            label: 'Heading 1',
            ...props,
        });
    }

    plugins() {
        return [createHeading1Plugin()];
    }
}

class Heading1MarkupElement extends MarkupElement {
    constructor(id = ID, node = Heading1MarkupElementNode) {
        super(id, node);
    }
}

const Heading1MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;
    const { theme } = useRichTextEditorContext();
    return (
        <h1
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={theme.heading1}
        >
            {children}
        </h1>
    );
};

const createHeading1Plugin = createPluginFactory({
    key: TextStyles.heading1,
    isElement: true,
    component: Heading1MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h1', 'H1'] }],
    },
});
