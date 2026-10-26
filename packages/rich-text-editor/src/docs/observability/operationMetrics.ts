/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorHandle, type OperationMetric } from '#/index';

/** Collects the duration of each operation by kind, and the normalization transactions they appended. */
export const collectOperationMetrics = (handle: EditorHandle<object>) => {
    const durations = new Map<OperationMetric['kind'], number[]>();
    let normalizationTransactions = 0;
    const stop = handle.subscribe('operationMetric', (metric) => {
        const kind = durations.get(metric.kind) ?? [];
        kind.push(metric.durationMs);
        durations.set(metric.kind, kind);
        normalizationTransactions += metric.normalizationTransactions;
    });

    return { durations, normalizationTransactions: () => normalizationTransactions, stop };
};
