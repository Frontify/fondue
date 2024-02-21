/* (c) Copyright Frontify Ltd., all rights reserved. */

import { WithOverride } from '@udecode/plate-core';
import { CreateMentionNode } from '@udecode/plate-mention';
import { Data, NoData, TComboboxItemWithData } from '@udecode/plate-combobox';
import { PluginProps } from '../Plugin';

export enum MentionableCategory {
    GROUP = 'group',
    ALL = 'all',
    USER = 'user',
}

export type MentionItemData = {
    id: string;
    category: MentionableCategory;
    image?: string;
};

export type MentionableItem = TComboboxItemWithData<MentionItemData>;

export type MentionableItems = MentionableItem[];

export type MentionPluginProps = PluginProps & {
    mentionableItems: MentionableItems;
};

export type MappedMentionableItems = Map<string, string>;

export interface MentionPlugin<TData extends Data = NoData> {
    withOverrides?: WithOverride;
    options: {
        trigger: string;
        insertSpaceAfterMention: boolean;
        createMentionNode?: CreateMentionNode<TData>;
    };
}
