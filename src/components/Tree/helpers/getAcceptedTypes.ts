/* (c) Copyright Frontify Ltd., all rights reserved. */

export const getAcceptTypes = <
    T extends { within: string | string[]; after: string | string[]; before: string | string[] } | string | string[],
>(
    accepts: T,
    position: 'within' | 'after' | 'before',
) => {
    if (typeof accepts === 'object' && !(accepts instanceof Array)) {
        return accepts[position];
    } else {
        return accepts as string | string[];
    }
};
