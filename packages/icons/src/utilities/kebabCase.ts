/* (c) Copyright Frontify Ltd., all rights reserved. */

export const kebabCase = (value: string): string => {
    return value.replaceAll(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};
