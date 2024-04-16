/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Dictionary, type TransformedToken } from 'style-dictionary';

import { trimHyphens } from '../../utils/trimHyphens';

const getOutline = ({ dictionary }: { dictionary: Dictionary }) => {
    return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        violet: `1px solid var(--${dictionary.tokens.focus?.['ring-color'].name})`,
    };
};

const getObject = ({
    tokens,
    filter,
    remove,
}: {
    tokens: TransformedToken[];
    filter: (token: TransformedToken) => boolean;
    remove: string;
}) => {
    const matchingTokens = tokens.filter(filter);
    const object = {};

    for (const token of matchingTokens) {
        const key = trimHyphens(token.name.replace(remove, ''));
        // @ts-expect-error Old untyped code
        object[key || 'DEFAULT'] = `var(--${token.name})`;
    }

    return object;
};

const getFontSize = ({ tokens }: { tokens: TransformedToken[] }) => {
    const matchingTokens = tokens.filter(
        (token) =>
            token.attributes?.category === 'size' &&
            token.attributes.type &&
            ['font', 'lineHeight'].includes(token.attributes.type),
    );

    const dictionary = matchingTokens.reduce((acc, cur) => {
        const slug = cur.name.replace('-line-height', '');
        return {
            ...acc,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            [slug]: {
                // @ts-expect-error Old untyped code
                ...acc[slug],
                [cur.name]: cur,
            },
        };
    }, {});

    const list = Object.keys(dictionary).map((key) => {
        const slug = key.replace('size-', '');
        return {
            // @ts-expect-error Old untyped code
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            [slug]: [`var(--${dictionary[key][key].name})`, `var(--${dictionary[key][`${key}-line-height`].name})`],
        };
    });

    const fonts = list.reduce((acc, cur) => {
        return { ...acc, ...cur };
    }, {});

    return fonts;
};

const getColors = ({ tokens }: { tokens: TransformedToken[] }) => {
    const matchingTokens = tokens.filter(
        (token) => token.attributes?.category === 'color' && !token.filePath.includes('brand'),
    );

    return matchingTokens.reduce((acc, token) => {
        const type = token.attributes?.type;
        const key = (type ? trimHyphens(type.replace('color', '').replace('--', '-')) : '') || 'DEFAULT';

        return {
            ...acc,
            // @ts-expect-error Old untyped code
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            [token.path[0]]: {
                // @ts-expect-error Old untyped code
                ...acc[token.path[0]],
                [key]: `var(--${token.name})`,
            },
        };
    }, {});
};

const getBoxShadow = ({ tokens, dictionary }: { tokens: TransformedToken[]; dictionary: Dictionary }) => {
    const matchingTokens = tokens.filter(
        (token) => token.attributes?.category === 'shadow' && token.attributes.type === 'matrix',
    );

    const boxShadowObject = {};

    for (const token of matchingTokens) {
        const key = trimHyphens(token.name.replace('shadow', ''));
        // @ts-expect-error Old untyped code
        boxShadowObject[key || 'DEFAULT'] = `var(--${token.name})`;
    }

    Object.assign(boxShadowObject, {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        'inner-line': `inset 0 0 0 var(--${dictionary.tokens.line?.width.name}) var(--${dictionary.tokens.line?.color.name})`,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        'inner-line-strong': `inset 0 0 0 var(--${dictionary.tokens.line?.width.name}) var(--${dictionary.tokens.line?.['color-strong'].name})`,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        'inner-line-x-strong': `inset 0 0 0 var(--${dictionary.tokens.line?.width.name}) var(--${dictionary.tokens.line?.['color-x-strong'].name})`,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        'inner-line-xx-strong': `inset 0 0 0 var(--${dictionary.tokens.line?.width.name}) var(--${dictionary.tokens.line?.['color-xx-strong'].name})`,
    });

    return boxShadowObject;
};

const getTheme = (dictionary: Dictionary) => {
    const tokens = dictionary.allTokens;

    return {
        colors: getColors({
            tokens,
        }),
        extend: {
            fontSize: getFontSize({
                tokens,
            }),

            fontFamily: getObject({
                remove: 'family',
                tokens,
                filter: (token) => token.attributes?.category === 'font' && token.attributes.type === 'family',
            }),

            boxShadow: getBoxShadow({
                tokens,
                dictionary,
            }),

            borderWidth: getObject({
                remove: 'line-width',
                tokens,
                filter: (token) => token.attributes?.category === 'size' && token.attributes.type === 'lineWidth',
            }),

            borderRadius: getObject({
                remove: 'radius',
                tokens,
                filter: (token) => token.attributes?.category === 'size' && token.attributes.type === 'borderRadius',
            }),

            ringColor: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                DEFAULT: `var(--${dictionary.tokens.focus?.['ring-color'].name})`,
            },

            outline: getOutline({ dictionary }),

            spacing: getObject({
                remove: 'space',
                tokens,
                filter: (token) => token.attributes?.category === 'size' && token.attributes.type === 'spacing',
            }),
        },
    };
};

export const buildTheme = ({ dictionary }: { dictionary: Dictionary }): Record<string, unknown> => {
    return getTheme(dictionary);
};
