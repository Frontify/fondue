/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CapabilityRef, type Diagnostic, type ModelRef, type RichTextDocument } from '#/model';
import { type DocumentStamp, type SessionToken } from '#/runtime/types';

// The persistence types of `SPEC-rich-text.contracts.ts` that the host-facing types reference (DR-063).

/** Opaque, never parsed or compared numerically. `null` at load or base means create-only. */
export type ServerRevision = string;
export interface LoadedDocument {
    readonly documentId: string;
    readonly revision: ServerRevision | null;
    readonly document: RichTextDocument;
}
export interface Snapshot {
    readonly stamp: DocumentStamp;
    readonly document: RichTextDocument;
    readonly acknowledgedRevision: ServerRevision | null;
    readonly compositionActive: boolean;
}

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
export interface SaveAcknowledgment {
    /** `null` only in the acknowledgment synthesized for a loaded or replaced record that no save has touched (SPEC-rich-text-persistence/AC-024). */
    readonly operationId: string | null;
    readonly stamp: DocumentStamp;
    readonly revision: ServerRevision;
}
export type SaveResponse =
    | { readonly status: 'saved'; readonly acknowledgment: SaveAcknowledgment }
    | { readonly status: 'conflict'; readonly currentRevision: ServerRevision }
    | {
          readonly status: 'rejected';
          readonly code: 'forbidden' | 'invalid' | 'incompatible-writer';
          readonly diagnostics: readonly Diagnostic[];
      };
export interface ServiceContext {
    readonly signal: AbortSignal;
    readonly session: SessionToken;
}
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
export interface SaveStatus {
    readonly state: 'unmanaged' | 'clean' | 'dirty' | 'saving' | 'uncertain' | 'offline' | 'conflict' | 'error';
    readonly latestSequence: number;
    readonly acknowledgedSequence: number;
    readonly revision: ServerRevision | null;
    readonly inFlightOperationId: string | null;
    readonly diagnostic: Diagnostic | null;
}
export interface CommitOptions {
    readonly reason: 'submit' | 'navigate' | 'manual';
    /** Default `wait`. */
    readonly composition?: 'wait' | 'reject';
    /** Default `PersistenceOptions.timeoutMs`. */
    readonly timeoutMs?: number;
}
export type CommitResult =
    | { readonly status: 'acknowledged'; readonly acknowledgment: SaveAcknowledgment }
    | {
          readonly status: 'blocked';
          readonly code: 'unmanaged' | 'composition-active' | 'conflict' | 'forbidden' | 'not-ready';
      }
    | {
          readonly status: 'failed';
          readonly code: 'timeout' | 'transport' | 'disposed' | 'incompatible-writer' | 'invalid';
          readonly outcome: 'not-sent' | 'unknown' | 'rejected';
      };
export interface RecoveryCheckpoint {
    /** The snapshot's stamp; at a fault, the last published sequence plus one (SPEC-rich-text-runtime/AC-015). */
    readonly stamp: DocumentStamp;
    readonly acknowledgedRevision: ServerRevision | null;
    readonly document: RichTextDocument;
}
/** Created only by a host recovery service after acknowledgment. */
export interface RecoveryReceipt {
    readonly stamp: DocumentStamp;
    readonly receiptId: string;
}
export interface RecoveryService {
    store(checkpoint: RecoveryCheckpoint, context: ServiceContext): Promise<RecoveryReceipt>;
}
export interface ReplaceDocumentRequest {
    readonly expected: DocumentStamp;
    readonly next: LoadedDocument;
    readonly unsaved:
        | { readonly action: 'reject' }
        | { readonly action: 'save' }
        | { readonly action: 'checkpoint'; readonly receipt: RecoveryReceipt }
        | { readonly action: 'discard'; readonly confirmed: true };
    readonly selection: 'start' | 'end';
    /** Replacement cannot keep history in v1. */
    readonly history: 'reset';
}
export type ReplaceResult =
    | { readonly status: 'replaced'; readonly session: SessionToken }
    | {
          readonly status: 'rejected';
          readonly code:
              | 'changed-since-request'
              | 'invalid-document'
              | 'wrong-model'
              | 'unsaved'
              | 'composition-active'
              | 'save-unresolved'
              | 'checkpoint-invalid'
              | 'not-ready'
              | 'faulted';
      };
