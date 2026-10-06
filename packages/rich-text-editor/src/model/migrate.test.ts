/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';

import fc from 'fast-check';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { NOTES_ID, notesModel, type NotesVersion, noteV2, toneToLevel } from '#/features/__fixtures__/notes';
import { core } from '#/features/core/feature';
import {
    compileContentModel,
    decodeDocument,
    type DecodeResult,
    DefinitionError,
    defineFeature,
    type JsonValue,
    migrateDocument,
    type MigrationStepResult,
    type ModelMigration,
    type RichTextDocument,
} from '#/model';
import { createTestEnvironment } from '#/testing';

import { type TreeNode } from './content';
import { decodeToTree } from './decode';
import { encodeTree } from './encode';
import { canonicalJson } from './hash';

type Json = Record<string, JsonValue>;
const root = new URL('../../fixtures/migration/', import.meta.url);
const fixtures = readdirSync(root, { recursive: true, encoding: 'utf8' })
    .filter((name) => name.endsWith('.json'))
    .sort();
const load = (name: string) => JSON.parse(readFileSync(new URL(name, root), 'utf8')) as RichTextDocument;
const latest = notesModel(3);
const ids = () => createTestEnvironment({ seed: 1 }).ids;
const seed = Number(process.env.FC_SEED ?? Math.floor(Math.random() * 2 ** 31));
const settings = { seed, numRuns: 100 };

const at = (value: unknown, path: string): unknown =>
    path
        .slice(1)
        .split('/')
        .reduce<unknown>((node, key) => (node as Record<string, unknown>)[key], value);
const paragraph = (text: string): Json => ({ type: 'paragraph', content: [{ type: 'text', text }] });
const notes = (version: number, content: readonly JsonValue[], capabilities: readonly [string, number][]) =>
    ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: { id: NOTES_ID, version },
        requiredCapabilities: capabilities.map(([id, capability]) => ({ id, version: capability })),
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content },
    }) as unknown as RichTextDocument;

afterEach(() => {
    vi.useRealTimers();
});

describe('decode runs registered migrations', () => {
    const older = fixtures.filter((name) => load(name).model.version < 3);

    it.each(older)('SPEC-rich-text-format/AC-010 decodes the older-version fixture %s as editable', (name) => {
        const input = load(name);
        const before = JSON.stringify(input);
        const result = decodeDocument(input, latest, { ids: ids() });
        expect(result.status).toBe('editable');
        expect(JSON.stringify(input)).toBe(before);
    });

    it('SPEC-rich-text-format/AC-010 decodes the migrated document of a registered capability and model step', () => {
        const result = decodeDocument(load('v1-notes.json'), latest, { ids: ids() });
        // Capability warnings judge the stored document, before the model step replaces `fixture.divider`.
        expect(result).toMatchObject({
            status: 'editable',
            diagnostics: [{ code: 'format.unknown-capability', details: { capability: 'fixture.divider' } }],
        });
        const { document } = result as Extract<DecodeResult, { status: 'editable' }>;
        expect(document.model).toEqual({ id: NOTES_ID, version: 3 });
        expect(document.content.content?.map(({ type, attrs }) => [type, attrs])).toEqual([
            ['paragraph', { lang: null }],
            ['note', { nodeId: 'node-1', level: 'info' }],
            ['horizontal_rule', undefined],
            ['note', { nodeId: 'node-2', level: 'info' }],
        ]);
        expect(document).toEqual(migrateDocument(load('v1-notes.json'), latest, { ids: ids() }).document);
    });

    it('SPEC-rich-text-format/AC-010 keeps requires-review content as islands at the reported paths', () => {
        const input = load('ambiguous/alert-tone.json');
        const { result, tree } = decodeToTree(input, latest, { ids: ids() });
        expect(result.diagnostics.map(({ code, path }) => [code, path])).toEqual([
            ['migration.requires-review', '/content/content/0'],
            ['migration.requires-review', '/content/content/2'],
        ]);
        const children = (tree as TreeNode).content ?? [];
        expect(children.map(({ type }) => type)).toEqual(['unsupported_block', 'note', 'unsupported_block']);
        expect((children[0] as TreeNode).attrs?.original).toEqual(at(input, '/content/content/0'));
    });

    const stepsModel = (...steps: readonly ModelMigration['migrate'][]) =>
        compileContentModel([core()], {
            id: NOTES_ID,
            version: steps.length + 1,
            migrations: steps.map((migrate, index) => ({ id: `step-${index + 1}`, from: index + 1, migrate })),
        });
    const plain = notes(1, [paragraph('one'), paragraph('two')], [['core', 1]]);
    const migrated = (document: RichTextDocument, content: unknown): MigrationStepResult => ({
        status: 'migrated',
        document: { ...document, content: content as RichTextDocument['content'] },
    });
    const review = (document: RichTextDocument, ...paths: (string | undefined)[]): MigrationStepResult => ({
        status: 'requires-review',
        document,
        diagnostics: paths.map((path) => ({
            code: 'migration.requires-review',
            severity: 'warning',
            messageKey: 'migration.requires-review',
            ...(path === undefined ? {} : { path }),
        })),
    });
    const cyclic: Json = { type: 'paragraph', content: [] };
    (cyclic.content as JsonValue[]).push(cyclic);
    const nodes = Array.from({ length: 60_000 }, () => ({ type: 'paragraph' }));
    const blocking: readonly (readonly [string, readonly ModelMigration['migrate'][], string | undefined])[] = [
        [
            'throws',
            [
                () => {
                    throw new Error('step failed');
                },
            ],
            undefined,
        ],
        [
            'outputs content: []',
            [(document) => migrated(document, { type: 'doc', content: [] })],
            'format.envelope-invalid',
        ],
        ['outputs a paragraph root', [(document) => migrated(document, paragraph('root'))], 'format.envelope-invalid'],
        [
            'outputs 60,000 nodes',
            [(document) => migrated(document, { type: 'doc', content: nodes })],
            'format.limit-exceeded',
        ],
        [
            'outputs a NaN value',
            [(document) => migrated(document, { ...document.content, attrs: { lang: Number.NaN } })],
            'format.not-json',
        ],
        [
            'outputs a cyclic value',
            [(document) => migrated(document, { type: 'doc', content: [cyclic] })],
            'format.not-json',
        ],
        [
            'reports a path into a mark',
            [(document) => review(document, '/content/content/0/content/0/marks/0')],
            undefined,
        ],
        ['reports the root', [(document) => review(document, '/content')], undefined],
        ['reports no path', [(document) => review(document, undefined)], undefined],
        ['reports a missing node', [(document) => review(document, '/content/content/5')], undefined],
        [
            'is followed by a step that moves a reported node',
            [
                (document) => review(document, '/content/content/1'),
                (document) =>
                    migrated(document, {
                        ...document.content,
                        content: [...(document.content.content ?? [])].reverse(),
                    }),
            ],
            undefined,
        ],
    ];

    it.each(blocking)('SPEC-rich-text-format/AC-010 blocks as unsupported when a step %s', (_, steps, cause) => {
        const result = decodeDocument(plain, stepsModel(...steps));
        const step = `step-${steps.length}`;
        expect(result).toMatchObject({ status: 'blocked', reason: 'unsupported', original: plain });
        expect(result.diagnostics.at(-1)).toEqual({
            code: 'migration.unsupported',
            severity: 'error',
            messageKey: 'migration.unsupported',
            details: cause === undefined ? { step } : { step, cause },
        });
    });

    it('SPEC-rich-text-format/AC-010 blocks with the diagnostics of a step that returns unsupported', () => {
        const unmapped = {
            code: 'migration.unsupported',
            severity: 'error',
            messageKey: 'migration.unsupported',
        } as const;
        const model = stepsModel((document) => ({ status: 'unsupported', document, diagnostics: [unmapped] }));
        expect(decodeDocument(plain, model)).toEqual({
            status: 'blocked',
            reason: 'unsupported',
            original: plain,
            diagnostics: [unmapped],
        });
    });

    it('SPEC-rich-text-format/AC-010 lets a later step change content outside the reported paths', () => {
        const model = stepsModel(
            (document) => review(document, '/content/content/1'),
            (document) =>
                migrated(document, {
                    ...document.content,
                    content: [paragraph('new'), at(document, '/content/content/1')],
                }),
        );
        const { result, tree } = decodeToTree(plain, model);
        expect(result.status).toBe('editable');
        expect((tree as TreeNode).content?.map(({ type }) => type)).toEqual(['paragraph', 'unsupported_block']);
    });
});

describe('a newer reader after an older one saved', () => {
    const newer = load('v3-current.json');
    /** The v3 fixture decoded by the v1 model, edited on its island tree and encoded by it. */
    const rollback = () => {
        const older = notesModel(1);
        const tree = decodeToTree(newer, older).tree as TreeNode;
        const appended = { type: 'paragraph', attrs: { lang: null, unknownAttributes: null } };
        const edited = { ...tree, content: [...(tree.content ?? []), appended] };
        return encodeTree(edited, older, newer.requiredCapabilities).document;
    };

    it('SPEC-rich-text-format/AC-009 keeps the islands of an older writer through the newer migrations', () => {
        const saved = rollback();
        expect(saved.model).toEqual({ id: NOTES_ID, version: 1 });
        const result = decodeDocument(saved, latest, { ids: ids() });
        expect(result.status).toBe('editable');
        const { document } = result as Extract<DecodeResult, { status: 'editable' }>;
        expect(canonicalJson(at(document, '/content/content/1') as JsonValue)).toBe(
            canonicalJson(at(newer, '/content/content/1') as JsonValue),
        );
        expect(at(document, '/content/content/0/attrs')).toMatchObject(at(newer, '/content/content/0/attrs') as object);
    });

    it('SPEC-rich-text-format/AC-036 migrates a document the older model saved, keeping the newer-form content', () => {
        const result = migrateDocument(rollback(), latest, { ids: ids() });
        expect(result.status).toBe('migrated');
        expect(result.manifest.steps).toEqual(['fixture.notes.divider-to-rule']);
        const note = at(result.document, '/content/content/0') as Json;
        expect(canonicalJson(note.content as JsonValue)).toBe(
            canonicalJson(at(newer, '/content/content/0/content') as JsonValue),
        );
        expect(note.attrs).toEqual({ tone: 'info', nodeId: 'note-8', level: 'danger', collapsed: true });
        expect(canonicalJson(at(result.document, '/content/content/1') as JsonValue)).toBe(
            '{"type":"horizontal_rule"}',
        );
    });
});

describe('migrateDocument', () => {
    it('SPEC-rich-text-format/AC-035 migrates a document one version lower with no registered step', () => {
        const input = load('v2-note.json');
        const result = migrateDocument(input, latest);
        expect(result).toMatchObject({ status: 'migrated', diagnostics: [] });
        expect(result.manifest.steps).toEqual([]);
        expect(result.manifest.model).toEqual({ id: NOTES_ID, version: 3 });
        expect(result.document?.model).toEqual({ id: NOTES_ID, version: 3 });
        expect(result.document?.content).toEqual(input.content);
    });

    it.each(['v3-current.json', 'v4-newer.json'])(
        'SPEC-rich-text-format/AC-035 returns %s unchanged as current',
        (name) => {
            const input = load(name);
            const result = migrateDocument(input, latest);
            expect(result.status).toBe('current');
            expect(result.document).toBe(input);
            expect(result.manifest.targetHash).toBe(result.manifest.sourceHash);
        },
    );

    it('SPEC-rich-text-format/AC-035 reports an unsupported step and an unreadable input with no document', () => {
        const unmapped = {
            code: 'migration.unsupported',
            severity: 'error',
            messageKey: 'migration.unsupported',
        } as const;
        const model = compileContentModel([core()], {
            id: NOTES_ID,
            version: 2,
            migrations: [
                {
                    id: 'stop',
                    from: 1,
                    migrate: (document) => ({ status: 'unsupported', document, diagnostics: [unmapped] }),
                },
            ],
        });
        const result = migrateDocument(notes(1, [paragraph('x')], [['core', 1]]), model);
        expect(result).toMatchObject({ status: 'unsupported', document: null, diagnostics: [unmapped] });
        expect(result.manifest).toMatchObject({
            targetHash: null,
            steps: ['stop'],
            counts: { 'migration.unsupported': 1 },
        });
        const other = migrateDocument(
            { ...notes(1, [paragraph('x')], [['core', 1]]), model: { id: 'other', version: 1 } },
            model,
        );
        expect(other).toMatchObject({
            status: 'unsupported',
            document: null,
            diagnostics: [{ code: 'format.wrong-model' }],
        });
    });
});

describe('ambiguous content', () => {
    const shapes: Readonly<Record<string, readonly string[]>> = {
        'ambiguous/alert-tone.json': ['/content/content/0', '/content/content/2'],
        'ambiguous/tone-and-level.json': ['/content/content/1'],
    };

    it.each(Object.entries(shapes))('SPEC-rich-text-format/AC-038 asks for review of %s', (name, paths) => {
        const input = load(name);
        const step = toneToLevel.migrate(input, { ids: ids() });
        expect(step.status).toBe('requires-review');
        const reported = step.status === 'migrated' ? [] : step.diagnostics.map(({ path }) => path);
        expect(reported).toEqual(paths);
        for (const path of paths) {
            expect(at(step.document, path)).toEqual(at(input, path));
        }
        expect(migrateDocument(input, latest, { ids: ids() }).status).toBe('requires-review');
    });
});

describe('manifests and diagnostics', () => {
    const textsOf = (value: unknown): string[] => {
        if (Array.isArray(value)) {
            return value.flatMap(textsOf);
        }
        if (typeof value !== 'object' || value === null) {
            return [];
        }
        const node = value as Json;
        return [...(typeof node.text === 'string' ? [node.text] : []), ...textsOf(node.content)];
    };

    it.each(fixtures)('SPEC-rich-text-format/AC-039 writes no text of %s into its manifest or diagnostics', (name) => {
        const input = load(name);
        const { manifest, diagnostics } = migrateDocument(input, latest, { ids: ids() });
        expect(Object.keys(manifest).sort()).toEqual([
            'counts',
            'model',
            'packageVersion',
            'sourceHash',
            'steps',
            'targetHash',
        ]);
        const written = JSON.stringify({ manifest, diagnostics });
        for (const text of textsOf(input.content)) {
            expect(written).not.toContain(text);
        }
        for (const entry of diagnostics) {
            expect(
                Object.keys(entry).every((key) =>
                    ['code', 'severity', 'messageKey', 'path', 'featureId', 'details'].includes(key),
                ),
            ).toBe(true);
        }
    });
});

describe(`repeated migrations (fast-check seed ${seed})`, () => {
    const text = fc.string({ minLength: 1, maxLength: 6 }).map(paragraph);
    const note = (attrs: fc.Arbitrary<Json>) =>
        fc
            .record({ attrs, body: text })
            .map(({ attrs: values, body }) => ({ type: 'note', attrs: values, content: [body] }));
    const generated: Readonly<Record<string, fc.Arbitrary<RichTextDocument>>> = {
        1: fc
            .array(
                fc.oneof(
                    text,
                    note(fc.record({ tone: fc.constantFrom('info', 'alert') })),
                    fc.constant({ type: 'divider' }),
                ),
                { minLength: 1, maxLength: 6 },
            )
            .map((content) =>
                notes(1, content, [
                    ['core', 1],
                    ['fixture.divider', 1],
                    ['fixture.note', 1],
                ]),
            ),
        2: fc
            .array(
                fc.oneof(
                    text,
                    note(fc.record({ nodeId: fc.uuid(), level: fc.constantFrom('info', 'danger') })),
                    fc.constant({ type: 'horizontal_rule' }),
                ),
                { minLength: 1, maxLength: 6 },
            )
            .map((content) =>
                notes(2, content, [
                    ['core', 1],
                    ['fixture.note', 2],
                    ['fixture.rule', 1],
                ]),
            ),
    };
    const versions = Object.keys(generated).map(Number) as NotesVersion[];

    it.each(versions)(
        'SPEC-rich-text-format/AC-036 finds a document of model version %i current once migrated',
        (version) => {
            fc.assert(
                fc.property(generated[version] as fc.Arbitrary<RichTextDocument>, (input) => {
                    const once = migrateDocument(input, latest, { ids: ids() });
                    const twice = migrateDocument(once.document as RichTextDocument, latest, { ids: ids() });
                    expect(twice.status).toBe('current');
                    expect(twice.document).toBe(once.document);
                    expect(twice.document).toEqual(once.document);
                }),
                settings,
            );
        },
    );

    it.each(versions)(
        'SPEC-rich-text-format/AC-037 migrates a document of model version %i to identical bytes twice',
        (version) => {
            vi.useFakeTimers();
            fc.assert(
                fc.property(generated[version] as fc.Arbitrary<RichTextDocument>, (input) => {
                    vi.setSystemTime(1_000);
                    const first = migrateDocument(input, latest, { ids: ids() });
                    vi.setSystemTime(9_000_000);
                    const second = migrateDocument(input, latest, { ids: ids() });
                    expect(canonicalJson(second as unknown as JsonValue)).toBe(
                        canonicalJson(first as unknown as JsonValue),
                    );
                }),
                settings,
            );
        },
    );
});

describe('registered steps', () => {
    const step = { id: 'step', migrate: (document: RichTextDocument) => ({ status: 'migrated', document }) as const };
    const invalid: readonly (readonly [string, readonly { readonly from: number }[]])[] = [
        ['a step from the current version', [{ from: 2 }]],
        ['a step from a fractional version', [{ from: 0.5 }]],
        ['two steps from one version', [{ from: 1 }, { from: 1 }]],
    ];

    it.each(invalid)('SPEC-rich-text-format/AC-034 rejects %s', (_, froms) => {
        const migrations = froms.map(({ from }) => ({ ...step, from }));
        expect(() => compileContentModel([core()], { id: 'host', version: 2, migrations })).toThrow(DefinitionError);
        const feature = defineFeature({
            id: 'fixture.stepper',
            version: 2,
            requires: [{ id: 'core', version: 1 }],
            migrations,
        });
        expect(() => compileContentModel([core(), feature()], { id: 'host', version: 1 })).toThrow(DefinitionError);
    });

    it('SPEC-rich-text-format/AC-034 runs a capability step in every model that installs the feature', () => {
        const host = compileContentModel([core(), noteV2()], { id: 'host.model', version: 1 });
        const input = { ...load('ambiguous/tone-and-level.json'), model: { id: 'host.model', version: 1 } };
        expect(migrateDocument(input, host).manifest.steps).toEqual(['fixture.note.tone-to-level']);
    });
});
