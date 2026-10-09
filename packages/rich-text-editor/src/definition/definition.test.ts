/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState, type Plugin } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';

import {
    fixtureBold,
    fixtureColor,
    fixtureHeading,
    fixtureHistory,
    fixtureItalic,
    fixtureLink,
    fixtureRedo,
} from '#/features/__fixtures__/features';
import { core } from '#/features/core/feature';
import { compileContentModel, defineFeature, DefinitionError, type FeatureDeclaration } from '#/model';

import { compileDefinition } from '.';

const keyOf = (plugin: Plugin) => (plugin as unknown as { readonly key: string }).key;
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
    it('SPEC-rich-text/AC-026 gives a plugin two features contribute one instance, so EditorState.create does not throw', () => {
        const model = compileContentModel([core(), fixtureHistory(), fixtureRedo()], { id: 'test', version: 1 });
        const { plugins, schema } = compileDefinition(model);

        expect(plugins.map(keyOf).filter((key) => key.startsWith('history$'))).toHaveLength(1);
        expect(plugins).toHaveLength((model.manifest.plugins as string[]).length);
        expect(() => EditorState.create({ schema, plugins: [...plugins] })).not.toThrow();
    });

    it('SPEC-rich-text/AC-026 builds the plugins and keymap in the manifest order, in both input orders', () => {
        for (const features of [
            [core(), fixtureBold(), fixtureHeading()],
            [core(), fixtureHeading(), fixtureBold()],
        ]) {
            const model = compileContentModel(features, { id: 'test', version: 1 });
            const { plugins, keymap } = compileDefinition(model);
            const ids = model.manifest.plugins as string[];

            expect(plugins.map(keyOf).map((key) => key.replace(/\$\d*$/, ''))).toEqual(ids);
            expect(keymap.map(({ plugin }) => plugin)).toEqual(ids);
        }
    });

    it('SPEC-rich-text/AC-027 builds schema nodes in declared order and marks by rank, then declared order', () => {
        const features = [core(), fixtureItalic(), fixtureBold(), fixtureColor(), fixtureLink(), fixtureHeading()];
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

    it('SPEC-rich-text/AC-081 turns each engine schema error into definition.invalid-declaration', () => {
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

    it('SPEC-rich-text/AC-081 builds task_item+ and figure > asset_image with a required nodeId the engine defaults to null', () => {
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

    it('SPEC-rich-text/AC-071 writes a shared attribute bound to a style property only for a plain CSS value', () => {
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

    it('SPEC-rich-text-format/AC-027 keeps a literal STYLE of any case together with a shared style declaration', () => {
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
        'SPEC-rich-text/AC-081 compiles %j and builds its schema in under 200 ms',
        (content) => {
            const started = performance.now();
            const feature = defineFeature({ id: 'a.x', version: 1, nodes: { box: { ...box, content } } })();
            const { schema } = compileDefinition(compileContentModel([core(), feature], options));
            expect(performance.now() - started).toBeLessThan(200);
            expect(schema.nodes.box?.spec.content).toBe(content);
        },
    );

    it('SPEC-rich-text/AC-071 keeps the checked url default when the caller mutates the declaration after compiling', () => {
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
