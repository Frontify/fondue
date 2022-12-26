/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TComboboxItemWithData } from '@udecode/plate';
import { PluginProps } from '../Plugin';

export enum MentionableCategory {
    GROUP = 'group',
    ALL = 'all',
    USER = 'user',
}

export interface MentionItemData {
    category: MentionableCategory;
}

export type MentionableItem = TComboboxItemWithData<MentionItemData>;

export type MentionableItems = MentionableItem[];

export type MentionPluginProps = PluginProps & {
    mentionableItems: MentionableItems;
};
