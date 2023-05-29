/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import React, { CSSProperties } from 'react';
import { MarkupElement, Plugin, PluginProps, defaultStyles, getColumnBreakClasses } from '../../..';
import { alignmentClassnames } from '../../helper';
import { merge } from '@utilities/merge';
import { TextStyleRenderElementProps, TextStyles } from '../types';

const ID = 'textstyle-imageCaption-plugin';

export class ImageCaptionPlugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultStyles.imageCaption, ...props }: PluginProps = {}) {
        super(TextStyles.imageCaption, {
            label: 'Image Caption',
            markupElement: new ImageCaptionMarkupElement(),
            ...props,
        });
        this.styles = styles;
    }

    plugins() {
        return [createImageCaptionPlugin(this.styles)];
    }
}

class ImageCaptionMarkupElement extends MarkupElement {
    constructor(id = ID, node = ImageCaptionMarkupElementNode) {
        super(id, node);
    }
}
const ImageCaptionMarkupElementNode = ({ element, attributes, children, styles }: TextStyleRenderElementProps) => {
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

const createImageCaptionPlugin = (styles: CSSProperties) =>
    createPluginFactory({
        key: TextStyles.imageCaption,
        isElement: true,
        component: ImageCaptionMarkupElementNode,
        deserializeHtml: {
            rules: [{ validClassName: TextStyles.imageCaption }],
        },
    })({
        component: (props: TextStyleRenderElementProps) => <ImageCaptionMarkupElementNode {...props} styles={styles} />,
    });
