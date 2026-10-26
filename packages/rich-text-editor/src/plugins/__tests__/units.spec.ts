/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { type RichTextPlugin } from '#/bridge/pluginApi/definePlugin';
import * as root from '#/index';
import * as barrel from '#/plugins';

type Unit = (options?: object) => RichTextPlugin;

const featuresRoot = fileURLToPath(new URL('..', import.meta.url));

const FOLDERS = readdirSync(featuresRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(featuresRoot, entry.name, 'feature.ts')))
    .map((entry) => entry.name)
    .sort();

const READER_FOLDERS = FOLDERS.filter((folder) => existsSync(join(featuresRoot, folder, 'reader.tsx')));

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

    it.each(FOLDERS)('%s has its unit on the root entry', async (folder) => {
        const [exported] = Object.entries((await import(`../${folder}/index.ts`)) as Record<string, Unit>);

        expect(exported).toBeDefined();
        expect((root as Record<string, unknown>)[exported?.[0] ?? '']).toBe(exported?.[1]);
    });

    it.each(FOLDERS)('%s has its vocabulary factory on the features barrel', async (folder) => {
        const exports = (await import(`../${folder}/feature.ts`)) as Record<string, unknown>;
        const factories = Object.entries(exports).filter(([, value]) => typeof value === 'function');

        expect(factories).toHaveLength(1);
        expect((barrel as Record<string, unknown>)[factories[0]?.[0] ?? '']).toBe(factories[0]?.[1]);
    });

    it.each(FOLDERS)('%s names its factory after the folder and its unit after the factory', async (folder) => {
        const features = (await import(`../${folder}/feature.ts`)) as Record<string, unknown>;
        const [factory] = Object.entries(features)
            .filter(([, value]) => typeof value === 'function')
            .map(([name]) => name);
        const [unit] = Object.keys((await import(`../${folder}/index.ts`)) as Record<string, unknown>);

        expect(`${factory?.charAt(0).toUpperCase()}${factory?.slice(1)}`).toBe(folder);
        expect(unit).toBe(`${factory}Plugin`);
    });

    it.each(READER_FOLDERS)('%s names its own feature in its reader', async (folder) => {
        const reader = (await import(`../${folder}/reader.tsx`)) as { readerFeature: string };
        const unit = await unitOf(folder);
        expect(reader.readerFeature).toBe(unit?.id);
    });
});
