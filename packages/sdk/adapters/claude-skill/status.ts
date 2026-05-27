/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync } from 'node:fs';

import { log } from '../io';
import { type AdapterOptions } from '../types';

import { readStamp, scopeOf, targetDirFor } from './shared';

export const status = (options: AdapterOptions): void => {
    const scope = scopeOf(options);
    const target = targetDirFor(scope);

    if (!existsSync(target)) {
        log(`Not installed at ${target}.`);
        return;
    }

    const existing = readStamp(target);
    if (existing) {
        log(`Installed at ${target}`);
        log(`  package:     ${existing.package}@${existing.version}`);
        log(`  scope:       ${existing.scope}`);
        log(`  installedAt: ${existing.installedAt}`);
    } else {
        log(`Directory exists at ${target} but was not installed by this CLI.`);
    }
};
