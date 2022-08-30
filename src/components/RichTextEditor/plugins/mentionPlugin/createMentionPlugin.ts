/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_MENTION,
    ELEMENT_MENTION_INPUT,
    MentionPlugin,
    createPluginFactory,
    mentionOnKeyDownHandler,
    withMention,
} from '@udecode/plate';

export const createMentionPlugin = createPluginFactory<MentionPlugin>({
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
        createMentionNode: (item) => ({ value: item.text }),
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
