/* (c) Copyright Frontify Ltd., all rights reserved. */

const isObject = (item: unknown): boolean => {
    return typeof item === 'object' && !Array.isArray(item);
};

export const mergeDeep = <T>(target: T, ...sources: T[]): T => {
    if (sources.length === 0) {
        return target;
    }
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                // @ts-expect-error Old untyped code
                if (!target[key]) {
                    // @ts-expect-error Old untyped code
                    Object.assign(target, {
                        [key]: {},
                    });
                }
                // @ts-expect-error Old untyped code
                mergeDeep(target[key], source[key]);
            } else {
                // @ts-expect-error Old untyped code
                Object.assign(target, {
                    [key]: source[key],
                });
            }
        }
    }

    return mergeDeep(target, ...sources);
};
