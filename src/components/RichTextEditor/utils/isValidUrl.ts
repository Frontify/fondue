/* (c) Copyright Frontify Ltd., all rights reserved. */

export const isValidUrl = (url: string): boolean => {
    if (/^\/r\/.+$/) {
        return true;
    }

    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};
