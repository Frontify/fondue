/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic, type ModelRef, type RichTextDocument } from '#/model';
import { type LanguageTag, type StoredId } from '#/model/internal';

export type { LanguageTag, StoredId };

// Host-facing runtime types.

/** A function that stops the listener it was returned for. */
export type Unsubscribe = () => void;
/** The text direction of content. */
export type Direction = 'ltr' | 'rtl' | 'auto';
/** A heading level, from 1 to 6. */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
/** The alignment a block can have. */
export type Alignment = 'left' | 'center' | 'right' | 'justify';

/** A stored reference to a resource, with the label it had when it was stored. */
export interface ReferenceValue {
    readonly resourceType: StoredId;
    readonly resourceId: string;
    readonly labelSnapshot: string;
    /** Set on link destination results. */
    readonly href?: string;
    /** Suggestion avatar, shown when it passes `checkHref`. Not stored on the mention. */
    readonly imageUrl?: string;
    /** Suggestion fallback icon. Not stored on the mention. */
    readonly kind?: 'user' | 'group' | 'everyone';
}

/** What a host lets users do with a feature: create, edit, remove and paste it. */
export interface FeaturePolicy {
    readonly create: boolean;
    readonly edit: boolean;
    readonly remove: boolean;
    readonly paste: boolean;
}
/** What a host lets users do in the editor: the policy per feature, the heading levels and the Enter behavior. */
export interface AuthoringPolicy {
    readonly features: Readonly<Record<string, FeaturePolicy>>;
    readonly creatableHeadingLevels: readonly HeadingLevel[];
    /** `paragraph` by default in Comment, Document and Brand document, where Comment may use `submit`; Inline defaults to `submit`, which acts as `none` while the host sets no `onSubmit`. */
    readonly enterBehavior: 'paragraph' | 'submit' | 'none';
}

/** A colour stored either as a token id or as a literal value. */
export type ColorValue = { readonly tokenId: StoredId } | { readonly value: string };
/**
 * The core's commands, which every definition has. A feature's commands come from its plugin (`CommandsOfPart`) and
 * type a definition's own map.
 */
export interface ShippedCommands {
    readonly 'history.undo': undefined;
    readonly 'history.redo': undefined;
    readonly 'paragraph.set': undefined;
    readonly 'text.insert': { readonly text: string };
    readonly 'hard-break.insert': undefined;
    readonly 'block.move.up': undefined;
    readonly 'block.move.down': undefined;
}
/** The id of a command the editor ships. */
export type CommandId = Extract<keyof ShippedCommands, string>;
/** The id of a command in a given command map. */
export type CommandKey<C extends object> = Extract<keyof C, string>;
/** A command whose payload may be `undefined` may be called without the argument. */
export type CommandArgs<C extends object, K extends CommandKey<C>> = undefined extends C[K]
    ? [payload?: C[K], options?: CommandOptions]
    : [payload: C[K], options?: CommandOptions];

declare const selectionHandleBrand: unique symbol;
/** Opaque, session-local and releasable; never persisted or sent to a server. */
export interface SelectionHandle {
    readonly [selectionHandleBrand]: true;
    readonly id: string;
    readonly session: SessionToken;
}
/** Options for capturing the selection: what it is for and how an edit that crosses it is handled. */
export interface CaptureTargetOptions {
    readonly purpose: 'format' | 'insert' | 'replace-text' | 'edit-node';
    readonly onIntersectingEdit: 'invalidate' | 'map';
}
/** The outcome of capturing the selection: the target, or why it was rejected. */
export type CaptureResult =
    | { readonly status: 'captured'; readonly target: SelectionHandle }
    | { readonly status: 'rejected'; readonly code: 'not-ready' };
/** Options for running a command: the selection it targets and where focus goes. */
export interface CommandOptions {
    readonly target?: SelectionHandle;
    readonly focus?: 'preserve' | 'editor';
}
/** Whether a command can run now and whether it is active, with the reason if it cannot. */
export interface CommandState {
    readonly enabled: boolean;
    readonly active: boolean | 'mixed';
    readonly disabledReason: string | null;
}
/** A minor release may add rejection codes, so handle a code you do not know. */
export type CommandResult =
    | { readonly status: 'applied' | 'no-op'; readonly stamp: DocumentStamp; readonly contentChanged: boolean }
    | {
          readonly status: 'rejected';
          readonly code:
              | 'not-ready'
              | 'busy'
              | 'readonly'
              | 'not-allowed'
              | 'not-applicable'
              | 'unknown-command'
              | 'invalid-payload'
              | 'target-invalid'
              | 'wrong-session'
              | 'composition-active';
      };

/** Names one mounted editor session, so a late answer to an earlier session can be told apart. */
export interface SessionToken {
    readonly documentId: string;
    readonly sessionId: string;
    readonly generation: number;
}
/** `sequence` advances once for each effective persisted-content change. */
export interface DocumentStamp extends SessionToken {
    readonly sequence: number;
}
/** A short description of the current selection: its kind and whether it is collapsed. */
export interface SelectionSummary {
    /** `gap` is a caret between two blocks where no text can go, such as before a leading image or between two rules. */
    readonly kind: 'text' | 'node' | 'cells' | 'gap' | 'all' | 'none';
    readonly collapsed: boolean;
    readonly blockType: string | null;
    readonly selectedNodeId: string | null;
}
/** A minor release may add origins, so handle an origin you do not know. */
export type ChangeOrigin =
    | 'input'
    | 'command'
    | 'paste'
    | 'cut'
    | 'drop'
    | 'history'
    | 'async'
    | 'external'
    | 'normalization'
    | 'unknown';
/** A change the editor reports: its stamp, sequence and what caused it. */
export interface DocumentChange {
    readonly stamp: DocumentStamp;
    readonly commitSequence: number;
    readonly origin: ChangeOrigin;
    readonly commandId: string | null;
    /** Serializes the captured immutable document lazily; not a live read. */
    readonly readDocument: () => RichTextDocument;
}
/** A snapshot of the editor for a host: its session, phase and mode, and a way to read the document. */
export interface EditorSummary {
    readonly session: SessionToken;
    readonly phase: 'mounting' | 'ready' | 'transitioning' | 'faulted' | 'disposed';
    readonly mode: 'editable' | 'readonly';
    readonly commitSequence: number;
    /** The effective-change counter the glossary calls `sequence`. */
    readonly sequence: number;
    readonly compositionActive: boolean;
    readonly selection: SelectionSummary;
}

/** Opaque, never parsed or compared numerically. `null` at load or base means create-only. */
export type ServerRevision = string;
/** The document at one stamp, with the revision the server last acknowledged for it. */
export interface Snapshot {
    readonly stamp: DocumentStamp;
    readonly document: RichTextDocument;
    readonly acknowledgedRevision: ServerRevision | null;
    readonly compositionActive: boolean;
}
/** The server's confirmation that a save took, with the stamp and revision it covers. */
export interface SaveAcknowledgment {
    /** `null` only in the acknowledgment synthesized for a loaded or replaced record that no save has touched. */
    readonly operationId: string | null;
    readonly stamp: DocumentStamp;
    readonly revision: ServerRevision;
}
/** Where saving stands: its state and the newest and last acknowledged sequences. */
export interface SaveStatus {
    readonly state: 'unmanaged' | 'clean' | 'dirty' | 'saving' | 'uncertain' | 'offline' | 'conflict' | 'error';
    readonly latestSequence: number;
    readonly acknowledgedSequence: number;
    readonly revision: ServerRevision | null;
    readonly inFlightOperationId: string | null;
    readonly diagnostic: Diagnostic | null;
}
/** Options for forcing a commit: why it is asked and whether to wait for or reject an open composition. */
export interface CommitOptions {
    readonly reason: 'submit' | 'navigate' | 'manual';
    /** Default `wait`. */
    readonly composition?: 'wait' | 'reject';
    /** Default `PersistenceOptions.timeoutMs`. */
    readonly timeoutMs?: number;
}
/** A minor release may add failure codes, so handle a code you do not know. */
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
/** A document as a host loaded it: its id, server revision and content. */
export interface LoadedDocument {
    readonly documentId: string;
    readonly revision: ServerRevision | null;
    readonly document: RichTextDocument;
}
/** What every host service call gets: a signal to cancel it and the session that asked. */
export interface ServiceContext {
    readonly signal: AbortSignal;
    readonly session: SessionToken;
}
/** The unsaved document the editor hands to the recovery service, with its stamp and revision. */
export interface RecoveryCheckpoint {
    /** The snapshot's stamp; at a fault, the last published sequence plus one. */
    readonly stamp: DocumentStamp;
    readonly acknowledgedRevision: ServerRevision | null;
    readonly document: RichTextDocument;
}
/** Created only by a host recovery service after acknowledgment. */
export interface RecoveryReceipt {
    readonly stamp: DocumentStamp;
    readonly receiptId: string;
}
/** The host service that keeps unsaved content safe when saving cannot finish. */
export interface RecoveryService {
    store(checkpoint: RecoveryCheckpoint, context: ServiceContext): Promise<RecoveryReceipt>;
}
/** A request to replace the open document with another, naming the stamp it expects and what to do with unsaved edits. */
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
/** A minor release may add failure codes, so handle a code you do not know. */
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
/** A timing the editor reports for an operation such as mount, commit, paste, save or replace. */
export interface OperationMetric {
    readonly kind: 'mount' | 'commit' | 'paste' | 'save' | 'replace';
    readonly session: SessionToken;
    readonly packageVersion: string;
    readonly model: ModelRef;
    readonly capabilityIds: readonly string[];
    readonly durationMs: number;
    readonly normalizationTransactions: number;
    readonly failureCode: string | null;
}

/** What the chrome of a slot shows of its upload; never a document attribute. */
export interface UploadStatus {
    readonly state: 'queued' | 'running' | 'failed' | 'stopped';
    /** Whole percent once the service reports progress, else `null`. */
    readonly progress: number | null;
    readonly name: string;
}
