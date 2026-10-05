/* (c) Copyright Frontify Ltd., all rights reserved. */

import { globSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';

// Playwright CT serves on 3100 when a config sets no `ctPort`.
const DEFAULT_CT_PORT = 3100;

const CONFIG_GLOB = 'packages/*/playwright.config.ts';

/** The `ctPort` property of a config: undefined when absent, null when it is not a numeric literal. */
const readCtPort = (config: string, source: string): number | null | undefined => {
    const file = ts.createSourceFile(config, source, ts.ScriptTarget.Latest, true);
    let port: number | null | undefined;
    const visit = (node: ts.Node): void => {
        if (ts.isPropertyAssignment(node) && node.name.getText(file) === 'ctPort') {
            port = ts.isNumericLiteral(node.initializer) ? Number(node.initializer.text) : null;
        } else if (ts.isShorthandPropertyAssignment(node) && node.name.text === 'ctPort') {
            port = null;
        }
        ts.forEachChild(node, visit);
    };
    visit(file);
    return port;
};

/** Reports each `ctPort` that more than one `packages/*\/playwright.config.ts` under `root` uses, a glob with no match and a `ctPort` that is not a numeric literal. */
export const findDuplicateCtPorts = async (root: string): Promise<string[]> => {
    const configs = globSync(CONFIG_GLOB, { cwd: root });
    if (configs.length === 0) {
        return [`no file under ${root} matches ${CONFIG_GLOB}`];
    }
    const users = new Map<number, string[]>();
    const problems: string[] = [];
    for (const config of configs.sort()) {
        const port = readCtPort(config, await readFile(join(root, config), 'utf8'));
        if (port === null) {
            problems.push(`${config} sets ctPort to something other than a numeric literal`);
            continue;
        }
        const resolved = port ?? DEFAULT_CT_PORT;
        users.set(resolved, [...(users.get(resolved) ?? []), config]);
    }
    return [
        ...problems,
        ...[...users]
            .filter(([, paths]) => paths.length > 1)
            .map(([port, paths]) => `ctPort ${port} is used by ${paths.join(', ')}`),
    ];
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
