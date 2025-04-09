/* (c) Copyright Frontify Ltd., all rights reserved. */

export const makeIdGenerator = (prefixToken?: string) => {
    let seedId = 0;
    const prefix = prefixToken ?? +new Date();

    return () => {
        return `${prefix}-${seedId++}`;
    };
};
