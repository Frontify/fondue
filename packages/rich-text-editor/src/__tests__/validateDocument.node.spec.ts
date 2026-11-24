/* (c) Copyright Frontify Ltd., all rights reserved. */

// A migration script validates stored rows on a server, so this runs without a browser.
// @vitest-environment node

import { fileURLToPath } from 'node:url';

import { build } from 'esbuild';
import { assert, describe, expect, it } from 'vitest';

import { validateDocument } from '../index';

const PACKAGE_ROOT = fileURLToPath(new URL('../..', import.meta.url));
const VALIDATE_ENTRY = `export { validateDocument } from './src/index.ts';`;
const VALIDATE_CODE = /^src\/(index|core\/(validateDocument|vocabulary|plugin))\.ts$/;
const PROSEMIRROR = 'prosemirror';

const bundleInputs = async (exportLine: string): Promise<string[]> => {
    const result = await build({
        stdin: {
            contents: exportLine,
            resolveDir: PACKAGE_ROOT,
            sourcefile: 'entry.ts',
        },
        absWorkingDir: PACKAGE_ROOT,
        bundle: true,
        minify: true,
        format: 'esm',
        platform: 'node',
        write: false,
        metafile: true,
        logLevel: 'silent',
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        loader: { '.scss': 'empty', '.css': 'empty' },
        tsconfig: fileURLToPath(new URL('../../tsconfig.json', import.meta.url)),
    });

    const [output] = Object.values(result.metafile.outputs);
    const shipped = Object.entries(output?.inputs ?? {}).filter(([, input]) => input.bytesInOutput > 0);
    return shipped.map(([path]) => path);
};

describe('validateDocument, a valid document', () => {
    it('accepts every kind the shipped plugins write', () => {
        const document = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'plain' },
                        { text: 'bold link', bold: true, link: { href: 'https://example.com' } },
                        { text: 'colored', textStyle: { color: 'red' } },
                        { type: 'mention', id: 'user-1' },
                    ],
                },
                {
                    type: 'bulletList',
                    children: [
                        { type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'one' }] }] },
                        {
                            type: 'bulletList',
                            children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [] }] }],
                        },
                    ],
                },
                { type: 'columnBreak' },
                {
                    type: 'table',
                    children: [
                        {
                            type: 'tableRow',
                            children: [
                                { type: 'tableCell', children: [{ type: 'paragraph', children: [{ text: 'a' }] }] },
                            ],
                        },
                    ],
                },
            ],
        };

        expect(validateDocument(document)).toEqual({ valid: true, document });
    });

    it('accepts a block, an inline and a mark of a type no plugin defines', () => {
        const document = {
            version: 1,
            blocks: [
                {
                    type: 'callout',
                    children: [
                        { text: 'x', sparkle: true },
                        { type: 'emoji', name: 'smile' },
                    ],
                },
            ],
        };

        expect(validateDocument(document).valid).toBe(true);
    });

    it('accepts undeclared keys on the document, a block, a text node and an inline', () => {
        const document = {
            version: 1,
            extra: 1,
            blocks: [
                {
                    type: 'paragraph',
                    extra: 2,
                    children: [
                        { text: 'a', extra: 3 },
                        { type: 'mention', extra: 4 },
                    ],
                },
            ],
        };

        expect(validateDocument(document).valid).toBe(true);
    });

    it('accepts a document with no blocks', () => {
        expect(validateDocument({ version: 1, blocks: [] }).valid).toBe(true);
    });

    it('accepts a block with an empty children array', () => {
        expect(validateDocument({ version: 1, blocks: [{ type: 'paragraph', children: [] }] }).valid).toBe(true);
    });

    it('returns the value it was given as the document', () => {
        const value = { version: 1, blocks: [] };

        const result = validateDocument(value);

        assert(result.valid);
        expect(result.document).toBe(value);
    });
});

describe('validateDocument, an invalid document', () => {
    it.each([null, undefined, 'x', 42, [], true])('reports a root of %j as not an object', (value) => {
        expect(validateDocument(value)).toEqual({ valid: false, issues: [{ reason: 'not-an-object', path: '' }] });
    });

    it.each([
        ['missing', { blocks: [] }],
        ['the string "1"', { version: '1', blocks: [] }],
        ['2', { version: 2, blocks: [] }],
    ])('reports a version that is %s as unsupported', (_name, value) => {
        expect(validateDocument(value)).toEqual({
            valid: false,
            issues: [{ reason: 'unsupported-version', path: '/version' }],
        });
    });

    it.each([
        ['missing', { version: 1 }],
        ['a string', { version: 1, blocks: 'x' }],
        ['an object', { version: 1, blocks: {} }],
    ])('reports blocks that are %s as not an array', (_name, value) => {
        expect(validateDocument(value)).toEqual({
            valid: false,
            issues: [{ reason: 'not-an-array', path: '/blocks' }],
        });
    });

    it('reports a block that is a string as not an object', () => {
        expect(validateDocument({ version: 1, blocks: ['x'] })).toEqual({
            valid: false,
            issues: [{ reason: 'not-an-object', path: '/blocks/0' }],
        });
    });

    it('reports a block without a type', () => {
        expect(validateDocument({ version: 1, blocks: [{ children: [] }] })).toEqual({
            valid: false,
            issues: [{ reason: 'missing-type', path: '/blocks/0' }],
        });
    });

    it('reports children that are a string as not an array', () => {
        expect(validateDocument({ version: 1, blocks: [{ type: 'paragraph', children: 'x' }] })).toEqual({
            valid: false,
            issues: [{ reason: 'not-an-array', path: '/blocks/0/children' }],
        });
    });

    it('reports a text node whose text is not a string', () => {
        expect(validateDocument({ version: 1, blocks: [{ type: 'paragraph', children: [{ text: 5 }] }] })).toEqual({
            valid: false,
            issues: [{ reason: 'malformed-text', path: '/blocks/0/children/0' }],
        });
    });

    it('reports a node with both text and a type as malformed text', () => {
        const document = { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'a', type: 'mention' }] }] };

        expect(validateDocument(document)).toEqual({
            valid: false,
            issues: [{ reason: 'malformed-text', path: '/blocks/0/children/0' }],
        });
    });

    it('reports an inline element without a type next to a text node', () => {
        const document = { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'a' }, {}] }] };

        expect(validateDocument(document)).toEqual({
            valid: false,
            issues: [{ reason: 'missing-type', path: '/blocks/0/children/1' }],
        });
    });

    it('reports a member of an inline array that is not an object', () => {
        const document = { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'a' }, 'x'] }] };

        expect(validateDocument(document)).toEqual({
            valid: false,
            issues: [{ reason: 'not-an-object', path: '/blocks/0/children/1' }],
        });
    });

    it('reports the path of a block nested several levels deep', () => {
        const document = {
            version: 1,
            blocks: [
                {
                    type: 'bulletList',
                    children: [
                        {
                            type: 'listItem',
                            children: [
                                { type: 'paragraph', children: [{ text: 'ok' }] },
                                {
                                    type: 'bulletList',
                                    children: [{ type: 'listItem' }, { children: [] }],
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        expect(validateDocument(document)).toEqual({
            valid: false,
            issues: [{ reason: 'missing-type', path: '/blocks/0/children/0/children/1/children/1' }],
        });
    });

    it('collects every issue in document order', () => {
        const document = { version: 2, blocks: ['x', { children: [] }, { type: 'paragraph', children: 'y' }] };

        expect(validateDocument(document)).toEqual({
            valid: false,
            issues: [
                { reason: 'unsupported-version', path: '/version' },
                { reason: 'not-an-object', path: '/blocks/0' },
                { reason: 'missing-type', path: '/blocks/1' },
                { reason: 'not-an-array', path: '/blocks/2/children' },
            ],
        });
    });
});

describe('validateDocument, as shipped', () => {
    it('bundles from document code only, with no ProseMirror', { timeout: 30_000 }, async () => {
        const inputs = await bundleInputs(VALIDATE_ENTRY);

        expect(inputs.filter((path) => !VALIDATE_CODE.test(path))).toEqual([]);
        expect(inputs.filter((path) => path.includes(PROSEMIRROR))).toEqual([]);
    });
});
