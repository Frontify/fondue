/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { type EditorState, type Transaction } from 'prosemirror-state';
import {
    type DirectEditorProps,
    type EditorView,
    type MarkViewConstructor,
    type NodeViewConstructor,
} from 'prosemirror-view';

import { type CompiledDefinition, type EngineCommand } from '#/definition';
import {
    type CapabilityRef,
    type ContentCheckOptions,
    type Diagnostic,
    type PresentationStyle,
    type ResourceLimits,
    type RichTextDocument,
} from '#/model';
import { type TreeNode } from '#/model/content';

import { type AsyncOperation, type AsyncRequest } from './async';
import { type UploadEvent, type UploadServiceLike } from './capabilities/media/uploads';
import { type ColumnState } from './columns';
import { type Listener } from './events';
import { type EnterKeys } from './keys';
import { type ExceededLimit } from './limits';
import { type SaveCoordinator } from './saves';
import { type NodeActions, type NodeTarget } from './session/actions';
import { assembleCore } from './session/assemble-core';
import { assembleEditing } from './session/assemble-editing';
import { assembleOperations } from './session/assemble-operations';
import { assembleSession } from './session/assemble-session';
import { assembleState } from './session/assemble-state';
import { type Late } from './session/late';
import { liveResources, viewRuntimes } from './session/registry';
import { summarize } from './session/shown';
import { type InputOutcome, type Mode, type RejectedCode } from './session/types';
import { isEmpty } from './session/view';
import {
    type AuthoringPolicy,
    type CaptureResult,
    type CaptureTargetOptions,
    type CommandResult,
    type CommandState,
    type CommitOptions,
    type CommitResult,
    type EditorSummary,
    type OperationMetric,
    type RecoveryService,
    type ReplaceDocumentRequest,
    type ReplaceResult,
    type SaveStatus,
    type SelectionHandle,
    type ServerRevision,
    type Snapshot,
    type Unsubscribe,
} from './types';

export type { InputOutcome, NodeActions, NodeTarget };

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
    setMode(mode: Mode): void;
    updatePolicy(policy: AuthoringPolicy): void;
    focus(where?: 'current' | 'start' | 'end'): void;
    registerInteractionRoot(element: HTMLElement): Unsubscribe;
    subscribe(event: string, listener: Listener): Unsubscribe;
    dispose(): void;
}

export interface EditorRuntime {
    readonly handle: RuntimeHandle;
    /** The compiled definition the session runs. */
    readonly definition: CompiledDefinition;
    /** The `id` of the session's suggestion list, which the surface's `aria-controls` names while the list shows options. */
    readonly suggestionListId: string;
    /** A DOM `id` part unique to this session and call, drawn from its `generateId`, for the chrome the views add. */
    readonly nextDomId: () => string;
    /** The view on the attached surface, for the `src/testing` helpers. */
    readonly view: EditorView | undefined;
    /** The host roots whose focus and pointer moves stay inside the editor. */
    readonly interactionRoots: ReadonlySet<HTMLElement>;
    /** The session's current state, which stays readable after `dispose`, for tests. */
    readonly state: EditorState;
    /** The authoring policy that the next commit is checked against. */
    readonly policy: AuthoringPolicy;
    /** The session's resource limits. */
    readonly limits: ResourceLimits;
    /**
     * The limit of the final check that the batch of `root` exceeds, its new `nodeId`s drawn as a query draws them, which a
     * paste reports; a batch within every limit is the one that dispatching `root` next installs. With `followUp`, a plugin
     * rewrites the root's document within the batch, so only the batch is counted.
     */
    exceededLimit(root: Transaction, followUp?: boolean): ExceededLimit | undefined;
    /** The node views the session's views take, by node name. */
    readonly nodeViews: Readonly<Record<string, NodeViewConstructor>>;
    /** Shows the document in `element`, which becomes the editable surface, drawn with `props` beside the runtime's own. */
    attach(element: HTMLElement, props?: Partial<DirectEditorProps>): void;
    /** Destroys the view synchronously; the session and its state stay. */
    detach(): void;
    report(diagnostic: Diagnostic): void;
    /**
     * Selects the text between two positions, or the node at one, as the `src/testing` helpers name it.
     * With `scroll`, the view scrolls that selection into view, wherever focus is.
     */
    select(
        target:
            | { readonly anchor: number; readonly head: number; readonly scroll?: boolean }
            | { readonly node: number; readonly scroll?: boolean },
    ): void;
    /** Captures `range` as a target, as `captureTarget` captures the selection, such as a whole mark run at a caret in it. */
    captureRange(range: { readonly from: number; readonly to: number }, options: CaptureTargetOptions): CaptureResult;
    /** Why the session refuses `command` with `payload` on `state` before it runs, as `execute` checks it. */
    refusal(command: EngineCommand, state: EditorState, payload: unknown): RejectedCode | undefined;
    /** Why the policy or the limits refuse the change of `transaction` from `before`, as a commit's final check would. */
    writeRefusal(before: Node, transaction: Transaction): 'policy' | 'limit' | undefined;
    /** Runs a command that no feature installs, such as one edit of a plugin's UI, as `execute` runs one: one undo step. */
    perform(command: EngineCommand, options?: { readonly target?: SelectionHandle }): CommandResult;
    /**
     * A selector store: `listener` gets each new value of `read` after a commit or a policy update, unless `isEqual`
     * holds between it and the last value.
     */
    watch<T>(read: () => T, isEqual: (previous: T, next: T) => boolean, listener: (value: T) => void): Unsubscribe;
    /** Starts an async operation through the coordinator, as an `upload` or mention search capability does. */
    startAsync(request: AsyncRequest): AsyncOperation;
    /** Aborts the operations that the changed `services` members started. */
    changeServices(members: readonly string[]): void;
    /** The bridge caught a throw from a node view's constructor, `update` or `destroy`. */
    faultView(): void;
    /** The host's `disabled`, which runs in mode `readonly` and takes the surface out of the Tab order. */
    setDisabled(disabled: boolean): void;
    /** The presentation's columns as the surface shows them, which `column.break.insert` and the break decorations read. */
    setColumns(columns: ColumnState): void;
    nodeActions(target: NodeTarget): NodeActions;
    /** Emits `saveStatusChange` when the coordinator's status changed outside a batch, as a save response does. */
    saveStatusChanged(): void;
    /**
     * Calls `settled` once input settles after the composition that runs now, or when `timeoutMs` passes first, or
     * when the session is disposed first.
     */
    afterInput(settled: (outcome: InputOutcome) => void, timeoutMs: number): void;
    /** Empties the history and keeps the document and selection, as a form reset to the current record does. */
    clearHistory(): void;
    /** Emits the `operationMetric` of an operation that started at `started`. */
    measure(kind: OperationMetric['kind'], started: number, failureCode: string | null): void;
    /**
     * Runs the content checks now and keeps their results in plugin state, as the issues panel asks when it opens;
     * `false` when the editor installs none, or input is composing.
     */
    runChecks(): boolean;
}

export interface EditorRuntimeOptions {
    readonly definition: CompiledDefinition;
    readonly documentId: string;
    /** The decoded island tree the session's document starts from. */
    readonly tree: TreeNode;
    /** The stored document's capabilities, kept while islands keep their content. */
    readonly capabilities: readonly CapabilityRef[];
    /** For the session id and the `nodeId`s the runtime creates; default `randomId`. */
    readonly generateId?: () => string;
    readonly mode: Mode;
    readonly policy: AuthoringPolicy;
    readonly limits: ResourceLimits;
    /** Builds the bridge's node views by node name for this runtime, which only passes them to the view. */
    readonly nodeViews?: (runtime: EditorRuntime) => Readonly<Record<string, NodeViewConstructor>>;
    /** The mark views that give styled and coloured marks their presentation, built once per session. */
    readonly markViews?: (runtime: EditorRuntime) => Readonly<Record<string, MarkViewConstructor>>;
    /** Whether the editor's React tree renders or runs an effect now, which a development build passes. */
    readonly inRender?: () => boolean;
    /** The loaded record's revision, which an unmanaged session reports as acknowledged. */
    readonly revision?: ServerRevision | null;
    /** Builds the session's save coordinator; without one the session is `unmanaged`. */
    readonly saves?: ((runtime: EditorRuntime) => SaveCoordinator) | undefined;
    /** The host's recovery service, read when a view fault leaves a candidate. */
    readonly recovery?: () => RecoveryService | undefined;
    /** The host's `inputRules` prop, read on each input. */
    readonly inputRules?: () => false | { readonly exclude: readonly string[] } | undefined;
    /** The host's `tabMovesFocus` prop, read on each Tab; default false. */
    readonly tabMovesFocus?: () => boolean | undefined;
    /** The profile's Enter keys and the host's submit; without them Enter, Shift+Enter and Mod+Enter edit. */
    readonly enterKeys?: EnterKeys;
    /** The host's `scrollSelectionIntoView` prop, read on each scroll to the selection; default true. */
    readonly scrollSelectionIntoView?: () => boolean | undefined;
    /** What the editor layer hands the plugin commands it runs, such as its overlay and panel hosts. */
    readonly commandHost?: unknown;
    /** The host's `services.uploads`, read when an upload starts; without one, no file uploads. */
    readonly uploads?: () => UploadServiceLike | undefined;
    /** Opens the host asset picker, else the file chooser, for new images or for the image `nodeId`. */
    readonly pick?: (nodeId: string | undefined) => void;
    /** Hears each upload start, end, failure and refused file, which the live region announces. */
    readonly uploadEvent?: (event: UploadEvent) => void;
    /** The presentation's brand styles, read when `block.style.set` runs; default none. */
    readonly styles?: () => readonly PresentationStyle[];
    /** The presentation's columns and the localized break labels the first paint shows; default one column in English. */
    readonly columns?: ColumnState;
    /** The locale and colour options the content checks read when they run; default no locale strings and no colours. */
    readonly contentChecks?: () => Pick<ContentCheckOptions, 'locale' | 'colorTokens' | 'background'>;
}

export { liveResources };

const runtimes = new WeakMap<object, EditorRuntime>();

/** The runtime behind a handle this module made. */
export const runtimeOf = (handle: object): EditorRuntime | undefined => runtimes.get(handle);

/** The runtime whose surface `view` shows, for a plugin that one compiled definition shares between editors. */
export const runtimeOfView = (view: EditorView): EditorRuntime | undefined => viewRuntimes.get(view);

export { isEmpty, summarize };

/** One editing session: its state, its view while a surface is attached, the commit path and its events. */
export const createEditorRuntime = (options: EditorRuntimeOptions): EditorRuntime => {
    const late = {} as Late;
    const core = assembleCore(options, late);
    const state = assembleState(core, options, late);
    const editing = assembleEditing(state, options, late);
    const operations = assembleOperations(editing, options, late);
    const { handle, runtime } = assembleSession(operations, options);
    Object.assign(late, {
        views: editing.views,
        commit: editing.commit,
        settleInput: editing.settleInput,
        targets: operations.targets,
        commands: operations.commands,
        queue: operations.queue,
        actions: operations.actions,
        runtime,
    } satisfies Late);
    const { views, saving, display } = operations;
    if (options.nodeViews !== undefined) {
        views.setNodeViews(options.nodeViews(runtime));
    }
    if (options.markViews !== undefined) {
        views.setMarkViews(options.markViews(runtime));
    }
    if (options.saves !== undefined) {
        saving.attach(options.saves(runtime));
    }
    display.primeStatus();
    runtimes.set(handle, runtime);
    liveResources.installedFeatures.set(
        handle,
        options.definition.model.capabilities.map(({ id }) => id),
    );
    return runtime;
};
