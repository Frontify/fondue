/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorPart, partWithOptions } from '#/bridge/plugin';
import { createCodecs } from '#/codecs';
import { type CompiledDefinition } from '#/definition';
import { registry } from '#/features/registry';
import { enUS } from '#/locales/en-US';
import {
    compileContentModel,
    type ContentModel,
    createEmptyDocument,
    type Diagnostic,
    type Feature,
    type FeatureDeclaration,
    type FeatureFormats,
    type JsonValue,
    type RichTextDocument,
    isRecord,
} from '#/model';
import { compiledModel, type TreeNode, decodeToTree, encodeTree, featureInternals } from '#/model/internal';
import { editorEngine } from '#/react/engine';
import { type ConformanceState, stateFromTree, withWholeDocumentSelected } from '#/runtime/conformance-state';

import { AXE_TAGS } from './axe-tags';
import {
    normalized,
    readerOutput,
    setAttributesIn,
    type SharedDefault,
    typesIn,
    withSharedDefaults,
    withoutHiddenText,
} from './contract-support';
import { featureFixtures } from './fixtures';
import { contractUnits } from './units';

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

export interface FeatureContractOptions {
    /** Stored documents that use the features under test, each run through decode, encode, the reader and every codec. */
    readonly fixtures?: readonly unknown[];
    /** Editor parts of the features under test, which replace the shipped part of the same feature. */
    readonly plugins?: readonly EditorPart[];
}

/** The runner globals and the lazily built model, engine and lookups that every check group shares. */
interface Contract extends TestRunner {
    readonly options: FeatureContractOptions;
    readonly compiled: () => ContentModel;
    readonly engineOf: () => CompiledDefinition;
    readonly stateOf: (document: RichTextDocument) => ConformanceState;
    readonly storedIn: (fixture: unknown) => RichTextDocument;
    readonly partOf: (id: string) => EditorPart | undefined;
    readonly sharedDefaults: readonly SharedDefault[];
    readonly unexpected: (diagnostics: readonly Diagnostic[], format: keyof FeatureFormats) => Diagnostic[];
}

const contractOf = (features: readonly Feature[], options: FeatureContractOptions, runner: TestRunner): Contract => {
    let model: ContentModel | undefined;
    let built: { readonly engine: CompiledDefinition; readonly plugins: readonly EditorPart[] } | undefined;
    const compiled = () => {
        if (model === undefined) {
            model = compileContentModel(features, { id: MODEL_ID, version: 1 });
        }
        return model;
    };
    const engineOf = () => {
        if (built === undefined) {
            built = editorEngine(compiled(), contractUnits(features, options.plugins ?? []));
        }
        return built.engine;
    };
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
        const part = contractUnits(features, options.plugins ?? []).find((unit) => unit.id === id)?.editor;
        const resolved = optionsOf(id);
        if (part === undefined || resolved === undefined) {
            return part;
        }
        return partWithOptions(part, resolved);
    };
    const stateOf = (document: RichTextDocument) => {
        const { tree } = decodeToTree(document, compiled());
        if (tree === undefined) {
            throw new Error('The document does not decode.');
        }
        return stateFromTree(engineOf(), tree);
    };
    /** A fixture as a document of the model under test, whatever model it names. */
    const storedIn = (fixture: unknown): RichTextDocument => {
        if (!isRecord(fixture)) {
            return fixture as RichTextDocument;
        }
        // A fixture with the model ref swapped in is still a stored document; the spread loses the brand.
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
    return { ...runner, options, compiled, engineOf, stateOf, storedIn, partOf, sharedDefaults, unexpected };
};

/** The decode, reader, codec and axe cases of one stored document. */
const fixtureCases = (c: Contract, name: string, fixture: unknown) => {
    const { it, expect, compiled, engineOf, storedIn } = c;
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
        const content = withSharedDefaults(stored.content, c.sharedDefaults, isTextblock);
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
            ...c.unexpected(html.diagnostics, 'html'),
            ...c.unexpected(text.diagnostics, 'text'),
            ...c.unexpected(markdown.diagnostics, 'markdown'),
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

const compileCase = ({ it, expect, compiled }: Contract) => {
    it('compileContentModel accepts the feature set, which it rejects when a node or mark has no html spec', () => {
        expect(compiled().ref).toEqual({ id: MODEL_ID, version: 1 });
    });
};

const schemaCase = ({ it, expect, engineOf }: Contract, declaration: FeatureDeclaration) => {
    const nodes = Object.keys(declaration.nodes ?? {});
    const marks = Object.keys(declaration.marks ?? {});
    it('builds its nodes and marks into the engine schema', () => {
        const { schema } = engineOf();
        expect(nodes.filter((name) => schema.nodes[name] === undefined)).toEqual([]);
        expect(marks.filter((name) => schema.marks[name] === undefined)).toEqual([]);
    });
};

const commandCases = (
    c: Contract,
    commands: readonly string[],
    fixtures: Readonly<Record<string, RichTextDocument>>,
) => {
    const { it, expect, compiled, engineOf, stateOf, storedIn, options } = c;
    for (const id of commands) {
        it(`queries ${id} without dispatching`, () => {
            const command = engineOf().commands.get(id);
            if (command === undefined) {
                throw new Error(`${id} is not installed.`);
            }
            const given = (options.fixtures ?? []).map(storedIn);
            for (const fixture of [createEmptyDocument(compiled()), ...Object.values(fixtures), ...given]) {
                const state = stateOf(fixture);
                // A query over a range reaches the code that would build a transaction.
                const selected = withWholeDocumentSelected(state);
                for (const queried of [state, selected]) {
                    expect(typeof command.run(queried)).toBe('boolean');
                    expect([true, false, 'mixed'].includes(command.active(queried))).toBe(true);
                }
            }
        });
    }
};

const toolbarCase = ({ it, expect }: Contract, part: EditorPart | undefined) => {
    it('resolves the label of each toolbar entry and menu item in enUS', () => {
        const toolbar = part?.toolbar;
        const entries = toolbar ?? [];
        const unlabelled = entries.filter((entry) => labelOf(entry) === undefined);
        expect(unlabelled).toEqual([]);
    });
};

const fixtureCoverageCase = (
    { it, expect, engineOf }: Contract,
    declaration: FeatureDeclaration,
    fixtures: Readonly<Record<string, RichTextDocument>>,
) => {
    const nodes = Object.keys(declaration.nodes ?? {});
    const marks = Object.keys(declaration.marks ?? {});
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
};

/** The describe block of one feature: its schema, commands and toolbar labels and, when shipped, its fixtures. */
const featureCases = (c: Contract, feature: Feature) => {
    const declaration = declarationOf(feature);
    const shipped = Object.hasOwn(registry, feature.id);
    const fixtures: Readonly<Record<string, RichTextDocument>> = featureFixtures[feature.id] ?? {};
    const part = c.partOf(feature.id);
    let commands: string[] = [];
    if (part?.commands !== undefined) {
        commands = Object.keys(part.commands);
    }

    c.describe(feature.id, () => {
        schemaCase(c, declaration);
        commandCases(c, commands, fixtures);
        toolbarCase(c, part);
        if (!shipped) {
            return;
        }
        fixtureCoverageCase(c, declaration, fixtures);
        for (const [name, fixture] of Object.entries(fixtures)) {
            fixtureCases(c, name, fixture);
        }
    });
};

const givenFixtureCases = (c: Contract) => {
    const given = c.options.fixtures;
    if (given === undefined) {
        return;
    }
    c.describe('the given fixtures', () => {
        for (const [index, fixture] of given.entries()) {
            fixtureCases(c, `fixture ${index + 1}`, fixture);
        }
    });
};

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
    const contract = contractOf(features, options, { describe, it, expect });
    compileCase(contract);
    for (const feature of features) {
        featureCases(contract, feature);
    }
    givenFixtureCases(contract);
};
