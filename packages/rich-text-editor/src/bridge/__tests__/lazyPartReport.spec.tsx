/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { type ComponentType } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { type EditorPort } from '#/runtime/port';

import { lazyPart } from '../session/helpers/lazyPart';
import { SessionContext } from '../session/helpers/sessionContext';

const Greeting = () => <p>Loaded</p>;

describe('a lazy part that fails to load', () => {
    afterEach(cleanup);

    it('passes the error and its feature to the session once, stays hidden, and loads on the next render', async () => {
        const reportPluginError = vi.fn();
        const session = { reportPluginError } as unknown as EditorPort;
        const load = vi
            .fn<() => Promise<ComponentType>>()
            .mockRejectedValueOnce(new RangeError('secret'))
            .mockResolvedValue(Greeting);
        const Part = lazyPart(load, { featureId: 'fixture.feature' });

        const first = render(
            <SessionContext.Provider value={session}>
                <Part />
            </SessionContext.Provider>,
        );
        await waitFor(() => expect(reportPluginError).toHaveBeenCalledTimes(1));
        expect(reportPluginError).toHaveBeenCalledWith(expect.any(RangeError), 'fixture.feature');
        expect(first.container).toBeEmptyDOMElement();
        first.unmount();

        render(
            <SessionContext.Provider value={session}>
                <Part />
            </SessionContext.Provider>,
        );
        expect(await screen.findByText('Loaded')).toBeTruthy();
        expect(reportPluginError).toHaveBeenCalledTimes(1);
    });
});
