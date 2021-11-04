/* (c) Copyright Frontify Ltd., all rights reserved. */

export default (): string => {
    return `id-${window.crypto.getRandomValues(new Uint32Array(1))}`;
};
