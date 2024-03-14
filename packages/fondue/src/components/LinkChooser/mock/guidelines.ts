/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ExtraSection, IconName, SearchResult } from '../types';
import { filterItems } from '../utils/helpers';

const getGuidelinesByQueryMock = (query: string): Promise<SearchResult[]> =>
    new Promise((resolve) =>
        setTimeout(
            () => {
                resolve(filterItems(query, GUIDELINE_ITEMS, [guidelineSection]) || []);
            },
            Math.floor(Math.random() * 2000),
        ),
    );

export const guidelineSection: ExtraSection = {
    id: 'guidelines',
    title: 'Guidelines',
    getResults: getGuidelinesByQueryMock,
};

export const GUIDELINE_ITEMS = [
    {
        id: '15',
        preview:
            'https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiZGVtb1wvYWNjb3VudHNcLzBmXC83MDAwMDQ3XC9wcm9qZWN0c1wvMzc5NFwvYXNzZXRzXC84MVwvNzA2MzRcL2RmZGNiYjg0NDc2Zjg1NWZkN2NkYTZmZjVhZGQ0OWY3LTE1OTc4NDY1MDQuanBnIn0:demo:pbBQjnMpyPm-Y3VIT3PsjRvxAcgjf_Fu66NBGxhGzm4',
        title: 'Brand Guideline 1',
        subtitle: 'Corporate Library',
        link: '#',
        icon: IconName.Document,
    },
    {
        id: '16',
        preview:
            'https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiZGVtb1wvYWNjb3VudHNcLzBmXC83MDAwMDQ3XC9wcm9qZWN0c1wvMzc5NFwvYXNzZXRzXC9hMlwvMTc2ODg1XC83ODVhNDE2MGU3MmI4MmIwMjI2MWYyZmI5ZjM4MzQ3Zi0xNTg4MTcxNDU3LmpwZyJ9:demo:BdZSW_EJ9MK7tj97PJWAYoI-JQpLSCoNuem8yPsJRRU',
        title: 'Brooklyn',
        subtitle: 'Brand Guideline 2',
        link: '#',
        icon: IconName.Document,
    },
    {
        id: '17',
        preview:
            'https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiZGVtb1wvYWNjb3VudHNcLzBmXC83MDAwMDQ3XC9wcm9qZWN0c1wvMzc5NFwvYXNzZXRzXC8xNlwvMTg5MDQ0XC81YTBlMmY3NDNlYzg5NmMwNWUyYmYzOTQ3ZjIzZjNiZS0xNTkxMzUwNDgyLmpwZyJ9:demo:N71e31eSauAlSP3ftzqghrfXBrfKg4j-5Fz6oepIN2w',
        title: 'Internal Project: SRF Kultur',
        subtitle: '',
        link: '#',
        icon: IconName.Library,
    },
    {
        id: '18',
        preview:
            'https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiZGVtb1wvYWNjb3VudHNcLzBmXC83MDAwMDQ3XC9wcm9qZWN0c1wvMzc5NFwvYXNzZXRzXC9mMVwvNzA2MDlcL2E2ZjZiOTRjYTZlYWY2NDM5YzJkM2UxODA1MjllNzc1LTE1NTE2ODc1ODUuanBnIn0:demo:y-gQs4zFi04GXZs0muCnngE6IHJsHSbDuUDdVAjuXPI',
        title: 'Color Block',
        subtitle: 'UNICEF Social Campaign',
        link: '#',
        icon: IconName.Document,
    },
    {
        id: '19',
        preview:
            'https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiZGVtb1wvYWNjb3VudHNcLzBmXC83MDAwMDQ3XC9wcm9qZWN0c1wvMzc5NFwvYXNzZXRzXC85MFwvMTcxOTA4XC8yZWYyZTcyZjc0NmMxNGYwZWRiYzU2ZTg5NWU0OGFkMC0xNTg2MjQ2MDE4LmpwZyJ9:demo:OzFxNwODI9hPk1xTxCQBPRA3GNKhvMWM5x6d5ZeCRN4',
        title: 'Brand Business View',
        subtitle: 'Guideline Library',
        link: '#',
        icon: IconName.Template,
    },
];
