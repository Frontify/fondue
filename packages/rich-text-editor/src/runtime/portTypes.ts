/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type JsonObject, type RichTextDocument } from '#/model';

import { type RuntimeEvents } from './reporting/events';
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
export type ColumnState = {
    count: number;
    fits: boolean;
    label: string;
    /** The name of a break that forces no break. */
    inactiveLabel: string;
};

/** How a wait for input to settle ended. */
export type InputOutcome = 'settled' | 'timeout' | 'disposed';

/**
 * The node an action changes: its `nodeId`, or, for a node that carries none, such as a code block, the node view's
 * live position reader, which reads the position when the action runs.
 */
export type NodeTarget = string | (() => number | undefined);

/** The actions of one node view, which find their node when they run, never by a position held from before. */
export type NodeActions = {
    update(attrs: JsonObject): CommandResult;
    remove(): CommandResult;
    select(): void;
    /** Runs a command with the node selected at execution time. */
    execute(id: string, ...args: readonly unknown[]): CommandResult;
    query(id: string, ...args: readonly unknown[]): CommandState;
};

/** What the host calls. */
export type RuntimeHandle = {
    getSummary(): EditorSummary;
    getSnapshot(): Snapshot;
    getSaveStatus(): SaveStatus;
    /** The document a view fault left for the host's recovery service, `null` when there is none. */
    getRecoveryCandidate(): RichTextDocument | null;
    query(id: string, ...args: readonly unknown[]): CommandState;
    execute(id: string, ...args: readonly unknown[]): CommandResult;
    /** Runs the command once no commit is in progress and input has settled, in call order, and resolves with its result. */
    enqueue(id: string, ...args: readonly unknown[]): Promise<CommandResult>;
    captureTarget(options: CaptureTargetOptions): CaptureResult;
    /** Releases a target that `captureTarget` returned. */
    releaseTarget(target: SelectionHandle): void;
    requestCommit(options: CommitOptions): Promise<CommitResult>;
    replaceDocument(request: ReplaceDocumentRequest): Promise<ReplaceResult>;
    setMode(mode: EditorSummary['mode']): void;
    updatePolicy(policy: AuthoringPolicy): void;
    /** Focuses the surface and puts the caret at the document's start or end, else keeps the selection. */
    focus(where?: 'current' | 'start' | 'end'): void;
    /** Treats focus and pointer moves inside `element` as inside the editor until the returned function runs. */
    registerInteractionRoot(element: HTMLElement): Unsubscribe;
    subscribe<EventName extends keyof RuntimeEvents>(
        event: EventName,
        listener: (value: RuntimeEvents[EventName]) => void,
    ): Unsubscribe;
    /** Ends the session: the view and every subscription go. */
    dispose(): void;
};

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
    | { kind: 'started' | 'failed' | 'cancelled'; name: string }
    | {
          kind: 'completed';
          name: string;
          altMissing: boolean;
          /** Whether a replacement asks the author to review the alternative text it kept. */
          review: boolean;
      }
    | {
          kind: 'gesture';
          refused: readonly { name: string; reason: UploadRejection }[];
          started: readonly string[];
      };

/** Where chosen, pasted or dropped files go: new slots at the selection or a range, or the image `nodeId`. */
export type UploadPlace =
    | {
          kind: 'insert';
          origin: 'command' | 'paste' | 'drop';
          range?: { from: number; to: number };
      }
    | { kind: 'replace'; nodeId: string };

/** One option of a suggestion list. */
export type SuggestionItem = {
    /** Unique within one result list. */
    key: string;
    label: string;
    /** What the option shows before its label, such as the emoji itself. */
    glyph: string | null;
    /** What the list's command receives when the option is accepted. */
    payload: JsonObject;
    /** What the option shows after its label, such as a mention's resource type. */
    detail?: string;
    /** An image that passed `checkHref`, such as an avatar. */
    imageUrl?: string;
    /** The icon an option shows without an image. */
    kind?: 'user' | 'group' | 'everyone';
    /** The heading of the group the option sits under. */
    group?: string;
    /** An option that asks again instead of running the command: the next page, or the failed page once more. */
    action?: 'more' | 'retry';
    /** The cursor of the page a `more` option asks for. */
    cursor?: string;
};

/** The open suggestion list: what was typed, the range an accepted option replaces, and the options so far. */
export type ActiveSuggestion = {
    /** The feature that declares the list. */
    featureId: string;
    trigger: string;
    /** The list's accessible name: a package string key, or translations by language tag. */
    name: string | Readonly<Record<string, string>>;
    command: string;
    /** The trigger's start. */
    from: number;
    /** The caret, at the end of the query. */
    to: number;
    query: string;
    /** `loading` keeps the previous query's options shown until the new ones arrive. */
    status: 'loading' | 'ready' | 'failed';
    items: readonly SuggestionItem[];
    /** The active option, which Enter and Tab accept. */
    index: number;
    /** The request the current options answer, so a late result for an older query is dropped. */
    request: number;
    /** The cursor of the page the request asks for, `null` for a query's first page. */
    page: string | null;
};
