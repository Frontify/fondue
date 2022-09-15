/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { HEADING1_PLUGIN } from './id';
import { Heading1MarkupElement } from './Heading1MarkupElement';
// import { BoldButton } from './BoldButton';
import { Plugin, PluginProps } from '../../Plugin';
import { TextStyles } from '../TextStyleDropdown/types';

export const createHeading1Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_HEADING1,
    isElement: true,
    deserializeHtml: {
        rules: [{ validNodeName: ['h1', 'H1'] }],
    },
});

export class Heading1Plugin extends Plugin {
    constructor(props?: PluginProps) {
        super({
            id: HEADING1_PLUGIN,
            // button: BoldButton,
            markupElement: new Heading1MarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createHeading1Plugin()];
    }
}
