/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MentionItemData, MentionPlugin } from './types';

export const mentionPlugin: MentionPlugin<MentionItemData> = {
    options: {
        trigger: '@',
        createMentionNode: (item) => ({
            value: item.text,
            category: item.data.category,
            id: item.data.id,
        }),
    },
};
