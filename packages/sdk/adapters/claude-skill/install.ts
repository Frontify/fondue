/* (c) Copyright Frontify Ltd., all rights reserved. */

import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { fail, log } from '../io';
import { type AdapterOptions } from '../types';

import {
    CONSUMER_PACKAGE,
    FONDUE_VERSION,
    SKILL_NAME,
    SKILL_SOURCE_DIR,
    readStamp,
    scopeOf,
    stampPathFor,
    targetDirFor,
    writeStamp,
} from './shared';

/**
 * Idempotent install. First run drops a fresh copy; subsequent runs refresh
 * the existing copy in place (carrying forward the same `.claude/skills/<name>`
 * location and stamp). Refuses to touch directories at the target path that
 * weren't installed by this CLI — pass `--force` to override that gate, e.g.
 * for users who manually copied the skill in before this CLI existed.
 */
export const install = (options: AdapterOptions): void => {
    const scope = scopeOf(options);
    const target = targetDirFor(scope);
    const stampPath = stampPathFor(scope);

    // Discover skill files at install time so additions to `skill/` flow
    // through without an allowlist to keep in sync. The build copies the
    // whole tree; we just enumerate it here.
    if (!existsSync(SKILL_SOURCE_DIR)) {
        fail(`Bundled skill directory missing at ${SKILL_SOURCE_DIR}. Reinstall ${CONSUMER_PACKAGE}.`);
    }
    const files = readdirSync(SKILL_SOURCE_DIR).filter((name) => statSync(join(SKILL_SOURCE_DIR, name)).isFile());
    if (!files.includes('SKILL.md')) {
        fail(`Bundled skill is missing SKILL.md. Reinstall ${CONSUMER_PACKAGE}.`);
    }

    let previousVersion: string | null = null;

    if (existsSync(target)) {
        const read = readStamp(stampPath);
        if (read.status === 'ok') {
            // Our install — refresh in place. No flag needed; this is the "update" case.
            previousVersion = read.stamp.version;
        } else if (read.status === 'corrupted' && !options.force) {
            fail(
                `Stamp file at ${stampPath} is unreadable (${read.error}). ` +
                    'Inspect it, or pass --force to overwrite both the stamp and the skill.',
            );
        } else if (read.status === 'missing' && !options.force) {
            fail(
                `${target} exists and was not installed by this CLI. ` +
                    'Remove it manually, or pass --force to overwrite.',
            );
        }
        rmSync(target, { recursive: true, force: true });
    }

    mkdirSync(target, { recursive: true });
    for (const name of files) {
        copyFileSync(join(SKILL_SOURCE_DIR, name), join(target, name));
    }
    writeStamp(stampPath, scope);

    if (previousVersion === null) {
        log(`Installed Fondue Claude Code skill (${CONSUMER_PACKAGE}@${FONDUE_VERSION}) → ${target}`);
    } else if (previousVersion === FONDUE_VERSION) {
        log(`Refreshed Fondue Claude Code skill at ${CONSUMER_PACKAGE}@${FONDUE_VERSION} → ${target}`);
    } else {
        log(
            `Updated Fondue Claude Code skill (${CONSUMER_PACKAGE}@${previousVersion} → @${FONDUE_VERSION}) → ${target}`,
        );
    }
    log(scope === 'project' ? 'Scope: project (this directory only).' : 'Scope: user (every project).');

    if (previousVersion === null) {
        log('');
        log('Next steps:');
        log(`  • Open Claude Code in a project that has \`${CONSUMER_PACKAGE}\` installed.`);
        log('  • Ask "what Fondue component should I use for X?" — Claude picks the skill up automatically,');
        log(`    or invoke it explicitly with /${SKILL_NAME}.`);
        if (scope === 'project') {
            log(`  • Commit \`.claude/skills/${SKILL_NAME}/\` if you want it shared with your team.`);
        }
    }
};
