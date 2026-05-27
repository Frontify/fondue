/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export type Scope = 'user' | 'project';

export interface Stamp {
    package: string;
    version: string;
    installedAt: string;
    scope: Scope;
}

/**
 * Anchor for runtime path lookups. After vite bundles the CLI into
 * `@frontify/fondue/dist/tools/sdk-cli/index.js`, every module's
 * `import.meta.url` resolves to that single file, so this directory is
 * always the bundled bin's directory.
 */
const TOOL_DIR = dirname(fileURLToPath(import.meta.url));

/**
 * Skill markdown is copied next to the bundled bin (under
 * `adapters/claude-skill/skill/`) by `viteStaticCopy` in the umbrella's
 * `sdk-cli.vite.config.ts`.
 */
export const SKILL_SOURCE_DIR = resolve(TOOL_DIR, 'adapters', 'claude-skill', 'skill');

export const SKILL_FILES = ['SKILL.md', 'reference.md'] as const;
export const SKILL_NAME = 'fondue';
export const STAMP_FILE = '.installed-by-frontify.json';

/** Consumer-facing umbrella name — the only `@frontify/...` slug users should know. */
export const CONSUMER_PACKAGE = '@frontify/fondue';

/** Inlined at build time from `packages/fondue/package.json` — matches the umbrella the user installed. */
export const FONDUE_VERSION: string = __FONDUE_VERSION__;

export const scopeOf = (options: { user?: boolean }): Scope => (options.user ? 'user' : 'project');

export const targetDirFor = (scope: Scope): string => {
    const root = scope === 'user' ? join(homedir(), '.claude', 'skills') : join(process.cwd(), '.claude', 'skills');
    return join(root, SKILL_NAME);
};

export const readStamp = (target: string): Stamp | null => {
    const stampPath = join(target, STAMP_FILE);
    if (!existsSync(stampPath)) {
        return null;
    }
    try {
        return JSON.parse(readFileSync(stampPath, 'utf8')) as Stamp;
    } catch {
        return null;
    }
};

export const writeStamp = (target: string, scope: Scope): void => {
    const stamp: Stamp = {
        package: CONSUMER_PACKAGE,
        version: FONDUE_VERSION,
        installedAt: new Date().toISOString(),
        scope,
    };
    writeFileSync(join(target, STAMP_FILE), `${JSON.stringify(stamp, null, 2)}\n`);
};
