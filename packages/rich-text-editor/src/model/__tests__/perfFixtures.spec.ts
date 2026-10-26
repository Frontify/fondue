/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { featuresById } from '#/features';
import { brandDocumentModel } from '#/features/profiles/brandDocument';
import { compileContentModel, type ContentNodeJSON, decodeDocument } from '#/model';

import {
    manyDocuments,
    PERF_FEATURES,
    perfBlocks,
    perfDocument,
    type PerfFixtureName,
    perfModel,
} from './fixtures/perf/documents';

const model = compileContentModel(featuresById(PERF_FEATURES), { id: 'test.perf', version: 1 });
const segmenter = new Intl.Segmenter();

type Counts = {
    blocks: number;
    nodes: number;
    graphemes: number;
    words: number;
    mentions: number;
    links: number;
};

const countsOf = (blocks: readonly ContentNodeJSON[]): Counts => {
    const counts = { blocks: blocks.length, nodes: 0, graphemes: 0, words: 0, mentions: 0, links: 0 };
    const visit = (node: ContentNodeJSON) => {
        counts.nodes += 1;
        if (node.type === 'mention') {
            counts.mentions += 1;
        }

        if (node.type === 'text') {
            const { text } = node as unknown as { text: string };
            counts.graphemes += [...segmenter.segment(text)].length;
            counts.words += text.split(/\s+/).filter((word) => word !== '').length;
            const marks = (node as { marks?: readonly { type: string }[] }).marks ?? [];
            if (marks.some(({ type }) => type === 'link')) {
                counts.links += 1;
            }
        }

        for (const child of node.content ?? []) {
            visit(child);
        }
    };

    for (const block of blocks) {
        visit(block);
    }

    return counts;
};

describe('the perf fixtures', () => {
    it('hold the Comment small document: 2,000 graphemes in 20 blocks with marks, links and 5 mentions', () => {
        const counts = countsOf(perfBlocks('small'));

        expect(counts).toMatchObject({ blocks: 20, graphemes: 2000, mentions: 5 });
        expect(counts.links).toBeGreaterThan(0);
    });

    it('hold the typical document: 20,000 graphemes in 200 blocks and 2,000 nodes', () => {
        expect(countsOf(perfBlocks('typical'))).toMatchObject({ blocks: 200, graphemes: 20_000, nodes: 2000 });
    });

    it('hold the large document: 100,000 graphemes in 1,500 blocks and 20,000 nodes', () => {
        expect(countsOf(perfBlocks('large'))).toMatchObject({ blocks: 1500, graphemes: 100_000, nodes: 20_000 });
    });

    it('hold the words10k document: 10,000 words in paragraphs, lists and marks', () => {
        const blocks = perfBlocks('words10k');
        const types = new Set(blocks.map(({ type }) => type));

        expect(countsOf(blocks).words).toBe(10_000);
        expect([...types].sort()).toEqual(['bullet_list', 'paragraph']);
        expect(JSON.stringify(blocks)).toContain('"bold"');
    });

    it('hold 20 editors of the small document in the many fixture', () => {
        const documents = manyDocuments(model);

        expect(documents).toHaveLength(20);
        for (const document of documents) {
            expect(countsOf(document.content.content ?? [])).toMatchObject({ blocks: 20, graphemes: 2000 });
        }
    });

    it('carry brand styles, an image and every list kind in the large document', () => {
        const json = JSON.stringify(perfBlocks('large'));

        for (const part of ['"brand.lead"', '"asset_image"', '"bullet_list"', '"ordered_list"', '"task_list"']) {
            expect(json).toContain(part);
        }
    });

    it.each(['small', 'typical', 'large', 'words10k'] as const satisfies readonly PerfFixtureName[])(
        'decode the %s document as editable',
        (name) => {
            const result = decodeDocument(perfDocument(name, model), model);

            expect(result.status).toBe('editable');
            expect(result.diagnostics).toEqual([]);
        },
    );

    it('decode in the Brand document profile, the only shipped profile with brand styles, which the budgets run on', () => {
        expect(perfModel).toBe(brandDocumentModel);
        for (const name of ['small', 'typical', 'large', 'words10k'] as const) {
            const result = decodeDocument(perfDocument(name, perfModel), perfModel);

            expect(result.status, name).toBe('editable');
            expect(result.diagnostics, name).toEqual([]);
        }
    });

    it('repeat the same blocks on every build, so runs compare like with like', () => {
        expect(JSON.stringify(perfBlocks('typical'))).toBe(JSON.stringify(perfBlocks('typical')));
    });
});
