/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type BlockDefinition, type RteContent } from '#/core';

import { defaultContent } from './defaultContent';

import { defaultPlugins } from './index';

const declared = (content: RteContent) => [
    ...Object.entries(content.marks ?? {}).map(([type, definition]) => ({ kind: 'mark', type, definition })),
    ...Object.entries(content.blocks ?? {}).map(([type, definition]) => ({ kind: 'block', type, definition })),
    ...Object.entries(content.inlines ?? {}).map(([type, definition]) => ({ kind: 'inline', type, definition })),
    ...Object.entries(content.blockAttributes ?? {}).map(([type, definition]) => ({
        kind: 'blockAttribute',
        type,
        definition,
    })),
];

describe('the default content', () => {
    it('holds the content of every default plugin but the emoji draft, in the same order', () => {
        const fromPlugins = defaultPlugins
            .filter((plugin) => plugin.id !== 'emoji')
            .map((plugin) => plugin.content)
            .filter((content): content is RteContent => content !== undefined);

        expect(defaultContent).toHaveLength(fromPlugins.length);
        for (const [index, content] of defaultContent.entries()) {
            const expected = declared(fromPlugins[index] ?? {});
            const actual = declared(content);
            expect(actual.map(({ kind, type }) => `${kind}:${type}`)).toEqual(
                expected.map(({ kind, type }) => `${kind}:${type}`),
            );
            // The text style is built from options, so each call makes a new definition of the same block.
            if (actual[0]?.type === 'textStyle') {
                const toHtml = (definition: unknown) => (definition as BlockDefinition).toHtml({ style: 'heading1' });
                expect(toHtml(actual[0].definition)).toEqual(toHtml(expected[0]?.definition));
                continue;
            }
            for (const [position, { definition }] of actual.entries()) {
                expect(definition).toBe(expected[position]?.definition);
            }
        }
    });
});
