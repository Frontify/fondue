/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentModel } from '#/model';
import { packageVersionOf } from '#/model/migrate';

import { type OperationMetric, type SessionToken } from './types';

/** What one operation reports, with the session's model and installed capabilities (SPEC-rich-text-quality/AC-029). */
export const operationMetric = (
    model: ContentModel,
    session: SessionToken,
    measured: Pick<OperationMetric, 'kind' | 'durationMs' | 'normalizationTransactions' | 'failureCode'>,
): OperationMetric =>
    Object.freeze({
        kind: measured.kind,
        session,
        packageVersion: packageVersionOf(),
        model: { id: model.ref.id, version: model.ref.version },
        capabilityIds: model.capabilities.map(({ id }) => id),
        durationMs: measured.durationMs,
        normalizationTransactions: measured.normalizationTransactions,
        failureCode: measured.failureCode,
    });
