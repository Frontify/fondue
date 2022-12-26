/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MentionPlugin, createMentionPlugin as createMentionPluginPlate } from '@udecode/plate';
import { MentionItemData } from './types';

export const createMentionPlugin = () =>
    createMentionPluginPlate<MentionPlugin<MentionItemData>>({
        options: {
            trigger: '@',
            createMentionNode: (item) => ({
                value: item.text,
                key: item.key,
                category: item.data.category,
            }),
        },
    });
