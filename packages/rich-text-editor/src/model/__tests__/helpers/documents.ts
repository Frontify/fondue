/* (c) Copyright Frontify Ltd., all rights reserved. */

import fc from 'fast-check';

import {
    type AttributeDeclaration,
    checkHref,
    type ContentModel,
    type ContentNodeJSON,
    type JsonValue,
    type RichTextDocument,
    type ValueDeclaration,
} from '#/model';
import { attributesOf, type CompiledMark, compiledModel, type CompiledNode } from '#/model/compile/compile';
import { advanceMatch, type ContentMatch, matchEnds, startMatch } from '#/model/helpers/contentExpression';
import { canonicalJson } from '#/model/helpers/hash';
import { isValidValue } from '#/model/helpers/values';
import { storedIn } from '#/plugins/__tests__/fixtures/documents';

export type JsonNode = { [key: string]: JsonValue };

export type DocumentOptions = {
    /** Whether the nodes and marks of a feature may appear; every feature by default. */
    feature?: (featureId: string) => boolean;
    /** The text of a text node in inline content that takes marks. */
    text?: fc.Arbitrary<string>;
    /** Whether an attribute may hold a value other than its default; every attribute by default. */
    attribute?: Varies;
};

/** Letters, digits, HTML and Markdown specials, space runs, U+00A0, control characters, combining marks, emoji and RTL letters. */
export const TEXT_UNITS = [
    'a',
    'Z',
    '7',
    ' ',
    '  ',
    '\u00A0',
    '<',
    '>',
    '&',
    '"',
    "'",
    '*',
    '\t',
    '\n',
    'e\u0301',
    '😀',
    'ש',
    '\u202E',
];
const anyText = fc.string({ unit: fc.constantFrom(...TEXT_UNITS), minLength: 1, maxLength: 6 });

/** The deepest node, the root at 1, below which content only fills what its expression requires. */
const MAX_DEPTH = 4;
const LANGUAGES = ['en', 'de-CH', 'fr', 'ar', 'he', 'zh-Hant-TW', 'sr-Latn-RS'];
const urlArb = fc
    .oneof(
        fc.webUrl({ validSchemes: ['https', 'http'], withQueryParameters: true, withFragments: true }),
        fc.constantFrom('mailto:team@frontify.com', 'tel:+41441234567', '/brand/guidelines', '#section-2'),
    )
    .filter((url) => checkHref(url).ok);

const idArb = fc.stringMatching(/^[a-z0-9][a-z0-9._:-]{0,11}$/);
const colorArb = fc.stringMatching(/^#[0-9a-f]{6}([0-9a-f]{2})?$/);

const nonNullValueArb = (declaration: ValueDeclaration): fc.Arbitrary<JsonValue> => {
    switch (declaration.type) {
        case 'string': {
            const minLength = declaration.minLength ?? 0;
            const maxLength = Math.max(minLength, Math.min(declaration.maxLength ?? 12, 12));

            return fc.string({ unit: 'grapheme', minLength, maxLength });
        }

        case 'url':
            return urlArb;
        case 'id':
            return idArb;
        case 'color':
            return colorArb;
        case 'language':
            return fc.constantFrom(...LANGUAGES);
        case 'integer': {
            const min = declaration.min ?? -1000;
            const max = declaration.max ?? 1000;

            return fc.integer({ min, max });
        }

        case 'number': {
            const min = declaration.min ?? -1e6;
            const max = declaration.max ?? 1e6;

            return fc.double({ min, max, noNaN: true }).map((value) => {
                if (Object.is(value, -0)) {
                    return 0;
                }

                return value;
            });
        }

        case 'boolean':
            return fc.boolean();
        case 'enum':
            return fc.constantFrom(...declaration.values);
        case 'list':
            return fc.array(valueArb(declaration.items), { maxLength: Math.min(declaration.maxItems ?? 3, 3) });
        case 'json':
            return (fc.jsonValue({ maxDepth: 2 }) as fc.Arbitrary<JsonValue>).filter((value) =>
                isValidValue(declaration, value),
            );
    }
};

const valueArb = (declaration: ValueDeclaration): fc.Arbitrary<JsonValue> => {
    if (declaration.nullable === true) {
        return fc.option(nonNullValueArb(declaration), { nil: null, freq: 3 });
    }

    return nonNullValueArb(declaration);
};

/** Whether attribute `name` of node or mark `owner` may hold a value other than its default. */
type Varies = (owner: string, name: string) => boolean;

/** Every declared attribute, with exactly one of the `exactlyOne` attributes that may vary non-null. */
const attrsArb = (
    owner: string,
    declared: Readonly<Record<string, AttributeDeclaration>>,
    exactlyOne: readonly string[] = [],
    varies: Varies = () => true,
) => {
    const entries = Object.entries(declared);
    const choices = exactlyOne.filter((name) => varies(owner, name));
    const chosenArb = fc.tuple(...choices.map((name) => nonNullValueArb(declared[name] as ValueDeclaration)));
    const valuesArb = entries.map(([name, declaration]) => {
        if (varies(owner, name) || !('default' in declaration)) {
            return valueArb(declaration);
        }

        return fc.constant(declaration.default);
    });

    return fc.tuple(fc.tuple(...valuesArb), chosenArb, fc.nat()).map(([values, chosen, pick]) => {
        const attrs: JsonNode = {};
        for (const [index, [name]] of entries.entries()) {
            attrs[name] = values[index] ?? null;
        }

        if (exactlyOne.length > 0) {
            for (const name of exactlyOne) {
                attrs[name] = null;
            }

            const index = pick % choices.length;
            attrs[choices[index] as string] = chosen[index] ?? null;
        }

        return attrs;
    });
};

const marksKey = (node: JsonNode) => canonicalJson(node.marks ?? null);

/** Unique `nodeId`s in document order and adjacent texts with equal marks joined: the canonical form. */
export const canonicalize = (root: JsonValue): JsonValue => {
    let next = 0;
    const visit = (value: JsonValue): JsonValue => {
        const node = { ...(value as JsonNode) };
        const attrs = node.attrs as JsonNode | undefined;
        if (attrs !== undefined && Object.hasOwn(attrs, 'nodeId')) {
            next += 1;
            node.attrs = { ...attrs, nodeId: `n${next}` };
        }

        if (Array.isArray(node.content)) {
            const joined: JsonNode[] = [];
            for (const child of node.content.map(visit) as JsonNode[]) {
                const previous = joined.at(-1);
                if (previous?.type === 'text' && child.type === 'text' && marksKey(previous) === marksKey(child)) {
                    joined[joined.length - 1] = {
                        ...previous,
                        text: `${previous.text as string}${child.text as string}`,
                    };
                } else {
                    joined.push(child);
                }
            }

            node.content = joined;
        }

        return node;
    };

    return visit(root);
};

/**
 * Canonical stored documents of any shape `model` accepts, declaring every capability it installs: its nodes nested by their content expressions, their declared
 * attributes and the marks their parents take, read from the compiled model alone.
 */
export const modelDocumentArb = (
    model: ContentModel,
    options: DocumentOptions = {},
): fc.Arbitrary<RichTextDocument> => {
    const { nodes, marks } = compiledModel(model);
    const allowed = (featureId: string) => options.feature?.(featureId) ?? true;
    const text = options.text ?? anyText;
    const byName = new Map(nodes.map((node) => [node.name, node]));
    const candidates = nodes.filter((node) => node.name !== 'doc' && allowed(node.featureId));
    const takes = (term: string, node: CompiledNode) => {
        if (byName.has(term)) {
            return term === node.name;
        }

        const { group } = node.declaration;
        if (term === 'section') {
            return group === 'block' || group === 'section';
        }

        return term === group;
    };

    const advance = (match: ContentMatch, node: CompiledNode) => advanceMatch(match, (term) => takes(term, node));
    const advancing = (match: ContentMatch) => candidates.filter((node) => advance(match, node).states.length > 0);

    // The fewest levels below each node that a minimal filling of its content needs, so generation always ends.
    const height = new Map<string, number>();
    const fill = (match: ContentMatch, names: string[]): string[] | undefined => {
        let current = match;
        while (!matchEnds(current)) {
            const known = advancing(current).filter((node) => height.has(node.name));
            const lowest = known.sort((a, b) => (height.get(a.name) ?? 0) - (height.get(b.name) ?? 0))[0];
            if (lowest === undefined || names.length > 8) {
                return undefined;
            }

            names.push(lowest.name);
            current = advance(current, lowest);
        }

        return names;
    };

    for (let round = 0; round <= candidates.length; round += 1) {
        for (const node of candidates) {
            if (node.declaration.content === undefined) {
                height.set(node.name, 0);
            }

            if (height.has(node.name)) {
                continue;
            }

            const filled = fill(startMatch(node.declaration.content), []);
            if (filled !== undefined) {
                height.set(node.name, 1 + Math.max(-1, ...filled.map((name) => height.get(name) ?? 0)));
            }
        }
    }

    /** Child names from a tape of choices: each picks a child the expression takes next, or stops where it may end. */
    const sequence = (expression: string | undefined, tape: readonly number[]) => {
        let match = startMatch(expression);
        const names: string[] = [];
        for (const choice of tape) {
            const choices: (CompiledNode | undefined)[] = advancing(match).filter((node) => height.has(node.name));
            if (matchEnds(match)) {
                choices.unshift(undefined);
            }

            const picked = choices[choice % choices.length];
            if (picked === undefined) {
                break;
            }

            names.push(picked.name);
            match = advance(match, picked);
        }

        return fill(match, names) ?? names;
    };

    const conflicts = (a: CompiledMark, b: CompiledMark) =>
        (a.declaration.excludes ?? []).includes(b.name) || (b.declaration.excludes ?? []).includes(a.name);
    const marksArb = (parent: CompiledNode): fc.Arbitrary<JsonValue[]> =>
        once(`marks ${parent.name}`, () => buildMarks(parent));
    const buildMarks = (parent: CompiledNode): fc.Arbitrary<JsonValue[]> => {
        const listed = parent.declaration.marks;
        const takenMarks = marks.filter(
            (mark) => allowed(mark.featureId) && (listed === undefined || listed.includes(mark.name)),
        );

        return fc
            .tuple(
                ...takenMarks.map((mark) =>
                    fc.option(
                        attrsArb(mark.name, mark.declaration.attrs, mark.declaration.exactlyOne, options.attribute).map(
                            (attrs) => ({ mark, attrs }),
                        ),
                        { nil: undefined, freq: 2 },
                    ),
                ),
            )
            .map((chosen) => {
                const kept: { mark: CompiledMark; attrs: JsonNode }[] = [];
                for (const entry of chosen) {
                    if (entry !== undefined && !kept.some(({ mark }) => conflicts(mark, entry.mark))) {
                        kept.push(entry);
                    }
                }

                return kept.map(({ mark, attrs }) => {
                    if (Object.keys(mark.declaration.attrs).length === 0) {
                        return { type: mark.name };
                    }

                    return { type: mark.name, attrs };
                });
            });
    };

    const withParts = (node: JsonNode, key: 'content' | 'marks', parts: readonly JsonValue[]): JsonNode => {
        if (parts.length === 0) {
            return node;
        }

        return { ...node, [key]: [...parts] };
    };

    // Arbitraries are built once per place, since building them costs more than drawing from them.
    const built = new Map<string, fc.Arbitrary<JsonValue[]> | fc.Arbitrary<JsonValue>>();
    const once = <A extends fc.Arbitrary<JsonValue[]> | fc.Arbitrary<JsonValue>>(key: string, build: () => A): A => {
        const cached = built.get(key);
        if (cached !== undefined) {
            return cached as A;
        }

        const arbitrary = build();
        built.set(key, arbitrary);

        return arbitrary;
    };

    const nodeArb = (node: CompiledNode, parent: CompiledNode, depth: number): fc.Arbitrary<JsonValue> =>
        once(`node ${node.name} ${parent.name} ${depth}`, () => buildNode(node, parent, depth));
    const buildNode = (node: CompiledNode, parent: CompiledNode, depth: number): fc.Arbitrary<JsonValue> => {
        const parentAllowsMarks = parent.declaration.marks?.length !== 0;
        const nodeAllowsMarks = node.declaration.marks?.length !== 0;
        const takesMarks = parentAllowsMarks && nodeAllowsMarks;
        if (node.name === 'text') {
            if (!takesMarks) {
                return anyText.map((value) => ({ type: 'text', text: value }));
            }

            return fc
                .tuple(text, marksArb(parent))
                .map(([value, nodeMarks]) => withParts({ type: 'text', text: value }, 'marks', nodeMarks));
        }

        const declared = attributesOf(node);
        const attrs = attrsArb(node.name, declared, node.declaration.exactlyOne, options.attribute);
        let nodeMarks: fc.Arbitrary<JsonValue[]> = fc.constant([]);
        if (node.declaration.group === 'inline' && takesMarks) {
            nodeMarks = marksArb(parent);
        }

        return fc.tuple(attrs, nodeMarks, childrenArb(node, depth)).map(([values, own, content]) => {
            let json: JsonNode = { type: node.name };
            if (Object.keys(declared).length > 0) {
                json.attrs = values;
            }

            json = withParts(json, 'marks', own);

            return withParts(json, 'content', content);
        });
    };

    const childrenArb = (node: CompiledNode, depth: number): fc.Arbitrary<JsonValue[]> =>
        once(`children ${node.name} ${depth}`, () => buildChildren(node, depth));
    const buildChildren = (node: CompiledNode, depth: number): fc.Arbitrary<JsonValue[]> => {
        if (node.declaration.content === undefined) {
            return fc.constant([]);
        }

        let maxLength = 4;
        if (depth >= MAX_DEPTH) {
            maxLength = 0;
        }

        return fc.array(fc.nat({ max: 9999 }), { maxLength }).chain((tape) => {
            const names = sequence(node.declaration.content, tape);

            return fc.tuple(...names.map((name) => nodeArb(byName.get(name) as CompiledNode, node, depth + 1)));
        });
    };

    const doc = byName.get('doc') as CompiledNode;

    return fc
        .tuple(attrsArb('doc', attributesOf(doc), doc.declaration.exactlyOne, options.attribute), childrenArb(doc, 1))
        .map(([attrs, content]) => {
            const root = canonicalize({ type: 'doc', attrs, content });

            return { ...storedIn(model, []), content: root as unknown as ContentNodeJSON };
        });
};
