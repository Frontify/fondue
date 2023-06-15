/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CreateMentionNode, Data, NoData, TComboboxItemWithData, WithOverride } from '@udecode/plate';
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

export interface MentionPlugin<TData extends Data = NoData> {
    withOverrides?: WithOverride;
    options: {
        trigger: string;
        createMentionNode?: CreateMentionNode<TData>;
    };
}

export type MentionableItem = TComboboxItemWithData<MentionItemData>;

export type MentionableItems = MentionableItem[];

export type MentionPluginProps = PluginProps & {
    mentionableItems: MentionableItems;
};

export type MappedMentionableItems = Map<string, string>;
