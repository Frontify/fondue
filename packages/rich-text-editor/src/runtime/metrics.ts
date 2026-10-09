/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentModel } from '#/model';

import { type OperationMetric, type SessionToken } from './types';

type ViteImportMeta = ImportMeta & {
    readonly glob: (
        pattern: string,
        options: { readonly eager: true; readonly import: string },
    ) => Record<string, string>;
};

/** The package's own version, which Vite inlines from `package.json` when it builds or tests the module. */
export const packageVersion = (): string => {
    // The same glob read as `migrateDocument`'s, which `src/model` keeps private.
    const found = (import.meta as ViteImportMeta).glob('../../package.json', { eager: true, import: 'version' });
    return Object.values(found)[0] ?? '';
};

/** What one operation reports, with the session's model and installed capabilities (SPEC-rich-text-quality/AC-029). */
export const operationMetric = (
    model: ContentModel,
    session: SessionToken,
    measured: Pick<OperationMetric, 'kind' | 'durationMs' | 'normalizationTransactions' | 'failureCode'>,
): OperationMetric =>
    Object.freeze({
        kind: measured.kind,
        session,
        packageVersion: packageVersion(),
        model: { id: model.ref.id, version: model.ref.version },
        capabilityIds: model.capabilities.map(({ id }) => id),
        durationMs: measured.durationMs,
        normalizationTransactions: measured.normalizationTransactions,
        failureCode: measured.failureCode,
    });
