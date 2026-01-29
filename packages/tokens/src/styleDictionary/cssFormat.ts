/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Format } from 'node_modules/style-dictionary/types/Format';
import { propertyFormatNames } from 'style-dictionary/enums';
import { formattedVariables } from 'style-dictionary/utils';

export const orderedVariables: Format = {
    name: 'css/orderedVariables',
    format: ({ dictionary, options }) => {
        const selector = Array.isArray(options.selector)
            ? options.selector
            : options.selector
              ? [options.selector]
              : [':root'];

        const { formatting } = options;

        const variables = formattedVariables({
            format: propertyFormatNames.css,
            dictionary: {
                ...dictionary,
                allTokens: dictionary.allTokens.sort((a, b) => a.name.localeCompare(b.name)),
            },
            formatting: {
                ...formatting,
            },
        });

        return `${selector.reverse().reduce((content, currentSelector) => {
            return `${currentSelector} {\n${content}\n}`;
        }, variables)}\n`;
    },
};
