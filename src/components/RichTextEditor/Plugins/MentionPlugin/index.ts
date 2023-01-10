/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MentionPlugin as MentionPluginPlate, createComboboxPlugin, createMentionPlugin } from '@udecode/plate';
import { MENTION_PLUGIN } from './id';
import { MentionMarkupElement } from './MentionMarkupElement';
import { Plugin } from '../Plugin';
import { MentionInline } from './MentionInline';
import { MentionItemData, MentionPluginProps } from './types';
import { mentionPlugin } from './config';
import { MentionInputMarkupElement } from './MentionInputMarkupElement';

export class MentionPlugin extends Plugin<MentionPluginProps> {
    constructor(props: MentionPluginProps) {
        super(MENTION_PLUGIN, {
            markupElement: new MentionMarkupElement().setNodeWithMentionable(props.mentionableItems),
            markupInputElement: new MentionInputMarkupElement(),
            ...props,
        });
    }

    inline() {
        return MentionInline(this.props?.mentionableItems || []);
    }

    plugins() {
        return [createComboboxPlugin(), createMentionPlugin<MentionPluginPlate<MentionItemData>>(mentionPlugin)];
    }
}

export { MentionableCategory } from './types';
export type { MentionableItems } from './types';
