/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Data, TComboboxItemBase } from '@udecode/plate';
import { PluginProps } from '../Plugin';

interface MentionNodeData {
    value: string;
}

export type CreateMentionNode<TData extends Data> = (item: TComboboxItemMention<TData>) => MentionNodeData;

export enum TCategory {
    GROUP = 'group',
    ALL = 'all',
    USER = 'user',
}

export interface TComboboxItemMention<T extends Data = TCategory> extends TComboboxItemBase {
    category: T;
}

export type MentionableItems = TComboboxItemMention[];
export type MentionPluginProps = PluginProps & {
    mentionableItems?: MentionableItems;
};
