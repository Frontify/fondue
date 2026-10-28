/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

type ViteImportMeta = ImportMeta & {
    glob: (pattern: string, options: { eager: true; import: string }) => Record<string, Record<string, string>>;
};

const LOCALES = ['en-US', 'de-CH', 'de-DE', 'es-ES', 'fr-CH', 'fr-FR', 'it-CH', 'it-IT', 'nl-NL', 'pl-PL', 'pt-PT'];
const modules = (import.meta as ViteImportMeta).glob('../../plugins/*/locales/*.ts', {
    eager: true,
    import: 'default',
});
const byPlugin = new Map<string, Map<string, Record<string, string>>>();
for (const [path, strings] of Object.entries(modules)) {
    const [, plugin, locale] = /plugins\/([^/]+)\/locales\/([^/]+)\.ts$/.exec(path) ?? [];
    if (plugin === undefined || locale === undefined) {
        continue;
    }

    const locales = byPlugin.get(plugin) ?? new Map<string, Record<string, string>>();
    locales.set(locale, strings);
    byPlugin.set(plugin, locales);
}

describe('plugin strings', () => {
    it.each([...byPlugin])('%s has every locale with the English key set', (_plugin, locales) => {
        expect([...locales.keys()].sort()).toEqual([...LOCALES].sort());
        const keys = Object.keys(locales.get('en-US') ?? {}).sort();
        for (const strings of locales.values()) {
            expect(Object.keys(strings).sort()).toEqual(keys);
        }
    });
});

const srcRoot = fileURLToPath(new URL('../..', import.meta.url));
const SKIP = new Set(['__tests__', 'fixtures', 'locales']);
const TOKEN = /RichTextEditor_[A-Za-z0-9_]+/g;

const productFiles = (directory: string): string[] => {
    const found: string[] = [];
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
        if (SKIP.has(entry.name)) {
            continue;
        }

        const path = join(directory, entry.name);
        if (entry.isDirectory()) {
            found.push(...productFiles(path));
            continue;
        }

        if (/\.tsx?$/.test(entry.name) && !entry.name.endsWith('.stories.tsx')) {
            found.push(path);
        }
    }

    return found;
};

/** Shared keys whose literal name is in exactly one plugin folder and in no other product file. */
const singlePluginKeys = () => {
    const shared = new Set(readFileSync(join(srcRoot, 'locales/en-US.ts'), 'utf8').match(TOKEN) ?? []);
    const owners = new Map<string, Set<string>>();
    const outside = new Set<string>();
    for (const path of productFiles(srcRoot)) {
        const tokens = new Set(readFileSync(path, 'utf8').match(TOKEN) ?? []);
        const plugin = /\/plugins\/([^/]+)\//.exec(path)?.[1];
        for (const key of tokens) {
            if (!shared.has(key)) {
                continue;
            }

            if (plugin === undefined) {
                outside.add(key);
                continue;
            }

            const folders = owners.get(key) ?? new Set<string>();
            folders.add(plugin);
            owners.set(key, folders);
        }
    }

    return [...shared].filter((key) => !outside.has(key) && owners.get(key)?.size === 1).sort();
};

describe('locale parity', () => {
    it('keeps no shared key in exactly one plugin folder', () => {
        expect(singlePluginKeys()).toEqual([]);
    });
});
