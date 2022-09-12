/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createComboboxPlugin } from '@udecode/plate';
import { MENTION_PLUGIN } from './id';
import { MentionMarkupElement } from './MentionMarkupElement';
import { Plugin } from '../Plugin';
import { MentionInline } from './MentionInline';
import { createMentionPlugin } from './createMentionPlugin';

import { mentionable } from '@components/RichTextEditor/utils/exampleValues';

export class MentionPlugin extends Plugin {
    constructor(id = MENTION_PLUGIN, button = undefined, markupElement = new MentionMarkupElement()) {
        super(id, button, markupElement);
    }

    inline() {
        return MentionInline(mentionable);
    }

    plugins() {
        return [createComboboxPlugin(), createMentionPlugin()];
    }
}
