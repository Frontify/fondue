/* (c) Copyright Frontify Ltd., all rights reserved. */

export const trimHyphens = (value: string): string => {
    return value.replace(/^-+/, '').replace(/-+$/, '');
};
