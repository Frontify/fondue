/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type AttributeDeclarations, type CapabilityMigration, defineFeature } from '../src/model/index.ts';

import { candidateOf, checkModelVersions, compareModel } from './check-model-versions';

const base = defineFeature({
    id: 'core',
    version: 1,
    nodes: {
        doc: { content: 'block+', attrs: {}, html: ['div', 0], parse: [] },
        paragraph: { group: 'block', content: 'inline*', attrs: {}, html: ['p', 0], parse: [] },
        text: { group: 'inline', attrs: {}, html: ['span', 0], parse: [] },
    },
});
const step: CapabilityMigration = {
    id: 'test.note.step',
    from: 1,
    migrate: (document) => ({ status: 'migrated', document }),
};
const note = (version: number, attrs: AttributeDeclarations, migrations?: readonly CapabilityMigration[]) =>
    defineFeature({
        id: 'test.note',
        version,
        requires: [{ id: 'core', version: 1 }],
        ...(migrations === undefined ? {} : { migrations }),
        nodes: { note: { group: 'block', content: 'paragraph+', attrs, html: ['aside', 0], parse: [] } },
    })();
const rule = defineFeature({
    id: 'test.rule',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: { horizontal_rule: { group: 'block', attrs: {}, html: ['hr'], parse: [] } },
});
const tone = { tone: { type: 'enum', values: ['info', 'alert'], default: 'info' } } as const;
const collapsed = { collapsed: { type: 'boolean', default: false } } as const;
const released = candidateOf([base(), note(1, tone)], { id: 'test', version: 1 }).snapshot;

describe('check-model-versions', () => {
    it('SPEC-rich-text-format/AC-034 passes on the shipped models and the committed snapshot', async () => {
        expect(await checkModelVersions()).toEqual([]);
    });

    it('SPEC-rich-text-format/AC-034 accepts added nodes and optional attributes under new versions', () => {
        const next = candidateOf([base(), note(2, { ...tone, ...collapsed }), rule()], { id: 'test', version: 2 });
        expect(compareModel(released, next)).toEqual([]);
    });

    it('SPEC-rich-text-format/AC-034 fails on a changed attribute with no registered migration', () => {
        const level = { level: { type: 'enum', values: ['info', 'warning', 'danger'], default: 'info' } } as const;
        expect(compareModel(released, candidateOf([base(), note(2, level)], { id: 'test', version: 2 }))).toEqual([
            'test: a node, mark or attribute was removed or changed with no registered migration from it',
        ]);
        expect(
            compareModel(released, candidateOf([base(), note(2, level, [step])], { id: 'test', version: 2 })),
        ).toEqual([]);
        const modelStep = { ...step, id: 'test.step' };
        const migrations = [modelStep];
        expect(
            compareModel(released, candidateOf([base(), note(2, level)], { id: 'test', version: 2, migrations })),
        ).toEqual([]);
    });

    it('SPEC-rich-text-format/AC-034 fails on a changed representation with the model version unchanged', () => {
        expect(
            compareModel(
                released,
                candidateOf([base(), note(2, { ...tone, ...collapsed })], { id: 'test', version: 1 }),
            ),
        ).toEqual(['test: the stored representation changed, so model version 1 must become 2']);
    });

    it('SPEC-rich-text-format/AC-034 fails on a model version raised with no change to the stored representation', () => {
        expect(compareModel(released, candidateOf([base(), note(1, tone)], { id: 'test', version: 2 }))).toEqual([
            'test: model version 1 became 2 with no change to the stored representation',
        ]);
    });

    it('SPEC-rich-text-format/AC-042 fails when an attribute is added to an existing capability version', () => {
        expect(
            compareModel(
                released,
                candidateOf([base(), note(1, { ...tone, ...collapsed })], { id: 'test', version: 2 }),
            ),
        ).toEqual(['test: capability test.note changed its nodes, marks or attributes inside version 1']);
    });
});
