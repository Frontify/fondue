/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlatePlugin, createPluginFactory } from '@udecode/plate-core';
import { type CSSProperties } from 'react';

import { defaultStyles } from '@components/RichTextEditor/utils/defaultStyles';
import { merge } from '@utilities/merge';

import { getColumnBreakClasses } from '../../ColumnBreakPlugin';
import { MarkupElement } from '../../MarkupElement';
import { Plugin, type PluginProps } from '../../Plugin';
import { alignmentClassnames } from '../../helper';
import { type TextStyleRenderElementProps, TextStyles } from '../types';

const ID = 'textstyle-quote-plugin';

export class QuotePlugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultStyles.quote, ...props }: PluginProps = {}) {
        super(TextStyles.quote, {
            label: 'Quote',
            markupElement: new QuoteMarkupElement(),
            ...props,
        });
        this.styles = styles;
    }

    plugins(): PlatePlugin[] {
        return [createQuotePlugin(this.styles)];
    }
}

class QuoteMarkupElement extends MarkupElement {
    constructor(id = ID, node = QuoteMarkupElementNode) {
        super(id, node);
    }
}

export const QuoteMarkupElementNode = ({ element, attributes, children, styles }: TextStyleRenderElementProps) => {
    const align = element.align as string;
    return (
        <blockquote
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={styles}
        >
            {children}
        </blockquote>
    );
};

export const createQuotePlugin = (styles: CSSProperties): PlatePlugin =>
    createPluginFactory({
        key: TextStyles.quote,
        isElement: true,
        component: QuoteMarkupElementNode,
        deserializeHtml: {
            rules: [{ validNodeName: ['blockquote', 'BLOCKQUOTE'] }],
        },
    })({
        component: (props: TextStyleRenderElementProps) => <QuoteMarkupElementNode {...props} styles={styles} />,
    });
