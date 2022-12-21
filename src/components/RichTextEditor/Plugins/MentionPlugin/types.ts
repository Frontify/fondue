/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CreateMentionNode, Data, TComboboxItemBase } from '@udecode/plate';
import { PluginProps } from '../Plugin';

export enum MentionableCategory {
    GROUP = 'group',
    ALL = 'all',
    USER = 'user',
}

export interface MentionComboboxItem<T extends Data = MentionableCategory> extends TComboboxItemBase {
    category: T;
}

export type MentionableItems = MentionComboboxItem[];
export type MentionPluginProps = PluginProps & {
    mentionableItems: MentionableItems;
};

export type MentionNodeItem = {
    text: string;
    key: string;
    category: string;
};

export type CreateMentionNodeWithItem = CreateMentionNode<MentionNodeItem>;
