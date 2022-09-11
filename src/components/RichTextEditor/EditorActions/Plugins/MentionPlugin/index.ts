/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createComboboxPlugin, createMentionPlugin } from '@udecode/plate';
import { MENTION_PLUGIN } from './id';
import { MentionMarkupElement } from './MentionMarkupElement';
import { Plugin } from '../Plugin';

export class MentionPlugin extends Plugin {
    constructor(id = MENTION_PLUGIN, button = undefined, markupElement = new MentionMarkupElement()) {
        super(id, button, markupElement);
    }

    plugins() {
        return [createComboboxPlugin(), createMentionPlugin()];
    }
}
