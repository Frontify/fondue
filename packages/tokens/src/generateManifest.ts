/* (c) Copyright Frontify Ltd., all rights reserved. */

type Tokens = {
    [key: string]: Tokens;
};

export const generateManifest = (availableTokens: { colors: Tokens; semantic: Tokens; utilities: Tokens }) => {
    const colorTokens = getTokenObject(availableTokens.colors, 'color');
    const semanticTokens = getTokenObject(availableTokens.semantic, 'semantic');
    const utilitiesTokens = getTokenObject(availableTokens.utilities, 'utility');

    console.log(semanticTokens);

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
                return parseTokenName(`${namePrefix}.${key}`);
            }
            return getTokenObject(value, `${namePrefix}.${key}`);
        })
        .flatMap((token) => token as ResolvedToken[]);
};

const parseTokenName = (tokenName: string) => {
    const nameParts = tokenName.split('.');
    const cssVariable = `var(--${nameParts.join('-')})`;

    const type = nameParts[0];
    nameParts.shift();

    let usageContext = '';
    if (nameParts[0] === 'charts' || nameParts[0] === 'container') {
        usageContext = nameParts[0];
        nameParts.shift();
    }

    const group = nameParts[0];
    const variant = nameParts[1];

    const tailwindClassName = `*-${usageContext ? `${usageContext}-` : ''}${group}${variant === 'default' ? '' : `-${variant}`}`;

    return {
        id: tokenName,
        cssVariable,
        tailwindClassName,
        type,
        group,
        variant: variant?.startsWith('on-') ? 'contrast color' : variant,
        usageContext,
    };
};
