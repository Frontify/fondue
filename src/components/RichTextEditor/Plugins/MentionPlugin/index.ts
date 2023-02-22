/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createComboboxPlugin } from '@udecode/plate';
import { MENTION_PLUGIN } from './id';
import { MentionMarkupElement } from './MentionMarkupElement';
import { Plugin } from '../Plugin';
import { MentionInline } from './MentionInline';
import { createMentionPlugin } from './createMentionPlugin';
import { MentionPluginProps } from './types';

export class MentionPlugin extends Plugin<MentionPluginProps> {
    constructor(props: MentionPluginProps) {
        super(MENTION_PLUGIN, {
            markupElement: new MentionMarkupElement().setNodeWithMentionable(props.mentionableItems),
            ...props,
        });
    }

    inline() {
        return MentionInline(this.props?.mentionableItems || []);
    }

    plugins() {
        return [createComboboxPlugin(), createMentionPlugin()];
    }
}

export { MentionableCategory } from './types';
export type { MentionableItems } from './types';
