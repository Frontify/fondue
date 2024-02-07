/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Key } from 'react';
import { CUSTOM_LINK_ID, DEFAULT_ICON, IconOptions } from '../LinkChooser';
import { defaultSection } from '../sections';
import { ExtraSection, SearchResult } from '../types';

export const doesContainSubstring = (source: string, target: string, sections: ExtraSection[]): boolean =>
    source.toLowerCase().includes(target.toLowerCase()) ||
    [...sections, defaultSection].some((section) => section.title.toLowerCase() === source.toLowerCase());

export const getDefaultData = async (): Promise<SearchResult[]> =>
    new Promise((resolve) =>
        setTimeout(() => {
            resolve([]);
        }, 2000),
    );

export const decoratedResults = (results: SearchResult[]) =>
    results.map((item) => ({
        ...item,
        decorator: IconOptions[item.icon || DEFAULT_ICON],
    }));

export const findSection = (sections: ExtraSection[], id: Key) => sections.find((section) => section.id === id);

export const isCustomLink = (link: SearchResult | null) =>
    !link || (typeof link.id === 'string' && link.id.includes(CUSTOM_LINK_ID));

export const filterItems = (query: string, results: SearchResult[], section: ExtraSection[] = []): SearchResult[] =>
    results.filter((item) => doesContainSubstring(item.title, query, section));

export const prependHttps = (link: string) => {
    if (!link.match(/https?:\/\//) && !link.includes('mailto:') && !link.includes('tel:')) {
        return `https://${link}`;
    }
    return link;
};
