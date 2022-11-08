/* (c) Copyright Frontify Ltd., all rights reserved. */

type NestedObject = {
    [key: string | number]: any;
};

export const isObject = <T = object>(obj: T) => obj && typeof obj === 'object' && !Array.isArray(obj);

export const deepMerge = <T extends NestedObject>(target: T, source: T): any => {
    if (!isObject(target) || !isObject(source)) {
        return {};
    }

    const output: NestedObject = Object.assign({}, target);

    for (const key of Object.keys(source)) {
        if (key in target && isObject(source[key])) {
            output[key] = deepMerge(target[key], source[key]);
            continue;
        }

        Object.assign(output, { [key]: source[key] });
    }

    return output;
};
