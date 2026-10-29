/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { installRuntimeHooks, para, start, stored } from './fixtures/start';

installRuntimeHooks();

describe('block decorations', () => {
    it('reports a decoration source that rejects', async () => {
        const session = start(stored(para()), {
            parts: [
                {
                    feature: 'core',
                    decorations: [
                        {
                            id: 'fixture.decoration',
                            nodes: ['paragraph'],
                            derive: () => Promise.reject(new TypeError('secret decoration')),
                        },
                    ],
                },
            ],
        });

        await Promise.resolve();
        await Promise.resolve();

        expect(session.diagnostics).toEqual([
            {
                code: 'runtime.plugin-error',
                severity: 'error',
                messageKey: 'runtime.plugin-error',
                details: { name: 'TypeError' },
            },
        ]);
        expect(JSON.stringify(session.diagnostics)).not.toContain('secret decoration');
    });
});
