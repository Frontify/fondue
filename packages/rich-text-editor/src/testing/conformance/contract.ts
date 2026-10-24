/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState, TextSelection } from 'prosemirror-state';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { type EditorPlugin, pluginWithOptions } from '#/bridge/plugin';
import { createCodecs } from '#/codecs';
import { type CompiledDefinition } from '#/definition';
import { registry } from '#/features/registry';
import { enUS } from '#/locales/en-US';
import {
    compileContentModel,
    type ContentModel,
    type ContentNodeJSON,
    createEmptyDocument,
    type Diagnostic,
    type Feature,
    type FeatureDeclaration,
    type FeatureFormats,
    type JsonValue,
    type RichTextDocument,
} from '#/model';
import { compiledModel } from '#/model/compile';
import { type TreeNode } from '#/model/content';
import { decodeToTree } from '#/model/decode';
import { encodeTree } from '#/model/encode';
import { featureInternals } from '#/model/feature';
import { isRecord, ownValue } from '#/model/values';
import { editorEngine } from '#/react/engine';
import { SHIPPED_PLUGINS } from '#/react/plugins';
import { RichTextReader } from '#/reader';

import { AXE_TAGS } from './axe-tags';
import { featureFixtures } from './fixtures';

/** The ambient `describe`, `it` and `expect` of the host's test runner, which the suite registers its cases with. */
interface TestRunner {
    describe(name: string, body: () => void): void;
    it(name: string, body: () => void | Promise<void>): void;
    expect(actual: unknown): { toBe(expected: unknown): void; toEqual(expected: unknown): void };
}

// The model ID that the fixture documents of the shipped features carry.
const MODEL_ID = 'feature-contract';
const translations: Readonly<Record<string, string>> = enUS.translationStrings;

const declarationOf = (feature: Feature): FeatureDeclaration => {
    const internals = featureInternals(feature);
    if (internals === undefined) {
        throw new Error(`${feature.id} is not a feature that defineFeature made.`);
    }
    return internals.declaration;
};

/** A label in `enUS`: its `labelKey` in the package strings, or a plugin label's `en-US` entry. */
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

/**
 * The shared attributes of `declaration` that the content sets to a value other than their default, on a node the
 * attribute targets: one it lists, or any textblock for `'textblocks'`.
 */
const setAttributesIn = (
    node: ContentNodeJSON,
    declaration: FeatureDeclaration,
    isTextblock: (type: string) => boolean,
    found: Set<string>,
): Set<string> => {
    for (const [name, shared] of Object.entries(declaration.attributes ?? {})) {
        let targeted: boolean;
        if (shared.on === 'textblocks') {
            targeted = isTextblock(node.type);
        } else {
            targeted = shared.on.includes(node.type);
        }
        if (!targeted) {
            continue;
        }
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
        setAttributesIn(child, declaration, isTextblock, found);
    }
    return found;
};

interface SharedDefault {
    readonly name: string;
    readonly on: readonly string[] | 'textblocks';
    readonly fallback: JsonValue;
}

/**
 * `node` with each attribute that a feature of the model adds to its type and that it leaves out, at its default: a
 * fixture written for its own feature holds no attribute that another feature of the model adds.
 */
const withSharedDefaults = (
    node: ContentNodeJSON,
    shared: readonly SharedDefault[],
    isTextblock: (type: string) => boolean,
): ContentNodeJSON => {
    const attrs: Record<string, JsonValue> = {};
    for (const [name, value] of Object.entries(node.attrs ?? {})) {
        attrs[name] = value;
    }
    let added = false;
    for (const { name, on, fallback } of shared) {
        const targeted = on === 'textblocks' ? isTextblock(node.type) : on.includes(node.type);
        if (targeted && !Object.hasOwn(attrs, name)) {
            attrs[name] = fallback;
            added = true;
        }
    }
    const copy: Record<string, unknown> = { ...node };
    if (added) {
        copy.attrs = attrs;
    }
    if (node.content !== undefined) {
        copy.content = node.content.map((child) => withSharedDefaults(child, shared, isTextblock));
    }
    return copy as unknown as ContentNodeJSON;
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

// Screen-reader-only text holds text alone, so its element closes before any other tag opens.
const HIDDEN_TEXT = /<(\w+)(?:\s[^>]*)?\sdata-rte-hidden-text(?:="[^"]*")?(?:\s[^>]*)?>[^<]*<\/\1>/g;

/** The reader's markup without its visually hidden text, which `toHTML` leaves out so pasted output adds no text. */
const withoutHiddenText = (markup: string) => markup.replaceAll(HIDDEN_TEXT, '');

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
    /** Editor parts of the features under test, which replace the shipped part of the same feature. */
    readonly plugins?: readonly EditorPlugin[];
}

/**
 * Registers the feature contract cases for each feature through the host's test runner globals: one model
 * compiled from the whole list, then per feature its vocabulary, schema, commands and toolbar labels, its editor part's
 * commands, toolbar labels and paste rules and, for a shipped feature, its fixtures, then each of `options.fixtures`,
 * the documents an outside feature brings.
 * The axe case needs a DOM.
 */
export const runFeatureContract = (features: readonly Feature[], options: FeatureContractOptions = {}): void => {
    const { describe, it, expect } = globalThis as Partial<TestRunner>;
    if (describe === undefined || it === undefined || expect === undefined) {
        throw new Error('runFeatureContract registers its cases through the global describe, it and expect.');
    }
    let model: ContentModel | undefined;
    let built: { readonly engine: CompiledDefinition; readonly plugins: readonly EditorPlugin[] } | undefined;
    const compiled = () => {
        if (model === undefined) {
            model = compileContentModel(features, { id: MODEL_ID, version: 1 });
        }
        return model;
    };
    const builtOf = () => {
        if (built === undefined) {
            built = editorEngine(compiled(), options.plugins);
        }
        return built;
    };
    const engineOf = () => builtOf().engine;
    /** The resolved options of feature `id`, or none while the set does not compile, which the compile case reports. */
    const optionsOf = (id: string) => {
        try {
            return compiledModel(compiled()).features.find((feature) => feature.id === id)?.options;
        } catch {
            return undefined;
        }
    };
    /** The given editor part of a feature, else its shipped one, with the parts it gives for the feature's options. */
    const partOf = (id: string) => {
        const plugins = options.plugins ?? [];
        const given = [...plugins].reverse().find((plugin) => plugin.feature === id);
        const part = given ?? ownValue(SHIPPED_PLUGINS, id);
        const resolved = optionsOf(id);
        if (part === undefined || resolved === undefined) {
            return part;
        }
        return pluginWithOptions(part, resolved);
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
    const sharedDefaults: SharedDefault[] = features.flatMap((feature) =>
        Object.entries(declarationOf(feature).attributes ?? {}).flatMap(([name, { on, value }]) => {
            if (!('default' in value)) {
                return [];
            }
            return [{ name, on, fallback: value.default as JsonValue }];
        }),
    );
    const lossyIn = (format: keyof FeatureFormats) =>
        new Set(features.filter((feature) => declarationOf(feature).formats?.[format] === 'lossy').map(({ id }) => id));
    const lossy = { html: lossyIn('html'), text: lossyIn('text'), markdown: lossyIn('markdown') };
    /** A codec's diagnostics but the `codecs.lossy-output` info it owes each feature that declares `format` lossy. */
    const unexpected = (diagnostics: readonly Diagnostic[], format: keyof FeatureFormats) =>
        diagnostics.filter(
            ({ code, severity, featureId }) =>
                code !== 'codecs.lossy-output' ||
                severity !== 'info' ||
                featureId === undefined ||
                !lossy[format].has(featureId),
        );
    /** The decode, reader, codec and axe cases of one stored document. */
    const fixtureCases = (name: string, fixture: unknown) => {
        it(`decodes and encodes ${name} to itself`, () => {
            const stored = storedIn(fixture);
            const { result, tree } = decodeToTree(stored, compiled());
            expect(result.diagnostics).toEqual([]);
            if (tree === undefined) {
                throw new Error(`${name} does not decode.`);
            }
            const { schema } = engineOf();
            const node = schema.nodeFromJSON(tree);
            const encoded = encodeTree(node.toJSON() as TreeNode, compiled(), stored.requiredCapabilities);
            const isTextblock = (type: string) => schema.nodes[type]?.isTextblock === true;
            const content = withSharedDefaults(
                stored.content as unknown as ContentNodeJSON,
                sharedDefaults,
                isTextblock,
            );
            expect(encoded.document).toEqual({ ...stored, content });
        });

        it(`renders ${name} in the reader and writes it through every codec`, () => {
            const stored = storedIn(fixture);
            const reader = readerOutput(stored, compiled());
            const codecs = createCodecs(compiled());
            const html = codecs.toHTML(stored);
            const text = codecs.toPlainText(stored);
            const markdown = codecs.toMarkdown(stored);
            expect([
                ...reader.diagnostics,
                ...unexpected(html.diagnostics, 'html'),
                ...unexpected(text.diagnostics, 'text'),
                ...unexpected(markdown.diagnostics, 'markdown'),
            ]).toEqual([]);
            expect(normalized(html.html)).toBe(normalized(withoutHiddenText(reader.markup)));
        });

        if (typeof document === 'undefined') {
            return;
        }

        it(`passes axe on the reader output of ${name}`, async () => {
            const { default: axe } = await import('axe-core');
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

    it('compileContentModel accepts the feature set, which it rejects when a node or mark has no html spec', () => {
        expect(compiled().ref).toEqual({ id: MODEL_ID, version: 1 });
    });

    for (const feature of features) {
        const declaration = declarationOf(feature);
        const shipped = Object.hasOwn(registry, feature.id);
        const fixtures = featureFixtures[feature.id] ?? {};
        const nodes = Object.keys(declaration.nodes ?? {});
        const marks = Object.keys(declaration.marks ?? {});
        const part = partOf(feature.id);
        let commands: string[] = [];
        if (part?.commands !== undefined) {
            commands = Object.keys(part.commands);
        }

        describe(feature.id, () => {
            it('builds its nodes and marks into the engine schema', () => {
                const { schema } = engineOf();
                expect(nodes.filter((name) => schema.nodes[name] === undefined)).toEqual([]);
                expect(marks.filter((name) => schema.marks[name] === undefined)).toEqual([]);
            });

            for (const id of commands) {
                it(`queries ${id} without dispatching`, () => {
                    const command = engineOf().commands.get(id);
                    if (command === undefined) {
                        throw new Error(`${id} is not installed.`);
                    }
                    const given = (options.fixtures ?? []).map(storedIn);
                    for (const fixture of [createEmptyDocument(compiled()), ...Object.values(fixtures), ...given]) {
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

            it('resolves the label of each toolbar entry and menu item in enUS', () => {
                const toolbar = part?.toolbar;
                const entries = toolbar ?? [];
                const unlabelled = entries.filter((entry) => labelOf(entry) === undefined);
                expect(unlabelled).toEqual([]);
            });

            if (!shipped) {
                return;
            }

            it('brings fixtures that hold each of its nodes, marks and shared attributes', () => {
                const { schema } = engineOf();
                const isTextblock = (type: string) => schema.nodes[type]?.isTextblock === true;
                const documents = Object.values(fixtures);
                expect(documents.length > 0).toBe(true);
                const types = new Set<string>();
                const attributes = new Set<string>();
                for (const fixture of documents) {
                    typesIn(fixture.content, types);
                    setAttributesIn(fixture.content, declaration, isTextblock, attributes);
                }
                expect([...nodes, ...marks].filter((type) => !types.has(type))).toEqual([]);
                expect(Object.keys(declaration.attributes ?? {}).filter((name) => !attributes.has(name))).toEqual([]);
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
