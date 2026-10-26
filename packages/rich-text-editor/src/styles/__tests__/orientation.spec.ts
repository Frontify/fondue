/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

const SOURCE = join(import.meta.dirname, '..', '..');

/** Every stylesheet of the package, by its path below `src`. */
const stylesheets = readdirSync(SOURCE, { recursive: true, encoding: 'utf8' }).filter((path) =>
    /\.(css|scss)$/.test(path),
);

describe('package stylesheets', () => {
    it('finds the stylesheets it scans', () => {
        expect(stylesheets.length).toBeGreaterThan(10);
    });

    // Nothing locks or restyles the editor for one orientation only.
    it.each(stylesheets)('holds no orientation media query in %s', (path) => {
        const css = readFileSync(join(SOURCE, path), 'utf8').replaceAll(/\/\*[\s\S]*?\*\//g, '');

        expect(css).not.toMatch(/orientation\s*:/);
    });
});
