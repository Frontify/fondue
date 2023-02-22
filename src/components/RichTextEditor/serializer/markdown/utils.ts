/* (c) Copyright Frontify Ltd., all rights reserved. */

import { OptionType, PartialOptionType, defaultNodeTypes } from './types';

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
