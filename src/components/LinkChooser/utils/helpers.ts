/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItemContentSize } from "@components/MenuItem";
import { SearchResult } from "../types";

export const doesContainSubstring = (source: string, target: string): boolean =>
    source.toLowerCase().includes(target.toLowerCase());

export const filterItems = (query: string, results: SearchResult[]): SearchResult[] =>
    results.filter((item) => doesContainSubstring(item.title, query));

export const getMockData = (query: string, data: SearchResult[], returnError = false): Promise<SearchResult[]> =>
    new Promise((resolve, reject) =>
        setTimeout(() => {
            returnError
                ? reject()
                : resolve(
                      filterItems(query, data).map((item) => ({
                          ...item,
                          size: MenuItemContentSize.Large,
                      })),
                  );
        }, Math.floor(Math.random() * 2000)),
    );
