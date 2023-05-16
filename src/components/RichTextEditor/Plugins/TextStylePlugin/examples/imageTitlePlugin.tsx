/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { MarkupElement, Plugin, PluginProps, getColumnBreakClasses } from '../../../';
import { alignmentClassnames, getTextStyleCssProperties } from '../../helper';
import { merge } from '@utilities/merge';
import { TextStyles } from '../types';

const ID = 'textstyle-imageTitle-plugin';

export class ImageTitlePlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(TextStyles.imageTitle, {
            label: 'Image Title',
            markupElement: new ImageTitleMarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createImageTitlePlugin()];
    }
}

class ImageTitleMarkupElement extends MarkupElement {
    constructor(id = ID, node = ImageTitleMarkupElementNode) {
        super(id, node);
    }
}
const ImageTitleMarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;

    return (
        <p
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={getTextStyleCssProperties(element.type)}
        >
            {children}
        </p>
    );
};

const createImageTitlePlugin = createPluginFactory({
    key: TextStyles.imageTitle,
    isElement: true,
    component: ImageTitleMarkupElementNode,
    deserializeHtml: {
        rules: [{ validClassName: 'imageTitle' }],
    },
});
