/* (c) Copyright Frontify Ltd., all rights reserved. */

import { collectTokens } from './manifest/collectTokens';
import { collectUtilities } from './manifest/collectUtilities';
import { type Manifest, type TokenTree } from './manifest/types';

export type { Manifest } from './manifest/types';

const PACKAGE_NAME = '@frontify/fondue/tokens';
const SCHEMA_VERSION = '1.0.0';

export const generateManifest = (availableTokens: Record<string, TokenTree>): Manifest => {
    const { utilities: utilityTree, ...tokenCategories } = availableTokens;

    const tokens = Object.entries(tokenCategories).flatMap(([category, tree]) =>
        collectTokens(tree, category, [category]),
    );

    const utilities = utilityTree ? collectUtilities(utilityTree, ['utilities']) : [];

    return {
        schemaVersion: SCHEMA_VERSION,
        packageName: PACKAGE_NAME,
        generatedAt: new Date().toISOString(),
        tokens,
        utilities,
    };
};
