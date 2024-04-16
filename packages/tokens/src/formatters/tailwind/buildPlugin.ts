/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Dictionary } from 'style-dictionary';

const getDeclaration = ({ token, dictionary }: { token: Dictionary['tokens'][string]; dictionary: Dictionary }) => {
    const declaration = {};

    const reference = dictionary.getReferences(token?.original.value)[0];
    const name = token?.name;

    // @ts-expect-error Old untyped code
    if (token.path?.[0] === 'text') {
        // @ts-expect-error Old untyped code
        if (token.path[1] === 'color') {
            // @ts-expect-error Old untyped code
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-base-to-string
            declaration[`.${name}`] = reference ? { color: `var(--${reference.name})}` } : { color: token.value };
        }
    }

    return declaration;
};

const flattenElements = ({ dictionary }: { dictionary: Dictionary }) => {
    return dictionary.allTokens
        .filter((token) => token.filePath.includes('.elements.'))
        .map((token) => {
            return getDeclaration({ token, dictionary });
        })
        .reduce((obj, item) => {
            // @ts-expect-error Old untyped code
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            obj[Object.keys(item)[0]] = item[Object.keys(item)[0]];
            return obj;
        }, {});
};

export const buildPlugin = ({ dictionary }: { dictionary: Dictionary }): Record<string, unknown> => {
    const elements = flattenElements({ dictionary });
    return elements;
};
