/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_MENTION,
    ELEMENT_MENTION_INPUT,
    createPluginFactory,
    mentionOnKeyDownHandler,
    withMention,
} from '@udecode/plate';
import { MentionComboboxItem } from './types';

export const createMentionPlugin = createPluginFactory({
    key: ELEMENT_MENTION,
    isElement: true,
    isInline: true,
    isVoid: true,
    handlers: {
        onKeyDown: mentionOnKeyDownHandler(),
    },
    withOverrides: withMention,
    options: {
        trigger: '@',
        createMentionNode: (item: MentionComboboxItem) => ({
            value: item.text,
            key: item.key,
            category: item.category,
        }),
    },
    plugins: [
        {
            key: ELEMENT_MENTION_INPUT,
            isElement: true,
            isInline: true,
        },
    ],
    then: (editor, { key }) => ({
        options: {
            id: key,
        },
    }),
});
