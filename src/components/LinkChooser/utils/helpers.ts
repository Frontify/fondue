/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Key } from "react";
import { CUSTOM_LINK_ID, DEFAULT_ICON, IconOptions } from "../LinkChooser";
import { defaultSection, sections } from "../sections";
import { SearchResult } from "../types";

export const doesContainSubstring = (source: string, target: string): boolean =>
    source.toLowerCase().includes(target.toLowerCase()) ||
    [...sections, defaultSection].some((section) => {
        return section.title.toLowerCase() === source.toLowerCase();
    });

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

export const goToSection = (id: Key, send: (data: string) => void) => {
    const selectedSection = sections.find((section) => id === section.id) || defaultSection;
    send(`GO_TO_${selectedSection?.sectionId}`);
};

export const isCustomLink = (link: SearchResult | null) =>
    !link || (typeof link.id === "string" && link.id.includes(CUSTOM_LINK_ID));
