/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { parseCss } from './check-css.ts';

const PHYSICAL_NAME = /(^|-)(left|right)(-|$)/;
const PHYSICAL_KEYWORD = /(^|[^\w-])(left|right)([^\w-]|$)/i;
// The properties whose `left` and `right` keywords have logical `start`, `end`, `inline-start` and `inline-end`.
const KEYWORD_PROPERTIES = new Set(['float', 'text-align', 'clear']);

/**
 * Reports each declaration whose property names `left` or `right`, and each `float`, `text-align` or `clear` set to
 * one, so content and chrome mirror in right-to-left text (SPEC-rich-text-react/AC-104).
 */
export const scanLogicalCss = (path: string, source: string): string[] =>
    parseCss(source).rules.flatMap(({ declarations, line }) =>
        declarations.flatMap(([property, value]) => {
            if (PHYSICAL_NAME.test(property)) {
                return [`${path}:${line} ${property} is physical; use its logical property`];
            }
            if (KEYWORD_PROPERTIES.has(property) && PHYSICAL_KEYWORD.test(value)) {
                return [`${path}:${line} ${property}: ${value} is physical; use start or end`];
            }
            return [];
        }),
    );

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const path = process.argv[2] ?? 'dist/style.css';
    const violations = scanLogicalCss(
        path,
        await readFile(join(fileURLToPath(new URL('..', import.meta.url)), path), 'utf8'),
    );
    if (violations.length > 0) {
        console.error(violations.join('\n'));
        process.exit(1);
    }
    console.log('check-logical-css: every rule uses logical properties and keywords for left and right.');
}
