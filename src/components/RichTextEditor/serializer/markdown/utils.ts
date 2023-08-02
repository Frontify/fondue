/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MentionableCategory } from '@components/RichTextEditor/Plugins/MentionPlugin/types';
import { OptionType, PartialOptionType, defaultNodeTypes } from './types';

const MENTION_ID_REGEX = '[\\d=a-z]+';
const MENTIONABLE_CATEGORIES = Object.values(MentionableCategory).join('|');
const MENTION_REGEX_PATTERN = `@\\[(${MENTIONABLE_CATEGORIES}):${MENTION_ID_REGEX}\\]`;
export const MENTION_WITH_GROUPS_REGEX_PATTERN = `@\\[(${MENTIONABLE_CATEGORIES}):(${MENTION_ID_REGEX})\\]`;
export const MENTION_SERIALIZE_REGEX = new RegExp(MENTION_REGEX_PATTERN, 'gi');
export const MENTION_DESERIALIZE_REGEX = new RegExp(MENTION_WITH_GROUPS_REGEX_PATTERN, 'i');

export const BREAK_TAG = '<br>';
export const LINK_DESTINATION_KEY = 'link';

export const defaultOptions: OptionType = {
    nodeTypes: defaultNodeTypes,
    ignoreParagraphNewline: false,
    listDepth: 0,
    linkDestinationKey: LINK_DESTINATION_KEY,
};

export const getSelectedOptions = (options?: PartialOptionType): OptionType => ({
    ...defaultOptions,
    ...options,
    nodeTypes: {
        ...defaultOptions.nodeTypes,
        ...options?.nodeTypes,
        heading: {
            ...defaultOptions.nodeTypes.heading,
            ...options?.nodeTypes?.heading,
        },
    },
});

export const isMaliciousLink = (link: string) => /^(javascript:|data:text\/).+/.test(link);
