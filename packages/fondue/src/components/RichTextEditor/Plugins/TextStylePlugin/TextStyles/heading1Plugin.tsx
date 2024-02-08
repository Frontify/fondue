/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin, PlateRenderElementProps, createPluginFactory } from '@udecode/plate-core';
import { CSSProperties } from 'react';
import { MarkupElement, Plugin, PluginProps, defaultStyles, getColumnBreakClasses } from '../../..';
import { alignmentClassnames } from '../../helper';
import { merge } from '@utilities/merge';
import { TextStyleRenderElementProps, TextStyles } from '../types';

const ID = 'textstyle-heading1-plugin';
export class Heading1Plugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultStyles.heading1, ...props }: PluginProps = {}) {
        super(TextStyles.heading1, {
            label: 'Heading 1',
            markupElement: new Heading1MarkupElement(),
            ...props,
        });
        this.styles = styles;
    }

    plugins(): PlatePlugin[] {
        return [createHeading1Plugin(this.styles)];
    }
}

class Heading1MarkupElement extends MarkupElement {
    constructor(id = ID, node = Heading1MarkupElementNode) {
        super(id, node);
    }
}

const Heading1MarkupElementNode = ({ element, attributes, children, styles }: TextStyleRenderElementProps) => {
    const align = element.align as string;
    return (
        <h1
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={styles}
        >
            {children}
        </h1>
    );
};

const createHeading1Plugin = (styles: CSSProperties): PlatePlugin =>
    createPluginFactory({
        key: TextStyles.heading1,
        isElement: true,
        component: Heading1MarkupElementNode,
        deserializeHtml: {
            rules: [{ validNodeName: ['h1', 'H1'] }],
        },
    })({
        component: (props: PlateRenderElementProps) => <Heading1MarkupElementNode {...props} styles={styles} />,
    });
