/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createStrikethroughPlugin } from '@udecode/plate';
import { STRIKETHROUGH_PLUGIN } from './id';
import { StrikethroughMarkupElement } from './StrikethroughMarkupElement';
import { StrikethroughButton } from './StrikethroughButton';
import { Plugin } from '../Plugin';

export class StrikethroughPlugin extends Plugin {
    constructor(
        id = STRIKETHROUGH_PLUGIN,
        button = StrikethroughButton,
        markupElement = new StrikethroughMarkupElement(),
    ) {
        super(id, button, markupElement);
    }

    plugins() {
        return [createStrikethroughPlugin()];
    }
}
