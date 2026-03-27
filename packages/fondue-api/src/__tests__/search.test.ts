/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from "vitest";

import { applyLimit, matchesQuery } from "../search.ts";

describe("matchesQuery", () => {
    it("returns true for empty query", () => {
        expect(matchesQuery("", "anything")).toBe(true);
    });

    it("matches exact string", () => {
        expect(matchesQuery("Button", "Button")).toBe(true);
    });

    it("matches substring", () => {
        expect(matchesQuery("but", "Button")).toBe(true);
    });

    it("is case-insensitive", () => {
        expect(matchesQuery("BUTTON", "button")).toBe(true);
    });

    it("returns false on no match", () => {
        expect(matchesQuery("xyz", "Button")).toBe(false);
    });

    it("matches against array fields", () => {
        expect(matchesQuery("action", ["button", "action", "cta"])).toBe(true);
    });

    it("skips undefined fields", () => {
        expect(matchesQuery("test", undefined, "testing")).toBe(true);
    });

    it("matches across multiple fields", () => {
        expect(matchesQuery("input", "Button", "input")).toBe(true);
    });

    it("returns false when no fields match", () => {
        expect(matchesQuery("xyz", "Button", ["action", "cta"], "input")).toBe(
            false,
        );
    });
});

describe("applyLimit", () => {
    const items = [1, 2, 3, 4, 5];

    it("returns all items when limit is undefined", () => {
        expect(applyLimit(items)).toEqual([1, 2, 3, 4, 5]);
    });

    it("returns all items when limit is 0", () => {
        expect(applyLimit(items, 0)).toEqual([1, 2, 3, 4, 5]);
    });

    it("limits the result", () => {
        expect(applyLimit(items, 3)).toEqual([1, 2, 3]);
    });

    it("returns all items when limit exceeds length", () => {
        expect(applyLimit(items, 10)).toEqual([1, 2, 3, 4, 5]);
    });
});
