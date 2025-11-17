/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MentionableCategory, type MappedMentionableItems, type MentionableItems } from '../types';

export const combineMentionableKeyWith = (category: MentionableCategory, id: string) => `${category}:${id}`;

export const mapMentionable = (mentionable: MentionableItems): MappedMentionableItems => {
    const mentionableHashTable = new Map<string, string>();

    for (const mention of mentionable) {
        const key = combineMentionableKeyWith(mention.data.category, mention.data.id);
        const value = mention.text;
        mentionableHashTable.set(key, value);
    }

    return mentionableHashTable;
};
