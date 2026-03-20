/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import type { DiscoveredComponent } from './types';
import { resolveFromRoot, logWarn } from './utils';

// Names exported from src/index.ts that are not UI components
const NON_COMPONENT_EXPORTS = new Set(['ThemeContext', 'useFondueTheme']);

// Names that are type-only prefixes
const TYPE_PREFIX = 'type ';

function resolveComponentFilePath(importPath: string): string | null {
    // importPath is like './components/Button/Button' or './components/Select'
    const relativeSrc = importPath.replace(/^\.\//, ''); // 'components/Button/Button'
    const srcBase = resolveFromRoot('src', relativeSrc);

    // Try .tsx first
    if (existsSync(`${srcBase}.tsx`)) return `src/${relativeSrc}.tsx`;
    // Try .ts
    if (existsSync(`${srcBase}.ts`)) return `src/${relativeSrc}.ts`;
    // Try as directory with index.ts
    if (existsSync(path.join(srcBase, 'index.ts'))) return `src/${relativeSrc}/index.ts`;
    // Try as directory with index.tsx
    if (existsSync(path.join(srcBase, 'index.tsx'))) return `src/${relativeSrc}/index.tsx`;

    return null;
}

export function discoverComponents(): DiscoveredComponent[] {
    const indexPath = resolveFromRoot('src', 'index.ts');
    const content = readFileSync(indexPath, 'utf-8');
    const lines = content.split('\n');

    const components: DiscoveredComponent[] = [];

    for (const line of lines) {
        const trimmed = line.trim();
        // Skip non-export lines and type-only lines
        if (!trimmed.startsWith('export')) continue;
        if (trimmed.startsWith('export type')) continue;
        // Skip style imports
        if (trimmed.includes("'./styles")) continue;

        // Match: export { X, type Y, Z } from './components/...'
        const match = trimmed.match(/^export\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/);
        if (!match) continue;

        const [, exportsRaw, importPath] = match;
        if (!importPath.includes('./components/')) continue;

        // Extract the first valid component name (PascalCase, not a type)
        const exports = exportsRaw.split(',').map((e) => e.trim()).filter(Boolean);
        let componentName: string | null = null;
        for (const exp of exports) {
            if (exp.startsWith(TYPE_PREFIX)) continue;
            if (!exp.match(/^[A-Z]/)) continue; // skip camelCase
            if (NON_COMPONENT_EXPORTS.has(exp)) continue;
            componentName = exp;
            break;
        }

        if (!componentName) continue;

        const filePath = resolveComponentFilePath(importPath);
        if (!filePath) {
            logWarn(`Could not resolve file for: ${importPath}`);
            continue;
        }

        const dirPath = path.dirname(filePath);
        components.push({ name: componentName, filePath, dirPath });
    }

    return components;
}
