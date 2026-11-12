/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { warnOnce } from './warnings';

describe('warnOnce', () => {
    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllEnvs();
    });

    it('says a message once per key', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        warnOnce('once:a', 'first');
        warnOnce('once:a', 'second');
        warnOnce('once:b', 'third');

        expect(warn.mock.calls).toEqual([['first'], ['third']]);
    });

    it('logs what was thrown after the message', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
        const problem = new Error('boom');

        warnOnce('detail:a', 'it failed', problem);

        expect(warn).toHaveBeenCalledWith('it failed', problem);
    });

    it('stays silent in production', () => {
        vi.stubEnv('NODE_ENV', 'production');
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        warnOnce('production:a', 'quiet');

        expect(warn).not.toHaveBeenCalled();
    });
});
