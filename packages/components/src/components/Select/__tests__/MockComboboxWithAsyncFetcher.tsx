/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Select } from '#/components/Select';
import { type AsyncItem, type AsyncItemsFetcher } from '#/components/Select/hooks/useSelectData';

type ComboboxProps = typeof Select.Combobox;
type MockComboboxWithAsyncFetcherProps = {
    asyncItems: AsyncItem[];
    shouldReject?: boolean;
} & ComboboxProps;

export const MockComboboxWithAsyncFetcher = ({
    asyncItems,
    shouldReject = false,
    ...props
}: MockComboboxWithAsyncFetcherProps) => {
    const getAsyncItems: AsyncItemsFetcher = async (filterText: string) => {
        const filteredItems = asyncItems.filter((item) => item.label.toLowerCase().includes(filterText.toLowerCase()));

        await new Promise((resolve, reject) => {
            if (shouldReject) {
                reject(new Error('Async fetch failed'));
            }
            setTimeout(resolve, 50);
        });

        return filteredItems;
    };

    return <Select.Combobox {...props} getAsyncItems={getAsyncItems} />;
};
