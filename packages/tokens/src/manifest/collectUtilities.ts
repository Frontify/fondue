/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getUtilityTailwindClass } from './tailwindMapping';
import { isCompositeToken } from './tokenTreeUtils';
import { type ManifestUtility, type TokenLeaf, type TokenTree } from './types';

export const collectUtilities = (node: TokenTree, keyPath: string[]): ManifestUtility[] => {
    return Object.entries(node).flatMap(([key, value]) => {
        const currentPath = [...keyPath, key];

        if (isCompositeToken(value)) {
            const properties = Object.entries(value).map(([, propValue]) => {
                const leaf = propValue as TokenLeaf;
                return {
                    cssVariable: `var(--${leaf.name})`,
                    id: leaf.name,
                    type: leaf.type,
                    value: leaf.value,
                };
            });

            return [
                {
                    id: currentPath.join('-'),
                    keyPath: currentPath,
                    properties,
                    tailwindClass: getUtilityTailwindClass(currentPath),
                    themeable: false,
                },
            ];
        }

        return collectUtilities(value as TokenTree, currentPath);
    });
};
