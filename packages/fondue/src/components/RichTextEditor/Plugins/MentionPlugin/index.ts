/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MentionPlugin as MentionPluginPlate, createMentionPlugin } from '@udecode/plate-mention';
import { PlatePlugin } from '@udecode/plate-core';
import { createComboboxPlugin } from '@udecode/plate-combobox';
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

    plugins(): PlatePlugin[] {
        return [createComboboxPlugin(), createMentionPlugin<MentionPluginPlate<MentionItemData>>(mentionPlugin)];
    }
}

export { MentionMarkupElement } from './MentionMarkupElement';
export { MentionMarkupElementNode } from './MentionMarkupElement/MentionMarkupElementNode';
export { combineMentionableKeyWith, mapMentionable, renderMentionLabel } from './helpers';
export { MentionableCategory } from './types';
export type { MentionableItems, MentionableItem, MappedMentionableItems } from './types';
