/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from "react";
import { SearchResult } from "../LinkChooser";

const MAX_STORED_ITEMS = 5;
const QUERIES_STORAGE_KEY = "queries";

const getAllQueries = (): SearchResult[] => {
    const recentQueries = JSON.parse(localStorage.getItem(QUERIES_STORAGE_KEY) || "null");
    return recentQueries || [];
};

export const useQueriesStorage = (): [SearchResult[], (query: SearchResult) => void] => {
    const [queries, setQueries] = useState(getAllQueries());

    const storeNewQuery = (query: SearchResult) => {
        const retrievedItem = queries.find((item: SearchResult) => item.id === query.id);
        const updatedQueries = retrievedItem
            ? [{ ...query }, ...queries.filter((item: SearchResult) => item.id !== query.id)]
            : queries.length < MAX_STORED_ITEMS
            ? [{ ...query }, ...queries]
            : [{ ...query }, ...queries.slice(0, -1)];
        localStorage.setItem(QUERIES_STORAGE_KEY, JSON.stringify(updatedQueries));
        setQueries(updatedQueries);
    };

    return [queries, storeNewQuery];
};
