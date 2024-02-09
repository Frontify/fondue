/* (c) Copyright Frontify Ltd., all rights reserved. */

export const kebabCase = (value: string): string => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return value.replaceAll(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};
