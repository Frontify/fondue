/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RichTextDocument } from '#/model';
import { featureIdsByFolder } from '#/plugins/registry';

// Typed here because vite/client would change the type of migrate.ts's own glob call.
type ViteImportMeta = ImportMeta & {
    glob: (pattern: string, options: { eager: true; import: 'default' }) => Record<string, unknown>;
};

const documents = (import.meta as ViteImportMeta).glob('../../plugins/*/fixtures/*.json', {
    eager: true,
    import: 'default',
});

const grouped: Record<string, Record<string, unknown>> = {};
for (const [path, document] of Object.entries(documents)) {
    const [, folder = '', name = ''] = /plugins\/([^/]+)\/fixtures\/([^/]+)\.json$/.exec(path) ?? [];
    const id = featureIdsByFolder[folder];
    if (id === undefined) {
        throw new Error(`${path} is in a folder with no feature.ts`);
    }

    const group = (grouped[id] ??= {});
    group[name] = document;
}

/** The stored documents each shipped feature brings, by feature ID and fixture name. */
// Per-feature fixture groups are written loosely and read back as documents at this one boundary.
export const featureFixtures = grouped as unknown as Readonly<
    Record<string, Readonly<Record<string, RichTextDocument>>>
>;
