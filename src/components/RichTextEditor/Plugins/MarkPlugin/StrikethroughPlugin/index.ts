/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createStrikethroughPlugin } from '@udecode/plate';
import { STRIKETHROUGH_PLUGIN } from './id';
import { StrikethroughMarkupElement } from './StrikethroughMarkupElement';
import { StrikethroughButton } from './StrikethroughButton';
import { Plugin, PluginProps } from '../../Plugin';

export class StrikethroughPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(STRIKETHROUGH_PLUGIN, {
            button: StrikethroughButton,
            markupElement: new StrikethroughMarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createStrikethroughPlugin()];
    }
}

export * from './StrikethroughMarkupElement';
