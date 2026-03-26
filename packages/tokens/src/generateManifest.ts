/* (c) Copyright Frontify Ltd., all rights reserved. */

type TokenLeaf = {
    name: string;
    type: string;
    value: string;
    path?: string[];
};

type TokenTree = {
    [key: string]: TokenTree | TokenLeaf;
};

type ManifestToken = {
    category: string;
    cssVariable: string;
    id: string;
    keyPath: string[];
    tailwindClass: string;
};

type UtilityProperty = {
    cssVariable: string;
    id: string;
};

type ManifestUtility = {
    id: string;
    keyPath: string[];
    properties: UtilityProperty[];
    tailwindClass: string;
};

export type Manifest = {
    tokens: ManifestToken[];
    utilities: ManifestUtility[];
};

const isTokenLeaf = (value: unknown): value is TokenLeaf =>
    typeof value === 'object' && value !== null && 'name' in value && 'type' in value && 'value' in value;

const isCompositeToken = (value: unknown): boolean => {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    const entries = Object.values(value);
    return entries.length > 0 && entries.every((v) => isTokenLeaf(v));
};

/**
 * Maps a token name prefix to its tailwind utility name.
 * `'*'` means the token is used across multiple utilities (e.g. colors → bg/text/border, spacing → m/p/h/w/gap).
 * Ordered longest-prefix-first for correct matching.
 */
const TAILWIND_PREFIX_MAP: [string, string][] = [
    ['typography-font-size-', 'text'],
    ['typography-font-weight-', 'font'],
    ['typography-font-family-', 'font'],
    ['typography-letter-spacing-', 'tracking'],
    ['typography-line-height-', 'leading'],
    ['border-radius-', 'rounded'],
    ['border-width-', 'border'],
    ['shadow-', 'shadow'],
    ['spacing-', '*'],
    ['color-', '*'],
];

const getLeafTailwindClass = (leaf: TokenLeaf): string => {
    for (const [prefix, utility] of TAILWIND_PREFIX_MAP) {
        if (leaf.name.startsWith(prefix)) {
            const suffix = leaf.name
                .slice(prefix.length)
                .replace(/^default$/, '')
                .replace(/-default$/, '');
            return suffix ? `${utility}-${suffix}` : utility;
        }
    }
    return leaf.name;
};

const getUtilityTailwindClass = (keyPath: string[]): string => {
    // Skip category and first group key (e.g. "utilities", "text")
    return keyPath.slice(2).join('-').replace('-default', '');
};

export const generateManifest = (availableTokens: Record<string, TokenTree>): Manifest => {
    const { utilities: utilityTree, ...tokenCategories } = availableTokens;

    const tokens = Object.entries(tokenCategories).flatMap(([category, tree]) =>
        collectLeafTokens(tree, category, [category]),
    );

    const utilities = utilityTree ? collectUtilityTokens(utilityTree, ['utilities']) : [];

    return { tokens, utilities };
};

const collectLeafTokens = (node: TokenTree, category: string, keyPath: string[]): ManifestToken[] => {
    return Object.entries(node).flatMap(([key, value]) => {
        const currentPath = [...keyPath, key];

        if (isTokenLeaf(value)) {
            return [
                {
                    category,
                    cssVariable: `var(--${value.name})`,
                    id: value.name,
                    keyPath: currentPath,
                    tailwindClass: getLeafTailwindClass(value),
                },
            ];
        }

        return collectLeafTokens(value, category, currentPath);
    });
};

const collectUtilityTokens = (node: TokenTree, keyPath: string[]): ManifestUtility[] => {
    return Object.entries(node).flatMap(([key, value]) => {
        const currentPath = [...keyPath, key];

        if (isCompositeToken(value)) {
            const properties = Object.entries(value).map(([, propValue]) => {
                const leaf = propValue as TokenLeaf;
                return {
                    cssVariable: `var(--${leaf.name})`,
                    id: leaf.name,
                };
            });

            return [
                {
                    id: currentPath.join('-'),
                    keyPath: currentPath,
                    properties,
                    tailwindClass: getUtilityTailwindClass(currentPath),
                },
            ];
        }

        return collectUtilityTokens(value as TokenTree, currentPath);
    });
};
