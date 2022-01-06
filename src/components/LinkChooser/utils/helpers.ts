/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Key } from "react";
import { DEFAULT_ICON, IconOptions } from "../LinkChooser";
import { defaultSection, sections } from "../sections";
import { SearchResult } from "../types";

export const doesContainSubstring = (source: string, target: string): boolean =>
    source.toLowerCase().includes(target.toLowerCase());

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
    const section = sections.find((section) => id === section.id) || defaultSection;
    send(`GO_TO_${section?.sectionId}`);
};
