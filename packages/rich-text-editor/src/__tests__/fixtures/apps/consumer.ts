/* (c) Copyright Frontify Ltd., all rights reserved. */

import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** The package root of the editor. */
export const PACKAGE_ROOT = fileURLToPath(new URL('../../../..', import.meta.url));

// A release publishes the editor with the workspace packages it peers on, so a scratch project installs them together.
const PACKED = ['.', '../components', '../icons', '../tokens'];

/** Packs the editor and its workspace peers into `destination` and returns the tarball paths. */
export const packRelease = (destination: string): string[] => {
    mkdirSync(destination, { recursive: true });
    for (const folder of PACKED) {
        execFileSync('pnpm', ['pack', '--pack-destination', destination], {
            cwd: join(PACKAGE_ROOT, folder),
            stdio: 'inherit',
        });
    }

    return readdirSync(destination)
        .filter((name) => name.endsWith('.tgz'))
        .map((name) => join(destination, name));
};

/** Installs `tarballs` and `dependencies` with npm into the scratch project at `directory`, as a host installs a release. */
export const installInto = (directory: string, tarballs: readonly string[], dependencies: readonly string[] = []) => {
    execFileSync('npm', ['install', '--no-audit', '--no-fund', '--no-package-lock', ...tarballs, ...dependencies], {
        cwd: directory,
        stdio: 'inherit',
    });
};
