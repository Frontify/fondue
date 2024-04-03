/* (c) Copyright Frontify Ltd., all rights reserved. */

export const generateRandomId = (): string => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `id-${window.crypto.getRandomValues(new Uint32Array(1))}`;
};
