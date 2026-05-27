/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, rmSync } from 'node:fs';

import { fail, log } from '../io';
import { type AdapterOptions } from '../types';

import { readStamp, scopeOf, targetDirFor } from './shared';

export const uninstall = (options: AdapterOptions): void => {
    const scope = scopeOf(options);
    const target = targetDirFor(scope);

    if (!existsSync(target)) {
        log(`Nothing to uninstall — no skill at ${target}.`);
        return;
    }

    const existing = readStamp(target);
    if (!existing && !options.force) {
        fail(`${target} exists but was not installed by this CLI. Remove it manually, or pass --force.`);
    }

    rmSync(target, { recursive: true, force: true });
    log(`Removed ${target}.`);
};
