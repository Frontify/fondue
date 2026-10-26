/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { EditorState, type Plugin } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';

import { defineEditorPart, type EditorPart, type EditorPartSpec } from '#/bridge/pluginApi/plugin';
import {
    compileContentModel,
    type ContentModel,
    defineFeature,
    DefinitionError,
    type Feature,
    type FeatureDeclaration,
} from '#/model';
import { fixtureHeadingEditor, fixtureHistoryEditor } from '#/plugins/__tests__/fixtures/editors';
import { fixtureExtensionsOf } from '#/plugins/__tests__/fixtures/extensions';
import {
    fixtureBold,
    fixtureColor,
    fixtureHeading,
    fixtureHistory,
    fixtureItalic,
    fixtureRedo,
} from '#/plugins/__tests__/fixtures/features';
import { unitsOf } from '#/plugins/__tests__/fixtures/units';
import { vocabularyModel } from '#/plugins/__tests__/fixtures/vocabulary';
import { core } from '#/plugins/Core/feature';
import { image } from '#/plugins/Image/feature';
import { link } from '#/plugins/Link/feature';
import { mention } from '#/plugins/Mention/feature';
import { extensionsOf } from '#/react/compile/engine';

import { compileDefinition } from '..';

const keyOf = (plugin: Plugin) => (plugin as unknown as { key: string }).key;
/** The engine of `model` with the fixture features' editor parts and the shipped ones. */
const engineOf = (model: ContentModel) => compileDefinition(model, {}, extensionsOf(model, unitsOf(model)));
const options = { id: 'test', version: 1 };
const box = { group: 'block', attrs: {}, html: ['div', 0], parse: [] } as const;

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

describe('compileDefinition', () => {
    it('gives a plugin two features contribute one instance, so EditorState.create does not throw', () => {
        const model = compileContentModel([core(), fixtureHistory(), fixtureRedo()], { id: 'test', version: 1 });
        const { plugins, schema } = engineOf(model);

        expect(plugins.map(keyOf).filter((key) => key.startsWith('history$'))).toHaveLength(1);
        expect(new Set(plugins.map(keyOf)).size).toBe(plugins.length);
        expect(() => EditorState.create({ schema, plugins: [...plugins] })).not.toThrow();
    });

    it('builds the keymap in plugin order, in both input orders', () => {
        for (const features of [
            [core(), fixtureBold(), fixtureHeading()],
            [core(), fixtureHeading(), fixtureBold()],
        ]) {
            const model = compileContentModel(features, { id: 'test', version: 1 });
            const { plugins, keymap } = engineOf(model);
            const ids = plugins.map(keyOf).map((key) => key.replace(/\$\d*$/, ''));

            // `history`, the clipboard, the container keys, the drop and gap cursors, the base keys and the last-mark record bind no feature key.
            const unkeyed = new Set([
                'clipboard',
                'history',
                'container-keys',
                'drop-cursor',
                'gap-cursor',
                'base-keys',
                'last-mark',
            ]);
            expect([...new Set(keymap.map(({ plugin }) => plugin))]).toEqual(ids.filter((id) => !unkeyed.has(id)));
        }
    });

    it('builds schema nodes in declared order and marks by rank, then declared order', () => {
        const features = [core(), fixtureItalic(), fixtureBold(), fixtureColor(), link(), fixtureHeading()];
        const { schema } = compileDefinition(compileContentModel(features, { id: 'test', version: 1 }));

        expect(Object.keys(schema.nodes)).toEqual([
            'doc',
            'paragraph',
            'text',
            'hard_break',
            'heading',
            'rule',
            'unsupported_block',
            'unsupported_inline',
        ]);
        expect(Object.keys(schema.marks)).toEqual(['link', 'font_color', 'italic', 'bold', 'unsupported_mark']);
        expect(schema.topNodeType.name).toBe('doc');
        expect(schema.nodes.heading?.spec.group).toBe('block section');
    });

    it('turns each engine schema error into definition.invalid-declaration', () => {
        const required = { type: 'string', required: true } as const;
        const declarations: readonly FeatureDeclaration[] = [
            { id: 'a.x', version: 1, nodes: { box: { ...box, content: 'text+' } } },
            {
                id: 'a.x',
                version: 1,
                nodes: {
                    box: { ...box, content: 'item+' },
                    item: { content: 'inline*', attrs: { id: required }, html: ['div', 0], parse: [] },
                },
            },
            { id: 'a.x', version: 1, attributes: { tone: { on: 'textblocks', value: required } } },
        ];
        for (const declaration of declarations) {
            const model = compileContentModel([core(), defineFeature(declaration)()], options);
            const { code, details } = failureOf(() => compileDefinition(model));
            expect(code).toBe('definition.invalid-declaration');
            expect(details.engine).toContain('non-generatable');
        }
    });

    it('builds task_item+ and figure > asset_image with a required nodeId the engine defaults to null', () => {
        const nodeId = { type: 'string', required: true } as const;
        const feature = defineFeature({
            id: 'a.x',
            version: 1,
            nodes: {
                task_list: { ...box, content: 'task_item+' },
                task_item: { content: 'paragraph block*', attrs: { nodeId }, html: ['li', 0], parse: [] },
                figure: { ...box, content: 'asset_image', attrs: { nodeId } },
                asset_image: { atom: true, attrs: { nodeId }, html: ['img'], parse: [] },
            },
        })();
        const { schema } = compileDefinition(compileContentModel([core(), feature], options));

        expect(schema.nodes.task_item?.spec.attrs).toEqual({
            nodeId: { default: null },
            unknownAttributes: { default: null },
        });
        const list = schema.nodes.task_list?.createAndFill();
        const figure = schema.nodes.figure?.createAndFill();
        expect(list?.firstChild).toMatchObject({ attrs: { nodeId: null } });
        expect(figure?.firstChild).toMatchObject({ type: { name: 'asset_image' } });
    });

    it('gives null engine defaults only to the leaf the engine must create, never to a mention', () => {
        const { schema } = compileDefinition(compileContentModel([core(), image(), mention()], options));

        const imageAttrs = schema.nodes.asset_image?.spec.attrs;
        const mentionAttrs = schema.nodes.mention?.spec.attrs;
        expect(imageAttrs?.labelSnapshot).toEqual({ default: null });
        expect(mentionAttrs?.labelSnapshot).toEqual({});
        expect(schema.nodes.mention?.hasRequiredAttrs()).toBe(true);
    });

    it('builds the figure of media.image and of the vocabulary, whose image has required attributes with no default', () => {
        const shipped = compileDefinition(compileContentModel([core(), image()], options)).schema;
        const generated = shipped.nodes.figure?.createAndFill();

        const imageNode = generated?.firstChild;
        expect(imageNode?.attrs).toMatchObject({
            assetId: null,
            labelSnapshot: null,
            altIntent: 'missing',
        });
        expect(() => compileDefinition(vocabularyModel())).not.toThrow();
    });

    it('writes a shared attribute bound to a style property only for a plain CSS value', () => {
        const tone = defineFeature({
            id: 'a.tone',
            version: 1,
            attributes: {
                tone: {
                    on: ['paragraph'],
                    value: { type: 'string', nullable: true, default: null },
                    html: { style: 'color' },
                },
            },
        })();
        const { schema } = compileDefinition(compileContentModel([core(), tone], options));
        const styleOf = (value: string) => {
            const paragraph = schema.node('paragraph', { tone: value });
            const [, attributes] = paragraph.type.spec.toDOM?.(paragraph) as [string, Record<string, string>];

            return attributes.style;
        };

        expect(styleOf('red')).toBe('color: red;');
        for (const value of ['red;background:url(//x)', 'url(//x)', 'red"', "red'", 'red\\9', 'red}', '<x', 'red/*x']) {
            expect(styleOf(value)).toBeUndefined();
        }
    });

    it('keeps a literal STYLE of any case together with a shared style declaration', () => {
        const banner = defineFeature({
            id: 'a.banner',
            version: 1,
            nodes: { banner: { group: 'block', attrs: {}, html: ['div', { STYLE: 'margin: 0' }, 0], parse: [] } },
            attributes: {
                tone: {
                    on: ['banner'],
                    value: { type: 'string', nullable: true, default: null },
                    html: { style: 'color' },
                },
            },
        })();
        const { schema } = compileDefinition(compileContentModel([core(), banner], options));
        const node = schema.node('banner', { tone: 'red' });
        const [, attributes] = node.type.spec.toDOM?.(node) as [string, Record<string, string>];

        expect(attributes).toEqual({ style: 'margin: 0;color: red;' });
    });

    it.each(['inline{1,64}', '(inline{1,8}){1,8}', '((inline{1,4}){1,4}){1,4}'])(
        'compiles %j and builds its schema in under 200 ms',
        (content) => {
            // CPU time of this test process, so the other test workers on the machine do not count.
            const started = process.cpuUsage();
            const feature = defineFeature({ id: 'a.x', version: 1, nodes: { box: { ...box, content } } })();
            const { schema } = compileDefinition(compileContentModel([core(), feature], options));
            const { user, system } = process.cpuUsage(started);
            expect((user + system) / 1000).toBeLessThan(200);
            expect(schema.nodes.box?.spec.content).toBe(content);
        },
    );

    it('keeps the checked url default when the caller mutates the declaration after compiling', () => {
        const declaration = {
            id: 'a.card',
            version: 1,
            nodes: { card: { ...box, attrs: { href: { type: 'url', default: '/x' } } } },
        } satisfies FeatureDeclaration;
        const factory = defineFeature(declaration);
        const model = compileContentModel([core(), factory()], options);
        (declaration.nodes.card.attrs.href as { default: string }).default = 'javascript:alert(1)';
        for (const compiled of [model, compileContentModel([core(), factory()], options)]) {
            const card = compileDefinition(compiled).schema.nodes.card;
            expect(card?.spec.attrs).toEqual({ href: { default: '/x' }, unknownAttributes: { default: null } });
        }
    });
});

describe('compileDefinition of editor parts', () => {
    /** The plugin IDs of `model`'s engine with the fixture parts and `parts`, without the shipped ones. */
    const pluginIdsOf = (model: ContentModel) =>
        compileDefinition(model, {}, fixtureExtensionsOf(model)).plugins.map((plugin) =>
            keyOf(plugin).replace(/\$\d*$/, ''),
        );
    const failureOfParts = (features: readonly Feature[], parts: readonly EditorPart[]) => {
        const model = compileContentModel([core(), ...features], options);

        return failureOf(() => compileDefinition(model, {}, fixtureExtensionsOf(model, parts)));
    };

    it('orders plugins of one phase by the host list, in both orders', () => {
        const forward = compileContentModel([core(), fixtureBold(), fixtureHeading()], options);
        const reverse = compileContentModel([core(), fixtureHeading(), fixtureBold()], options);
        // The engine's clipboard, history and container keys come first, and the engine's cursors, base keys and last-mark record last.
        const corePlugins = ['clipboard', 'history', 'container-keys'];
        expect(pluginIdsOf(forward)).toEqual([
            ...corePlugins,
            'keymap:fixture.bold',
            'keymap:fixture.heading',
            'drop-cursor',
            'gap-cursor',
            'base-keys',
            'last-mark',
        ]);
        expect(pluginIdsOf(reverse)).toEqual([
            ...corePlugins,
            'keymap:fixture.heading',
            'keymap:fixture.bold',
            'drop-cursor',
            'gap-cursor',
            'base-keys',
            'last-mark',
        ]);
        expect(forward.fingerprint).not.toBe(reverse.fingerprint);
    });

    it('orders by phase before list order, and one keyed plugin sits at its first contributor', () => {
        const model = compileContentModel([core(), fixtureBold(), fixtureRedo(), fixtureHistory()], options);
        expect(pluginIdsOf(model)).toEqual([
            'clipboard',
            'history',
            'container-keys',
            'keymap:fixture.bold',
            'keymap:fixture.redo',
            'keymap:fixture.history',
            'drop-cursor',
            'gap-cursor',
            'base-keys',
            'last-mark',
        ]);
    });

    it('rejects two features that register one command', () => {
        const again = defineFeature({ id: 'a.history', version: 1 });
        const part = defineEditorPart(again, {
            needs: ['history'],
            commands: { 'fixture.undo': { run: (api) => api.history.undo() } },
        });
        expect(failureOfParts([fixtureHistory(), again()], [fixtureHistoryEditor, part])).toEqual({
            code: 'definition.duplicate-id',
            details: { kind: 'command', id: 'fixture.undo', features: ['fixture.history', 'a.history'] },
        });
    });

    it.each([
        ['key', { keys: { 'Mod-q': 'a.missing' } }, '/keys/Mod-q'],
        [
            'input rule',
            { inputRules: [{ id: 'a.stars', kind: 'mark-delimiter', open: '*', close: '*', mark: 'strong' }] },
            '/inputRules/0/mark',
        ],
        [
            'line-start rule',
            { inputRules: [{ id: 'a.quote', kind: 'line-start', command: 'fixture.missing', markers: ['>'] }] },
            '/inputRules/0/command',
        ],
        [
            'block rule',
            { inputRules: [{ id: 'a.rule', kind: 'block-rule', command: 'fixture.missing', match: /^---$/u }] },
            '/inputRules/0/command',
        ],
    ] as const)('rejects the %s registration for an undeclared mark or command', (_kind, parts, path) => {
        const x = defineFeature({ id: 'a.x', version: 1 });
        expect(failureOfParts([x()], [defineEditorPart(x, parts as EditorPartSpec)])).toEqual({
            code: 'definition.orphan-behavior',
            details: { feature: 'a.x', path },
        });
    });

    it('rejects a key payload that fails its command declaration', () => {
        const keys = defineFeature({ id: 'a.keys', version: 1, requires: [{ id: 'fixture.heading', version: 1 }] });
        const part = defineEditorPart(keys, {
            keys: { 'Mod-Alt-9': { command: 'fixture.heading.set', payload: { level: 9 } } },
        });
        expect(failureOfParts([fixtureHeading(), keys()], [fixtureHeadingEditor, part])).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'a.keys', path: '/keys/Mod-Alt-9/payload/level' },
        });
    });
});
