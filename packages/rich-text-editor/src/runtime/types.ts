/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic, type ModelRef, type RichTextDocument } from '#/model';
import { type LanguageTag, type StoredId } from '#/model/internal';

export { type AuthoringPolicy, type FeaturePolicy, type HeadingLevel } from './definition/policy';

export type { LanguageTag, StoredId };

// Host-facing runtime types.

/** A function that stops the listener it was returned for. */
export type Unsubscribe = () => void;
/** The text direction of content. */
export type Direction = 'ltr' | 'rtl' | 'auto';
/** The alignment a block can have. */
export type Alignment = 'left' | 'center' | 'right' | 'justify';

/** A stored reference to a resource, with the label it had when it was stored. */
export type ReferenceValue = {
    resourceType: StoredId;
    resourceId: string;
    labelSnapshot: string;
    /** Set on link destination results. */
    href?: string;
    /** Suggestion avatar, shown when it passes `checkHref`. Not stored on the mention. */
    imageUrl?: string;
    /** Suggestion fallback icon. Not stored on the mention. */
    kind?: 'user' | 'group' | 'everyone';
};

/** A colour stored either as a token id or as a literal value. */
export type ColorValue = { tokenId: StoredId } | { value: string };
/**
 * The core's commands, which every definition has. A feature's commands come from its plugin (`CommandsOfPart`) and
 * type a definition's own map.
 */
export type ShippedCommands = {
    'history.undo': undefined;
    'history.redo': undefined;
    'paragraph.set': undefined;
    'text.insert': { text: string };
    'hard-break.insert': undefined;
    'block.move.up': undefined;
    'block.move.down': undefined;
};
/** The id of a command the editor ships. */
export type CommandId = Extract<keyof ShippedCommands, string>;
/** The id of a command in a given command map. */
export type CommandKey<Commands extends object> = Extract<keyof Commands, string>;
/** A command whose payload may be `undefined` may be called without the argument. */
export type CommandArgs<Commands extends object, Key extends CommandKey<Commands>> = undefined extends Commands[Key]
    ? [payload?: Commands[Key], options?: CommandOptions]
    : [payload: Commands[Key], options?: CommandOptions];

declare const selectionHandleBrand: unique symbol;
/** Opaque, session-local and releasable; never persisted or sent to a server. */
export type SelectionHandle = {
    readonly [selectionHandleBrand]: true;
    readonly id: string;
    /** The session that captured it; a command from another session rejects as `wrong-session`. */
    readonly session: SessionToken;
};
/** Options for capturing the selection: what it is for and how an edit that crosses it is handled. */
export type CaptureTargetOptions = {
    /** What the target is for: `insert` keeps a point, `edit-node` the node after the selection start, the others the range. */
    purpose: 'format' | 'insert' | 'replace-text' | 'edit-node';
    /** What an edit that overlaps the target does to it: `invalidate` makes it unusable, `map` moves it with the edit. */
    onIntersectingEdit: 'invalidate' | 'map';
};
/** The outcome of capturing the selection: the target, or why it was rejected. */
export type CaptureResult = { status: 'captured'; target: SelectionHandle } | { status: 'rejected'; code: 'not-ready' };
/** Options for running a command: the selection it targets and where focus goes. */
export type CommandOptions = {
    /** A captured selection to run on, in place of the current one. */
    target?: SelectionHandle;
    /**
     * Where focus goes after the command: `editor` moves it into the editor.
     *
     * @default 'preserve'
     */
    focus?: 'preserve' | 'editor';
};
/** Whether a command can run now and whether it is active, with the reason if it cannot. */
export type CommandState = {
    /** Whether the command can run now. */
    enabled: boolean;
    /** Whether its effect holds at the selection; `mixed` when it holds for part of a range. */
    active: boolean | 'mixed';
    /** Why the command cannot run, or `null` when it can. */
    disabledReason: string | null;
};
/** A minor release may add rejection codes, so handle a code you do not know. */
export type CommandResult =
    | { status: 'applied' | 'no-op'; stamp: DocumentStamp; contentChanged: boolean }
    | {
          status: 'rejected';
          code:
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
export type SessionToken = {
    readonly documentId: string;
    readonly sessionId: string;
    readonly generation: number;
};
/** `sequence` advances once for each effective persisted-content change. */
export type DocumentStamp = {
    readonly sequence: number;
} & SessionToken;
/** A short description of the current selection: its kind and whether it is collapsed. */
export type SelectionSummary = {
    /** `gap` is a caret between two blocks where no text can go, such as before a leading image or between two rules. */
    kind: 'text' | 'node' | 'cells' | 'gap' | 'all' | 'none';
    /** Whether the selection is a caret. */
    collapsed: boolean;
    /** The type of the block that holds the selection, or `null` when none does. */
    blockType: string | null;
    /** The `nodeId` of the selected node, or `null` when the selection is no node or the node has none. */
    selectedNodeId: string | null;
};
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
export type DocumentChange = {
    stamp: DocumentStamp;
    commitSequence: number;
    origin: ChangeOrigin;
    commandId: string | null;
    /** Serializes the captured immutable document lazily; not a live read. */
    readDocument: () => RichTextDocument;
};
/** A snapshot of the editor for a host: its session, phase and mode, and a way to read the document. */
export type EditorSummary = {
    session: SessionToken;
    phase: 'mounting' | 'ready' | 'transitioning' | 'faulted' | 'disposed';
    mode: 'editable' | 'readonly';
    commitSequence: number;
    /** The effective-change counter the glossary calls `sequence`. */
    sequence: number;
    compositionActive: boolean;
    selection: SelectionSummary;
};

/** Opaque, never parsed or compared numerically. `null` at load or base means create-only. */
export type ServerRevision = string;
/** The document at one stamp, with the revision the server last acknowledged for it. */
export type Snapshot = {
    readonly stamp: DocumentStamp;
    readonly document: RichTextDocument;
    readonly acknowledgedRevision: ServerRevision | null;
    readonly compositionActive: boolean;
};
/** The server's confirmation that a save took, with the stamp and revision it covers. */
export type SaveAcknowledgment = {
    /** `null` only in the acknowledgment synthesized for a loaded or replaced record that no save has touched. */
    operationId: string | null;
    stamp: DocumentStamp;
    revision: ServerRevision;
};
/** Where saving stands: its state and the newest and last acknowledged sequences. */
export type SaveStatus = {
    readonly state: 'unmanaged' | 'clean' | 'dirty' | 'saving' | 'uncertain' | 'offline' | 'conflict' | 'error';
    readonly latestSequence: number;
    readonly acknowledgedSequence: number;
    readonly revision: ServerRevision | null;
    readonly inFlightOperationId: string | null;
    readonly diagnostic: Diagnostic | null;
};
/** Options for forcing a commit: why it is asked and whether to wait for or reject an open composition. */
export type CommitOptions = {
    /** Why the commit is asked. */
    reason: 'submit' | 'navigate' | 'manual';
    /**
     * What to do while a composition is open.
     *
     * @default 'wait'
     */
    composition?: 'wait' | 'reject';
    /**
     * How long to wait for the acknowledgment, in milliseconds.
     *
     * @default PersistenceOptions.timeoutMs
     */
    timeoutMs?: number;
};
/** A minor release may add failure codes, so handle a code you do not know. */
export type CommitResult =
    | { status: 'acknowledged'; acknowledgment: SaveAcknowledgment }
    | {
          status: 'blocked';
          code: 'unmanaged' | 'composition-active' | 'conflict' | 'forbidden' | 'not-ready';
      }
    | {
          status: 'failed';
          code: 'timeout' | 'transport' | 'disposed' | 'incompatible-writer' | 'invalid';
          outcome: 'not-sent' | 'unknown' | 'rejected';
      };
/** A document as a host loaded it: its id, server revision and content. */
export type LoadedDocument = {
    documentId: string;
    revision: ServerRevision | null;
    document: RichTextDocument;
};
/** What every host service call gets: a signal to cancel it and the session that asked. */
export type ServiceContext = {
    /** Aborts when the editor no longer needs the answer. */
    signal: AbortSignal;
    /** The session that made the call. */
    session: SessionToken;
};
/** The unsaved document the editor hands to the recovery service, with its stamp and revision. */
export type RecoveryCheckpoint = {
    /** The snapshot's stamp; at a fault, the last published sequence plus one. */
    stamp: DocumentStamp;
    acknowledgedRevision: ServerRevision | null;
    document: RichTextDocument;
};
/** Created only by a host recovery service after acknowledgment. */
export type RecoveryReceipt = {
    stamp: DocumentStamp;
    receiptId: string;
};
/** The host service that keeps unsaved content safe when saving cannot finish. */
export type RecoveryService = {
    /** Keeps the checkpoint and resolves with a receipt once it is safe. */
    store(checkpoint: RecoveryCheckpoint, context: ServiceContext): Promise<RecoveryReceipt>;
};
/** A request to replace the open document with another, naming the stamp it expects and what to do with unsaved edits. */
export type ReplaceDocumentRequest = {
    expected: DocumentStamp;
    next: LoadedDocument;
    unsaved:
        | { action: 'reject' }
        | { action: 'save' }
        | { action: 'checkpoint'; receipt: RecoveryReceipt }
        | { action: 'discard'; confirmed: true };
    selection: 'start' | 'end';
    /** Replacement cannot keep history in v1. */
    history: 'reset';
};
/** A minor release may add failure codes, so handle a code you do not know. */
export type ReplaceResult =
    | { status: 'replaced'; session: SessionToken }
    | {
          status: 'rejected';
          code:
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
export type OperationMetric = {
    readonly kind: 'mount' | 'commit' | 'paste' | 'save' | 'replace';
    readonly session: SessionToken;
    readonly packageVersion: string;
    readonly model: ModelRef;
    readonly capabilityIds: readonly string[];
    readonly durationMs: number;
    readonly normalizationTransactions: number;
    readonly failureCode: string | null;
};

/** What the chrome of a slot shows of its upload; never a document attribute. */
export type UploadStatus = {
    state: 'queued' | 'running' | 'failed' | 'stopped';
    /** Whole percent once the service reports progress, else `null`. */
    progress: number | null;
    name: string;
};
