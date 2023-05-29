/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import React, { CSSProperties } from 'react';
import { MarkupElement, Plugin, PluginProps, defaultStyles, getColumnBreakClasses } from '../../..';
import { alignmentClassnames } from '../../helper';
import { merge } from '@utilities/merge';
import { TextStyleRenderElementProps, TextStyles } from '../types';
import { CSSPropertiesHover } from '@components/RichTextEditor/types';

const ID = 'textstyle-imageTitle-plugin';

export class ImageTitlePlugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultStyles.imageTitle, ...props }: PluginProps = {}) {
        super(TextStyles.imageTitle, {
            label: 'Image Title',
            markupElement: new ImageTitleMarkupElement(),
            ...props,
        });
        this.styles = styles;
    }

    plugins() {
        return [createImageTitlePlugin(this.styles)];
    }
}

class ImageTitleMarkupElement extends MarkupElement {
    constructor(id = ID, node = ImageTitleMarkupElementNode) {
        super(id, node);
    }
}
const ImageTitleMarkupElementNode = ({ element, attributes, children, styles }: TextStyleRenderElementProps) => {
    const align = element.align as string;
    return (
        <p
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={styles}
        >
            {children}
        </p>
    );
};

const createImageTitlePlugin = (styles: CSSPropertiesHover) =>
    createPluginFactory({
        key: TextStyles.imageTitle,
        isElement: true,
        component: ImageTitleMarkupElementNode,
        deserializeHtml: {
            rules: [{ validClassName: TextStyles.imageTitle }],
        },
    })({
        component: (props: TextStyleRenderElementProps) => <ImageTitleMarkupElementNode {...props} styles={styles} />,
    });
