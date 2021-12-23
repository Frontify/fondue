/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TreeNodeProps } from "@components/Tree";
import { IconType, SearchResult } from "../types";

export const flatten = (array: TreeNodeProps[]) => {
    let result: TreeNodeProps[] = [];

    array.forEach((a) => {
        if (a.nodes && Array.isArray(a.nodes)) {
            result = result.concat(flatten(a.nodes));
        } else {
            result.push(a);
        }
    });

    return result;
};

export const mapToSearchResult = (node?: TreeNodeProps) =>
    node
        ? {
              id: node.id,
              link: node.value,
              title: node.name,
              icon: IconType.Link,
          }
        : null;

export const doesContainSubstring = (source: string, target: string): boolean =>
    source.toLowerCase().includes(target.toLowerCase());

export const getMockData = (query: string, data: SearchResult[], returnError = false): Promise<SearchResult[]> =>
    new Promise((resolve, reject) =>
        setTimeout(() => {
            returnError ? reject() : resolve(data.filter((item) => doesContainSubstring(item.title, query)));
        }, Math.floor(Math.random() * 2000)),
    );

export const getMockGuidelines = (query: string, data: TreeNodeProps[]): Promise<TreeNodeProps[]> =>
    new Promise((resolve) =>
        setTimeout(() => {
            resolve(data.filter((item) => doesContainSubstring(item.name, query)));
        }, Math.floor(Math.random() * 2000)),
    );
