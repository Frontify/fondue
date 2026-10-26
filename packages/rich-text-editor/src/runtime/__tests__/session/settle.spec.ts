/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { createSettle } from '../../session/lifecycle/settle';
import { createBusy } from '../../session/state/busy';

const setup = ({ mapping, installs = true }: { mapping?: object; installs?: boolean } = {}) => {
    const calls: string[] = [];
    const busy = createBusy();
    const settle = createSettle({
        busy,
        commit: {
            guarded: (work) => {
                calls.push('guarded');

                return work();
            },
            settleProvisional: () => {
                calls.push('settleProvisional');

                return installs;
            },
        },
        shown: { takeProvisional: () => (mapping === undefined ? undefined : (mapping as never)) },
        view: { refresh: () => calls.push(`refresh:${String(busy.isBusy())}`) },
        targets: () => ({ coordinator: { settle: () => calls.push('coordinator.settle') } as never }),
        saving: { settled: () => calls.push('saving.settled') },
        composition: { resolve: (outcome) => calls.push(`resolve:${outcome}`) },
    });

    return { settle, calls };
};

describe('createSettle', () => {
    it('checks the provisional batches under the guard, then refreshes and settles the rest in order', () => {
        const { settle, calls } = setup({ mapping: {} });
        settle();
        expect(calls).toEqual([
            'guarded',
            'settleProvisional',
            'refresh:true',
            'coordinator.settle',
            'saving.settled',
            'resolve:settled',
        ]);
    });

    it('refreshes without a check when no provisional batch exists', () => {
        const { settle, calls } = setup();
        settle();
        expect(calls).toEqual(['refresh:true', 'coordinator.settle', 'saving.settled', 'resolve:settled']);
    });

    it('skips the refresh when the settled state does not install, and still settles the rest', () => {
        const { settle, calls } = setup({ mapping: {}, installs: false });
        settle();
        expect(calls).toEqual([
            'guarded',
            'settleProvisional',
            'coordinator.settle',
            'saving.settled',
            'resolve:settled',
        ]);
    });
});
