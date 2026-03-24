/* (c) Copyright Frontify Ltd., all rights reserved. */

type Tokens = {
    [key: string]: Tokens;
};

export const generateManifest = (availableTokens: { colors: Tokens; semantic: Tokens; utilities: Tokens }) => {
    const colorTokens = getTokenObject(availableTokens.colors, 'color');
    const semanticTokens = getTokenObject(availableTokens.semantic, 'semantic');
    const utilitiesTokens = getTokenObject(availableTokens.utilities, 'utility');

    console.log(colorTokens, semanticTokens, utilitiesTokens);

    return availableTokens;
};

type ResolvedToken = {
    name: string;
    value: string;
};

const getTokenObject = (tokenObject: Tokens, namePrefix: string): ResolvedToken[] => {
    return Object.entries(tokenObject)
        .map(([key, value]) => {
            if (typeof value === 'object' && 'name' in value) {
                return {
                    name: `${namePrefix}.${key}`,
                    value: value.value,
                };
            }
            return getTokenObject(value, `${namePrefix}.${key}`);
        })
        .flatMap((token) => token as ResolvedToken[]);
};
