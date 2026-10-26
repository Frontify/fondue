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

// The runtime builds replacement and recovery, so their types live with the runtime types.
export type {
    CommitOptions,
    CommitResult,
    LoadedDocument,
    RecoveryCheckpoint,
    RecoveryReceipt,
    RecoveryService,
    ReplaceDocumentRequest,
    ReplaceResult,
    SaveAcknowledgment,
    SaveStatus,
    ServerRevision,
    ServiceContext,
    Snapshot,
} from '#/runtime/types';

/** What the editor sends to the persistence service to save: the operation, the revision it builds on and the document. */
export type SaveRequest = {
    readonly operationId: string;
    readonly stamp: DocumentStamp;
    readonly baseRevision: ServerRevision | null;
    readonly document: RichTextDocument;
    readonly writer: {
        build: string;
        formatVersion: 1;
        model: ModelRef;
        capabilities: readonly CapabilityRef[];
    };
};
/** The persistence service's answer to a save: saved, conflict, or failed. */
export type SaveResponse =
    | { status: 'saved'; acknowledgment: SaveAcknowledgment }
    | { status: 'conflict'; currentRevision: ServerRevision }
    | {
          status: 'rejected';
          code: 'forbidden' | 'invalid' | 'incompatible-writer';
          diagnostics: readonly Diagnostic[];
      };
/** The host service that saves and reads documents. */
export type PersistenceService = {
    save(request: SaveRequest, context: ServiceContext): Promise<SaveResponse>;
    read(documentId: string, context: ServiceContext): Promise<LoadedDocument>;
};
/** Options for autosave: when it runs and the delays and limits of its retries. */
export type PersistenceOptions = {
    autosave?: 'debounced' | 'off';
    /** Default `true`; a host with its own leave guard sets it to `false`. */
    unloadGuard?: boolean;
    /** Defaults: 500, 5000, 30000, 5 and 1000. */
    delayMs?: number;
    maxWaitMs?: number;
    timeoutMs?: number;
    maxRetries?: number;
    backoffMs?: number;
    onConflict?: (remote: LoadedDocument | null, local: Snapshot) => void;
};
