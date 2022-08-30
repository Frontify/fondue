/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TComboboxItemBase, WithOverride } from '@udecode/plate';

export declare type Data = unknown;

export interface MentionNodeData {
    value: string;
}

export interface CreateMentionNode<TData extends Data> {
    (item: TComboboxItemMention<TData>): MentionNodeData;
}

export interface MentionPlugin<TData extends Data = string> {
    createMentionNode?: CreateMentionNode<TData>;
    id?: string;
    insertSpaceAfterMention?: boolean;
    trigger?: string;
    inputCreation?: {
        key: string;
        value: string;
    };
}

export interface TComboboxItemMention<TType extends Data = string> extends TComboboxItemBase {
    category: TType;
}

export type WithOverrideType = WithOverride<Record<string, unknown>, MentionPlugin<string>>;
