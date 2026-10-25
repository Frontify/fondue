/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type JsonObject, type RichTextDocument } from '#/model';

import { type Listener } from './events';
import {
    type AuthoringPolicy,
    type CaptureResult,
    type CaptureTargetOptions,
    type CommandResult,
    type CommandState,
    type CommitOptions,
    type CommitResult,
    type EditorSummary,
    type ReplaceDocumentRequest,
    type ReplaceResult,
    type SaveStatus,
    type SelectionHandle,
    type Snapshot,
    type Unsubscribe,
} from './types';

// The declarations that the editor port names, kept apart from every engine type so its declaration file reaches none.
/** What the editor shows of the presentation's columns: their count, whether the surface has room for them, and the break labels. */
export interface ColumnState {
    readonly count: number;
    readonly fits: boolean;
    readonly label: string;
    /** The name of a break that forces no break. */
    readonly inactiveLabel: string;
}

/** How a wait for input to settle ended. */
export type InputOutcome = 'settled' | 'timeout' | 'disposed';

/**
 * The node an action changes: its `nodeId`, or, for a node that carries none, such as a code block, the node view's
 * live position reader, which reads the position when the action runs.
 */
export type NodeTarget = string | (() => number | undefined);

/** The actions of one node view, which find their node when they run, never by a position held from before. */
export interface NodeActions {
    update(attrs: JsonObject): CommandResult;
    remove(): CommandResult;
    select(): void;
    /** Runs a command with the node selected at execution time. */
    execute(id: string, ...args: readonly unknown[]): CommandResult;
    query(id: string, ...args: readonly unknown[]): CommandState;
}

/** What the host calls. */
export interface RuntimeHandle {
    getSummary(): EditorSummary;
    getSnapshot(): Snapshot;
    getSaveStatus(): SaveStatus;
    getRecoveryCandidate(): RichTextDocument | null;
    query(id: string, ...args: readonly unknown[]): CommandState;
    execute(id: string, ...args: readonly unknown[]): CommandResult;
    enqueue(id: string, ...args: readonly unknown[]): Promise<CommandResult>;
    captureTarget(options: CaptureTargetOptions): CaptureResult;
    releaseTarget(target: SelectionHandle): void;
    requestCommit(options: CommitOptions): Promise<CommitResult>;
    replaceDocument(request: ReplaceDocumentRequest): Promise<ReplaceResult>;
    setMode(mode: EditorSummary['mode']): void;
    updatePolicy(policy: AuthoringPolicy): void;
    focus(where?: 'current' | 'start' | 'end'): void;
    registerInteractionRoot(element: HTMLElement): Unsubscribe;
    subscribe(event: string, listener: Listener): Unsubscribe;
    dispose(): void;
}

/**
 * Why a file did not upload, which the editor says with how to fix it: its type, its size, its pixels, a size its
 * header does not tell, or an SVG that holds active content.
 */
export type UploadRejection = 'type' | 'size' | 'pixels' | 'unreadable' | 'unsafe';

/**
 * What the live region announces: once per gesture of chosen, pasted or dropped files, with each file refused and
 * the uploads it started, then once per upload's later start, end, failure or cancel.
 */
export type UploadEvent =
    | { readonly kind: 'started' | 'failed' | 'cancelled'; readonly name: string }
    | {
          readonly kind: 'completed';
          readonly name: string;
          readonly altMissing: boolean;
          /** Whether a replacement asks the author to review the alternative text it kept. */
          readonly review: boolean;
      }
    | {
          readonly kind: 'gesture';
          readonly refused: readonly { readonly name: string; readonly reason: UploadRejection }[];
          readonly started: readonly string[];
      };

/** Where chosen, pasted or dropped files go: new slots at the selection or a range, or the image `nodeId`. */
export type UploadPlace =
    | {
          readonly kind: 'insert';
          readonly origin: 'command' | 'paste' | 'drop';
          readonly range?: { readonly from: number; readonly to: number };
      }
    | { readonly kind: 'replace'; readonly nodeId: string };

/** One option of a suggestion list. */
export interface SuggestionItem {
    /** Unique within one result list. */
    readonly key: string;
    readonly label: string;
    /** What the option shows before its label, such as the emoji itself. */
    readonly glyph: string | null;
    /** What the list's command receives when the option is accepted. */
    readonly payload: JsonObject;
    /** What the option shows after its label, such as a mention's resource type. */
    readonly detail?: string;
    /** An image that passed `checkHref`, such as an avatar. */
    readonly imageUrl?: string;
    /** The icon an option shows without an image. */
    readonly kind?: 'user' | 'group' | 'everyone';
    /** An option that asks again instead of running the command: the next page, or the failed page once more. */
    readonly action?: 'more' | 'retry';
    /** The cursor of the page a `more` option asks for. */
    readonly cursor?: string;
}

/** The open suggestion list: what was typed, the range an accepted option replaces, and the options so far. */
export interface ActiveSuggestion {
    /** The feature that declares the list. */
    readonly featureId: string;
    readonly trigger: string;
    /** The list's accessible name: a package string key, or translations by language tag. */
    readonly name: string | Readonly<Record<string, string>>;
    readonly command: string;
    /** The trigger's start. */
    readonly from: number;
    /** The caret, at the end of the query. */
    readonly to: number;
    readonly query: string;
    /** `loading` keeps the previous query's options shown until the new ones arrive. */
    readonly status: 'loading' | 'ready' | 'failed';
    readonly items: readonly SuggestionItem[];
    /** The active option, which Enter and Tab accept. */
    readonly index: number;
    /** The request the current options answer, so a late result for an older query is dropped. */
    readonly request: number;
    /** The cursor of the page the request asks for, `null` for a query's first page. */
    readonly page: string | null;
}
