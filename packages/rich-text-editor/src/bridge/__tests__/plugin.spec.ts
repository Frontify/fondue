/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { core } from '#/plugins/Core/feature';

import { defineEditorPart, partWithOptions } from '../pluginApi/plugin';

describe('defineEditorPart with parts that depend on options', () => {
    it('gives the same parts through a spread copy as through the plugin', () => {
        const plugin = defineEditorPart(core(), (options) => ({
            commands: { 'core.fixture': { run: () => options.on === true } },
        }));
        const copy = { ...plugin };

        const original = partWithOptions(plugin, { on: true });
        const copied = partWithOptions(copy, { on: true });

        expect(Object.keys(copied.commands ?? {})).toEqual(['core.fixture']);
        expect(Object.keys(copied.commands ?? {})).toEqual(Object.keys(original.commands ?? {}));
        expect(copied.feature).toBe(plugin.feature);
        expect(Object.isFrozen(plugin)).toBe(true);
        expect(Object.isFrozen(copied)).toBe(true);
    });
});
