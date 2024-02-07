/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin, createPluginFactory } from '@udecode/plate';
import { CSSProperties } from 'react';
import { MarkupElement, Plugin, PluginProps, defaultStyles, getColumnBreakClasses } from '../../..';
import { alignmentClassnames } from '../../helper';
import { merge } from '@utilities/merge';
import { TextStyleRenderElementProps, TextStyles } from '../types';

const ID = 'textstyle-heading4-plugin';

export class Heading4Plugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultStyles.heading4, ...props }: PluginProps = {}) {
        super(TextStyles.heading4, {
            label: 'Heading 4',
            markupElement: new Heading4MarkupElement(),
            ...props,
        });
        this.styles = styles;
    }

    plugins(): PlatePlugin[] {
        return [createHeading4Plugin(this.styles)];
    }
}

class Heading4MarkupElement extends MarkupElement {
    constructor(id = ID, node = Heading4MarkupElementNode) {
        super(id, node);
    }
}

const Heading4MarkupElementNode = ({ element, attributes, children, styles }: TextStyleRenderElementProps) => {
    const align = element.align as string;
    return (
        <h4
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={styles}
        >
            {children}
        </h4>
    );
};

const createHeading4Plugin = (styles: CSSProperties): PlatePlugin =>
    createPluginFactory({
        key: TextStyles.heading4,
        isElement: true,
        component: Heading4MarkupElementNode,
        deserializeHtml: {
            rules: [{ validNodeName: ['h4', 'H4'] }],
        },
    })({
        component: (props: TextStyleRenderElementProps) => <Heading4MarkupElementNode {...props} styles={styles} />,
    });
