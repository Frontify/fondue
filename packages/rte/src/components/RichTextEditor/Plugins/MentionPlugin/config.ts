/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MentionItemData, type MentionPlugin } from './types';

export const mentionPlugin: MentionPlugin<MentionItemData> = {
    options: {
        trigger: '@',
        insertSpaceAfterMention: true,
        createMentionNode: (item) => ({
            value: item.text,
            category: item.data.category,
            id: item.data.id,
        }),
    },
};
