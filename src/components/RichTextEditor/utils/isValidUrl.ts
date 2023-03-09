/* (c) Copyright Frontify Ltd., all rights reserved. */

export const isValidUrl = (url: string): boolean => {
    if (url.trim() === '') {
        return false;
    }

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
