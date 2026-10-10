/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fileURLToPath } from 'node:url';
import { Worker } from 'node:worker_threads';

import { describe, expect, it } from 'vitest';

import { fixtureProfiles } from '#/features/__fixtures__/profiles';

const compileInWorker = () =>
    new Promise<unknown>((resolve, reject) => {
        const worker = new Worker(new URL('../../fixtures/determinism/compile.worker.ts', import.meta.url), {
            execArgv: ['--import', 'tsx'],
            env: { ...process.env, TSX_TSCONFIG_PATH: fileURLToPath(new URL('../../tsconfig.json', import.meta.url)) },
        });
        worker.once('message', (message) => {
            worker
                .terminate()
                .then(() => resolve(message))
                .catch(reject);
        });
        worker.once('error', reject);
    });

describe('compilation determinism', () => {
    it('SPEC-rich-text/AC-070 gives the same schema, keymap, plugin order and manifest in two worker threads', async () => {
        const [first, second] = await Promise.all([compileInWorker(), compileInWorker()]);

        expect(first).toHaveLength(Object.keys(fixtureProfiles()).length);
        expect(first).toEqual(second);
        expect(JSON.stringify(first)).toContain(
            '"plugins":["clipboard$1","history$1","keymap:core$1","keymap:fixture.history$"',
        );
    }, 60_000);
});
