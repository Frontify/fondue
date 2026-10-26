/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { fileURLToPath } from 'node:url';

import { loadConfigFromFile } from 'vite';
import { beforeAll, expect, it } from 'vitest';

type Timeouts = {
    readonly hookTimeout?: number;
    readonly testTimeout?: number;
};

let timeouts: Timeouts = {};
beforeAll(async () => {
    const loaded = await loadConfigFromFile(
        { command: 'serve', mode: 'test' },
        fileURLToPath(new URL('../../vite.config.ts', import.meta.url)),
    );
    if (loaded === null) {
        throw new Error('vite.config.ts did not load');
    }
    const { test } = loaded.config as { readonly test?: Timeouts };
    if (test !== undefined) {
        timeouts = test;
    }
});

it('gives a hook 60,000 ms for a cold import and keeps the 5,000 ms default for each test', () => {
    expect(timeouts.hookTimeout).toBe(60_000);
    expect(timeouts.testTimeout).toBeUndefined();
});
