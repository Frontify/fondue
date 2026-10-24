/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { commentModel } from '#/features';
import { diffReferences, type RichTextDocument } from '#/model';

const mention = (nodeId: string, resourceId: string) => ({
    type: 'mention',
    attrs: { nodeId, resourceType: 'user', resourceId, labelSnapshot: resourceId },
});
const words = (value: string) => ({ type: 'text', text: value });
const paragraph = (...content: readonly unknown[]) => ({ type: 'paragraph', attrs: { lang: null }, content });
const stored = (...blocks: readonly unknown[]) =>
    ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: { id: 'test.mentions', version: 1 },
        requiredCapabilities: [{ id: 'core', version: 1 }],
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
    }) as unknown as RichTextDocument;

const original = stored(
    paragraph(words('Ask '), mention('m-1', 'ada')),
    paragraph(words('and '), mention('m-2', 'grace')),
);

describe('diffReferences', () => {
    it('reports nothing for a mention moved to another block, since it keeps its nodeId', () => {
        const moved = stored(
            paragraph(words('Ask ')),
            paragraph(mention('m-1', 'ada'), words('and '), mention('m-2', 'grace')),
        );

        expect(diffReferences(original, moved, commentModel)).toEqual({ added: [], removed: [] });
    });

    it('reports a pasted copy as added under its new nodeId', () => {
        const copied = stored(
            paragraph(words('Ask '), mention('m-1', 'ada'), mention('m-3', 'ada')),
            paragraph(words('and '), mention('m-2', 'grace')),
        );

        expect(diffReferences(original, copied, commentModel)).toEqual({
            added: [{ nodeId: 'm-3', resourceType: 'user', resourceId: 'ada' }],
            removed: [],
        });
    });

    it('reports a deleted mention as removed, and the same mention restored by undo as added back', () => {
        const deleted = stored(paragraph(words('Ask ')), paragraph(words('and '), mention('m-2', 'grace')));

        expect(diffReferences(original, deleted, commentModel)).toEqual({
            added: [],
            removed: [{ nodeId: 'm-1', resourceType: 'user', resourceId: 'ada' }],
        });
        expect(diffReferences(deleted, original, commentModel)).toEqual({
            added: [{ nodeId: 'm-1', resourceType: 'user', resourceId: 'ada' }],
            removed: [],
        });
    });

    it('reports a nodeId that names another resource as removed and added', () => {
        const changed = stored(
            paragraph(words('Ask '), mention('m-1', 'lin')),
            paragraph(words('and '), mention('m-2', 'grace')),
        );

        expect(diffReferences(original, changed, commentModel)).toEqual({
            added: [{ nodeId: 'm-1', resourceType: 'user', resourceId: 'lin' }],
            removed: [{ nodeId: 'm-1', resourceType: 'user', resourceId: 'ada' }],
        });
    });

    it('reads a document nested deeper than the call stack and skips content that is no mention', () => {
        let deep: unknown = mention('m-9', 'deep');
        for (let level = 0; level < 20_000; level += 1) {
            deep = { type: 'blockquote', content: [deep] };
        }
        const hostile = stored(deep, { type: 'mention', attrs: { nodeId: 7 } }, 'text', null);

        expect(diffReferences(stored(), hostile, commentModel)).toEqual({
            added: [{ nodeId: 'm-9', resourceType: 'user', resourceId: 'deep' }],
            removed: [],
        });
    });
});
