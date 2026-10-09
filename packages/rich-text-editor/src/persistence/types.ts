/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CapabilityRef, type Diagnostic, type ModelRef, type RichTextDocument } from '#/model';
import {
    type DocumentStamp,
    type LoadedDocument,
    type SaveAcknowledgment,
    type ServerRevision,
    type ServiceContext,
    type Snapshot,
} from '#/runtime/types';

// The persistence types of `SPEC-rich-text.contracts.ts` that the host-facing types reference (DR-063).
// The runtime builds replacement and recovery, so their types live in `src/runtime/types.ts`.
export {
    type LoadedDocument,
    type RecoveryCheckpoint,
    type RecoveryReceipt,
    type RecoveryService,
    type ReplaceDocumentRequest,
    type ReplaceResult,
    type ServiceContext,
} from '#/runtime/types';

export interface SaveRequest {
    readonly operationId: string;
    readonly stamp: DocumentStamp;
    readonly baseRevision: ServerRevision | null;
    readonly document: RichTextDocument;
    readonly writer: {
        readonly build: string;
        readonly formatVersion: 1;
        readonly model: ModelRef;
        readonly capabilities: readonly CapabilityRef[];
    };
}
export type SaveResponse =
    | { readonly status: 'saved'; readonly acknowledgment: SaveAcknowledgment }
    | { readonly status: 'conflict'; readonly currentRevision: ServerRevision }
    | {
          readonly status: 'rejected';
          readonly code: 'forbidden' | 'invalid' | 'incompatible-writer';
          readonly diagnostics: readonly Diagnostic[];
      };
export interface PersistenceService {
    save(request: SaveRequest, context: ServiceContext): Promise<SaveResponse>;
    read(documentId: string, context: ServiceContext): Promise<LoadedDocument>;
}
export interface PersistenceOptions {
    readonly autosave?: 'debounced' | 'off';
    /** Defaults: 500, 5000, 30000, 5 and 1000. */
    readonly delayMs?: number;
    readonly maxWaitMs?: number;
    readonly timeoutMs?: number;
    readonly maxRetries?: number;
    readonly backoffMs?: number;
    readonly onConflict?: (remote: LoadedDocument | null, local: Snapshot) => void;
}
