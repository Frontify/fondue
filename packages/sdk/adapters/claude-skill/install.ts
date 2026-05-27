/* (c) Copyright Frontify Ltd., all rights reserved. */

import { copyFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

import { fail, log } from '../io';
import { type AdapterOptions } from '../types';

import {
    CONSUMER_PACKAGE,
    FONDUE_VERSION,
    SKILL_FILES,
    SKILL_NAME,
    SKILL_SOURCE_DIR,
    readStamp,
    scopeOf,
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

    for (const name of SKILL_FILES) {
        if (!existsSync(join(SKILL_SOURCE_DIR, name))) {
            fail(`Bundled skill file missing: ${name}. Reinstall ${CONSUMER_PACKAGE}.`);
        }
    }

    let previousVersion: string | null = null;

    if (existsSync(target)) {
        const stamped = readStamp(target);
        if (stamped) {
            // Our install — refresh in place. No flag needed; this is the "update" case.
            previousVersion = stamped.version;
        } else if (!options.force) {
            fail(
                `${target} exists and was not installed by this CLI. ` +
                    'Remove it manually, or pass --force to overwrite.',
            );
        }
        rmSync(target, { recursive: true, force: true });
    }

    mkdirSync(target, { recursive: true });
    for (const name of SKILL_FILES) {
        copyFileSync(join(SKILL_SOURCE_DIR, name), join(target, name));
    }
    writeStamp(target, scope);

    if (previousVersion === null) {
        log(`Installed Fondue Claude Code skill (${CONSUMER_PACKAGE}@${FONDUE_VERSION}) → ${target}`);
    } else if (previousVersion === FONDUE_VERSION) {
        log(`Refreshed Fondue Claude Code skill (${CONSUMER_PACKAGE}@${FONDUE_VERSION}, unchanged) → ${target}`);
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
