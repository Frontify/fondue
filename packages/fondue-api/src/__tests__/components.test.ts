/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from "vitest";

import {
    getComponent,
    getComponentSummary,
    getComponentsByCategory,
    listComponents,
    searchComponents,
} from "../components.ts";

describe("listComponents", () => {
    it("returns an array of component summaries", () => {
        const components = listComponents();
        expect(components.length).toBeGreaterThan(0);
        expect(components[0]).toHaveProperty("name");
        expect(components[0]).toHaveProperty("description");
        expect(components[0]).toHaveProperty("category");
        expect(components[0]).toHaveProperty("tags");
    });
});

describe("getComponent", () => {
    it("returns full detail for a known component", () => {
        const button = getComponent("Button");
        expect(button).toBeDefined();
        expect(button?.name).toBe("Button");
        expect(button?.props).toBeDefined();
        expect(button?.props.length).toBeGreaterThan(0);
        expect(button?.importStatement).toContain("Button");
    });

    it("is case-insensitive", () => {
        const button = getComponent("button");
        expect(button).toBeDefined();
        expect(button?.name).toBe("Button");
    });

    it("returns undefined for unknown component", () => {
        expect(getComponent("NonExistent")).toBeUndefined();
    });

    it("returns subComponents for compound components", () => {
        const accordion = getComponent("Accordion");
        expect(accordion).toBeDefined();
        expect(accordion?.subComponents.length).toBeGreaterThan(0);
    });

    it("returns examples", () => {
        const button = getComponent("Button");
        expect(button?.examples.length).toBeGreaterThan(0);
        expect(button?.examples[0]).toHaveProperty("code");
    });
});

describe("getComponentSummary", () => {
    it("returns a summary without full detail", () => {
        const summary = getComponentSummary("Button");
        expect(summary).toBeDefined();
        expect(summary?.name).toBe("Button");
        expect(summary).not.toHaveProperty("props");
    });
});

describe("searchComponents", () => {
    it("finds components by name", () => {
        const results = searchComponents({ query: "Button" });
        expect(results.some((c) => c.name === "Button")).toBe(true);
    });

    it("finds components by tag", () => {
        const results = searchComponents({ query: "toggle" });
        expect(results.length).toBeGreaterThan(0);
    });

    it("finds components by category", () => {
        const results = searchComponents({ query: "layout" });
        expect(results.length).toBeGreaterThan(0);
        expect(
            results.every(
                (c) =>
                    c.category === "layout" ||
                    c.description.toLowerCase().includes("layout"),
            ),
        ).toBe(true);
    });

    it("returns empty array for no matches", () => {
        expect(searchComponents({ query: "xyznonexistent" })).toEqual([]);
    });

    it("respects limit", () => {
        const results = searchComponents({ query: "a", limit: 2 });
        expect(results.length).toBeLessThanOrEqual(2);
    });
});

describe("getComponentsByCategory", () => {
    it("returns components in the input category", () => {
        const results = getComponentsByCategory({ category: "input" });
        expect(results.length).toBeGreaterThan(0);
        expect(results.every((c) => c.category === "input")).toBe(true);
    });

    it("is case-insensitive", () => {
        const results = getComponentsByCategory({ category: "INPUT" });
        expect(results.length).toBeGreaterThan(0);
    });

    it("returns empty array for unknown category", () => {
        expect(getComponentsByCategory({ category: "nonexistent" })).toEqual(
            [],
        );
    });
});
