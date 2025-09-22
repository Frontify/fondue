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

    type NestedObject = Record<string, Record<string, string>>;

    return matchingTokens.reduce<NestedObject>((acc, token) => {
        const path = token.path.slice(identifier.length + 1);
        const property = path[path.length - 1];
        let partsToBeRemoved = 1;
        if (path[path.length - 2] === 'default') {
            partsToBeRemoved = 2;
        }
        const variant = `'.${path.slice(0, -partsToBeRemoved).join('-')}'`;

        if (property) {
            acc[variant] = acc[variant] || {};
            acc[variant][property.replace('letter-casing', 'text-transform')] = `"${token.value}"`;
        }

        return acc;
    }, {});
};

const getUtilClasses = (dictionary: Dictionary, identifier: string[]) => {
    const tokens = dictionary.allTokens;

    const textTokens = getObject({
        identifier,
        tokens,
    });

    const utils = Object.entries(textTokens).reduce((acc, [variantKey, variant]) => {
        if (!variant) {
            return acc;
        }
        const properties = Object.keys(variant).reduce((acc, propertyKey) => {
            const property = variant[propertyKey];
            if (!property) {
                return acc;
            }
            if (acc !== '') {
                acc += ', ';
            }
            acc += `${propertyKey.replaceAll(/-./g, (match) => match.slice(-1).toUpperCase())}: ${property}`;
            return acc;
        }, '');
        acc += `${variantKey}: { ${properties} }, `;
        return acc;
    }, '');

    return utils;
};

export const buildUtils = ({ dictionary }: { dictionary: Dictionary }): string => {
    return `plugin(function({ addUtilities }) {
      addUtilities({
        ${getUtilClasses(dictionary, ['text'])}
        '.ring-focus' : { boxShadow: '0 0 0 2px var(--color-surface-default), 0 0 0 6px var(--color-focus-default)', outline: 'none'}
      })
    })`;
};
