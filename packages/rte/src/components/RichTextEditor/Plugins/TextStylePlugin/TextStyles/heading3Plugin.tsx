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

const ID = 'textstyle-heading3-plugin';

export class Heading3Plugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultStyles.heading3, ...props }: PluginProps = {}) {
        super(TextStyles.heading3, {
            label: 'Heading 3',
            markupElement: new Heading3MarkupElement(),
            ...props,
        });
        this.styles = styles;
    }

    plugins(): PlatePlugin[] {
        return [createHeading3Plugin(this.styles)];
    }
}

class Heading3MarkupElement extends MarkupElement {
    constructor(id = ID, node = Heading3MarkupElementNode) {
        super(id, node);
    }
}
const Heading3MarkupElementNode = ({ element, attributes, children, styles }: TextStyleRenderElementProps) => {
    const align = element.align as string;
    return (
        <h3
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={styles}
        >
            {children}
        </h3>
    );
};

const createHeading3Plugin = (styles: CSSProperties): PlatePlugin =>
    createPluginFactory({
        key: TextStyles.heading3,
        isElement: true,
        component: Heading3MarkupElementNode,
        deserializeHtml: {
            rules: [{ validNodeName: ['h3', 'H3'] }],
        },
    })({
        component: (props: TextStyleRenderElementProps) => <Heading3MarkupElementNode {...props} styles={styles} />,
    });
