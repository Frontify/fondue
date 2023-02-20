/* (c) Copyright Frontify Ltd., all rights reserved. */

export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};
