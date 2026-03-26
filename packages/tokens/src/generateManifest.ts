/* (c) Copyright Frontify Ltd., all rights reserved. */

import { collectTokens } from './manifest/collectTokens';
import { collectUtilities } from './manifest/collectUtilities';
import { type Manifest, type TokenTree } from './manifest/types';

export type { Manifest } from './manifest/types';

export const generateManifest = (availableTokens: Record<string, TokenTree>): Manifest => {
    const { utilities: utilityTree, ...tokenCategories } = availableTokens;

    const tokens = Object.entries(tokenCategories).flatMap(([category, tree]) =>
        collectTokens(tree, category, [category]),
    );

    const utilities = utilityTree ? collectUtilities(utilityTree, ['utilities']) : [];

    return { tokens, utilities };
};
