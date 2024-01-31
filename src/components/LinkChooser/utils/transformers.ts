/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItemContentSize, SelectionIndicatorIcon } from '@components/MenuItem';
import { generateRandomId } from '@utilities/generateRandomId';
import { CUSTOM_LINK_ID, DEFAULT_ICON, MAX_STORED_ITEMS, QUERIES_STORAGE_KEY } from '../LinkChooser';
import { SearchResult } from '../types';
import { isCustomLink, prependHttps } from './helpers';

export const createCustomLink = (query: string): SearchResult =>
    ({
        id: `${CUSTOM_LINK_ID}-${generateRandomId()}`,
        title: query,
        link: prependHttps(query),
        icon: DEFAULT_ICON,
        size: MenuItemContentSize.Large,
        selectionIndicator: SelectionIndicatorIcon.Check,
    }) as SearchResult;

export const retrieveRecentQueries = (): SearchResult[] => {
    const recentQueries = JSON.parse(localStorage.getItem(QUERIES_STORAGE_KEY) || 'null');
    return recentQueries || [];
};

export const mergeResultWithRecentQueries = (selectedResult: SearchResult): SearchResult[] => {
    const isSelectedCustomLink = isCustomLink(selectedResult);
    const localSelectedResult = { ...selectedResult, local: true };

    const retrievedQueries = retrieveRecentQueries();
    const retrievedItem = retrievedQueries.find((item: SearchResult) => item.id === selectedResult?.id);

    const parsedQueries = retrievedQueries.filter(
        (query) => !isSelectedCustomLink || (isSelectedCustomLink && query.title !== selectedResult.title),
    );

    let updatedQueries;
    if (retrievedItem) {
        updatedQueries = [
            localSelectedResult,
            ...parsedQueries.filter((item: SearchResult) => item.id !== selectedResult?.id),
        ];
    } else if (parsedQueries.length < MAX_STORED_ITEMS) {
        updatedQueries = [localSelectedResult, ...parsedQueries];
    } else {
        updatedQueries = [localSelectedResult, ...parsedQueries.slice(0, -1)];
    }
    return updatedQueries;
};
