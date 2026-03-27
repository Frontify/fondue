/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from "vitest";

import {
    getIcon,
    getIconByExportName,
    listIcons,
    searchIcons,
} from "../icons.ts";

describe("listIcons", () => {
    it("returns an array of icons", () => {
        const icons = listIcons();
        expect(icons.length).toBeGreaterThan(0);
        expect(icons[0]).toHaveProperty("name");
        expect(icons[0]).toHaveProperty("exportName");
        expect(icons[0]).toHaveProperty("keywords");
    });

    it("respects limit", () => {
        const icons = listIcons({ limit: 5 });
        expect(icons.length).toBeLessThanOrEqual(5);
    });
});

describe("getIcon", () => {
    it("returns an icon by kebab-case name", () => {
        const icon = getIcon("adobe-creative-cloud");
        expect(icon).toBeDefined();
        expect(icon?.componentName).toBe("AdobeCreativeCloud");
        expect(icon?.exportName).toBe("IconAdobeCreativeCloud");
    });

    it("is case-insensitive", () => {
        const icon = getIcon("Adobe-Creative-Cloud");
        expect(icon).toBeDefined();
    });

    it("returns undefined for unknown icon", () => {
        expect(getIcon("nonexistent-icon")).toBeUndefined();
    });
});

describe("getIconByExportName", () => {
    it("returns an icon by export name", () => {
        const icon = getIconByExportName("IconAdobeCreativeCloud");
        expect(icon).toBeDefined();
        expect(icon?.name).toBe("adobe-creative-cloud");
    });

    it("is case-insensitive", () => {
        const icon = getIconByExportName("iconadobecreativecloud");
        expect(icon).toBeDefined();
    });

    it("returns undefined for unknown export name", () => {
        expect(getIconByExportName("IconNonExistent")).toBeUndefined();
    });
});

describe("searchIcons", () => {
    it("finds icons by name", () => {
        const results = searchIcons({ query: "adobe" });
        expect(results.length).toBeGreaterThan(0);
        expect(
            results.every(
                (i) => i.name.includes("adobe") || i.keywords.includes("adobe"),
            ),
        ).toBe(true);
    });

    it("finds icons by keyword", () => {
        const results = searchIcons({ query: "cloud" });
        expect(results.length).toBeGreaterThan(0);
    });

    it("returns empty array for no matches", () => {
        expect(searchIcons({ query: "xyznonexistent" })).toEqual([]);
    });

    it("respects limit", () => {
        const results = searchIcons({ query: "a", limit: 3 });
        expect(results.length).toBeLessThanOrEqual(3);
    });
});
