/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import fc from 'fast-check';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

import { createCodecs } from '#/codecs';
import { buildSchema } from '#/definition/schema';
import { featuresById } from '#/features';
import { storedIn } from '#/features/__tests__/fixtures/documents';
import { documentArb, fcSettings, nodeIdsIn, nodesIn, seeded } from '#/features/__tests__/fixtures/generated';
import { registry } from '#/features/registry';
import { fromHTML } from '#/html';
import { compileContentModel, type ContentModel, type ContentNodeJSON, type RichTextDocument } from '#/model';
import { compiledModel, type TreeNode, decodeToTree } from '#/model/internal';
import { PROFILE_MODELS } from '#/react/examples/records';

const ADDRESSED = ['heading', 'task_item', 'mention', 'figure', 'asset_image', 'embed', 'table'];
const { window } = new JSDOM('');

/** The addressed node types whose feature declares `format` lossless in `model`. */
const losslessAddressed = (model: ContentModel, format: 'html' | 'markdown'): string[] =>
    compiledModel(model).features.flatMap(({ declaration }) => {
        if (declaration.formats?.[format] !== 'lossless') {
            return [];
        }

        return Object.keys(declaration.nodes ?? {}).filter((name) => ADDRESSED.includes(name));
    });

/** How many nodes of each of `types` `node` holds. */
const countsOf = (node: ContentNodeJSON, types: readonly string[]) =>
    types.map((type) => [type, nodesIn(node).filter((child) => child.type === type).length]);

/** A `generateId` that counts, so a test tells its IDs from any other. */
const counter = () => {
    let next = 0;

    return () => {
        next += 1;

        return `g${next}`;
    };
};

/** The nodes of `node` outside islands, which keep the stored content as it was read. */
const keptNodes = (node: TreeNode): TreeNode[] => {
    if (node.type === 'unsupported_block' || node.type === 'unsupported_inline') {
        return [];
    }

    return [node, ...(node.content ?? []).flatMap((child) => keptNodes(child))];
};

const addressedIn = (nodes: readonly (TreeNode | ContentNodeJSON)[]) =>
    nodes.filter(({ type }) => ADDRESSED.includes(type));

/** `document` with every `nodeId` drawn from `ids` in turn, so some repeat, and left out where the entry is null. */
const withIds = (document: RichTextDocument, ids: readonly (string | null)[]): RichTextDocument => {
    let next = 0;
    const visit = (node: ContentNodeJSON): ContentNodeJSON => {
        const copy: Record<string, unknown> = { ...node };
        if (node.attrs !== undefined && Object.hasOwn(node.attrs, 'nodeId')) {
            const { nodeId: _left, ...rest } = node.attrs;
            const id = ids[next % ids.length] ?? null;
            copy.attrs = rest;
            if (id !== null) {
                copy.attrs = { ...rest, nodeId: id };
            }

            next += 1;
        }

        if (node.content !== undefined) {
            copy.content = node.content.map(visit);
        }

        return copy as unknown as ContentNodeJSON;
    };

    return { ...document, content: visit(document.content) } as RichTextDocument;
};

describe('the nodes that carry a nodeId', () => {
    it('are heading, task_item, mention, figure, asset_image, embed and table, of every shipped feature', () => {
        const model = compileContentModel(featuresById(Object.keys(registry)), { id: 'node-ids', version: 1 });
        const { nodes } = buildSchema(model);
        const carrying = Object.values(nodes).filter(({ spec }) => Object.hasOwn(spec.attrs ?? {}, 'nodeId'));

        expect(carrying.map(({ name }) => name).filter((name) => !ADDRESSED.includes(name))).toEqual([]);
        expect(carrying.map(({ name }) => name).sort()).toEqual(
            ADDRESSED.filter((name) => nodes[name] !== undefined).sort(),
        );
    });

    it('decodes a nodeId on a paragraph into unknownAttributes with a warning, never as an occurrence ID', () => {
        const model = PROFILE_MODELS.document;
        const heading = { type: 'heading', attrs: { nodeId: 'p1', level: 2 }, content: [{ type: 'text', text: 'H' }] };
        const paragraph = { type: 'paragraph', attrs: { nodeId: 'p1' }, content: [{ type: 'text', text: 'P' }] };
        const { result, tree } = decodeToTree(storedIn(model, [paragraph, heading] as ContentNodeJSON[]), model);

        expect(result.diagnostics.map(({ code, severity, path }) => [code, severity, path])).toEqual([
            ['format.unknown-attribute', 'warning', '/content/content/0/attrs/nodeId'],
        ]);
        const children = tree?.content;
        const first = children?.[0];
        const second = children?.[1];
        const firstAttrs = first?.attrs;
        const secondAttrs = second?.attrs;
        expect(firstAttrs).toMatchObject({ unknownAttributes: { nodeId: 'p1' } });
        expect(Object.hasOwn(firstAttrs ?? {}, 'nodeId')).toBe(false);
        expect(secondAttrs).toMatchObject({ nodeId: 'p1' });
    });
});

describe(seeded('nodeIds of generated documents'), () => {
    it.each(Object.entries(PROFILE_MODELS))(
        'keeps one nodeId per addressed %s node on decode, and reports each repeated and each missing one',
        (_name, model) => {
            fc.assert(
                fc.property(
                    documentArb(model),
                    fc.array(fc.constantFrom('a', 'b', 'c', null), { minLength: 1, maxLength: 4 }),
                    (generated, ids) => {
                        const stored = withIds(generated, ids);
                        const { result, tree } = decodeToTree(stored, model);
                        if (tree === undefined) {
                            throw new Error('The document does not decode.');
                        }

                        const kept = addressedIn(keptNodes(tree)).map(({ attrs }) => attrs?.nodeId);
                        const repeated = nodeIdsIn(stored.content).length - new Set(nodeIdsIn(stored.content)).size;
                        const missing = nodeIdsIn(generated.content).length - nodeIdsIn(stored.content).length;
                        const warned = result.diagnostics.filter(
                            ({ code }) => code === 'format.duplicate-occurrence-id',
                        );
                        const invalid = result.diagnostics.filter(
                            ({ code, path }) =>
                                code === 'format.invalid-attribute' && path?.endsWith('/attrs/nodeId') === true,
                        );

                        expect(addressedIn(keptNodes(tree)).length).toBe(kept.length);
                        expect(kept.every((id) => typeof id === 'string' && id.length > 0)).toBe(true);
                        expect(new Set(kept).size).toBe(kept.length);
                        expect(invalid.length > 0).toBe(missing > 0);
                        // A node without its nodeId becomes an island, whose content the repeat check never reaches.
                        if (missing === 0) {
                            expect(warned.length > 0).toBe(repeated > 0);
                        }
                    },
                ),
                fcSettings(100),
            );
        },
    );

    it.each(Object.entries(PROFILE_MODELS))(
        'creates the nodeId of each addressed %s node from generateId in fromHTML and fromMarkdown',
        (_name, model) => {
            fc.assert(
                fc.property(documentArb(model), (generated) => {
                    const codecs = createCodecs(model, { generateId: counter() });
                    const imported = [
                        {
                            format: 'html' as const,
                            result: fromHTML(codecs.toHTML(generated).html, model, {
                                window: window as unknown as Window,
                                generateId: counter(),
                            }),
                        },
                        {
                            format: 'markdown' as const,
                            result: codecs.fromMarkdown(codecs.toMarkdown(generated).markdown),
                        },
                    ];
                    for (const { format, result } of imported) {
                        if (result.status !== 'editable') {
                            throw new Error('The output does not import.');
                        }

                        const ids = addressedIn(nodesIn(result.document.content)).map(({ attrs }) => attrs?.nodeId);
                        const kept = losslessAddressed(model, format);

                        expect(countsOf(result.document.content, kept)).toEqual(countsOf(generated.content, kept));
                        expect(ids).toEqual(ids.map((_id, index) => `g${index + 1}`));
                    }
                }),
                fcSettings(50),
            );
        },
    );
});
