/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { type RichTextPlugin } from '#/bridge/define-plugin';

type Unit = (options?: object) => RichTextPlugin;

const featuresRoot = fileURLToPath(new URL('..', import.meta.url));

const FOLDERS = readdirSync(featuresRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(featuresRoot, entry.name, 'feature.ts')))
    .map((entry) => entry.name)
    .sort();

const READER_FOLDERS = ['links', 'lists-task', 'media-image', 'mentions'];

const unitOf = async (folder: string) => {
    const exports = (await import(`../${folder}/index.ts`)) as Record<string, Unit>;
    const factories = Object.values(exports);
    expect(factories).toHaveLength(1);
    return factories[0]?.();
};

describe('feature units', () => {
    it.each(FOLDERS)('%s exports one consistent unit', async (folder) => {
        const unit = await unitOf(folder);
        expect(unit).toBeDefined();
        expect(unit?.id).toBe(unit?.feature.id);
        expect(unit?.id).toBe(unit?.editor.feature);
        expect('reader' in (unit ?? {})).toBe(READER_FOLDERS.includes(folder));
    });

    it.each(READER_FOLDERS)('%s names its own feature in its reader', async (folder) => {
        const reader = (await import(`../${folder}/reader.tsx`)) as { readonly readerFeature: string };
        const unit = await unitOf(folder);
        expect(reader.readerFeature).toBe(unit?.id);
    });
});
