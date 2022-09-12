/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { createComboboxPlugin } from '@udecode/plate';
import { MENTION_PLUGIN } from './id';
import { MentionMarkupElement } from './MentionMarkupElement';
import { Plugin } from '../Plugin';
import { MentionInline } from './MentionInline';
import { createMentionPlugin } from './createMentionPlugin';

export class MentionPlugin extends Plugin {
    constructor(id = MENTION_PLUGIN, button = undefined, markupElement = new MentionMarkupElement()) {
        super(id, button, markupElement);
    }

    inline(): () => ReactElement {
        return MentionInline;
    }

    plugins() {
        return [createComboboxPlugin(), createMentionPlugin()];
    }
}
