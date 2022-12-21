/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MentionPlugin, createMentionPlugin as createMentionPluginPlate } from '@udecode/plate';
import { CreateMentionNodeWithItem, MentionComboboxItem, MentionNodeItem } from './types';

export const createMentionPlugin = () =>
    createMentionPluginPlate<MentionPlugin<MentionComboboxItem>>({
        options: {
            trigger: '@',
            createMentionNode: ((item: MentionNodeItem) => ({
                value: item.text,
                key: item.key,
                category: item.category,
            })) as unknown as CreateMentionNodeWithItem,
        },
    });
