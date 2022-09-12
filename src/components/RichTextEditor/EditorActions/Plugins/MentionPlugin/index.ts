/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createComboboxPlugin } from '@udecode/plate';
import { MENTION_PLUGIN } from './id';
import { MentionMarkupElement } from './MentionMarkupElement';
import { Plugin, PluginProps } from '../Plugin';
import { MentionInline } from './MentionInline';
import { createMentionPlugin } from './createMentionPlugin';

import { mentionable } from '../../../utils/exampleValues';

export class MentionPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super({
            id: MENTION_PLUGIN,
            markupElement: new MentionMarkupElement(),
            ...props,
        });
    }

    inline() {
        return MentionInline(mentionable);
    }

    plugins() {
        return [createComboboxPlugin(), createMentionPlugin()];
    }
}
