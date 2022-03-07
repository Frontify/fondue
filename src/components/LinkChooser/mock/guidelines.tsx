/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItemContentSize } from "@components/MenuItem";
import { MenuItem } from "@components/MenuItem/MenuItem";
import IconGuidelines from "@foundation/Icon/Generated/IconGuidelines";
import React from "react";
import { ExtraSection, SearchResult } from "..";
import { IconLabel } from "../types";
import { filterItems } from "../utils/helpers";

const getGuidelinesByQueryMock = (query: string): Promise<SearchResult[]> =>
    new Promise((resolve) =>
        setTimeout(() => {
            resolve(filterItems(query, GUIDELINE_ITEMS, [guidelineSection]) || []);
        }, Math.floor(Math.random() * 2000)),
    );

export const guidelineSection: ExtraSection = {
    id: "guidelines",
    title: "Guidelines",
    getResults: getGuidelinesByQueryMock,
    renderPreview: (item) => <MenuItem {...item} decorator={<IconGuidelines />} size={MenuItemContentSize.Large} />,
};

export const GUIDELINE_ITEMS = [
    {
        id: "15",
        title: "Brand Guideline 1",
        subtitle: "Corporate Library",
        link: "#",
        icon: IconLabel.Guidelines,
    },
    {
        id: "16",
        title: "Brooklyn",
        subtitle: "Brand Guideline 2",
        link: "#",
        icon: IconLabel.Guidelines,
    },
    {
        id: "17",
        title: "Internal Project: SRF Kultur",
        subtitle: "",
        link: "#",
        icon: IconLabel.Guidelines,
    },
    {
        id: "18",
        title: "Color Block",
        subtitle: "UNICEF Social Campaign",
        link: "#",
        icon: IconLabel.Guidelines,
    },
    {
        id: "19",
        title: "Brand Business View",
        subtitle: "Guideline Library",
        link: "#",
        icon: IconLabel.Guidelines,
    },
];
