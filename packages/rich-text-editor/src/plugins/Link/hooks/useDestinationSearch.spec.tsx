/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type LinkDestination, type LinkSearch } from '../helpers/destination';
import { type LinkPolicy } from '../helpers/policy';

import { type DestinationSearch, useDestinationSearch } from './useDestinationSearch';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const PAGE: LinkDestination = { id: 'a', label: 'Brand', href: 'https://frontify.com/brand' };
const ELSEWHERE: LinkDestination = { id: 'b', label: 'Elsewhere', href: 'https://example.com/x' };

const teardown: (() => void)[] = [];
beforeEach(() => {
    vi.useFakeTimers();
});
afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
    vi.useRealTimers();
});

type ProbeProps = {
    query: string;
};

const mountHook = (search: LinkSearch | undefined, initialQuery: string, policy: LinkPolicy = {}) => {
    const container = window.document.createElement('div');
    const root = createRoot(container);
    let latest: DestinationSearch = { status: 'idle' };
    const Probe = ({ query }: ProbeProps) => {
        latest = useDestinationSearch(search, query, policy);
        return null;
    };
    act(() => root.render(<Probe query={initialQuery} />));
    const unmount = (): void => act(() => root.unmount());
    teardown.push(() => {
        // Already unmounted by a test that checks that.
        try {
            unmount();
        } catch {
            // nothing left to clean
        }
    });
    return {
        current: () => latest,
        setQuery: (query: string) => act(() => root.render(<Probe query={query} />)),
        unmount,
    };
};

const advance = async (ms: number): Promise<void> => {
    await act(async () => {
        await vi.advanceTimersByTimeAsync(ms);
    });
};

describe('the destination search', () => {
    it('stays idle, with no request, for an empty or blank query', async () => {
        const search = vi.fn<LinkSearch>(() => Promise.resolve([PAGE]));
        const hook = mountHook(search, '   ');

        await advance(1000);

        expect(search).not.toHaveBeenCalled();
        expect(hook.current()).toEqual({ status: 'idle' });
    });

    it('waits for a pause of 200 ms, then asks once with the trimmed query', async () => {
        const search = vi.fn<LinkSearch>(() => Promise.resolve([PAGE]));
        const hook = mountHook(search, '');

        hook.setQuery('br');
        await advance(150);
        hook.setQuery(' bra ');
        await advance(150);
        expect(search).not.toHaveBeenCalled();
        expect(hook.current().status).toBe('searching');

        await advance(50);

        expect(search).toHaveBeenCalledTimes(1);
        expect(search.mock.calls[0]?.[0]).toBe('bra');
        expect(hook.current()).toEqual({ status: 'done', results: [PAGE] });
    });

    it('aborts the request in flight when a new query arrives, and never shows its answer', async () => {
        const signals: AbortSignal[] = [];
        const resolvers: ((found: readonly LinkDestination[]) => void)[] = [];
        const search: LinkSearch = (_query, signal) => {
            signals.push(signal);
            return new Promise((resolve) => resolvers.push(resolve));
        };
        const hook = mountHook(search, 'a');
        await advance(200);
        expect(signals).toHaveLength(1);

        hook.setQuery('ab');

        expect(signals[0]?.aborted).toBe(true);
        await advance(200);
        expect(signals).toHaveLength(2);
        expect(signals[1]?.aborted).toBe(false);
        await act(async () => {
            resolvers[0]?.([ELSEWHERE]);
            await Promise.resolve();
        });
        expect(hook.current()).toEqual({ status: 'searching' });
        await act(async () => {
            resolvers[1]?.([PAGE]);
            await Promise.resolve();
        });
        expect(hook.current()).toEqual({ status: 'done', results: [PAGE] });
    });

    it('aborts on unmount', async () => {
        const signals: AbortSignal[] = [];
        const search: LinkSearch = (_query, signal) => {
            signals.push(signal);
            return new Promise(() => undefined);
        };
        const hook = mountHook(search, 'a');
        await advance(200);

        hook.unmount();

        expect(signals[0]?.aborted).toBe(true);
    });

    it('drops destinations the policy refuses', async () => {
        const search: LinkSearch = () =>
            Promise.resolve([PAGE, ELSEWHERE, { id: 'c', label: 'Script', href: 'javascript:alert(1)' }]);
        const hook = mountHook(search, 'a', { allowedHosts: ['frontify.com'] });

        await advance(200);

        expect(hook.current()).toEqual({ status: 'done', results: [PAGE] });
    });

    it('reports a failed search with no results', async () => {
        const search: LinkSearch = () => Promise.reject(new Error('offline'));
        const hook = mountHook(search, 'a');

        await advance(200);

        expect(hook.current()).toEqual({ status: 'failed' });
    });
});
