/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TComboboxItemBase, WithOverride } from '@udecode/plate';

export declare type Data = unknown;

interface MentionNodeData {
    value: string;
}

export interface CreateMentionNode<TData extends Data> {
    (item: TComboboxItemMention<TData>): MentionNodeData;
}

export enum TCategory {
    GROUP = 'group',
    ALL = 'all',
    USER = 'user',
}

export interface MentionPluginType<TData extends Data = TCategory> {
    createMentionNode?: CreateMentionNode<TData>;
    id?: string;
    insertSpaceAfterMention?: boolean;
    trigger?: string;
    inputCreation?: {
        key: string;
        value: string;
    };
}

export interface TComboboxItemMention<T extends Data = TCategory> extends TComboboxItemBase {
    category: T;
}

export type WithOverrideType = WithOverride<Record<string, unknown>, MentionPluginType<TCategory>>;
