/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Dictionary, type TransformedToken } from 'style-dictionary';

type CategoryConfig = {
    title: string;
    identifier: string[];
    prefixes: string[];
    description: string;
    filter?: (token: TransformedToken) => boolean;
    isUtility?: boolean;
};

const categories: CategoryConfig[] = [
    {
        title: 'Colors',
        identifier: ['color'],
        prefixes: ['bg-', 'text-', 'border-'],
        description: 'Use with `bg-`, `text-`, `border-` prefixes.',
        filter: (token) => token.attributes?.type !== 'base',
    },
    {
        title: 'Typography Utilities (composite classes)',
        identifier: ['text'],
        prefixes: [],
        description:
            'Always prefer these composite classes over individual font utilities. Each class sets font-family, size, weight, line-height, letter-spacing, and text-transform together.',
        isUtility: true,
    },
    {
        title: 'Font Size',
        identifier: ['typography', 'font-size'],
        prefixes: ['text-'],
        description: 'Use with the `text-` prefix. Prefer composite typography classes when possible.',
    },
    {
        title: 'Font Weight',
        identifier: ['typography', 'font-weight'],
        prefixes: ['font-'],
        description: 'Use with the `font-` prefix.',
    },
    {
        title: 'Font Family',
        identifier: ['typography', 'font-family'],
        prefixes: ['font-'],
        description: 'Use with the `font-` prefix.',
    },
    {
        title: 'Letter Spacing',
        identifier: ['typography', 'letter-spacing'],
        prefixes: ['tracking-'],
        description: 'Use with the `tracking-` prefix.',
    },
    {
        title: 'Line Height',
        identifier: ['typography', 'line-height'],
        prefixes: ['leading-'],
        description: 'Use with the `leading-` prefix.',
    },
    {
        title: 'Spacing',
        identifier: ['spacing'],
        prefixes: ['p-', 'm-', 'gap-'],
        description:
            'Use with `p-`, `m-`, `gap-` and directional variants (`px-`, `py-`, `mt-`, `mr-`, `mb-`, `ml-`, etc.).',
    },
    {
        title: 'Border Radius',
        identifier: ['border-radius'],
        prefixes: ['rounded-'],
        description: 'Use with the `rounded-` prefix. `rounded` (no suffix) maps to medium.',
    },
    {
        title: 'Border Width',
        identifier: ['border-width'],
        prefixes: ['border-'],
        description: 'Use with the `border-` prefix. `border` (no suffix) maps to default (1px).',
    },
    {
        title: 'Shadows',
        identifier: ['shadow'],
        prefixes: ['shadow-'],
        description: 'Use with the `shadow-` prefix. `shadow` (no suffix) maps to the default shadow.',
    },
];

const toTitleCase = (segment: string): string => {
    return segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('-');
};

const getTokensForCategory = (tokens: TransformedToken[], category: CategoryConfig): TransformedToken[] => {
    return tokens.filter(
        (token) =>
            category.identifier.every((idSegment, index) => token.path[index + 1] === idSegment) &&
            (category.filter ? category.filter(token) : true),
    );
};

const getFigmaPath = (token: TransformedToken): string => {
    const pathWithoutTheme = token.path.slice(1);
    return pathWithoutTheme.map(toTitleCase).join('/');
};

const getTailwindToken = (token: TransformedToken, category: CategoryConfig): string | null => {
    if (category.isUtility) {
        const path = token.path.slice(category.identifier.length + 1);
        // Mirrors buildUtils.ts logic: last element is the CSS property (font-size, etc.),
        // second-to-last may be "default" which should also be stripped
        const partsToRemove = path[path.length - 2] === 'default' ? 2 : 1;
        return path.slice(0, -partsToRemove).join('-');
    }

    const path = token.path.slice(category.identifier.length + 1);
    const filtered = path.filter((segment) => segment !== 'default');
    return filtered.join('-');
};

const deduplicateByFigmaPath = (
    tokens: TransformedToken[],
    category: CategoryConfig,
): Array<{ figmaPath: string; tailwindToken: string }> => {
    const seen = new Set<string>();
    const result: Array<{ figmaPath: string; tailwindToken: string }> = [];

    for (const token of tokens) {
        const figmaPath = getFigmaPath(token);
        if (seen.has(figmaPath)) {
            continue;
        }
        seen.add(figmaPath);

        const tailwindToken = getTailwindToken(token, category);
        if (tailwindToken === null) {
            continue;
        }

        result.push({ figmaPath, tailwindToken });
    }

    return result.sort((a, b) => a.figmaPath.localeCompare(b.figmaPath));
};

const renderUtilityTable = (entries: Array<{ figmaPath: string; tailwindToken: string }>): string => {
    const uniqueUtilities = new Map<string, string>();
    for (const entry of entries) {
        if (entry.tailwindToken && !uniqueUtilities.has(entry.tailwindToken)) {
            const figmaBase = entry.figmaPath.split('/').slice(0, -1).join('/');
            uniqueUtilities.set(entry.tailwindToken, figmaBase);
        }
    }

    const lines = ['| Figma Variable | Tailwind Class |', '|---|---|'];
    const sorted = Array.from(uniqueUtilities.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    for (const [tailwindClass, figmaBase] of sorted) {
        lines.push(`| ${figmaBase} | \`${tailwindClass}\` |`);
    }
    return lines.join('\n');
};

const renderTokenTable = (entries: Array<{ figmaPath: string; tailwindToken: string }>, prefixes: string[]): string => {
    const lines = [`| Figma Variable | Tailwind Token | Example Class |`, '|---|---|---|'];
    for (const entry of entries) {
        const examplePrefix = prefixes[0] || '';
        const exampleClass = entry.tailwindToken
            ? `${examplePrefix}${entry.tailwindToken}`
            : `${examplePrefix.replace(/-$/, '')}`;
        lines.push(`| ${entry.figmaPath} | \`${entry.tailwindToken || '(default)'}\` | \`${exampleClass}\` |`);
    }
    return lines.join('\n');
};

export const generateFigmaMapping = (dictionary: Dictionary): string => {
    const tokens = dictionary.allTokens;
    const sections: string[] = [];

    sections.push(`# Figma Variable → Tailwind Class Mapping

Auto-generated from @frontify/fondue-tokens build. Do not edit manually.

> **Note:** Check your project's \`tailwind.config.ts\` for a prefix (e.g., \`tw-\`).
> If set, prepend it to all class names below.

## Naming Convention

Figma variable paths map to Tailwind classes via CSS custom properties:

\`Color/Primary/Default\` → CSS var \`--color-primary-default\` → Tailwind \`bg-primary\`

- "Default" variants become the bare class name (no \`-default\` suffix)
- Variable paths are lowercased and joined with hyphens to form CSS variable names
- The first path segment (theme name) is stripped`);

    for (const category of categories) {
        const categoryTokens = getTokensForCategory(tokens, category);
        if (categoryTokens.length === 0) {
            continue;
        }

        const entries = deduplicateByFigmaPath(categoryTokens, category);
        if (entries.length === 0) {
            continue;
        }

        const table = category.isUtility ? renderUtilityTable(entries) : renderTokenTable(entries, category.prefixes);

        sections.push(`## ${category.title}

${category.description}

${table}`);
    }

    return sections.join('\n\n---\n\n');
};
