/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MentionPlugin, PlatePlugin } from '@udecode/plate';
import { MentionItemData } from './types';

export const mentionPlugin: Partial<PlatePlugin<MentionPlugin<MentionItemData>>> = {
    options: {
        trigger: '@',
        createMentionNode: (item) => ({
            value: item.text,
            category: item.data.category,
            id: item.data.id,
        }),
    },
};
