/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_MENTION,
    ELEMENT_MENTION_INPUT,
    createPluginFactory,
    mentionOnKeyDownHandler,
    withMention,
} from '@udecode/plate';
import { MentionPluginType, WithOverrideType } from './types';

export const createMentionPlugin = createPluginFactory<MentionPluginType>({
    key: ELEMENT_MENTION,
    isElement: true,
    isInline: true,
    isVoid: true,
    handlers: {
        onKeyDown: mentionOnKeyDownHandler(),
    },
    withOverrides: withMention as WithOverrideType,
    options: {
        trigger: '@',
        createMentionNode: (item) => ({ value: item.text, key: item.key, category: item.category }),
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
