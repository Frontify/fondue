/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MentionItemData, MentionPlugin } from './types';
import { withMention } from './withMention';

export const mentionPlugin: MentionPlugin<MentionItemData> = {
    withOverrides: withMention,
    options: {
        trigger: '@',
        createMentionNode: (item) => ({
            value: item.text,
            category: item.data.category,
            id: item.data.id,
        }),
    },
};
