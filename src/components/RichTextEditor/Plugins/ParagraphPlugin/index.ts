/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ParagraphMarkupElement } from './ParagraphMarkupElement';
import { Plugin, PluginProps } from '../Plugin';
import { createParagraphPlugin } from './createParagraphPlugin';
import { ELEMENT_PARAGRAPH } from '@udecode/plate';
import { CSSProperties } from 'react';

export class ParagraphPlugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultParagraph, ...props }: PluginProps = {}) {
        super(ELEMENT_PARAGRAPH, {
            markupElement: new ParagraphMarkupElement(),
            label: 'Body Text',
            ...props,
        });
        this.styles = styles;
    }

    plugins() {
        return [createParagraphPlugin()];
    }
}

const defaultParagraph = {
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 'normal',
};

export * from './ParagraphMarkupElement';
export * from './createParagraphPlugin';
