/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ExtraSection, SearchResult } from '..';
import { IconName } from '../types';
import { filterItems } from '../utils/helpers';

const defaultTemplateProps = { link: '#', icon: IconName.Template };

const getTemplatesByQueryMock = (query: string): Promise<SearchResult[]> =>
    new Promise((resolve) =>
        setTimeout(
            () => {
                resolve(filterItems(query, TEMPLATE_ITEMS, [templateSection]) || []);
            },
            Math.floor(Math.random() * 2000),
        ),
    );

export const templateSection: ExtraSection = {
    id: 'templates',
    title: 'Templates',
    getResults: getTemplatesByQueryMock,
};

export const TEMPLATE_ITEMS = [
    {
        id: '7',
        preview:
            'https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiZGVtb1wvYWNjb3VudHNcLzBmXC83MDAwMDQ3XC9wcm9qZWN0c1wvMzc5NFwvYXNzZXRzXC9hY1wvMTcyMDM0XC8yYzA5YTI1YjRmZDU1NTY4MDkzNjM3YzAwZDEyNWUzZC0xNTg2MjQ3Nzc5LmpwZyJ9:demo:lwxQ6B1hNWa7dUuxdWBh3x6tad8uuVooSriyYfSdVX8',
        title: 'Aerial City View',
        subtitle: 'Corporate Library',
        ...defaultTemplateProps,
    },
    {
        id: '8',
        preview:
            'https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiZGVtb1wvYWNjb3VudHNcLzBmXC83MDAwMDQ3XC9wcm9qZWN0c1wvMzc5NFwvYXNzZXRzXC9jNVwvMTc2ODg4XC83MWNjYjQ1M2FhNjViZTcwZDQ1ZGJhOGMzOTg4NDcwNC0xNTg4MTcxNDU3LmpwZyJ9:demo:EJ7NNdX5vL6j9bQ_QT4fsB7FPHsyGnHM0DD4YzpXj90',
        title: 'Brooklyn',
        subtitle: 'Template Library Old Brand',
        ...defaultTemplateProps,
    },
    {
        id: '9',
        preview:
            'https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiZGVtb1wvYWNjb3VudHNcLzBmXC83MDAwMDQ3XC9wcm9qZWN0c1wvMzc5NFwvYXNzZXRzXC9lZlwvMTg1OTIxXC9mOTU2NWVjMzZkNWQyZDQ2MDYwYjBhNzAxMjA1NDA1YS0xNTkwMDUzMTU3LmpwZyJ9:demo:0W8ccsKqSqEeknGWZAwTMngnEZfMYbIojonwqXnoU14',
        title: 'City',
        subtitle: 'SRF Kultur On Screen',
        ...defaultTemplateProps,
    },
    {
        id: '10',
        preview:
            'https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiZGVtb1wvYWNjb3VudHNcLzBmXC83MDAwMDQ3XC9wcm9qZWN0c1wvMzc5NFwvYXNzZXRzXC80NVwvMTcyMjk3XC84NWZkOWViYzkyYTQ1MTI4MGVkMTdmMGE2NDI0ZTMyMC0xNTg2MjcwNDY3LmpwZyJ9:demo:gR7jAgdZiD97tGOBl7fyACffrjq5IplWVZWmDNDa_JE',
        title: 'Malaya Poster',
        subtitle: 'UNICEF Social Campaign',
        ...defaultTemplateProps,
    },
    {
        id: '11',
        preview:
            'https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiZGVtb1wvYWNjb3VudHNcLzBmXC83MDAwMDQ3XC9wcm9qZWN0c1wvMzc5NFwvYXNzZXRzXC84NVwvMTcyMjk4XC81NTdjMzk5YTRlYTBhM2IxZWZhNGFmYzIzZjU3ODMzNy0xNTg2MjcwNDY3LmpwZyJ9:demo:6UgRwLcJnQosciitSqFaGXpvuoFtlQAUCC3rXT7tmN8',
        title: 'Brand Business Card',
        subtitle: 'Corporate Library',
        ...defaultTemplateProps,
    },
];
