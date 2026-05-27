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
 * Tagged result for `readStamp`. Distinguishes a stamp that was never written
 * from one that's present but unreadable — callers can give a precise error
 * message instead of pretending the install is foreign.
 */
export type StampRead = { status: 'missing' } | { status: 'corrupted'; error: string } | { status: 'ok'; stamp: Stamp };

/**
 * Anchor for runtime path lookups. After vite bundles the CLI into
 * `@frontify/fondue/dist/tools/sdk-cli/index.js`, every module's
 * `import.meta.url` resolves to that single file, so this directory is
 * always the bundled bin's directory.
 */
const TOOL_DIR = dirname(fileURLToPath(import.meta.url));

/**
 * Skill markdown is copied next to the bundled bin (under
 * `adapters/claude-skill/skill/`) by the asset-copy plugin in the umbrella's
 * `sdk-cli.vite.config.ts`.
 */
export const SKILL_SOURCE_DIR = resolve(TOOL_DIR, 'adapters', 'claude-skill', 'skill');

export const SKILL_NAME = 'fondue';

/** Consumer-facing umbrella name — the only `@frontify/...` slug users should know. */
export const CONSUMER_PACKAGE = '@frontify/fondue';

/** Inlined at build time from `packages/fondue/package.json` — matches the umbrella the user installed. */
export const FONDUE_VERSION: string = __FONDUE_VERSION__;

export const scopeOf = (options: { user?: boolean }): Scope => (options.user ? 'user' : 'project');

/**
 * Walk up from the cwd to find the nearest project root, so the project-scope
 * install lands in the repo root even when the CLI is invoked from a
 * subdirectory. Falls back to cwd if neither `package.json` nor `.git` is
 * found — keeps the failure mode obvious (skill ends up where the user ran
 * the command) instead of silently picking a surprise ancestor.
 */
const projectRoot = (): string => {
    let dir = process.cwd();
    while (true) {
        if (existsSync(join(dir, 'package.json')) || existsSync(join(dir, '.git'))) {
            return dir;
        }
        const parent = dirname(dir);
        if (parent === dir) {
            return process.cwd();
        }
        dir = parent;
    }
};

const skillsRoot = (scope: Scope): string =>
    scope === 'user' ? join(homedir(), '.claude', 'skills') : join(projectRoot(), '.claude', 'skills');

export const targetDirFor = (scope: Scope): string => join(skillsRoot(scope), SKILL_NAME);

/**
 * Stamp lives **next to** the skill dir, not inside it, so committing
 * `.claude/skills/fondue/` to share the skill with the team doesn't drag the
 * stamp along. The stamp is a CLI-private bookkeeping file; users shouldn't
 * have to .gitignore it from inside their skill folder.
 */
export const stampPathFor = (scope: Scope): string => join(skillsRoot(scope), `.${SKILL_NAME}-installed.json`);

export const readStamp = (stampPath: string): StampRead => {
    if (!existsSync(stampPath)) {
        return { status: 'missing' };
    }
    try {
        const stamp = JSON.parse(readFileSync(stampPath, 'utf8')) as Stamp;
        return { status: 'ok', stamp };
    } catch (error) {
        return { status: 'corrupted', error: error instanceof Error ? error.message : String(error) };
    }
};

export const writeStamp = (stampPath: string, scope: Scope): void => {
    const stamp: Stamp = {
        package: CONSUMER_PACKAGE,
        version: FONDUE_VERSION,
        installedAt: new Date().toISOString(),
        scope,
    };
    writeFileSync(stampPath, `${JSON.stringify(stamp, null, 2)}\n`);
};
