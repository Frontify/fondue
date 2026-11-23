/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { enUS } from '../en-US';

const SOURCE_ROOT = fileURLToPath(new URL('../..', import.meta.url));
/** The folders that hold strings or tests of them, not the code that shows them. */
const NOT_PRODUCT = new Set(['locales', '__tests__', 'stories', 'docs']);
const PRODUCT_FILE = /\.tsx?$/;
const TEST_OR_STORY = /\.(spec|stories|ct)\.tsx?$/;
const KEY = /'(RichTextEditor_\w+)'/g;

const productFiles = (directory: string): string[] => {
    const found: string[] = [];
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
        if (NOT_PRODUCT.has(entry.name)) {
            continue;
        }

        const path = join(directory, entry.name);
        if (entry.isDirectory()) {
            found.push(...productFiles(path));
            continue;
        }

        if (PRODUCT_FILE.test(entry.name) && !TEST_OR_STORY.test(entry.name)) {
            found.push(path);
        }
    }

    return found;
};

describe('the editor strings', () => {
    it('are each shown somewhere, so none is left over and none is replaced by fixed text', () => {
        const used = new Set<string>();
        for (const path of productFiles(SOURCE_ROOT)) {
            for (const [, key] of readFileSync(path, 'utf8').matchAll(KEY)) {
                used.add(key ?? '');
            }
        }

        expect(Object.keys(enUS).filter((key) => !used.has(key))).toEqual([]);
    });
});
