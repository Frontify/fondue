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
            'kind' in rule && rule.kind === 'text' ? String(rule.match) : 'kind' in rule ? rule.kind : 'delimiter',
        );

        expect(new Set(matches).size).toBe(matches.length);
    });

    it('declares fewer rules for fewer groups, and none for no group', () => {
        const count = (groups: Parameters<typeof typographyPlugin>[0]) =>
            (typographyPlugin(groups).inputRules ?? []).length;

        expect(count({ groups: ['dashes'] })).toBe(1);
        expect(count({ groups: ['dashes', 'ellipsis'] })).toBe(2);
        expect(count({ groups: [] })).toBe(0);
        expect(count({ groups: ['dashes'] })).toBeLessThan(count({}));
    });
});
