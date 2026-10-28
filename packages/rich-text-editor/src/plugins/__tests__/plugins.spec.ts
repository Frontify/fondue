/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { DefinitionError } from '#/model';

import { pluginIds, pluginsById } from '../plugins';
import { registry } from '../registry';

const failureOf = (run: () => unknown) => {
    try {
        run();
    } catch (error) {
        if (error instanceof DefinitionError) {
            return { code: error.code, details: error.details };
        }

        throw error;
    }

    throw new Error('expected a DefinitionError');
};

describe('pluginsById', () => {
    it('resolves shipped plugin IDs from remote JSON with their default options', () => {
        const ids = JSON.parse('["core","marks.bold"]') as string[];
        const plugins = pluginsById(ids);

        expect(plugins.map(({ id }) => id)).toEqual(['core', 'marks.bold']);
        expect(plugins.map(({ editor }) => editor.feature)).toEqual(['core', 'marks.bold']);
        expect(plugins.map(({ feature }) => feature.id)).toEqual(['core', 'marks.bold']);
    });

    it('holds one plugin for each shipped feature and each feature folder', () => {
        const folders = readdirSync(join(dirname(fileURLToPath(import.meta.url)), '..'), { withFileTypes: true })
            .filter((entry) => entry.isDirectory() && !['__tests__', 'profiles'].includes(entry.name))
            .map((entry) => entry.name);

        expect([...pluginIds].sort()).toEqual(Object.keys(registry).sort());
        expect(pluginIds).toHaveLength(folders.length);
    });

    it('returns the plugins in the order of the IDs', () => {
        const ids = ['marks.bold', 'core', 'marks.italic'];

        expect(pluginsById(ids).map(({ id }) => id)).toEqual(ids);
        expect(pluginsById([])).toEqual([]);
    });

    it.each([
        ['an unshipped plugin', 'acme.pull-quote'],
        ['a prototype member', 'constructor'],
        ['a prototype key', '__proto__'],
    ])('reports %s as definition.unknown-feature', (_kind, id) => {
        expect(failureOf(() => pluginsById(['core', id]))).toEqual({
            code: 'definition.unknown-feature',
            details: { id, index: 1 },
        });
    });

    it('accepts only plugin IDs, never a function, an object or a regular expression', () => {
        for (const value of [() => 'core', { id: 'core' }, /core/]) {
            const run = () => pluginsById([value as unknown as string]);
            expect(failureOf(run)).toEqual({ code: 'definition.unknown-feature', details: { id: null, index: 0 } });
        }

        expect(failureOf(() => pluginsById('core' as unknown as string[])).code).toBe('definition.unknown-feature');
    });
});
