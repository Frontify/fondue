/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const PACKAGE_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

/** A "Source: `path`" line, a blank line, then a ts or tsx fence. Groups: the path, the code. */
const SOURCED_BLOCK = /^Source: `([^`]+)`\n\n```tsx?\n([\s\S]*?)\n```$/gm;
const TRAILING_WHITESPACE = /[ \t]+$/gm;

const withoutTrailingWhitespace = (text: string): string => text.replaceAll(TRAILING_WHITESPACE, '');

type SourcedBlock = {
    path: string;
    code: string;
};

const sourcedBlocksOf = (page: string): SourcedBlock[] =>
    [...page.matchAll(SOURCED_BLOCK)].map(([, path = '', code = '']) => ({ path, code }));

describe('the writing-a-plugin page', () => {
    const page = readFileSync(join(PACKAGE_ROOT, 'src/docs/authoring.mdx'), 'utf8');
    const blocks = sourcedBlocksOf(page);

    it('names a source for at least one excerpt', () => {
        expect(blocks.length).toBeGreaterThan(0);
    });

    it('copies every excerpt verbatim from the file it names', () => {
        for (const { path, code } of blocks) {
            const source = withoutTrailingWhitespace(readFileSync(join(PACKAGE_ROOT, path), 'utf8'));
            expect(source, path).toContain(withoutTrailingWhitespace(code));
        }
    });
});
