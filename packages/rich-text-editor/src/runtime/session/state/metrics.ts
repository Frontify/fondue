/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentModel } from '#/model';

import { operationMetric } from '../../reporting/metrics';
import { type OperationMetric, type SessionToken } from '../../types';

import { type BatchMetric } from './types';

export type Metrics = {
    measure(
        kind: OperationMetric['kind'],
        started: number,
        failureCode: string | null,
        normalizationTransactions?: number,
    ): void;
    /** Keeps the batch's metric until the next flush emits it. */
    record(batch: BatchMetric): void;
    /** Emits the kept batch metric, if any, as a `commit` or `paste` operation. */
    flush(): void;
};

export const createMetrics = (args: {
    model: ContentModel;
    session: () => SessionToken;
    emit: (name: 'operationMetric', metric: OperationMetric) => void;
}): Metrics => {
    let pending: BatchMetric | undefined;
    const measure: Metrics['measure'] = (kind, started, failureCode, normalizationTransactions = 0) => {
        const durationMs = Date.now() - started;
        args.emit(
            'operationMetric',
            operationMetric(args.model, args.session(), { kind, durationMs, normalizationTransactions, failureCode }),
        );
    };

    return {
        measure,
        record: (batch) => {
            pending = batch;
        },
        flush: () => {
            if (pending !== undefined) {
                const { kind, started, appended } = pending;
                pending = undefined;
                measure(kind, started, null, appended);
            }
        },
    };
};
