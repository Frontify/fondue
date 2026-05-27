/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync } from 'node:fs';

import { log } from '../io';
import { type AdapterOptions } from '../types';

import { readStamp, scopeOf, stampPathFor, targetDirFor } from './shared';

export const status = (options: AdapterOptions): void => {
    const scope = scopeOf(options);
    const target = targetDirFor(scope);
    const stampPath = stampPathFor(scope);
    const targetExists = existsSync(target);
    const read = readStamp(stampPath);

    if (!targetExists && read.status === 'missing') {
        log(`Not installed at ${target}.`);
        return;
    }

    if (read.status === 'ok') {
        if (!targetExists) {
            log(`Stamp at ${stampPath} but skill directory is missing at ${target}.`);
            log('Run `fondue adapter install claude-skill` to repair.');
            return;
        }
        log(`Installed at ${target}`);
        log(`  package:     ${read.stamp.package}@${read.stamp.version}`);
        log(`  scope:       ${read.stamp.scope}`);
        log(`  installedAt: ${read.stamp.installedAt}`);
        return;
    }

    if (read.status === 'corrupted') {
        log(`Stamp at ${stampPath} is unreadable (${read.error}).`);
        if (targetExists) {
            log(`Skill directory present at ${target}. Re-run install to repair, or pass --force.`);
        }
        return;
    }

    // read.status === 'missing' && targetExists
    log(`Directory exists at ${target} but was not installed by this CLI.`);
};
