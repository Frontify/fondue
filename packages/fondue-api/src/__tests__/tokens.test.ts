/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from "vitest";

import {
    getToken,
    getTokensByCategory,
    listTokenCategories,
    listUtilities,
    searchTokens,
    searchUtilities,
} from "../tokens.ts";

describe("listTokenCategories", () => {
    it("returns an array of category strings", () => {
        const categories = listTokenCategories();
        expect(categories.length).toBeGreaterThan(0);
        expect(categories).toContain("colors");
    });
});

describe("getToken", () => {
    it("returns a token by exact id", () => {
        const token = getToken("color-charts-dim-default");
        expect(token).toBeDefined();
        expect(token?.category).toBe("colors");
        expect(token?.cssVariable).toContain("color-charts-dim");
    });

    it("returns undefined for unknown id", () => {
        expect(getToken("nonexistent-token")).toBeUndefined();
    });
});

describe("getTokensByCategory", () => {
    it("returns tokens in the colors category", () => {
        const tokens = getTokensByCategory({ category: "colors" });
        expect(tokens.length).toBeGreaterThan(0);
        expect(tokens.every((t) => t.category === "colors")).toBe(true);
    });

    it("respects limit", () => {
        const tokens = getTokensByCategory({ category: "colors", limit: 3 });
        expect(tokens.length).toBeLessThanOrEqual(3);
    });

    it("returns empty array for unknown category", () => {
        expect(getTokensByCategory({ category: "nonexistent" })).toEqual([]);
    });
});

describe("searchTokens", () => {
    it("finds tokens by cssVariable", () => {
        const results = searchTokens({ query: "charts-dim" });
        expect(results.length).toBeGreaterThan(0);
    });

    it("finds tokens by tailwindClass", () => {
        const results = searchTokens({ query: "charts-negative" });
        expect(results.length).toBeGreaterThan(0);
    });

    it("returns empty array for no matches", () => {
        expect(searchTokens({ query: "xyznonexistent" })).toEqual([]);
    });

    it("respects limit", () => {
        const results = searchTokens({ query: "color", limit: 5 });
        expect(results.length).toBeLessThanOrEqual(5);
    });
});

describe("searchUtilities", () => {
    it("finds utilities by id", () => {
        const results = searchUtilities({ query: "body-large" });
        expect(results.length).toBeGreaterThan(0);
    });

    it("finds utilities by tailwindClass", () => {
        const results = searchUtilities({ query: "body-large" });
        expect(
            results.some((u) => u.tailwindClass.includes("body-large")),
        ).toBe(true);
    });
});

describe("listUtilities", () => {
    it("returns all utilities", () => {
        const utilities = listUtilities();
        expect(utilities.length).toBeGreaterThan(0);
        expect(utilities[0]).toHaveProperty("id");
        expect(utilities[0]).toHaveProperty("properties");
        expect(utilities[0]).toHaveProperty("tailwindClass");
    });
});
