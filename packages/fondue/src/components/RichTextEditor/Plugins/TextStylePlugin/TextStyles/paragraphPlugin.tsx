/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createParagraphPlugin as createPlateParagraphPlugin, createPluginFactory } from '@udecode/plate';
import { CSSProperties } from 'react';
import { MarkupElement, Plugin, PluginProps, defaultStyles, getColumnBreakClasses } from '../../..';
import { alignmentClassnames } from '../../helper';
import { merge } from '@utilities/merge';
import { TextStyleRenderElementProps, TextStyles } from '../types';

export class ParagraphPlugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultStyles.p, ...props }: PluginProps = {}) {
        super(TextStyles.p, {
            markupElement: new ParagraphMarkupElement(),
            label: 'Body Text',
            ...props,
        });
        this.styles = styles;
    }

    plugins() {
        return [createParagraphPlugin(this.styles)];
    }
}

export const PARAGRAPH_CLASSES = 'tw-m-0 tw-px-0 tw-py-0';

export const ParagraphMarkupElementNode = ({ element, attributes, children, styles }: TextStyleRenderElementProps) => {
    const align = element.align as string;
    const className = merge([align && alignmentClassnames[align], PARAGRAPH_CLASSES, getColumnBreakClasses(element)]);
    return (
        <p {...attributes} className={className} style={styles}>
            {children}
        </p>
    );
};

export class ParagraphMarkupElement extends MarkupElement {
    constructor(id = TextStyles.p, node = ParagraphMarkupElementNode) {
        super(id, node);
    }
}

export const createParagraphPlugin = (styles: CSSProperties) =>
    createPluginFactory({
        ...createPlateParagraphPlugin(),
        key: TextStyles.p,
        isElement: true,
        component: ParagraphMarkupElementNode,
    })({
        component: (props: TextStyleRenderElementProps) => <ParagraphMarkupElementNode {...props} styles={styles} />,
    });