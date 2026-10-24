/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest';

import { core } from '#/features/core/feature';
import { compileContentModel } from '#/model';

import { createMetrics } from '../../session/metrics';
import { type OperationMetric, type SessionToken } from '../../types';

const model = compileContentModel([core()], { id: 'test.metrics', version: 1 });
const token: SessionToken = { documentId: 'doc', sessionId: 'session', generation: 0 };

const setup = () => {
    const emitted: OperationMetric[] = [];
    const metrics = createMetrics({ model, session: () => token, emit: (_name, metric) => emitted.push(metric) });
    return { emitted, metrics };
};

describe('createMetrics', () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it('emits the measured operation with its duration, failure code and the session token', () => {
        vi.useFakeTimers();
        vi.setSystemTime(1000);
        const { emitted, metrics } = setup();
        metrics.measure('replace', 400, 'invalid', 3);
        expect(emitted).toHaveLength(1);
        expect(emitted[0]).toMatchObject({
            kind: 'replace',
            session: token,
            durationMs: 600,
            normalizationTransactions: 3,
            failureCode: 'invalid',
        });
    });

    it('counts no normalization transactions unless given', () => {
        const { emitted, metrics } = setup();
        metrics.measure('mount', Date.now(), null);
        expect(emitted[0]?.normalizationTransactions).toBe(0);
    });

    it('emits a recorded batch only when flushed, and only once', () => {
        vi.useFakeTimers();
        vi.setSystemTime(1000);
        const { emitted, metrics } = setup();
        metrics.record({ kind: 'paste', started: 900, appended: 2 });
        expect(emitted).toEqual([]);
        metrics.flush();
        expect(emitted).toHaveLength(1);
        expect(emitted[0]).toMatchObject({
            kind: 'paste',
            durationMs: 100,
            normalizationTransactions: 2,
            failureCode: null,
        });
        metrics.flush();
        expect(emitted).toHaveLength(1);
    });

    it('keeps only the latest recorded batch', () => {
        const { emitted, metrics } = setup();
        metrics.record({ kind: 'commit', started: Date.now(), appended: 1 });
        metrics.record({ kind: 'paste', started: Date.now(), appended: 4 });
        metrics.flush();
        expect(emitted).toHaveLength(1);
        expect(emitted[0]).toMatchObject({ kind: 'paste', normalizationTransactions: 4 });
    });

    it('flushes with nothing recorded without emitting', () => {
        const { emitted, metrics } = setup();
        metrics.flush();
        expect(emitted).toEqual([]);
    });
});
