/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import { CUSTOM_LINK_ID, DEFAULT_ICON, QUERIES_STORAGE_KEY } from "../LinkChooser";
import { SearchResult } from "../types";

export const createCustomLink = (query: string): SearchResult =>
    ({
        id: CUSTOM_LINK_ID,
        title: query,
        link: query,
        decorator: DEFAULT_ICON,
        size: MenuItemContentSize.Large,
    } as SearchResult);

export const retrieveRecentQueries = (): SearchResult[] =>
    JSON.parse(localStorage.getItem(QUERIES_STORAGE_KEY) || "null") || [];
