/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { notesModel } from '#/features/__fixtures__/notes';
import { migrateDocument, type RichTextDocument } from '#/model';
import { createTestEnvironment } from '#/testing';

const root = new URL('../../fixtures/migration/', import.meta.url);
const fixtures = readdirSync(root, { recursive: true, encoding: 'utf8' })
    .filter((name) => name.endsWith('.json'))
    .sort();
const { version } = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8')) as {
    readonly version: string;
};

/** JSON text with each object or array that fits in 120 columns on one line. */
const compact = (value: unknown, indent = ''): string => {
    const line = JSON.stringify(value);
    if (typeof value !== 'object' || value === null || indent.length + line.length <= 120) {
        return line;
    }
    const inner = `${indent}    `;
    const parts = Array.isArray(value)
        ? value.map((item) => compact(item, inner))
        : Object.entries(value).map(([key, item]) => `${JSON.stringify(key)}: ${compact(item, inner)}`);
    const [open, close] = Array.isArray(value) ? ['[', ']'] : ['{', '}'];
    return `${open}\n${parts.map((part) => `${inner}${part}`).join(',\n')}\n${indent}${close}`;
};

describe('migration golden files', () => {
    it.each(fixtures)('SPEC-rich-text-format/AC-035 migrates %s to its golden result', (name) => {
        const input = JSON.parse(readFileSync(new URL(name, root), 'utf8')) as RichTextDocument;
        const result = migrateDocument(input, notesModel(3), { ids: createTestEnvironment({ seed: 1 }).ids });
        expect(result.manifest.packageVersion).toBe(version);
        // The package version changes on every release, so the golden file holds a placeholder.
        const manifest = { ...result.manifest, packageVersion: '<package version>' };
        expect(compact({ ...result, manifest })).toMatchSnapshot();
    });
});
