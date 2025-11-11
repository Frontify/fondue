/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createComboboxPlugin } from '@udecode/plate-combobox';
import { type PlatePlugin } from '@udecode/plate-core';
import { type MentionPlugin as MentionPluginPlate, createMentionPlugin } from '@udecode/plate-mention';

import { Plugin } from '../Plugin';

import { MentionInline } from './MentionInline';
import { MentionInputMarkupElement } from './MentionInputMarkupElement';
import { MentionMarkupElement } from './MentionMarkupElement';
import { mentionPlugin } from './config';
import { MENTION_PLUGIN } from './id';
import { type MentionItemData, type MentionPluginProps } from './types';

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
