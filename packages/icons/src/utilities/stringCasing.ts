/* (c) Copyright Frontify Ltd., all rights reserved. */

export const kebabCase = (value: string): string => {
    return value.replaceAll(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export const kebabCaseToCamelCase = (keyString: string) =>
    keyString
        .split('-')
        .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
        .join('');
