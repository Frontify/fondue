/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PARAGRAPH_PLUGIN } from './id';
import { ParagraphMarkupElement } from './ParagraphMarkupElement';
import { Plugin, PluginProps } from '../Plugin';
import { createParagraphPlugin } from './createParagraphPlugin';

export class ParagraphPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(PARAGRAPH_PLUGIN, {
            markupElement: new ParagraphMarkupElement(),
            label: 'Body Text',
            ...props,
        });
    }

    plugins() {
        return [createParagraphPlugin()];
    }
}

export * from './ParagraphMarkupElement';
export * from './createParagraphPlugin';
