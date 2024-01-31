/* (c) Copyright Frontify Ltd., all rights reserved. */

export const generateRandomId = (): string => {
    return `id-${window.crypto.getRandomValues(new Uint32Array(1))}`;
};
