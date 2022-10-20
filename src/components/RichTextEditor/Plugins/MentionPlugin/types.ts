/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Data, TComboboxItemBase } from '@udecode/plate';
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
