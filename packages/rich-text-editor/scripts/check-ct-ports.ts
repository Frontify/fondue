/* (c) Copyright Frontify Ltd., all rights reserved. */

import { globSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Playwright CT serves on 3100 when a config sets no `ctPort`.
const DEFAULT_CT_PORT = 3100;

/** Reports each `ctPort` that more than one `packages/*\/playwright.config.ts` under `root` uses. */
export const findDuplicateCtPorts = async (root: string): Promise<string[]> => {
    const configs = globSync('packages/*/playwright.config.ts', { cwd: root });
    const users = new Map<number, string[]>();
    for (const config of configs.sort()) {
        const source = await readFile(join(root, config), 'utf8');
        const match = /\bctPort:\s*(\d+)/.exec(source);
        const port = match === null ? DEFAULT_CT_PORT : Number(match[1]);
        users.set(port, [...(users.get(port) ?? []), config]);
    }
    return [...users]
        .filter(([, paths]) => paths.length > 1)
        .map(([port, paths]) => `ctPort ${port} is used by ${paths.join(', ')}`);
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const root = process.argv[2] ?? fileURLToPath(new URL('../../..', import.meta.url));
    const duplicates = await findDuplicateCtPorts(root);
    if (duplicates.length > 0) {
        console.error(duplicates.join('\n'));
        process.exit(1);
    }
    console.log('check-ct-ports: every Playwright CT config uses its own ctPort.');
}
