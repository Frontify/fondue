/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, rmSync } from 'node:fs';

import { fail, log } from '../io';
import { type AdapterOptions } from '../types';

import { readStamp, scopeOf, stampPathFor, targetDirFor } from './shared';

export const uninstall = (options: AdapterOptions): void => {
    const scope = scopeOf(options);
    const target = targetDirFor(scope);
    const stampPath = stampPathFor(scope);
    const targetExists = existsSync(target);
    const stampExists = existsSync(stampPath);

    if (!targetExists && !stampExists) {
        log(`Nothing to uninstall — no skill at ${target}.`);
        return;
    }

    if (targetExists) {
        const read = readStamp(stampPath);
        if (read.status === 'missing' && !options.force) {
            fail(`${target} exists but was not installed by this CLI. Remove it manually, or pass --force.`);
        }
        if (read.status === 'corrupted' && !options.force) {
            fail(
                `Stamp file at ${stampPath} is unreadable (${read.error}). ` +
                    'Inspect it, or pass --force to remove the skill and the stamp.',
            );
        }
        rmSync(target, { recursive: true, force: true });
    }

    if (stampExists) {
        rmSync(stampPath, { force: true });
    }

    log(`Removed ${target}.`);
};
