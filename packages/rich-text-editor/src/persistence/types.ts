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
    /** Identifies the write, so a replay of it is not stored twice. */
    readonly operationId: string;
    /** The session, generation and sequence of the snapshot being saved. */
    readonly stamp: DocumentStamp;
    /** The revision this write builds on, `null` for a new record. */
    readonly baseRevision: ServerRevision | null;
    readonly document: RichTextDocument;
    /** The package build, document format and model that wrote `document`. */
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
    /** Stores the document; answers `conflict` when `baseRevision` is no longer the current one. */
    save(request: SaveRequest, context: ServiceContext): Promise<SaveResponse>;
    /** Reads the current stored document. */
    read(documentId: string, context: ServiceContext): Promise<LoadedDocument>;
};
/** Options for autosave: when it runs and the delays and limits of its retries. */
export type PersistenceOptions = {
    /**
     * `debounced` saves after changes settle; `off` saves only on `requestCommit`.
     * @default 'debounced'
     */
    autosave?: 'debounced' | 'off';
    /**
     * A host with its own leave guard sets it to `false`.
     * @default true
     */
    unloadGuard?: boolean;
    /**
     * Wait after the last change before an autosave starts.
     * @default 500
     */
    delayMs?: number;
    /**
     * Longest an unsaved change waits for an autosave while changes keep coming.
     * @default 5000
     */
    maxWaitMs?: number;
    /**
     * How long a write may take before its outcome counts as unknown.
     * @default 30000
     */
    timeoutMs?: number;
    /**
     * Replays of a write with an unknown outcome before the state becomes `error`.
     * @default 5
     */
    maxRetries?: number;
    /**
     * The first retry delay; each later retry doubles it.
     * @default 1000
     */
    backoffMs?: number;
    /** Called with the server's copy, or `null` when it cannot be read, and the local snapshot after a conflict. */
    onConflict?: (remote: LoadedDocument | null, local: Snapshot) => void;
};
