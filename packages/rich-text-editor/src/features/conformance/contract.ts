/* (c) Copyright Frontify Ltd., all rights reserved. */

import axe from 'axe-core';
import { EditorState } from 'prosemirror-state';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { createCodecs } from '#/codecs';
import { compileDefinition, type CompiledDefinition } from '#/definition';
import { registry } from '#/features/registry';
import { enUS } from '#/locales/en-US';
import {
    compileContentModel,
    type CommandRef,
    type ContentModel,
    type ContentNodeJSON,
    createEmptyDocument,
    type Diagnostic,
    type Feature,
    type FeatureDeclaration,
    type RichTextDocument,
} from '#/model';
import { type TreeNode } from '#/model/content';
import { decodeToTree } from '#/model/decode';
import { encodeTree } from '#/model/encode';
import { featureInternals } from '#/model/feature';
import { RichTextReader } from '#/reader';
import { CAPABILITIES } from '#/runtime/capabilities';

import keyboardPage from '../../../docs/keyboard.md?raw';

import { featureFixtures } from './fixtures';

/** The ambient `describe`, `it` and `expect` of the host's test runner, which the suite registers its cases with. */
interface TestRunner {
    describe(name: string, body: () => void): void;
    it(name: string, body: () => void | Promise<void>): void;
    expect(actual: unknown): { toBe(expected: unknown): void; toEqual(expected: unknown): void };
}

// The model ID that the fixture documents of the shipped features carry.
const MODEL_ID = 'feature-contract';
// SPEC-rich-text-accessibility/AC-036: the tags the Storybook axe check uses too.
const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const translations: Readonly<Record<string, string>> = enUS.translationStrings;

const declarationOf = (feature: Feature): FeatureDeclaration => {
    const internals = featureInternals(feature);
    if (internals === undefined) {
        throw new Error(`${feature.id} is not a feature that defineFeature or featureFromManifest made.`);
    }
    return internals.declaration;
};

const commandOf = (ref: CommandRef): string => {
    if (typeof ref === 'string') {
        return ref;
    }
    return ref.command;
};

/** A toolbar entry's label in `enUS`: its `labelKey` in the package strings, or a manifest label's `en-US` entry. */
const labelOf = (entry: object): string | undefined => {
    if ('labelKey' in entry && typeof entry.labelKey === 'string') {
        return translations[entry.labelKey];
    }
    if ('label' in entry && typeof entry.label === 'object' && entry.label !== null) {
        return (entry.label as Readonly<Record<string, string>>)['en-US'];
    }
    return undefined;
};

/** Every node and mark type the content holds. */
const typesIn = (node: ContentNodeJSON, types: Set<string>): Set<string> => {
    types.add(node.type);
    for (const mark of node.marks ?? []) {
        types.add(mark.type);
    }
    for (const child of node.content ?? []) {
        typesIn(child, types);
    }
    return types;
};

const normalized = (html: string) => html.replaceAll(/>\s+</g, '><').replaceAll(/\s+/g, ' ').trim();

/** The reader's static markup of a document, with the diagnostics it reported. */
const readerOutput = (document: RichTextDocument, model: ContentModel) => {
    const diagnostics: Diagnostic[] = [];
    const reader = createElement(RichTextReader, {
        document,
        model,
        onDiagnostic: (diagnostic) => diagnostics.push(diagnostic),
    });
    return { markup: renderToStaticMarkup(reader), diagnostics };
};

/**
 * Registers the feature contract cases for each feature through the host's test runner globals: one model
 * compiled from the whole list, then per feature its vocabulary, schema, commands, toolbar labels and, for a
 * shipped feature, its fixtures and keyboard rows (SPEC-rich-text/AC-016, AC-017). The axe case needs a DOM.
 */
export const runFeatureContract = (features: readonly Feature[]): void => {
    const { describe, it, expect } = globalThis as Partial<TestRunner>;
    if (describe === undefined || it === undefined || expect === undefined) {
        throw new Error('runFeatureContract registers its cases through the global describe, it and expect.');
    }
    let model: ContentModel | undefined;
    let engine: CompiledDefinition | undefined;
    const compiled = () => {
        if (model === undefined) {
            model = compileContentModel(features, { id: MODEL_ID, version: 1 });
        }
        return model;
    };
    const engineOf = () => {
        if (engine === undefined) {
            engine = compileDefinition(compiled(), CAPABILITIES);
        }
        return engine;
    };
    const stateOf = (document: RichTextDocument) => {
        const { tree } = decodeToTree(document, compiled());
        if (tree === undefined) {
            throw new Error('The document does not decode.');
        }
        return EditorState.create({ doc: engineOf().schema.nodeFromJSON(tree) });
    };

    for (const feature of features) {
        const declaration = declarationOf(feature);
        const shipped = Object.hasOwn(registry, feature.id);
        const fixtures = featureFixtures[feature.id] ?? {};
        const nodes = Object.keys(declaration.nodes ?? {});
        const marks = Object.keys(declaration.marks ?? {});

        describe(feature.id, () => {
            it('SPEC-rich-text/AC-016 compiles its vocabulary, with an html spec for each node and mark', () => {
                expect(compiled().ref).toEqual({ id: MODEL_ID, version: 1 });
            });

            it('SPEC-rich-text/AC-017 builds its nodes and marks into the engine schema', () => {
                const { schema } = engineOf();
                expect(nodes.filter((name) => schema.nodes[name] === undefined)).toEqual([]);
                expect(marks.filter((name) => schema.marks[name] === undefined)).toEqual([]);
            });

            for (const id of Object.keys(declaration.commands ?? {})) {
                it(`SPEC-rich-text/AC-017 queries ${id} without dispatching`, () => {
                    const command = engineOf().commands.get(id);
                    if (command === undefined) {
                        throw new Error(`${id} has no capability implementation.`);
                    }
                    for (const fixture of [createEmptyDocument(compiled()), ...Object.values(fixtures)]) {
                        const state = stateOf(fixture);
                        expect(typeof command.run(state)).toBe('boolean');
                        expect([true, false, 'mixed'].includes(command.active(state))).toBe(true);
                    }
                });
            }

            it('SPEC-rich-text/AC-016 SPEC-rich-text/AC-017 resolves the label of each toolbar entry in enUS', () => {
                const unlabelled = (declaration.toolbar ?? []).filter((entry) => labelOf(entry) === undefined);
                expect(unlabelled).toEqual([]);
            });

            if (!shipped) {
                return;
            }

            it('SPEC-rich-text/AC-016 brings fixtures that hold each of its nodes and marks', () => {
                const types = new Set<string>();
                for (const fixture of Object.values(fixtures)) {
                    typesIn(fixture.content, types);
                }
                expect([...nodes, ...marks].filter((type) => !types.has(type))).toEqual([]);
            });

            it('SPEC-rich-text/AC-017 lists each keyed command in docs/keyboard.md', () => {
                const lines = keyboardPage.split('\n');
                const listed = (key: string, command: string) =>
                    lines.some((line) => line.includes(`\`${key}\``) && line.includes(`\`${command}\``));
                const keys = Object.entries(declaration.keys ?? {});
                expect(keys.filter(([key, ref]) => !listed(key, commandOf(ref))).map(([key]) => key)).toEqual([]);
            });

            for (const [name, fixture] of Object.entries(fixtures)) {
                it(`SPEC-rich-text/AC-017 decodes and encodes ${name} to itself`, () => {
                    const { result, tree } = decodeToTree(fixture, compiled());
                    expect(result.diagnostics).toEqual([]);
                    if (tree === undefined) {
                        throw new Error(`${name} does not decode.`);
                    }
                    const node = engineOf().schema.nodeFromJSON(tree);
                    const encoded = encodeTree(node.toJSON() as TreeNode, compiled(), fixture.requiredCapabilities);
                    expect(encoded.document).toEqual(fixture);
                });

                it(`SPEC-rich-text/AC-017 renders ${name} in the reader and writes it through every codec`, () => {
                    const reader = readerOutput(fixture, compiled());
                    const codecs = createCodecs(compiled());
                    const html = codecs.toHTML(fixture);
                    const text = codecs.toPlainText(fixture);
                    const markdown = codecs.toMarkdown(fixture);
                    expect([reader, html, text, markdown].flatMap(({ diagnostics }) => diagnostics)).toEqual([]);
                    expect(normalized(html.html)).toBe(normalized(reader.markup));
                });

                it(`SPEC-rich-text/AC-017 passes axe on the reader output of ${name}`, async () => {
                    const container = document.createElement('div');
                    container.innerHTML = readerOutput(fixture, compiled()).markup;
                    document.body.append(container);
                    try {
                        const { violations } = await axe.run(container, { runOnly: { type: 'tag', values: AXE_TAGS } });
                        expect(violations.map(({ id }) => id)).toEqual([]);
                    } finally {
                        container.remove();
                    }
                });
            }
        });
    }
};
