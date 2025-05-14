/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Dictionary, type TransformedToken } from 'style-dictionary';

const getObject = ({
    tokens,
    identifier,
    filter,
}: {
    tokens: TransformedToken[];
    identifier: string[];
    filter?: (token: TransformedToken) => boolean;
}) => {
    const matchingTokens =
        tokens?.filter(
            (token) =>
                identifier.every((idSegment, index) => token.path[index + 1] === idSegment) &&
                (filter ? filter(token) : true),
        ) || [];

    type NestedObject = {
        [key: string]: NestedObject | string;
    };

    return matchingTokens.reduce<Record<string, unknown>>((acc, token) => {
        const path = token.path.slice(identifier.length + 1);
        let currentLevel = acc;
        for (const [index, segment] of path.entries()) {
            if (index === path.length - 1) {
                currentLevel[segment === 'default' ? 'DEFAULT' : segment] = token.value;
            } else if (segment !== path[index + 1]) {
                currentLevel[segment] = currentLevel[segment] || {};
                currentLevel = currentLevel[segment] as NestedObject;
            }
        }

        return acc;
    }, {});
};

const getTheme = (dictionary: Dictionary) => {
    const tokens = dictionary.allTokens;

    return {
        colors: getObject({
            tokens,
            identifier: ['color'],
            filter: (token) => {
                return token.attributes?.type !== 'primitive';
            },
        }),
        extend: {
            fontSize: getObject({
                identifier: ['typography', 'font-size'],
                tokens,
            }),

            fontWeight: getObject({
                identifier: ['typography', 'font-weight'],
                tokens,
            }),

            fontFamily: getObject({
                identifier: ['typography', 'font-family'],
                tokens,
            }),

            letterSpacing: getObject({
                identifier: ['typography', 'letter-spacing'],
                tokens,
            }),

            lineHeight: getObject({
                identifier: ['typography', 'line-height'],
                tokens,
            }),

            borderRadius: getObject({
                identifier: ['border-radius'],
                tokens,
            }),

            borderWidth: getObject({
                identifier: ['border-width'],
                tokens,
            }),

            ringColor: {
                DEFAULT: 'var(--color-focus-default)',
            },

            outline: { DEFAULT: '1px solid var(--color-focus-default)' },

            boxShadow: getObject({
                identifier: ['box-shadow'],
                tokens,
            }),

            spacing: getObject({
                identifier: ['spacing'],
                tokens,
            }),
        },
    };
};

export const buildTheme = ({ dictionary }: { dictionary: Dictionary }): Record<string, unknown> => {
    return getTheme(dictionary);
};
