/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type EngineCommand } from '#/definition';

import { createMode } from '../../session/mode';

const command = (readOnly?: boolean) => ({ readOnly }) as unknown as EngineCommand;

const setup = (initial: 'editable' | 'readonly' = 'editable', disposed = false) => {
    const calls: string[] = [];
    const state = { disposed };
    const service = createMode({
        initial,
        isDisposed: () => state.disposed,
        onModeChange: (next) => calls.push(`mode:${next}:${service.mode()}`),
        onDisabledChange: () => calls.push(`disabled:${service.disabled()}`),
    });

    return { service, calls, state };
};

describe('createMode', () => {
    it('starts in the initial mode and enabled', () => {
        const { service } = setup('readonly');
        expect(service.mode()).toBe('readonly');
        expect(service.disabled()).toBe(false);
    });

    it('takes the mode before it tells onModeChange', () => {
        const { service, calls } = setup();
        service.set('readonly');
        expect(service.mode()).toBe('readonly');
        expect(calls).toEqual(['mode:readonly:readonly']);
    });

    it('ignores set once the session is disposed', () => {
        const { service, calls, state } = setup();
        state.disposed = true;
        service.set('readonly');
        expect(service.mode()).toBe('editable');
        expect(calls).toEqual([]);
    });

    it('takes disabled before it tells onDisabledChange, even after disposal', () => {
        const { service, calls, state } = setup();
        state.disposed = true;
        service.setDisabled(true);
        expect(service.disabled()).toBe(true);
        expect(calls).toEqual(['disabled:true']);
    });

    it('refuses only commands not marked readOnly, and only in readonly mode', () => {
        const { service } = setup();
        expect(service.refusesReadOnly(command())).toBe(false);
        service.set('readonly');
        expect(service.refusesReadOnly(command())).toBe(true);
        expect(service.refusesReadOnly(command(false))).toBe(true);
        expect(service.refusesReadOnly(command(true))).toBe(false);
    });
});
