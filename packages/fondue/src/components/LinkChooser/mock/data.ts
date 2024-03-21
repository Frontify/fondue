/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconName, ImageSearchResult, SearchResult } from '../types';
import { GUIDELINE_ITEMS } from './guidelines';
import { TEMPLATE_ITEMS } from './templates';

const formatImageItemData = (array: (ImageSearchResult | SearchResult)[]): SearchResult[] =>
    array.map(({ id, title, subtitle, link, icon }) => ({ id, title, subtitle, link, icon })) || [];

export const data = [
    {
        id: '1',
        title: 'Brand listening - A Memoir',
        subtitle: 'Guideline XYZ',
        link: 'https://www.frontify.com',
        icon: IconName.Document,
    },
    {
        id: '2',
        title: 'Document Group',
        subtitle: 'Guide ABC',
        link: 'https://www.frontify.com/en/brand-guidelines/',
        icon: IconName.Document,
    },
    {
        id: '3',
        title: 'Brand listening - Glossary & Docu.',
        subtitle: 'Guideline XYZ',
        link: 'https://www.frontify.com/en/digital-asset-management/',
        icon: IconName.Document,
    },
    {
        id: '4',
        title: '"www.website.com"',
        link: 'https://www.frontify.com/en/digital-and-print-templates/',
        icon: IconName.External,
    },
    ...formatImageItemData(TEMPLATE_ITEMS),
    ...formatImageItemData(GUIDELINE_ITEMS),
];
