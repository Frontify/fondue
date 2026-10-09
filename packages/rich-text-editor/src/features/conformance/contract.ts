/* (c) Copyright Frontify Ltd., all rights reserved. */

import axe from 'axe-core';
import { EditorState, TextSelection } from 'prosemirror-state';
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
    type JsonValue,
    type RichTextDocument,
} from '#/model';
import { type TreeNode } from '#/model/content';
import { decodeToTree } from '#/model/decode';
import { encodeTree } from '#/model/encode';
import { featureInternals } from '#/model/feature';
import { isRecord } from '#/model/values';
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

/** A label in `enUS`: its `labelKey` in the package strings, or a manifest label's `en-US` entry. */
const labelOf = (entry: object): string | undefined => {
    if ('labelKey' in entry && typeof entry.labelKey === 'string') {
        return translations[entry.labelKey];
    }
    if ('label' in entry && typeof entry.label === 'object' && entry.label !== null) {
        return (entry.label as Readonly<Record<string, string>>)['en-US'];
    }
    return undefined;
};

/** Each toolbar entry, and each menu item that names its own label. */
const labelledEntries = (declaration: FeatureDeclaration): object[] =>
    (declaration.toolbar ?? []).flatMap((entry) => {
        if (entry.kind !== 'menu') {
            return [entry];
        }
        const items = entry.items.filter((item) => typeof item === 'object' && ('labelKey' in item || 'label' in item));
        return [entry, ...(items as object[])];
    });

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

/** The shared attributes of `declaration` that the content sets to a value other than their default. */
const setAttributesIn = (node: ContentNodeJSON, declaration: FeatureDeclaration, found: Set<string>): Set<string> => {
    for (const [name, shared] of Object.entries(declaration.attributes ?? {})) {
        let fallback: JsonValue | undefined;
        if ('default' in shared.value) {
            fallback = shared.value.default as JsonValue;
        }
        const value = node.attrs?.[name];
        if (value !== undefined && JSON.stringify(value) !== JSON.stringify(fallback)) {
            found.add(name);
        }
    }
    for (const child of node.content ?? []) {
        setAttributesIn(child, declaration, found);
    }
    return found;
};

/** Collapses each whitespace run to one space, outside `pre`, whose text keeps every character. */
const normalized = (html: string) =>
    html
        .split(/(<pre[\s>][\s\S]*?<\/pre>)/)
        .map((part, index) => {
            if (index % 2 === 1) {
                return part;
            }
            return part.replaceAll(/\s+/g, ' ');
        })
        .join('')
        .trim();

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

export interface FeatureContractOptions {
    /** Stored documents that use the features under test, each run through decode, encode, the reader and every codec. */
    readonly fixtures?: readonly unknown[];
}

/**
 * Registers the feature contract cases for each feature through the host's test runner globals: one model
 * compiled from the whole list, then per feature its vocabulary, schema, commands, toolbar labels and, for a
 * shipped feature, its fixtures and keyboard rows, then each of `options.fixtures`, the documents an outside
 * feature brings (SPEC-rich-text/AC-016, AC-017, DR-069). The axe case needs a DOM.
 */
export const runFeatureContract = (features: readonly Feature[], options: FeatureContractOptions = {}): void => {
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
    /** A fixture as a document of the model under test, whatever model it names. */
    const storedIn = (fixture: unknown): RichTextDocument => {
        if (!isRecord(fixture)) {
            return fixture as RichTextDocument;
        }
        return { ...fixture, model: compiled().ref } as unknown as RichTextDocument;
    };
    /** The decode, reader, codec and axe cases of one stored document. */
    const fixtureCases = (name: string, fixture: unknown) => {
        it(`SPEC-rich-text/AC-017 decodes and encodes ${name} to itself`, () => {
            const stored = storedIn(fixture);
            const { result, tree } = decodeToTree(stored, compiled());
            expect(result.diagnostics).toEqual([]);
            if (tree === undefined) {
                throw new Error(`${name} does not decode.`);
            }
            const node = engineOf().schema.nodeFromJSON(tree);
            const encoded = encodeTree(node.toJSON() as TreeNode, compiled(), stored.requiredCapabilities);
            expect(encoded.document).toEqual(stored);
        });

        it(`SPEC-rich-text/AC-017 renders ${name} in the reader and writes it through every codec`, () => {
            const stored = storedIn(fixture);
            const reader = readerOutput(stored, compiled());
            const codecs = createCodecs(compiled());
            const html = codecs.toHTML(stored);
            const text = codecs.toPlainText(stored);
            const markdown = codecs.toMarkdown(stored);
            expect([reader, html, text, markdown].flatMap(({ diagnostics }) => diagnostics)).toEqual([]);
            expect(normalized(html.html)).toBe(normalized(reader.markup));
        });

        it(`SPEC-rich-text/AC-017 passes axe on the reader output of ${name}`, async () => {
            const container = document.createElement('div');
            container.innerHTML = readerOutput(storedIn(fixture), compiled()).markup;
            document.body.append(container);
            try {
                const { violations } = await axe.run(container, { runOnly: { type: 'tag', values: AXE_TAGS } });
                expect(violations.map(({ id }) => id)).toEqual([]);
            } finally {
                container.remove();
            }
        });
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
                        const { doc } = state;
                        // A query over a range reaches the code that would build a transaction.
                        const selected = state.apply(
                            state.tr.setSelection(TextSelection.between(doc.resolve(0), doc.resolve(doc.content.size))),
                        );
                        for (const queried of [state, selected]) {
                            expect(typeof command.run(queried)).toBe('boolean');
                            expect([true, false, 'mixed'].includes(command.active(queried))).toBe(true);
                        }
                    }
                });
            }

            it('SPEC-rich-text/AC-016 SPEC-rich-text/AC-017 resolves the label of each toolbar entry and menu item in enUS', () => {
                const unlabelled = labelledEntries(declaration).filter((entry) => labelOf(entry) === undefined);
                expect(unlabelled).toEqual([]);
            });

            if (!shipped) {
                return;
            }

            it('SPEC-rich-text/AC-016 brings fixtures that hold each of its nodes, marks and shared attributes', () => {
                const documents = Object.values(fixtures);
                expect(documents.length > 0).toBe(true);
                const types = new Set<string>();
                const attributes = new Set<string>();
                for (const fixture of documents) {
                    typesIn(fixture.content, types);
                    setAttributesIn(fixture.content, declaration, attributes);
                }
                expect([...nodes, ...marks].filter((type) => !types.has(type))).toEqual([]);
                expect(Object.keys(declaration.attributes ?? {}).filter((name) => !attributes.has(name))).toEqual([]);
            });

            it('SPEC-rich-text/AC-017 lists each keyed command in docs/keyboard.md', () => {
                const lines = keyboardPage.split('\n');
                const listed = (key: string, command: string) =>
                    lines.some((line) => line.includes(`\`${key}\``) && line.includes(`\`${command}\``));
                const keys = Object.entries(declaration.keys ?? {});
                expect(keys.filter(([key, ref]) => !listed(key, commandOf(ref))).map(([key]) => key)).toEqual([]);
            });

            for (const [name, fixture] of Object.entries(fixtures)) {
                fixtureCases(name, fixture);
            }
        });
    }

    const given = options.fixtures;
    if (given !== undefined) {
        describe('the given fixtures', () => {
            for (const [index, fixture] of given.entries()) {
                fixtureCases(`fixture ${index + 1}`, fixture);
            }
        });
    }
};
