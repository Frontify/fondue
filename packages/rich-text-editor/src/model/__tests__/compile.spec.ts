/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { compileContentModel, defineFeature, type FeatureDeclaration } from '#/model';
import {
    fixtureBold,
    fixtureColor,
    fixtureHeading,
    fixtureHistory,
    fixtureItalic,
} from '#/plugins/__tests__/fixtures/features';
import { fixtureProfiles } from '#/plugins/__tests__/fixtures/profiles';
import { core } from '#/plugins/Core/feature';
import { link } from '#/plugins/Link/feature';

import { orderPlugins, type PluginDescriptor } from '../compile/capabilities';
import { compiledModel } from '../compile/compile';

import { compile, requiresCore, feature, failureOf, block } from './fixtures/compileFeatures';

describe('compileContentModel duplicates', () => {
    it('rejects a feature listed twice', () => {
        expect(failureOf(() => compile([core(), core()]))).toEqual({
            code: 'definition.duplicate-id',
            details: { kind: 'feature', id: 'core', features: ['core', 'core'] },
        });
    });

    it('rejects two features that declare one node', () => {
        const quote = feature({ id: 'a.quote', version: 1, nodes: { paragraph: block('inline*') } });
        expect(failureOf(() => compile([core(), quote]))).toEqual({
            code: 'definition.duplicate-id',
            details: { kind: 'node', id: 'paragraph', features: ['core', 'a.quote'] },
        });
    });

    it('rejects two features that declare one mark', () => {
        const other = feature({ id: 'a.bold', version: 1, marks: { bold: { attrs: {}, html: ['b', 0], parse: [] } } });
        expect(failureOf(() => compile([core(), fixtureBold(), other]))).toEqual({
            code: 'definition.duplicate-id',
            details: { kind: 'mark', id: 'bold', features: ['fixture.bold', 'a.bold'] },
        });
    });

    it('rejects two shared attributes of one name on one node', () => {
        const align = (id: string) =>
            feature({
                id,
                version: 1,
                attributes: { align: { on: ['paragraph'], value: { type: 'string', nullable: true, default: null } } },
            });
        expect(failureOf(() => compile([core(), align('a.align'), align('b.align')]))).toEqual({
            code: 'definition.duplicate-id',
            details: { kind: 'attribute', id: 'paragraph.align', features: ['a.align', 'b.align'] },
        });
        expect(
            failureOf(() =>
                compile([
                    core(),
                    feature({
                        id: 'c.lang',
                        version: 1,
                        attributes: {
                            lang: { on: 'textblocks', value: { type: 'language', nullable: true, default: null } },
                        },
                    }),
                ]),
            ).details,
        ).toEqual({ kind: 'attribute', id: 'paragraph.lang', features: ['core', 'c.lang'] });
    });

    it('rejects a node and a mark of one name, in either order', () => {
        const badge = { attrs: {}, html: ['span', 0], parse: [] } as const;
        const both = feature({ id: 'a.badge', version: 1, nodes: { badge: block('inline*') }, marks: { badge } });
        expect(failureOf(() => compile([core(), both]))).toEqual({
            code: 'definition.duplicate-id',
            details: { kind: 'mark', id: 'badge', features: ['a.badge', 'a.badge'] },
        });
        const mark = feature({ id: 'a.mark', version: 1, marks: { badge } });
        const node = feature({ id: 'a.node', version: 1, nodes: { badge: block('inline*') } });
        expect(failureOf(() => compile([core(), mark, node]))).toEqual({
            code: 'definition.duplicate-id',
            details: { kind: 'node', id: 'badge', features: ['a.mark', 'a.node'] },
        });
    });

    it('does not take a shared attribute named toString for a duplicate', () => {
        const name: string = 'toString';
        const shared = feature({
            id: 'a.shared',
            version: 1,
            attributes: { [name]: { on: ['paragraph'], value: { type: 'string', default: '' } } },
        });
        expect(compile([core(), shared]).manifest.features).toContainEqual({ id: 'a.shared', version: 1, options: {} });
    });

    it('rejects two different plugins with one ID', () => {
        const run = () =>
            orderPlugins([
                { featureId: 'a', plugin: { id: 'shared', phase: 'late' } },
                { featureId: 'b', plugin: { id: 'shared', phase: 'guard' } },
            ]);
        expect(failureOf(run)).toEqual({
            code: 'definition.duplicate-id',
            details: { kind: 'plugin', id: 'shared', features: ['a', 'b'] },
        });
    });
});

describe('compileContentModel dependencies', () => {
    it('reports the path to a dependency two levels down', () => {
        const top = feature({ id: 'a.top', version: 1, requires: [{ id: 'a.middle', version: 1 }] });
        const middle = feature({ id: 'a.middle', version: 1, requires: [{ id: 'a.bottom', version: 1 }] });
        expect(failureOf(() => compile([core(), top, middle]))).toEqual({
            code: 'definition.missing-dependency',
            details: { path: ['a.top', 'a.middle', 'a.bottom'] },
        });
    });

    it('reports a three-feature cycle in order', () => {
        const linked = (id: string, next: string) => feature({ id, version: 1, requires: [{ id: next, version: 1 }] });
        expect(
            failureOf(() =>
                compile([linked('a.one', 'a.two'), linked('a.two', 'a.three'), linked('a.three', 'a.one')]),
            ),
        ).toEqual({
            code: 'definition.dependency-cycle',
            details: { kind: 'feature', path: ['a.one', 'a.two', 'a.three', 'a.one'] },
        });
    });

    it('reports a cycle of plugin ordering constraints', () => {
        const plugins: PluginDescriptor[] = [
            { id: 'one', phase: 'structure-keys', before: ['two'] },
            { id: 'two', phase: 'structure-keys', before: ['three'] },
            { id: 'three', phase: 'structure-keys', before: ['one'] },
        ];
        expect(failureOf(() => orderPlugins(plugins.map((plugin) => ({ featureId: 'a', plugin }))))).toEqual({
            code: 'definition.dependency-cycle',
            details: { kind: 'plugin', path: ['one', 'two', 'three', 'one'] },
        });
    });

    it('names the feature, the required and the installed version', () => {
        const next = feature({ id: 'a.next', version: 1, requires: [{ id: 'core', version: 2 }] });
        expect(failureOf(() => compile([core(), next]))).toEqual({
            code: 'definition.version-mismatch',
            details: { feature: 'a.next', requires: 'core', required: 2, installed: 1 },
        });
    });

    it('rejects a model or feature version that is not a positive integer', () => {
        for (const version of [0, -1, 1.5, Number.NaN]) {
            expect(failureOf(() => compileContentModel([core()], { id: 'test.model', version }))).toEqual({
                code: 'definition.invalid-declaration',
                details: { path: '/version' },
            });
            expect(failureOf(() => compile([core(), feature({ id: 'a.next', version })]))).toEqual({
                code: 'definition.invalid-declaration',
                details: { feature: 'a.next', path: '/version' },
            });
        }
    });
});

describe('compileContentModel orphan behavior', () => {
    const cases: readonly (readonly [string, FeatureDeclaration, string])[] = [
        [
            'shared attribute',
            {
                id: 'a.x',
                version: 1,
                attributes: { tone: { on: ['callout'], value: { type: 'string', default: '' } } },
            },
            '/attributes/tone/on',
        ],
    ];
    it.each(cases)(
        'rejects the %s registration for an undeclared node, mark or command',
        (_kind, declaration, path) => {
            expect(failureOf(() => compile([core(), feature(declaration)]))).toEqual({
                code: 'definition.orphan-behavior',
                details: { feature: 'a.x', path },
            });
        },
    );

    it('skips a shared attribute target that no installed feature declares while another target is installed', () => {
        const tone = feature({
            id: 'a.x',
            version: 1,
            attributes: { tone: { on: ['paragraph', 'callout'], value: { type: 'string', default: '' } } },
        });
        const { nodes } = compiledModel(compile([core(), tone]));

        expect(nodes.filter(({ shared }) => shared.length > 0).map(({ name }) => name)).toEqual(['paragraph']);
    });

    it('rejects a function parse rule for a mark that another feature declares', () => {
        const reader = feature({
            id: 'a.x',
            version: 1,
            requires: requiresCore,
            parseRules: [{ tag: 'b', mark: 'bold', value: () => null }],
        });

        expect(failureOf(() => compile([core(), fixtureBold(), reader]))).toEqual({
            code: 'definition.orphan-behavior',
            details: {
                feature: 'a.x',
                path: '/parseRules/0/mark',
                reason: "a parse rule names only its own feature's marks and nodes",
            },
        });
    });
});

describe('compileContentModel formats', () => {
    const quote = (formats: unknown) =>
        feature({
            id: 'test.quote',
            version: 1,
            requires: requiresCore,
            nodes: { quote: block('inline*') },
            formats,
        } as FeatureDeclaration);

    it('rejects html marked unsupported, since every node and mark derives HTML from its spec', () => {
        expect(
            failureOf(() => compile([core(), quote({ html: 'unsupported', text: 'lossy', markdown: 'lossy' })])),
        ).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'test.quote', path: '/formats/html' },
        });
    });

    it.each(['text', 'markdown'])('rejects a %s support that is not a support level', (format) => {
        const formats = { html: 'lossless', text: 'lossy', markdown: 'lossy', [format]: 'partial' };

        expect(failureOf(() => compile([core(), quote(formats)]))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'test.quote', path: `/formats/${format}` },
        });
    });

    it('accepts each support level and a feature with no nodes, marks or formats', () => {
        const empty = feature({ id: 'test.empty', version: 1, requires: requiresCore });

        expect(() =>
            compile([core(), quote({ html: 'lossy', text: 'unsupported', markdown: 'lossless' })]),
        ).not.toThrow();
        expect(() => compile([core(), empty])).not.toThrow();
    });
});

describe('compileContentModel order', () => {
    it('installs the plugins no feature owns, before any feature plugin', () => {
        expect(compiledModel(compile([core()])).plugins.map(({ id }) => id)).toEqual([
            'clipboard',
            'history',
            'container-keys',
            'drop-cursor',
            'gap-cursor',
            'base-keys',
            'last-mark',
        ]);
    });

    it('applies before and after constraints inside a phase', () => {
        const contributions = [
            { featureId: 'a', plugin: { id: 'list.keys', phase: 'structure-keys', after: ['table.keys'] } },
            { featureId: 'b', plugin: { id: 'table.keys', phase: 'structure-keys' } },
            { featureId: 'b', plugin: { id: 'table.editing', phase: 'base-keys' } },
            { featureId: 'c', plugin: { id: 'guard', phase: 'guard', before: ['table.editing'] } },
        ] as const;
        expect(orderPlugins(contributions).map(({ id }) => id)).toEqual([
            'guard',
            'table.keys',
            'list.keys',
            'table.editing',
        ]);
    });

    it('rejects a constraint on a plugin key no capability contributes', () => {
        const run = () =>
            orderPlugins([
                { featureId: 'a', plugin: { id: 'list.keys', phase: 'structure-keys', after: ['table.keys'] } },
            ]);
        expect(failureOf(run)).toEqual({
            code: 'definition.unsatisfied-order',
            details: { plugin: 'list.keys', target: 'table.keys', before: false },
        });
    });

    it('skips a constraint on a package plugin whose capability the model does not use', () => {
        const known = new Set(['list.keys', 'table.keys', 'code.keys']);
        const contributions = [
            { featureId: 'a', plugin: { id: 'list.keys', phase: 'structure-keys', after: ['table.keys'] } },
            { featureId: 'b', plugin: { id: 'code.keys', phase: 'structure-keys', before: ['list.keys'] } },
        ] as const;
        expect(orderPlugins(contributions, known).map(({ id }) => id)).toEqual(['code.keys', 'list.keys']);
    });

    it('rejects a general-keys plugin that asks to run before a guard plugin', () => {
        const run = () =>
            orderPlugins([
                { featureId: 'a', plugin: { id: 'composition', phase: 'guard' } },
                { featureId: 'b', plugin: { id: 'shortcuts', phase: 'general-keys', before: ['composition'] } },
            ]);
        expect(failureOf(run)).toEqual({
            code: 'definition.unsatisfied-order',
            details: { plugin: 'shortcuts', target: 'composition', before: true },
        });
    });

    it('orders nodes as declared and marks by rank, then as declared', () => {
        const model = compile([core(), fixtureItalic(), fixtureBold(), fixtureColor(), link(), fixtureHeading()]);
        expect(model.manifest.nodes).toEqual(['doc', 'paragraph', 'text', 'hard_break', 'heading', 'rule']);
        expect(model.manifest.marks).toEqual(['link', 'font_color', 'italic', 'bold']);
    });

    it('changes the fingerprint with mark order, an option or a feature', () => {
        const base = compile([core(), fixtureBold(), fixtureItalic(), fixtureHeading()]);
        const variants = [
            compile([core(), fixtureItalic(), fixtureBold(), fixtureHeading()]),
            compile([core(), fixtureBold(), fixtureItalic(), fixtureHeading({ defaultLevel: 4 })]),
            compile([core(), fixtureBold(), fixtureItalic(), fixtureHeading(), fixtureHistory()]),
        ];
        expect(compile([core(), fixtureBold(), fixtureItalic(), fixtureHeading()]).fingerprint).toBe(base.fingerprint);
        expect(base.fingerprint).toMatch(/^[0-9a-f]{64}$/);
        for (const variant of variants) {
            expect(variant.fingerprint).not.toBe(base.fingerprint);
        }
    });

    it('keeps the manifest and fingerprint when the caller mutates an option or a declaration', () => {
        const items = ['a'];
        const factory = defineFeature({
            id: 'a.items',
            version: 1,
            requires: [{ id: 'fixture.heading', version: 1 }],
            options: { items: { type: 'list', items: { type: 'string' }, default: [] } },
        });
        const itemsFeature = factory({ items });
        const model = compile([core(), fixtureHeading(), itemsFeature]);
        const before = JSON.stringify(model.manifest);
        items.push('b');
        expect(JSON.stringify(model.manifest)).toBe(before);
        expect(Object.isFrozen(model.manifest.features)).toBe(true);
        expect(compile([core(), fixtureHeading(), itemsFeature]).fingerprint).toBe(model.fingerprint);
        expect(compile([core(), fixtureHeading(), factory({ items: ['a'] })]).fingerprint).toBe(model.fingerprint);
    });
});

describe('compileContentModel manifest', () => {
    it.each(Object.entries(fixtureProfiles()))('emits the manifest of the %s profile stand-in', (_name, features) => {
        const model = compile(features);
        expect(model.manifest).toMatchSnapshot();
        expect(JSON.parse(JSON.stringify(model.manifest))).toEqual(model.manifest);
    });
});
