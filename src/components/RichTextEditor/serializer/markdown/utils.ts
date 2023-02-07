/* (c) Copyright Frontify Ltd., all rights reserved. */

import { OptionType, PartialOptionType, defaultNodeTypes } from './types';

const MENTION_ID_REGEX = '[\\d=a-z]+';
const MENTION_TYPE_REGEX = '[a-z]+';
export const MENTION_SERIALIZE_REGEX = new RegExp(`@\\[${MENTION_TYPE_REGEX}:${MENTION_ID_REGEX}\\]`, 'gi');
export const MENTION_DESERIALIZE_REGEX = new RegExp(`@\\[(${MENTION_TYPE_REGEX}):(${MENTION_ID_REGEX})\\]`, 'i');

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
