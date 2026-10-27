/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

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
