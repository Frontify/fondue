/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconLabel, ImageSearchResult, SearchResult } from "../types";
import { guidelines } from "./guidelines";
import { templates } from "./templates";

const formatImageItemData = (array: ImageSearchResult[]): SearchResult[] =>
    array.map(({ id, title, subtitle, link, icon }) => ({ id, title, subtitle, link, icon }));

export const data = [
    {
        id: "1",
        title: "Brand listening - A Memoir",
        subtitle: "Guideline XYZ",
        link: "https://www.frontify.com",
        icon: IconLabel.Document,
    },
    {
        id: "2",
        title: "Document Group",
        subtitle: "Guide ABC",
        link: "https://www.frontify.com/en/brand-guidelines/",
        icon: IconLabel.Document,
    },
    {
        id: "3",
        title: "Brand listening - Glossary & Docu.",
        subtitle: "Guideline XYZ",
        link: "https://www.frontify.com/en/digital-asset-management/",
        icon: IconLabel.Document,
    },
    {
        id: "4",
        title: '"www.website.com"',
        link: "https://www.frontify.com/en/digital-and-print-templates/",
        icon: IconLabel.External,
    },
    ...formatImageItemData(templates),
    ...formatImageItemData(guidelines),
];
