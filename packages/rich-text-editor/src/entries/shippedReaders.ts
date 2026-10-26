/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReaderRenderers } from '#/reader/define';

type ViteImportMeta = ImportMeta & {
    glob: (pattern: string, options: { eager: true }) => Record<string, Readonly<Record<string, unknown>>>;
};

// Each feature reader exports its `readerFeature` ID and its renderers, whose export name is the feature's own.
const readerModules = (import.meta as ViteImportMeta).glob('../features/*/reader.tsx', { eager: true });

/** The reader overrides of the shipped features by feature ID; a feature's own `defineReaderFeature` replaces them. */
export const READER_OVERRIDES = Object.fromEntries(
    Object.values(readerModules).map((exports) => [
        exports.readerFeature,
        Object.values(exports).find((value) => typeof value === 'object' && value !== null),
    ]),
) as Readonly<Record<string, ReaderRenderers>>;
