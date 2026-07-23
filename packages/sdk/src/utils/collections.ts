/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Collection helpers used while building the graph. */

/** Stable sort by `name`. Pinned to the 'en' locale so ordering is identical across machines. */
export const sortedByName = <T extends { readonly name: string }>(values: Iterable<T>): readonly T[] => {
    return Array.from(values).sort((a, b) => a.name.localeCompare(b.name, 'en'));
};

/** Append `value` to the array stored at `key`, creating the bucket if missing. */
export const pushToMultiMap = <K, V>(map: Map<K, V[]>, key: K, value: V): void => {
    const list = map.get(key);
    if (list) {
        list.push(value);
    } else {
        map.set(key, [value]);
    }
};
