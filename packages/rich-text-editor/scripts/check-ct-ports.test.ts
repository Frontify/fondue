/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { findDuplicateCtPorts } from './check-ct-ports';

const fixture = (name: string) => fileURLToPath(new URL(`../fixtures/ct-ports/${name}`, import.meta.url));

describe('check-ct-ports', () => {
    it('SPEC-rich-text/AC-092 fails on two configs with one ctPort', async () => {
        expect(await findDuplicateCtPorts(fixture('duplicate'))).toEqual([
            'ctPort 3200 is used by packages/a/playwright.config.ts, packages/b/playwright.config.ts',
        ]);
    });

    it('SPEC-rich-text/AC-092 counts a config without ctPort as the Playwright default', async () => {
        expect(await findDuplicateCtPorts(fixture('default'))).toHaveLength(1);
    });

    it('SPEC-rich-text/AC-092 passes on distinct ports and on the repository', async () => {
        expect(await findDuplicateCtPorts(fixture('unique'))).toEqual([]);
        expect(await findDuplicateCtPorts(fileURLToPath(new URL('../../..', import.meta.url)))).toEqual([]);
    });
});
