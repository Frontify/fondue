/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { buildPluginRegistry } from '#/core';

import { typographyPlugin } from './Typography';

describe('typographyPlugin', () => {
    it('adds typing rules and nothing else: no document types, no toolbar', () => {
        const registry = buildPluginRegistry([typographyPlugin()]);

        expect(registry.inputRules.length).toBeGreaterThan(0);
        expect(registry.inputRules.every((rule) => rule.kind === 'text')).toBe(true);
        expect([...registry.marks.keys(), ...registry.inlines.keys()]).toEqual([]);
        expect(registry.toolbarItems).toEqual([]);
    });

    it('declares each shortcut once', () => {
        const matches = (typographyPlugin().inputRules ?? []).map((rule) =>
            rule.kind === 'text' ? String(rule.match) : rule.kind,
        );

        expect(new Set(matches).size).toBe(matches.length);
    });
});
