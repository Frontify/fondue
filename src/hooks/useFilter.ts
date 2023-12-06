/* (c) Copyright Frontify Ltd., all rights reserved. */

type FilterHookProps<TValue> = {
    items: TValue[];
    itemKey: keyof TValue;
    term: string;
};
type FilterHookReturnType<TValue> = { results: TValue[] };

export const useFilter = <T>({ items, itemKey, term }: FilterHookProps<T>): FilterHookReturnType<T> => {
    const results: T[] = items.filter((item) => (item[itemKey] as string).toLowerCase().includes(term.toLowerCase()));
    return { results };
};
