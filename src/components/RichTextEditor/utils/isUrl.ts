/* (c) Copyright Frontify Ltd., all rights reserved. */

export const isUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};
