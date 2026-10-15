/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { compileContentModel, DefinitionError } from '#/model';

import { featuresById } from '../registry';

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

describe('featuresById', () => {
    it('resolves shipped feature IDs from remote JSON with their default options', () => {
        const ids = JSON.parse('["core"]') as string[];
        const model = compileContentModel(featuresById(ids), { id: 'remote.model', version: 1 });

        expect(model.manifest.features).toEqual([{ id: 'core', version: 1, options: {} }]);
    });

    it.each([
        ['an unshipped feature', 'acme.pull-quote'],
        ['a prototype member', 'constructor'],
        ['a prototype key', '__proto__'],
    ])('reports %s as definition.unknown-feature', (_kind, id) => {
        expect(failureOf(() => featuresById(['core', id]))).toEqual({
            code: 'definition.unknown-feature',
            details: { id, index: 1 },
        });
    });

    it('accepts only feature IDs, never a function, an object or a regular expression', () => {
        for (const value of [() => 'core', { id: 'core' }, /core/]) {
            const run = () => featuresById([value as unknown as string]);
            expect(failureOf(run)).toEqual({ code: 'definition.unknown-feature', details: { id: null, index: 0 } });
        }
        expect(failureOf(() => featuresById('core' as unknown as string[])).code).toBe('definition.unknown-feature');
    });
});
