/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createComboboxPlugin } from '@udecode/plate';
import { MENTION_PLUGIN } from './id';
import { MentionMarkupElement } from './MentionMarkupElement';
import { Plugin, PluginProps } from '../Plugin';
import { MentionInline } from './MentionInline';
import { createMentionPlugin } from './createMentionPlugin';
import { MentionableItems } from './types';

type MentionPluginProps = PluginProps & {
    mentionableItems?: MentionableItems;
};

export class MentionPlugin extends Plugin {
    private mentionableItems: MentionableItems = [];

    constructor(props?: MentionPluginProps) {
        super({
            id: MENTION_PLUGIN,
            markupElement: new MentionMarkupElement(),
            ...props,
        });

        if (props?.mentionableItems) {
            this.mentionableItems = props?.mentionableItems;
        }
    }

    inline() {
        return MentionInline(this.mentionableItems);
    }

    plugins() {
        return [createComboboxPlugin(), createMentionPlugin()];
    }
}
