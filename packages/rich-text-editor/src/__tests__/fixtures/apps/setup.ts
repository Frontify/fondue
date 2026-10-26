/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ChildProcess, execFileSync, spawn } from 'node:child_process';
import { copyFileSync, cpSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { installInto, packRelease } from './consumer';

/** The fixture apps and the port each serves its production build on. */
export const APPS = [
    { name: 'next-pages', port: 3201 },
    { name: 'vite', port: 3202 },
] as const;

const HERE = fileURLToPath(new URL('.', import.meta.url));
const ENVIRONMENT = { ...process.env, NEXT_TELEMETRY_DISABLED: '1' };

/** Resolves once `port` answers with a page, and rejects after a minute. */
const serving = async (port: number) => {
    const deadline = Date.now() + 60_000;
    while (Date.now() < deadline) {
        const answered = await fetch(`http://localhost:${port}/`).then(
            (response) => response.ok,
            () => false,
        );
        if (answered) {
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
    }

    throw new Error(`Nothing serves on port ${port}.`);
};

/** Builds each fixture app from the packed release in a scratch folder and serves it until the run ends. */
export default async function globalSetup() {
    const scratch = mkdtempSync(join(tmpdir(), 'fondue-rte-smoke-'));
    const tarballs = packRelease(join(scratch, 'packs'));
    const servers: ChildProcess[] = [];
    for (const { name } of APPS) {
        const directory = join(scratch, name);
        cpSync(join(HERE, name), directory, { recursive: true });
        copyFileSync(join(HERE, 'document.js'), join(directory, 'document.js'));
        installInto(directory, tarballs);
        execFileSync('npm', ['run', 'build'], { cwd: directory, env: ENVIRONMENT, stdio: 'inherit' });
        // A process group of its own, so the teardown stops npm and the server it started.
        servers.push(spawn('npm', ['start'], { cwd: directory, env: ENVIRONMENT, stdio: 'inherit', detached: true }));
    }

    await Promise.all(APPS.map(({ port }) => serving(port)));

    return () => {
        for (const { pid } of servers) {
            if (pid !== undefined) {
                process.kill(-pid, 'SIGTERM');
            }
        }

        rmSync(scratch, { recursive: true, force: true });
    };
}
