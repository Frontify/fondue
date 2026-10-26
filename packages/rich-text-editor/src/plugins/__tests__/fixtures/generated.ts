/* (c) Copyright Frontify Ltd., all rights reserved. */

import fc from 'fast-check';

import { type ContentModel, type ContentNodeJSON, type JsonValue, type RichTextDocument } from '#/model';
import { decodeToTree, encodeTree } from '#/model/internal';
import { storedIn } from '#/plugins/__tests__/fixtures/documents';
import { buildSchema } from '#/runtime/definition/schema';
import { featureFixtures } from '#/testing/conformance/fixtures';

// The browser of a component test has no `process`.
const environment = (globalThis as { process?: { env: Readonly<Record<string, string | undefined>> } }).process?.env;
const givenSeed = environment?.FC_SEED;
const seed = Number(givenSeed ?? Math.floor(Math.random() * 2 ** 31));
/** The fast-check settings of the generated document tests; a run replays with `FC_SEED`. */
export const fcSettings = (numRuns: number) => ({ seed, numRuns });
/** Prints the seed in a suite title, so a failing run names how to replay it. */
export const seeded = (title: string) => `${title} (fast-check seed ${seed})`;

/** The document as decode and encode write it, or `undefined` when decode reports anything. */
export const canonicalOf = (model: ContentModel, document: unknown): RichTextDocument | undefined => {
    const { result, tree } = decodeToTree(document, model);
    if (tree === undefined || result.diagnostics.length > 0) {
        return undefined;
    }

    const stored = (document as RichTextDocument).requiredCapabilities;

    return encodeTree(tree, model, stored).document;
};

/** `node` without the attributes that another feature adds and `model` does not install, such as `styleId`. */
const withoutUndeclared = (node: ContentNodeJSON, declared: (type: string) => object): ContentNodeJSON => {
    const copy: Record<string, unknown> = { ...node };
    if (node.attrs !== undefined) {
        const own = declared(node.type);
        copy.attrs = Object.fromEntries(Object.entries(node.attrs).filter(([name]) => Object.hasOwn(own, name)));
    }

    if (node.content !== undefined) {
        copy.content = node.content.map((child) => withoutUndeclared(child, declared));
    }

    return copy as unknown as ContentNodeJSON;
};

const blockCache = new Map<ContentModel, readonly ContentNodeJSON[]>();

/**
 * The top-level blocks of the shipped feature fixtures, without attributes `model` does not install, that it holds with
 * no diagnostic, in canonical form.
 */
export const blocksOf = (model: ContentModel): readonly ContentNodeJSON[] => {
    const cached = blockCache.get(model);
    if (cached !== undefined) {
        return cached;
    }

    const schema = buildSchema(model);
    const declared = (type: string) => schema.nodes[type]?.spec.attrs ?? {};
    const blocks: ContentNodeJSON[] = [];
    for (const fixtures of Object.values(featureFixtures)) {
        for (const fixture of Object.values(fixtures)) {
            for (const block of fixture.content.content ?? []) {
                const canonical = canonicalOf(model, storedIn(model, [withoutUndeclared(block, declared)]));
                const canonicalBlocks = canonical?.content.content;
                const written = canonicalBlocks?.[0];
                if (written !== undefined) {
                    blocks.push(written);
                }
            }
        }
    }

    blockCache.set(model, blocks);

    return blocks;
};

/** How many text nodes `node` holds. */
const textCount = (node: ContentNodeJSON): number => {
    if (node.type === 'text') {
        return 1;
    }

    return (node.content ?? []).reduce((sum, child) => sum + textCount(child), 0);
};

/** `blocks` with each text replaced by the next of `texts`, and each `nodeId` numbered in document order. */
const rewritten = (blocks: readonly ContentNodeJSON[], texts: readonly string[]): ContentNodeJSON[] => {
    let nextText = 0;
    let nextId = 0;
    const visit = (node: ContentNodeJSON): ContentNodeJSON => {
        const copy: Record<string, unknown> = { ...node };
        if (node.type === 'text') {
            copy.text = texts[nextText] ?? 'x';
            nextText += 1;
        }

        if (node.attrs !== undefined && Object.hasOwn(node.attrs, 'nodeId')) {
            nextId += 1;
            copy.attrs = { ...node.attrs, nodeId: `n${nextId}` };
        }

        if (node.content !== undefined) {
            copy.content = node.content.map(visit);
        }

        return copy as unknown as ContentNodeJSON;
    };

    return blocks.map(visit);
};

/** Text that no codec or paste rewrites: words of letters and digits with single spaces between them. */
export const plainTextArb = fc
    .array(fc.stringMatching(/^[A-Za-z0-9]{1,6}$/), { minLength: 1, maxLength: 3 })
    .map((words) => words.join(' '));

/** Text with the characters HTML escapes and with leading, trailing and double spaces, which HTML collapses. */
export const markupTextArb = fc
    .tuple(
        fc.constantFrom('', ' ', '  '),
        fc.array(fc.stringMatching(/^[A-Za-z0-9&<>"']{1,6}$/), { minLength: 1, maxLength: 3 }),
        fc.constantFrom(' ', '  '),
        fc.constantFrom('', ' ', '  '),
    )
    .map(([leading, words, space, trailing]) => `${leading}${words.join(space)}${trailing}`);

/** Any non-empty text, as a user may type or paste it. */
export const anyTextArb = fc.string({ minLength: 1, maxLength: 6, unit: 'grapheme' });

/**
 * Canonical documents of `model`: one to five blocks drawn from the shipped fixtures it holds, with new text and
 * unique `nodeId`s; `filter` keeps only the blocks it accepts.
 */
export const documentArb = (
    model: ContentModel,
    textArb: fc.Arbitrary<string> = anyTextArb,
    filter: (block: ContentNodeJSON) => boolean = () => true,
): fc.Arbitrary<RichTextDocument> => {
    const blocks = blocksOf(model).filter(filter);

    return fc.array(fc.constantFrom(...blocks), { minLength: 1, maxLength: 5 }).chain((chosen) => {
        const count = chosen.reduce((sum, block) => sum + textCount(block), 0);

        return fc
            .array(textArb, { minLength: count, maxLength: count })
            .map((texts) => storedIn(model, rewritten(chosen, texts)));
    });
};

/** `node` and every node inside it, in document order. */
export const nodesIn = (node: ContentNodeJSON): ContentNodeJSON[] => [
    node,
    ...(node.content ?? []).flatMap((child) => nodesIn(child)),
];

/** The `nodeId` values of the nodes of `node`, in document order. */
export const nodeIdsIn = (node: ContentNodeJSON): JsonValue[] =>
    nodesIn(node).flatMap(({ attrs }) => {
        if (attrs === undefined || !Object.hasOwn(attrs, 'nodeId')) {
            return [];
        }

        return [attrs.nodeId as JsonValue];
    });
