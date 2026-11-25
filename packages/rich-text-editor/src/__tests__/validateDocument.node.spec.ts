/* (c) Copyright Frontify Ltd., all rights reserved. */

// A migration script validates stored rows on a server, so this runs without a browser.
// @vitest-environment node

import { fileURLToPath } from 'node:url';

import { build } from 'esbuild';
import { assert, describe, expect, it } from 'vitest';

import { MAX_ISSUES } from '../core/validateDocument';
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

    it('reports a child without a type', () => {
        const document = { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'a' }, {}] }] };

        expect(validateDocument(document)).toEqual({
            valid: false,
            issues: [{ reason: 'missing-type', path: '/blocks/0/children/1' }],
        });
    });

    it('reports a child that is not an object', () => {
        const document = { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'a' }, 'x'] }] };

        expect(validateDocument(document)).toEqual({
            valid: false,
            issues: [{ reason: 'not-an-object', path: '/blocks/0/children/1' }],
        });
    });

    it.each([
        ['alone', [{ type: 'mention', children: 'x' }], '/blocks/0/children/0/children'],
        ['next to a text run', [{ text: 'a' }, { type: 'mention', children: 'x' }], '/blocks/0/children/1/children'],
    ])('reports an inline element with string children as not an array %s', (_name, children, path) => {
        const document = { version: 1, blocks: [{ type: 'paragraph', children }] };

        expect(validateDocument(document)).toEqual({
            valid: false,
            issues: [{ reason: 'not-an-array', path }],
        });
    });

    it('reports an undeclared text key on a block of unknown type inside a list as malformed text', () => {
        const document = {
            version: 1,
            blocks: [{ type: 'bulletList', children: [{ type: 'callout', text: 'x' }] }],
        };

        expect(validateDocument(document)).toEqual({
            valid: false,
            issues: [{ reason: 'malformed-text', path: '/blocks/0/children/0' }],
        });
    });

    it('reports a text node directly in blocks as missing a type', () => {
        expect(validateDocument({ version: 1, blocks: [{ text: 'a' }] })).toEqual({
            valid: false,
            issues: [{ reason: 'missing-type', path: '/blocks/0' }],
        });
    });

    it('reports a block in blocks that also carries text as malformed text', () => {
        expect(validateDocument({ version: 1, blocks: [{ type: 'paragraph', text: 'a' }] })).toEqual({
            valid: false,
            issues: [{ reason: 'malformed-text', path: '/blocks/0' }],
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

describe('validateDocument, on hostile input', () => {
    it('accepts a value nested far deeper than the call stack allows', () => {
        const depth = 20_000;
        let json = '{"version":1,"blocks":[';
        for (let level = 0; level < depth; level++) {
            json += '{"type":"a","children":[';
        }
        for (let level = 0; level < depth; level++) {
            json += ']}';
        }
        json += ']}';

        expect(validateDocument(JSON.parse(json)).valid).toBe(true);
    });

    it('stops at MAX_ISSUES issues, keeping the first ones in document order', () => {
        const document = { version: 1, blocks: Array.from({ length: MAX_ISSUES * 10 }, () => 'x') };

        const result = validateDocument(document);

        assert(!result.valid);
        expect(result.issues).toHaveLength(MAX_ISSUES);
        expect(result.issues[0]?.path).toBe('/blocks/0');
        expect(result.issues[result.issues.length - 1]?.path).toBe(`/blocks/${MAX_ISSUES - 1}`);
    });

    it('accepts a text node with an own __proto__ and constructor key', () => {
        const json =
            '{"version":1,"blocks":[{"type":"paragraph","children":[{"text":"a","__proto__":{"type":"x"},"constructor":1}]}]}';

        expect(validateDocument(JSON.parse(json)).valid).toBe(true);
    });

    it('reads an inline whose text key is only inherited as an inline element', () => {
        const mention = Object.assign(Object.create({ text: 'x' }) as object, { type: 'mention' });

        expect(validateDocument({ version: 1, blocks: [{ type: 'p', children: [mention] }] }).valid).toBe(true);
    });

    it('accepts a block with an own __proto__ key holding text', () => {
        const json = '{"version":1,"blocks":[{"type":"p","__proto__":{"text":"x"}}]}';

        expect(validateDocument(JSON.parse(json)).valid).toBe(true);
    });

    it('reports an inline whose own constructor key holds text as missing a type', () => {
        const json = '{"version":1,"blocks":[{"type":"p","children":[{"constructor":{"text":"x"}}]}]}';

        expect(validateDocument(JSON.parse(json))).toEqual({
            valid: false,
            issues: [{ reason: 'missing-type', path: '/blocks/0/children/0' }],
        });
    });

    it('terminates on a node whose children contain itself', () => {
        const node: { type: string; children: unknown[] } = { type: 'a', children: [] };
        node.children.push(node);

        expect(validateDocument({ version: 1, blocks: [node] }).valid).toBe(true);
    });
});

describe('validateDocument, as shipped', () => {
    it('bundles from document code only, with no ProseMirror', { timeout: 30_000 }, async () => {
        const inputs = await bundleInputs(VALIDATE_ENTRY);

        expect(inputs.filter((path) => !VALIDATE_CODE.test(path))).toEqual([]);
        expect(inputs.filter((path) => path.includes(PROSEMIRROR))).toEqual([]);
    });
});
