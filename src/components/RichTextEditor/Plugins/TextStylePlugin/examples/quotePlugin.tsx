/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React, { CSSProperties } from 'react';
import {
    MarkupElement,
    Plugin,
    PluginProps,
    defaultStyles,
    getColumnBreakClasses,
    useRichTextEditorContext,
} from '../../../';
import { alignmentClassnames } from '../../helper';
import { merge } from '@utilities/merge';
import { TextStyles } from '../types';

const ID = 'textstyle-quote-plugin';

export class QuotePlugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultStyles.quote, ...pluginProps }: PluginProps = {}) {
        super(TextStyles.quote, {
            markupElement: new QuoteMarkupElement(),
            label: 'Quote',
            ...pluginProps,
        });
        this.styles = styles;
    }

    plugins() {
        return [createQuotePlugin()];
    }
}

class QuoteMarkupElement extends MarkupElement {
    constructor(id = ID, node = QuoteMarkupElementNode) {
        super(id, node);
    }
}

export const QuoteMarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;
    const { styles } = useRichTextEditorContext();
    return (
        <blockquote
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={styles.quote}
        >
            {children}
        </blockquote>
    );
};

export const createQuotePlugin = createPluginFactory({
    key: TextStyles.quote,
    isElement: true,
    component: QuoteMarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['blockquote', 'BLOCKQUOTE'] }],
    },
});
