/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * @deprecated This function is deprecated and will be removed in the next major version.
 */
export const generateRandomId = (): string => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `id-${window.crypto.getRandomValues(new Uint32Array(1))}`;
};
