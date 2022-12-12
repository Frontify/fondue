/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BOLD_PLUGIN } from './id';
import { BoldMarkupElement } from './BoldMarkupElement';
import { BoldButton } from './BoldButton';
import { Plugin, PluginProps } from '../Plugin';
import { createBoldPlugin } from './createBoldPlugin';

export class BoldPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(BOLD_PLUGIN, {
            button: BoldButton,
            markupElement: new BoldMarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createBoldPlugin()];
    }
}

export * from './BoldMarkupElement';
