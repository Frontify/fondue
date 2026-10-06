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
const note = (
    version: number,
    attrs: AttributeDeclarations,
    migrations?: readonly CapabilityMigration[],
    content = 'paragraph+',
) =>
    defineFeature({
        id: 'test.note',
        version,
        requires: [{ id: 'core', version: 1 }],
        ...(migrations === undefined ? {} : { migrations }),
        nodes: { note: { group: 'block', content, attrs, html: ['aside', 0], parse: [] } },
    })();
const rules = { horizontal_rule: { group: 'block', attrs: {}, html: ['hr'], parse: [] } } as const;
const rule = defineFeature({ id: 'test.rule', version: 1, requires: [{ id: 'core', version: 1 }], nodes: rules });
const ruleStep = { ...step, id: 'test.rule.step' };
const ruleV2 = defineFeature({
    id: 'test.rule',
    version: 2,
    requires: [{ id: 'core', version: 1 }],
    migrations: [ruleStep],
    nodes: rules,
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
            'test: capability test.note removed or changed a node, mark or attribute with no migration from its version 1',
        ]);
        expect(
            compareModel(released, candidateOf([base(), note(2, level, [step])], { id: 'test', version: 2 })),
        ).toEqual([]);
    });

    it('SPEC-rich-text-format/AC-034 fails on a breaking change in one feature with a step only in another', () => {
        const level = { level: { type: 'enum', values: ['info', 'warning', 'danger'], default: 'info' } } as const;
        const before = candidateOf([base(), note(1, tone), rule()], { id: 'test', version: 1 }).snapshot;
        const migrations = [{ ...step, id: 'test.step' }];
        expect(
            compareModel(
                before,
                candidateOf([base(), note(2, level), ruleV2()], { id: 'test', version: 2, migrations }),
            ),
        ).toEqual([
            'test: capability test.note removed or changed a node, mark or attribute with no migration from its version 1',
        ]);
    });

    it('SPEC-rich-text-format/AC-034 asks a model step for a feature the list drops', () => {
        expect(compareModel(released, candidateOf([base()], { id: 'test', version: 2 }))).toEqual([
            'test: the feature list removed or changed a node, mark or attribute with no model migration from version 1',
        ]);
        const migrations = [{ ...step, id: 'test.step' }];
        expect(compareModel(released, candidateOf([base()], { id: 'test', version: 2, migrations }))).toEqual([]);
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

    const problem =
        'test: capability test.note removed or changed a node, mark or attribute with no migration from its version 1';
    const count = { type: 'integer', default: 0 } as const;
    const label = { type: 'string', default: '' } as const;
    // An existing required attribute keeps `attrs` required, so only the attribute's own comparison can report.
    const key = { type: 'string', required: true } as const;
    const required = { type: 'string', required: true } as const;
    const changes: readonly (readonly [string, AttributeDeclarations, AttributeDeclarations, readonly string[]])[] = [
        ['narrows an enum', tone, { tone: { type: 'enum', values: ['info'], default: 'info' } }, [problem]],
        ['widens an enum', tone, { tone: { type: 'enum', values: ['info', 'alert', 'warning'], default: 'info' } }, []],
        ['bounds an unbounded integer', { count }, { count: { ...count, min: 0 } }, [problem]],
        ['adds a required attribute', { key }, { key, label: required }, [problem]],
        ['makes an optional attribute required', { key, label }, { key, label: required }, [problem]],
    ];

    it.each(changes)(
        'SPEC-rich-text-format/AC-034 judges a new capability version that %s with no step',
        (_, before, after, expected) => {
            const earlier = candidateOf([base(), note(1, before)], { id: 'test', version: 1 }).snapshot;
            expect(compareModel(earlier, candidateOf([base(), note(2, after)], { id: 'test', version: 2 }))).toEqual(
                expected,
            );
        },
    );

    it.each([
        ['changes the content expression', 'horizontal_rule+', [problem]],
        ['adds a child type to the content expression', '(paragraph | horizontal_rule)+', []],
    ] as const)('SPEC-rich-text-format/AC-034 judges a model step with a feature that %s', (_, content, expected) => {
        const earlier = candidateOf([base(), note(1, tone), rule()], { id: 'test', version: 1 }).snapshot;
        const migrations = [{ ...step, id: 'test.step' }];
        const next = candidateOf([base(), note(2, tone, undefined, content), rule()], {
            id: 'test',
            version: 2,
            migrations,
        });
        expect(compareModel(earlier, next)).toEqual(expected);
    });

    it('SPEC-rich-text-format/AC-034 asks for the next model version when the version jumps over one', () => {
        expect(
            compareModel(
                released,
                candidateOf([base(), note(2, { ...tone, ...collapsed })], { id: 'test', version: 3 }),
            ),
        ).toEqual(['test: the stored representation changed, so model version 1 must become 2']);
    });

    it('SPEC-rich-text-format/AC-034 charges a newly required textblock attribute to its own feature', () => {
        const align = (version: number, required: boolean, migrations: readonly CapabilityMigration[] = []) => {
            const value = {
                type: 'enum',
                values: ['left', 'right'],
                ...(required ? { required } : { default: 'left' }),
            } as const;
            const attributes = { align: { on: 'textblocks', value } } as const;
            return defineFeature({
                id: 'test.align',
                version,
                requires: [{ id: 'core', version: 1 }],
                migrations,
                attributes,
            })();
        };
        const before = candidateOf([base(), align(1, false)], { id: 'test', version: 1 }).snapshot;
        expect(compareModel(before, candidateOf([base(), align(2, true, [step])], { id: 'test', version: 2 }))).toEqual(
            [],
        );
    });

    it('SPEC-rich-text-format/AC-034 accepts a model step that drops the only mark', () => {
        const bold = defineFeature({
            id: 'test.bold',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            marks: { bold: { attrs: {}, html: ['strong', 0], parse: [] } },
        });
        const before = candidateOf([base(), bold()], { id: 'test', version: 1 }).snapshot;
        const migrations = [{ ...step, id: 'test.step' }];
        expect(compareModel(before, candidateOf([base()], { id: 'test', version: 2, migrations }))).toEqual([]);
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
