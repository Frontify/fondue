/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createParagraphPlugin } from '@udecode/plate';
import { PARAGRAPH_PLUGIN } from './id';
import { ParagraphMarkupElement } from './ParagraphMarkupElement';
import { Plugin, PluginProps } from '../Plugin';

export class ParagraphPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(PARAGRAPH_PLUGIN, {
            markupElement: new ParagraphMarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createParagraphPlugin()];
    }
}

export * from './ParagraphMarkupElement';
