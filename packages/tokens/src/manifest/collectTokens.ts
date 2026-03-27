/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTokenTailwindClass } from './tailwindMapping';
import { isTokenLeaf } from './tokenTreeUtils';
import { type ManifestToken, type TokenTree } from './types';

export const collectTokens = (node: TokenTree, category: string, keyPath: string[]): ManifestToken[] => {
    return Object.entries(node).flatMap(([key, value]) => {
        const currentPath = [...keyPath, key];

        if (isTokenLeaf(value)) {
            return [
                {
                    category,
                    cssVariable: `var(--${value.name})`,
                    id: value.name,
                    keyPath: currentPath,
                    tailwindClass: getTokenTailwindClass(value),
                    themeable: category === 'colors' || value.type === 'shadow',
                    type: value.type,
                    value: value.value,
                },
            ];
        }

        return collectTokens(value, category, currentPath);
    });
};
