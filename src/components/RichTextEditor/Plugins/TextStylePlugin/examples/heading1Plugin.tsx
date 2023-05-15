/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { MarkupElement, Plugin, PluginProps, getColumnBreakClasses } from '../../../';
import { alignmentClassnames, getTextStyleCssProperties } from '../../helper';
import { merge } from '@utilities/merge';

const ID = 'heading1';

export class Heading1Plugin extends Plugin {
    constructor(props?: PluginProps) {
        super(ID, {
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
    return (
        <h1
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={getTextStyleCssProperties(element.type)}
        >
            {children}
        </h1>
    );
};

const createHeading1Plugin = createPluginFactory({
    key: ID,
    isElement: true,
    component: Heading1MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h1', 'H1'] }],
    },
});
