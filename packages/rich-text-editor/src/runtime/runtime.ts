/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import {
    AllSelection,
    EditorState,
    NodeSelection,
    Plugin,
    PluginKey,
    Selection,
    TextSelection,
    type Transaction,
} from 'prosemirror-state';
import { EditorView, type NodeViewConstructor } from 'prosemirror-view';

import {
    APPEND_BATCH_META,
    type AppendBatch,
    AppendLimitError,
    COMMAND_META,
    type CompiledDefinition,
    type EngineCommand,
    NORMALIZE_META,
    ORIGIN_META,
    type PluginOrigin,
} from '#/definition';
import {
    type CapabilityRef,
    checkHref,
    type Diagnostic,
    hashDocument,
    type HrefPolicy,
    type JsonObject,
    type ResourceLimits,
    type RichTextDocument,
} from '#/model';
import { attributesOf, compiledModel } from '#/model/compile';
import { type TreeNode } from '#/model/content';
import { decodeToTree } from '#/model/decode';
import { encodeTree } from '#/model/encode';
import { diagnostic } from '#/model/format';
import { hrefPolicyOf } from '#/model/href';
import { randomId } from '#/model/random-id';
import { findInvalidPayload, findUnsafeJson, isRecord, isValidValue, snapshot } from '#/model/values';

import { secondCopyAtMount, secondCopyInView } from './engines';
import { createEventBus, type Listener } from './events';
import { groupRoot, groupsPlugin, isHistoryTransaction, reset } from './history';
import { firedRule, withoutRules } from './input-rules';
import { createLimitCheck } from './limits';
import { operationMetric } from './metrics';
import { nodeStatePlugin } from './node-state';
import { authoringOf, createPolicyCheck } from './policy';
import { positionOf } from './positions';
import { createUnmanagedStatus, sameStamp, type SaveCoordinator } from './saves';
import { createInputSettling } from './settle';
import { captureTarget, countTargets, releaseTargets, restoreTargets, targetSelection, targetsPlugin } from './targets';
import {
    type AuthoringPolicy,
    type CaptureResult,
    type CaptureTargetOptions,
    type ChangeOrigin,
    type CommandResult,
    type CommandState,
    type CommitOptions,
    type CommitResult,
    type EditorSummary,
    type OperationMetric,
    type RecoveryReceipt,
    type RecoveryService,
    type ReplaceDocumentRequest,
    type ReplaceResult,
    type SaveStatus,
    type SelectionHandle,
    type SelectionSummary,
    type ServerRevision,
    type SessionToken,
    type Snapshot,
    type Unsubscribe,
} from './types';

type Mode = EditorSummary['mode'];
type RejectedCode = Extract<CommandResult, { readonly status: 'rejected' }>['code'];
type ReplaceCode = Extract<ReplaceResult, { readonly status: 'rejected' }>['code'];

// Queued intents whose listeners keep enqueuing stop past this depth.
const MAX_ENQUEUE_DEPTH = 32;
// ProseMirror marks each DOM change it reads during a composition with this meta.
const COMPOSITION_META = 'composition';

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
    subscribe(event: string, listener: Listener): Unsubscribe;
    dispose(): void;
}

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

export interface EditorRuntime {
    readonly handle: RuntimeHandle;
    /** The compiled definition the session runs. */
    readonly definition: CompiledDefinition;
    /** The view on the attached surface, for the `src/testing` helpers. */
    readonly view: EditorView | undefined;
    /** The session's current state, which stays readable after `dispose`, for tests. */
    readonly state: EditorState;
    /** The session's resource limits. */
    readonly limits: ResourceLimits;
    /** Shows the document in `element`, which becomes the editable surface. */
    attach(element: HTMLElement): void;
    /** Destroys the view synchronously; the session and its state stay. */
    detach(): void;
    report(diagnostic: Diagnostic): void;
    /**
     * Selects the text between two positions, or the node at one, as the `src/testing` helpers name it.
     */
    select(target: { readonly anchor: number; readonly head: number } | { readonly node: number }): void;
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
    /** Aborts the operations that the changed `services` members started. */
    changeServices(members: readonly string[]): void;
    /** The bridge caught a throw from a node view's constructor, `update` or `destroy`. */
    faultView(): void;
    nodeActions(target: NodeTarget): NodeActions;
    /** Emits `saveStatusChange` when the coordinator's status changed outside a batch, as a save response does. */
    saveStatusChanged(): void;
    /** Emits the `operationMetric` of an operation that started at `started`. */
    measure(kind: OperationMetric['kind'], started: number, failureCode: string | null): void;
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
    /** Whether the editor's React tree renders or runs an effect now, which a development build passes. */
    readonly inRender?: () => boolean;
    /** The loaded record's revision, which an unmanaged session reports as acknowledged. */
    readonly revision?: ServerRevision | null;
    /** Builds the session's save coordinator; without one the session is `unmanaged`. */
    readonly saves?: ((runtime: EditorRuntime) => SaveCoordinator) | undefined;
    /** The host's recovery service, read when a view fault leaves a candidate. */
    readonly recovery?: () => RecoveryService | undefined;
    /** What the editor layer hands the plugin commands it runs. */
    readonly commandHost?: unknown;
}

/** What every live runtime owns, which the `src/testing` probe reads. */
export const liveResources = {
    views: new Set<EditorView>(),
    /** Node views and their portal entries, which the bridge counts. */
    nodeViews: 0,
    portals: 0,
    /** The installed feature IDs of each session not yet disposed, by handle. */
    installedFeatures: new Map<object, readonly string[]>(),
    intents: 0,
    frames: 0,
    targets: 0,
};

const runtimes = new WeakMap<object, EditorRuntime>();

/** The runtime behind a handle this module made. */
export const runtimeOf = (handle: object): EditorRuntime | undefined => runtimes.get(handle);

const viewRuntimes = new WeakMap<EditorView, EditorRuntime>();

/** The runtime whose surface `view` shows, for a plugin that one compiled definition shares between editors. */
export const runtimeOfView = (view: EditorView): EditorRuntime | undefined => viewRuntimes.get(view);

const kindOf = (selection: Selection): SelectionSummary['kind'] => {
    if (selection instanceof TextSelection) {
        return 'text';
    }
    if (selection instanceof NodeSelection) {
        return 'node';
    }
    if (selection instanceof AllSelection) {
        return 'all';
    }
    return 'none';
};

export const summarize = (selection: Selection): SelectionSummary => {
    let selectedNodeId: string | null = null;
    if (selection instanceof NodeSelection && typeof selection.node.attrs.nodeId === 'string') {
        selectedNodeId = selection.node.attrs.nodeId;
    }
    const { parent } = selection.$from;
    let blockType: string | null = null;
    if (parent.isTextblock) {
        blockType = parent.type.name;
    }
    return { kind: kindOf(selection), collapsed: selection.empty, blockType, selectedNodeId };
};

const sameSelection = (a: SelectionSummary, b: SelectionSummary) =>
    a.kind === b.kind &&
    a.collapsed === b.collapsed &&
    a.blockType === b.blockType &&
    a.selectedNodeId === b.selectedNodeId;

const UI_ORIGINS: ReadonlySet<string> = new Set(['paste', 'cut', 'drop']);

/** The origin of an action that one undo reverts on its own: a command, paste, cut or drop. */
const actionOrigin = (root: Transaction): ChangeOrigin | undefined => {
    const event: unknown = root.getMeta('uiEvent');
    if (root.getMeta(COMMAND_META) !== undefined) {
        return 'command';
    }
    if (typeof event === 'string' && UI_ORIGINS.has(event)) {
        return event as ChangeOrigin;
    }
    return undefined;
};

/** Where a batch came from: typing is a DOM change after a recorded `beforeinput`, which `commit` marks. */
const originOf = (root: Transaction): ChangeOrigin => {
    // Undo and redo report `history` whether a key, a command or the browser ran them.
    if (isHistoryTransaction(root)) {
        return 'history';
    }
    const action = actionOrigin(root);
    if (action !== undefined) {
        return action;
    }
    if (root.getMeta(ORIGIN_META) === 'input') {
        return 'input';
    }
    return 'unknown';
};

/** One empty paragraph is an empty document, which shows the placeholder. */
export const isEmpty = ({ doc }: EditorState) =>
    doc.childCount === 1 && doc.firstChild !== null && doc.firstChild.isTextblock && doc.firstChild.content.size === 0;

const rejected = (code: RejectedCode): CommandResult => ({ status: 'rejected', code });
const refused = (code: ReplaceCode): ReplaceResult => ({ status: 'rejected', code });
const unique = (values: readonly string[]) => [...new Set(values)];
/** The payload as one frozen JSON copy, which is what is checked and run; `undefined` for one that is not plain JSON. */
const checkedPayload = (given: unknown): { readonly payload: unknown } | undefined => {
    if (given !== undefined && findUnsafeJson(given, '') !== undefined) {
        return undefined;
    }
    return { payload: snapshot(given) };
};
// The checks of `./engines` cover a second copy of `prosemirror-model` only.
const DUPLICATE_ENGINE = diagnostic(
    'runtime.duplicate-engine',
    undefined,
    { packages: ['prosemirror-model'] },
    'warning',
);

/** A batch checked against policy and limits and not installed, with how it maps positions. */
interface Candidate {
    readonly candidate: EditorState;
    readonly root: Transaction;
    readonly mapping: Transaction['mapping'];
    /** When the batch started, and how many transactions plugins appended to it. */
    readonly started: number;
    readonly appended: number;
}
/** What the `operationMetric` of a batch that changed the document reports. */
type BatchMetric = Pick<Candidate, 'started' | 'appended'> & { readonly kind: 'commit' | 'paste' };
/** A candidate, or why a batch cannot be installed. */
type Prepared =
    | Candidate
    | {
          readonly code: RejectedCode;
          readonly diagnostic?: Diagnostic;
          readonly fault?: Diagnostic;
      };
/** Who runs a command: a host call or a queued intent. */
type Route = 'host' | 'queue' | 'node';
/** What a command would do now: nothing, a prepared batch, or a rejection. */
type Attempt = Prepared | { readonly unchanged: true };

interface Intent {
    readonly id: string;
    readonly payload: unknown;
    readonly options: unknown;
    readonly depth: number;
    readonly resolve: (result: CommandResult) => void;
}

/** One editing session: its state, its view while a surface is attached, the commit path and its events. */
export const createEditorRuntime = (options: EditorRuntimeOptions): EditorRuntime => {
    const { definition, limits } = options;
    const generate = options.generateId ?? randomId;
    // A replacement moves the session to the next generation and document.
    let session: SessionToken = {
        documentId: options.documentId,
        sessionId: generate(),
        generation: 0,
    };
    const createdAt = Date.now();
    let unmanaged = createUnmanagedStatus(options.revision ?? null);
    const breaksPolicy = createPolicyCheck(definition.model);
    // The URL policy of each command whose feature narrows `checkHref`, which its `url` payload fields must pass too.
    const hrefPolicies = new Map<EngineCommand, HrefPolicy>(
        [...definition.commands.values()].flatMap((command) => {
            const feature = compiledModel(definition.model).features.find(({ id }) => id === command.featureId);
            const policy = feature === undefined ? undefined : hrefPolicyOf(feature.options);
            if (policy === undefined) {
                return [];
            }
            return [[command, policy] as const];
        }),
    );
    let { capabilities } = options;
    let exceedsLimits = createLimitCheck(definition.model, capabilities);
    // Aborted by `dispose`, which ends the session's own service calls.
    const ended = new AbortController();
    let policy = options.policy;
    let phase: EditorSummary['phase'] = 'mounting';
    let mode = options.mode;
    // The mode the surface shows, which follows `mode` once input has settled.
    let shownMode = mode;
    let commitSequence = 0;
    let sequence = 0;
    let saves: SaveCoordinator | undefined;
    let shownStatus: SaveStatus | undefined;
    // The metric of the batch that changed the document, emitted once the outermost commit ends.
    let metric: BatchMetric | undefined;
    let typing = false;
    let view: EditorView | undefined;
    // The state the view threw on, which `getRecoveryCandidate` offers until `dispose`.
    // ProseMirror runs that throwing update again on `setProps` and `destroy`.
    let recovery: EditorState | undefined;
    let readyFrame: number | undefined;
    // Set while replacement step 8 installs the next document.
    let installingNext = false;
    // Set while the view builds or installs a state, so a node view throw the bridge caught faults that call.
    let viewCall = false;
    let viewThrew = false;
    // Node views come from the bridge once this runtime exists, since they act on it.
    let nodeViews: Readonly<Record<string, NodeViewConstructor>> = {};
    // Commits and notifications in progress, during which `execute` is busy and `enqueue` waits.
    let busy = 0;
    let draining = false;
    let depth = 0;
    let installing = false;
    // Roots that plugin views dispatch while an install runs, committed once its selectors and events are done.
    const deferred: Transaction[] = [];
    const queue: Intent[] = [];

    // Records typing before any other handler sees the event, so the view itself gets no event handler.
    const typingRecorder = new Plugin({
        key: new PluginKey('rte.typing'),
        props: {
            handleDOMEvents: {
                beforeinput: () => {
                    typing = true;
                    return false;
                },
            },
        },
    });
    const settling = createInputSettling(
        () => view !== undefined && view.composing,
        () => settleInput(),
    );
    let state = EditorState.create({
        doc: definition.schema.nodeFromJSON(options.tree),
        plugins: [
            typingRecorder,
            settling.plugin,
            targetsPlugin,
            groupsPlugin,
            nodeStatePlugin(),
            ...definition.plugins,
        ],
    });
    // The state whose document the snapshot and `sequence` last published, and how later provisional batches map it.
    let published = state;
    let provisional: Transaction['mapping'] | undefined;
    let snapshotCache:
        | {
              readonly doc: Node;
              readonly composing: boolean;
              readonly revision: ServerRevision | null;
              readonly value: Snapshot;
          }
        | undefined;
    let shownSelection = summarize(state.selection);

    const busyWith = <T>(work: () => T): T => {
        busy += 1;
        try {
            return work();
        } finally {
            busy -= 1;
            if (busy === 0) {
                flushMetric();
            }
            drain();
        }
    };

    const isDisposed = () => phase === 'disposed';
    const { emit, notify, subscribe, watch, clear } = createEventBus({ isDisposed, around: busyWith });

    const report = (diagnostic: Diagnostic) => emit('diagnostic', diagnostic);

    const measure = (
        kind: OperationMetric['kind'],
        started: number,
        failureCode: string | null,
        normalizationTransactions = 0,
    ) => {
        const durationMs = Date.now() - started;
        const measured = { kind, durationMs, normalizationTransactions, failureCode };
        emit('operationMetric', operationMetric(definition.model, session, measured));
    };
    const flushMetric = () => {
        const batch = metric;
        metric = undefined;
        if (batch !== undefined) {
            measure(batch.kind, batch.started, null, batch.appended);
        }
    };

    const saveStatus = (): SaveStatus => {
        if (saves !== undefined) {
            return saves.status();
        }
        return unmanaged(sequence);
    };
    const emitSaveStatus = () => {
        const next = saveStatus();
        if (next !== shownStatus) {
            shownStatus = next;
            emit('saveStatusChange', next);
        }
    };
    const emitSelection = () => {
        const next = summarize(state.selection);
        if (!sameSelection(shownSelection, next)) {
            shownSelection = next;
            emit('selectionChange', next);
        }
    };

    const settleQueue = (code: RejectedCode) => {
        for (const intent of queue.splice(0)) {
            liveResources.intents -= 1;
            intent.resolve(rejected(code));
        }
    };

    const encode = (doc: Node): RichTextDocument =>
        encodeTree(doc.toJSON() as TreeNode, definition.model, capabilities).document;

    // Recomputes `editable` and the surface attributes from the phase and the mode, which waits for input to settle.
    const refreshView = () => {
        if (settling.active() || recovery !== undefined) {
            return;
        }
        shownMode = mode;
        if (view !== undefined) {
            view.setProps({});
        }
    };

    const fault = (diagnostic: Diagnostic) => {
        phase = 'faulted';
        // A composition that settles later publishes nothing.
        settling.cancel();
        provisional = undefined;
        refreshView();
        settleQueue('not-ready');
        report(diagnostic);
    };

    /** Stores the candidate of a view fault with the host's recovery service. */
    const storeRecovery = (candidate: EditorState) => {
        const service = options.recovery?.();
        if (service === undefined || isDisposed()) {
            return;
        }
        const checkpoint = {
            stamp: { ...session, sequence: sequence + 1 },
            acknowledgedRevision: saveStatus().revision,
            document: encode(candidate.doc),
        };
        let stored: Promise<RecoveryReceipt>;
        try {
            stored = service.store(checkpoint, { signal: ended.signal, session });
        } catch {
            return;
        }
        stored
            .then(({ receiptId }) => report(diagnostic('runtime.recovery-stored', undefined, { receiptId }, 'info')))
            // A store that fails leaves the candidate with `getRecoveryCandidate` only.
            .catch(() => undefined);
    };

    /** The view threw while it installed `candidate`: editing stops and the snapshot stays. */
    const viewFault = (attached: EditorView, candidate: EditorState) => {
        recovery = candidate;
        attached.dom.setAttribute('contenteditable', 'false');
        fault(diagnostic('runtime.view-fault', undefined, undefined, 'error'));
        // The next document of a replacement holds none of this session's work, and the host has it.
        if (!installingNext) {
            storeRecovery(candidate);
        }
    };

    // IDs a query drew, which the next install hands out first, so `execute` installs what `query` judged.
    const recorded: string[] = [];
    const installedId = (): string => {
        const id = recorded.shift();
        if (id !== undefined) {
            return id;
        }
        return generate();
    };
    /** An id function for one query: it replays the recorded ids, then records what it draws past them. */
    const queriedIds = (): (() => string) => {
        let at = 0;
        return () => {
            if (at === recorded.length) {
                recorded.push(generate());
            }
            const id = recorded[at] as string;
            at += 1;
            return id;
        };
    };

    /** A composition batch, and every batch after it until input settles, is checked and published then. */
    const isProvisional = (root: Transaction) =>
        settling.active() && (provisional !== undefined || root.getMeta(COMPOSITION_META) !== undefined);

    /** The final check of a change from `before` to `doc`: whether the policy refuses it, and the limit it exceeds. */
    const finalCheck = (before: Node, doc: Node, mapping: Transaction['mapping'], history?: boolean) => ({
        policy: breaksPolicy(policy, before, doc, mapping, history),
        limit: exceedsLimits(doc, limits, before),
    });

    /**
     * Applies a root transaction and every transaction plugins append to it, then the final policy and limit check,
     * which a provisional batch from the view takes once input has settled.
     */
    const prepare = (root: Transaction, ids: () => string, fromView: boolean): Prepared => {
        const batch: AppendBatch = {
            limit: limits.maxAppendedTransactions,
            now: () => Date.now(),
            generateId: ids,
            chain: [],
        };
        // A composition batch's repair waits for input to settle, so it never changes composing text.
        if (isProvisional(root)) {
            root.setMeta(NORMALIZE_META, 'later');
        }
        const started = Date.now();
        // History groups by this time, never by the `Date.now()` a transaction takes when created.
        root.setTime(started);
        groupRoot(state, root, actionOrigin(root) !== undefined);
        let applied: ReturnType<EditorState['applyTransaction']>;
        try {
            applied = state.applyTransaction(root.setMeta(APPEND_BATCH_META, batch));
        } catch (error) {
            // A plugin that throws drops the batch, and the session stays ready.
            if (!(error instanceof AppendLimitError)) {
                return {
                    code: 'not-applicable',
                    diagnostic: diagnostic('runtime.plugin-error', undefined, undefined, 'error'),
                };
            }
            const chain: readonly PluginOrigin[] = error.chain;
            const details = {
                features: unique(chain.map(({ featureId }) => featureId)),
                capabilities: unique(chain.map(({ capability }) => capability)),
                count: chain.length,
            };
            return { code: 'not-ready', fault: diagnostic('runtime.append-limit', undefined, details, 'error') };
        }
        if (applied.transactions.length === 0) {
            return { code: 'not-applicable' };
        }
        // A batch that keeps the document, such as a selection move, has nothing to check.
        const { doc } = applied.state;
        const mapping = root.mapping.slice();
        for (const transaction of applied.transactions.slice(1)) {
            mapping.appendMapping(transaction.mapping);
        }
        // The settle repair is judged with the composition it repairs, from the published document.
        if (doc !== state.doc && !(fromView && isProvisional(root)) && root.getMeta(NORMALIZE_META) !== 'now') {
            const { policy: refused, limit } = finalCheck(state.doc, doc, mapping, isHistoryTransaction(root));
            if (refused || limit !== undefined) {
                if (firedRule(applied.transactions)) {
                    return prepare(withoutRules(root), ids, fromView);
                }
                return { code: 'not-allowed' };
            }
        }
        const { transactions } = applied;
        return { candidate: applied.state, root, mapping, started, appended: transactions.length - 1 };
    };

    /** Publishes a checked batch, then commits the roots that plugin views dispatched while it was installed. */
    const install = (prepared: Candidate): boolean => guarded(() => publish(prepared));

    /** Runs `work`, which installs states, then commits the roots that plugin views dispatched meanwhile. */
    const guarded = <T>(work: () => T): T => {
        installing = true;
        let result: T;
        try {
            result = work();
        } finally {
            installing = false;
        }
        for (let next = deferred.shift(); next !== undefined; next = deferred.shift()) {
            // A listener of this install may have faulted or disposed the session, which then commits nothing more.
            if (phase !== 'ready') {
                deferred.length = 0;
                break;
            }
            commit(next);
        }
        return result;
    };

    /**
     * Publishes the current state's document: counts an effective change, notifies selector stores, then emits the
     * change, the selection and the save status in the Event order.
     */
    const announce = (origin: ChangeOrigin, commandId: string | null, batch: BatchMetric): boolean => {
        const previous = published;
        const current = state;
        published = current;
        // An effective change compares documents by node equality, never by serializing them.
        const changed = !current.doc.eq(previous.doc);
        if (changed) {
            sequence += 1;
        }
        notify();
        if (changed) {
            let document: RichTextDocument | undefined;
            emit('documentChange', {
                stamp: { ...session, sequence },
                commitSequence,
                origin,
                commandId,
                readDocument: () => {
                    if (document === undefined) {
                        document = encode(current.doc);
                    }
                    return document;
                },
            });
            metric = batch;
        }
        emitSelection();
        if (changed) {
            saves?.changed();
        }
        emitSaveStatus();
        return changed;
    };

    /** Runs a view call; `threw` when it threw or a node view inside it threw, which the bridge reports through `faultView`. */
    const callView = <T>(work: () => T): { readonly threw: boolean; readonly value: T | undefined } => {
        let value: T | undefined;
        viewCall = true;
        try {
            value = work();
        } catch {
            viewThrew = true;
        } finally {
            viewCall = false;
        }
        const threw = viewThrew;
        viewThrew = false;
        return { threw, value };
    };

    /** Installs a state in the view and counts it as a commit; `false` when the view threw and the session faulted. */
    const installState = (next: EditorState): boolean => {
        const previous = state;
        state = next;
        const attached = view;
        if (attached !== undefined && callView(() => attached.updateState(next)).threw) {
            state = previous;
            viewFault(attached, next);
            return false;
        }
        commitSequence += 1;
        liveResources.targets += countTargets(next) - countTargets(previous);
        return true;
    };

    /** Installs a batch in the view and counts it, then publishes it, or keeps a provisional batch for input settling. */
    const publish = ({ candidate, root, mapping, started, appended }: Candidate): boolean => {
        if (!installState(candidate)) {
            return false;
        }
        if (isProvisional(root)) {
            if (provisional === undefined) {
                provisional = mapping;
            } else {
                provisional.appendMapping(mapping);
            }
            notify();
            return false;
        }
        const origin = originOf(root);
        const command: unknown = root.getMeta(COMMAND_META);
        let commandId: string | null = null;
        if (origin === 'command' && typeof command === 'string') {
            commandId = command;
        }
        const event: unknown = root.getMeta('uiEvent');
        let kind: BatchMetric['kind'] = 'commit';
        if (event === 'paste' || event === 'drop') {
            kind = 'paste';
        }
        return announce(origin, commandId, { kind, started, appended });
    };

    /** Repairs the provisional batches, then checks them as one change from the published document; `false` on a fault. */
    const settleProvisional = (mapping: Transaction['mapping']): boolean => {
        const started = Date.now();
        let appended = 0;
        // The repair runs inside the append limit before the settled batch publishes, and the check below judges it.
        const repaired = prepare(state.tr.setMeta(NORMALIZE_META, 'now'), installedId, false);
        if ('fault' in repaired && repaired.fault !== undefined) {
            fault(repaired.fault);
            return false;
        }
        if ('diagnostic' in repaired && repaired.diagnostic !== undefined) {
            report(repaired.diagnostic);
        }
        if ('candidate' in repaired && repaired.candidate.doc !== state.doc) {
            if (!installState(repaired.candidate)) {
                return false;
            }
            mapping.appendMapping(repaired.mapping);
            appended = repaired.appended;
        }
        if (
            !breaksPolicy(policy, published.doc, state.doc, mapping) &&
            exceedsLimits(state.doc, limits, published.doc) === undefined
        ) {
            announce('input', null, { kind: 'commit', started, appended });
            return true;
        }
        // Targets released during the composition stay released, and those captured during it stay.
        const restore = restoreTargets(published, state, mapping);
        let restored = published;
        if (restore !== undefined) {
            restored = published.apply(restore);
        }
        if (!installState(restored)) {
            return false;
        }
        notify();
        return true;
    };

    /**
     * Once input has settled, checks the provisional batches as one change from the published document and publishes
     * them, or restores the state from before the composition, then runs the
     * deferred `contenteditable` change and the queued intents.
     */
    const settleInput = () => {
        const mapping = provisional;
        provisional = undefined;
        busyWith(() => {
            // Roots that plugin views dispatch while the settled state installs commit after its check.
            if (mapping !== undefined && !guarded(() => settleProvisional(mapping))) {
                return;
            }
            refreshView();
        });
        saves?.settled();
    };

    /** The view's `dispatchTransaction`: the one path by which any change reaches the view. */
    const commit = (root: Transaction) => {
        // A plugin view's `update` may dispatch inside `view.updateState`; its root waits for the install to publish.
        if (installing) {
            deferred.push(root);
            return;
        }
        // A recorded `beforeinput` describes this batch only, accepted or not.
        const typed = typing;
        typing = false;
        // A faulted session installs nothing more, so a broken view never updates again.
        if (phase === 'faulted' || phase === 'disposed') {
            return;
        }
        if (root.before !== state.doc) {
            report(diagnostic('runtime.stale-transaction', undefined, undefined, 'error'));
            return;
        }
        // Input rules fire only on typed text, never on a paste or a command after a `beforeinput` that changed nothing.
        if (typed && actionOrigin(root) === undefined) {
            root.setMeta(ORIGIN_META, 'input');
        }
        busyWith(() => {
            const prepared = prepare(root, installedId, true);
            if ('candidate' in prepared) {
                install(prepared);
            } else if (prepared.fault !== undefined) {
                fault(prepared.fault);
            } else if (prepared.diagnostic !== undefined) {
                report(prepared.diagnostic);
            }
            if (secondCopyInView(state.schema)) {
                report(DUPLICATE_ENGINE);
            }
        });
    };

    /** The ID of a target this session captured, or why it is not one. */
    const ownTarget = (target: unknown): { readonly id: string } | RejectedCode => {
        if (!isRecord(target) || typeof target.id !== 'string' || !isRecord(target.session)) {
            return 'target-invalid';
        }
        if (target.session.sessionId !== session.sessionId || target.session.generation !== session.generation) {
            return 'wrong-session';
        }
        return { id: target.id };
    };

    /** The state a command runs on: the current one, or with the selection at its target's mapped range. */
    const baseOf = (options: unknown): EditorState | RejectedCode => {
        if (!isRecord(options) || options.target === undefined) {
            return state;
        }
        const target = ownTarget(options.target);
        if (typeof target === 'string') {
            return target;
        }
        const selection = targetSelection(state, target.id);
        if (selection === undefined) {
            return 'target-invalid';
        }
        return state.apply(state.tr.setSelection(selection));
    };

    /**
     * The payload with each `url` field in the form `checkHref` stores, after the policy of the command's feature, or
     * `undefined` when one fails it.
     */
    const withCheckedUrls = (command: EngineCommand, payload: unknown): { readonly payload: unknown } | undefined => {
        if (command.payload === undefined || !isRecord(payload)) {
            return { payload };
        }
        const policy = hrefPolicies.get(command);
        const checked: Record<string, unknown> = { ...payload };
        for (const [name, field] of Object.entries(command.payload.fields)) {
            const value = payload[name];
            if (field.type !== 'url' || typeof value !== 'string') {
                continue;
            }
            const result = checkHref(value, policy);
            if (!result.ok) {
                return undefined;
            }
            checked[name] = result.href;
        }
        return { payload: checked };
    };

    // What a plugin command reads its session from; `runtime` is read when a command runs, after it exists.
    const commandSession = {
        get runtime() {
            return runtime;
        },
        host: options.commandHost,
    };

    const refusesReadOnly = (command: EngineCommand) => mode === 'readonly' && command.readOnly !== true;
    /** Why the policy refuses `command` with `payload` on `base` before it runs. */
    const policyRefusal = (command: EngineCommand, base: EditorState, payload: unknown): RejectedCode | undefined => {
        if (command.policyRefuses?.(policy, payload) === true) {
            return 'not-allowed';
        }
        if (command.refuses?.(base, payload) === true) {
            return 'not-allowed';
        }
        return undefined;
    };

    /**
     * Runs a command against the current state with a dispatch that captures its transaction, then prepares it; the
     * effects it defers go to `effects`, which a query leaves out.
     */
    const attempt = (
        command: EngineCommand | undefined,
        checked: { readonly payload: unknown } | undefined,
        base: EditorState | RejectedCode,
        ids: () => string,
        route: Route,
        effects?: (() => void)[],
    ): Attempt => {
        if (command === undefined) {
            return { code: 'unknown-command' };
        }
        // One JSON copy is checked and run, so an accessor or proxy cannot change the payload in between.
        if (checked === undefined) {
            return { code: 'invalid-payload' };
        }
        if (findInvalidPayload(command.payload, checked.payload) !== undefined) {
            return { code: 'invalid-payload' };
        }
        const urls = withCheckedUrls(command, checked.payload);
        if (urls === undefined) {
            return { code: 'invalid-payload' };
        }
        const { payload } = urls;
        if (phase === 'transitioning') {
            return { code: 'busy' };
        }
        if (phase !== 'ready') {
            return { code: 'not-ready' };
        }
        if (refusesReadOnly(command)) {
            return { code: 'readonly' };
        }
        if (typeof base === 'string') {
            return { code: base };
        }
        const refused = policyRefusal(command, base, payload);
        if (refused !== undefined) {
            return { code: refused };
        }
        const dispatched: Transaction[] = [];
        let refusedWrite = false;
        const context = {
            defer: (effect: () => void) => effects?.push(effect),
            refuse: () => {
                refusedWrite = true;
            },
            session: commandSession,
        };
        let applicable: boolean;
        try {
            applicable = command.run(base, (transaction) => dispatched.push(transaction), payload, context);
        } catch {
            // A plugin that throws while a command's API write applies drops the command, as it drops a batch.
            return {
                code: 'not-applicable',
                diagnostic: diagnostic('runtime.plugin-error', undefined, undefined, 'error'),
            };
        }
        if (dispatched.length > 1) {
            return {
                code: 'not-applicable',
                diagnostic: diagnostic('runtime.multiple-dispatch', undefined, undefined, 'error'),
            };
        }
        const [root] = dispatched;
        if (!applicable) {
            if (refusedWrite) {
                return { code: 'not-allowed' };
            }
            return { code: 'not-applicable' };
        }
        if (root === undefined) {
            return { unchanged: true };
        }
        // `readOnly` lets a command run in a read-only editor to open something, never to change content.
        if (mode === 'readonly' && root.docChanged) {
            return { code: 'readonly' };
        }
        // Work that runs later through a target maps the user's selection through its change instead of moving it there.
        if (route !== 'host' && base !== state) {
            root.setSelection(state.selection.map(root.doc, root.mapping));
        }
        const prepared = prepare(root, ids, false);
        // A host call never changes content during a composition, which queued intents wait out.
        if ('candidate' in prepared && prepared.candidate.doc !== state.doc && settling.active()) {
            return { code: 'composition-active' };
        }
        return prepared;
    };

    const queryOn = (
        command: EngineCommand | undefined,
        checked: { readonly payload: unknown } | undefined,
        base: EditorState | RejectedCode,
    ): CommandState => {
        let active: boolean | 'mixed' = false;
        if (command !== undefined && checked !== undefined && typeof base !== 'string') {
            active = command.active(base, checked.payload, { defer: () => undefined, session: commandSession });
        }
        const attempted = attempt(command, checked, base, queriedIds(), 'host');
        if ('code' in attempted) {
            return { enabled: false, active, disabledReason: attempted.code };
        }
        return { enabled: true, active, disabledReason: null };
    };
    const query = (id: string, given?: unknown, options?: unknown): CommandState =>
        queryOn(definition.commands.get(id), checkedPayload(given), baseOf(options));

    // Installs exactly what `query` checked, so the two agree.
    const runOn = (
        command: EngineCommand | undefined,
        checked: { readonly payload: unknown } | undefined,
        base: () => EditorState | RejectedCode,
        route: Route,
    ): CommandResult => {
        if (busy > 0) {
            return rejected('busy');
        }
        const effects: (() => void)[] = [];
        const result = busyWith((): CommandResult => {
            const attempted = attempt(command, checked, base(), installedId, route, effects);
            if ('unchanged' in attempted) {
                return { status: 'no-op', stamp: { ...session, sequence }, contentChanged: false };
            }
            if ('candidate' in attempted) {
                const before = commitSequence;
                const contentChanged = install(attempted);
                // The view faulted while it installed the batch, which a later fault or `dispose` from a listener leaves applied.
                if (commitSequence === before) {
                    return rejected('not-ready');
                }
                return { status: 'applied', stamp: { ...session, sequence }, contentChanged };
            }
            if (attempted.diagnostic !== undefined) {
                report(attempted.diagnostic);
            }
            if (attempted.fault !== undefined) {
                fault(attempted.fault);
            }
            return rejected(attempted.code);
        });
        // Deferred effects, such as an overlay a plugin command opens, run once the command has run and its commit ended.
        if (result.status !== 'rejected') {
            for (const effect of effects) {
                effect();
            }
        }
        return result;
    };
    const run = (id: string, given: unknown, options: unknown, route: Route): CommandResult =>
        runOn(definition.commands.get(id), checkedPayload(given), () => baseOf(options), route);
    const execute = (id: string, given?: unknown, commandOptions?: unknown): CommandResult => {
        // Commands belong in event handlers; a call inside a notification is already `busy`.
        if (busy === 0 && options.inRender?.() === true) {
            report(diagnostic('react.execute-in-render', undefined, undefined, 'error'));
            return rejected('busy');
        }
        const result = run(id, given, commandOptions, 'host');
        // Without `focus: 'editor'` a command leaves focus where it is.
        if (isRecord(commandOptions) && commandOptions.focus === 'editor') {
            focus();
        }
        return result;
    };

    /** The state with the node `nodeId` selected, as a node view action runs on it. */
    /** The position of `target` in `doc` when it holds a node there, read when it is needed. */
    const targetIn = (doc: Node, target: NodeTarget): number | undefined => {
        if (typeof target === 'string') {
            return positionOf(doc, target);
        }
        const pos = target();
        if (pos === undefined || pos < 0 || pos >= doc.content.size || doc.nodeAt(pos) === null) {
            return undefined;
        }
        return pos;
    };
    const nodeBase = (target: NodeTarget): EditorState | RejectedCode => {
        const pos = targetIn(state.doc, target);
        if (pos === undefined) {
            return 'target-invalid';
        }
        return state.apply(state.tr.setSelection(NodeSelection.create(state.doc, pos)));
    };
    /** A command that changes the node `target` wherever it is when it runs. */
    const nodeCommand = (
        target: NodeTarget,
        change: (tr: Transaction, pos: number, node: Node) => boolean,
    ): EngineCommand => ({
        run: (base, dispatch) => {
            const pos = targetIn(base.doc, target);
            if (pos === undefined) {
                return false;
            }
            const node = base.doc.nodeAt(pos);
            const { tr } = base;
            if (node === null || !change(tr, pos, node)) {
                return false;
            }
            dispatch?.(tr);
            return true;
        },
        active: () => false,
    });
    const nodeActions = (target: NodeTarget): NodeActions => ({
        update: (attrs) => {
            const checked = checkedPayload(attrs);
            if (checked === undefined || !isRecord(checked.payload)) {
                return rejected('invalid-payload');
            }
            const values = checked.payload;
            const update = nodeCommand(target, (tr, pos, node) => {
                const declared = compiledModel(definition.model).nodes.find(({ name }) => name === node.type.name);
                if (declared === undefined) {
                    return false;
                }
                const attributes = attributesOf(declared);
                for (const [name, value] of Object.entries(values)) {
                    const attribute = attributes[name];
                    // An action never changes the ID it finds its node by.
                    if (name === 'nodeId' || attribute === undefined || !isValidValue(attribute, value)) {
                        return false;
                    }
                    tr.setNodeAttribute(pos, name, value);
                }
                return true;
            });
            return runOn(update, { payload: undefined }, () => state, 'host');
        },
        remove: () => {
            const remove = nodeCommand(target, (tr, pos, node) => {
                tr.delete(pos, pos + node.nodeSize);
                return true;
            });
            return runOn(remove, { payload: undefined }, () => state, 'host');
        },
        select: () => {
            const pos = targetIn(state.doc, target);
            if (pos !== undefined) {
                commit(state.tr.setSelection(NodeSelection.create(state.doc, pos)));
            }
        },
        // The author's selection stays, so typing after a press on chrome, such as a task checkbox, keeps the node.
        execute: (id, payload) =>
            runOn(definition.commands.get(id), checkedPayload(payload), () => nodeBase(target), 'node'),
        query: (id, payload) => queryOn(definition.commands.get(id), checkedPayload(payload), nodeBase(target)),
    });

    /** Commits a capture of the selection, or of `range`, as target `id`. */
    const captureNow = (
        id: string,
        options: CaptureTargetOptions,
        range?: { readonly from: number; readonly to: number },
    ) => commit(captureTarget(state, id, options, range));
    /** Captures the selection, or `range`, as a new target, unless a commit or notification runs. */
    const captureRange = (
        options: CaptureTargetOptions,
        range: { readonly from: number; readonly to: number } | undefined,
    ): CaptureResult => {
        // During a commit or notification the capture's root would wait or go stale, so it is refused, as `execute` is.
        if (phase !== 'ready' || busy > 0) {
            return { status: 'rejected', code: 'not-ready' };
        }
        const id = generate();
        captureNow(id, options, range);
        return { status: 'captured', target: handleOf(id) };
    };
    /** The handle of target `id` in this session. */
    const handleOf = (id: string) => Object.freeze({ id, session }) as unknown as SelectionHandle;

    /**
     * Runs queued intents in call order once no commit or notification is in progress
     * and input has settled.
     */
    const drain = () => {
        if (draining || busy > 0 || phase !== 'ready' || settling.active()) {
            return;
        }
        draining = true;
        let warned = false;
        try {
            let intent = queue.shift();
            while (intent !== undefined) {
                liveResources.intents -= 1;
                // The intent's depth holds while it runs or is reported, so what its listeners enqueue sits deeper.
                depth = intent.depth;
                if (intent.depth <= MAX_ENQUEUE_DEPTH) {
                    intent.resolve(run(intent.id, intent.payload, intent.options, 'queue'));
                } else {
                    if (!warned) {
                        warned = true;
                        report(diagnostic('runtime.enqueue-loop', undefined, undefined, 'warning'));
                    }
                    intent.resolve(rejected('busy'));
                }
                depth = 0;
                intent = queue.shift();
            }
        } finally {
            draining = false;
        }
    };

    const enqueue = (id: string, payload?: unknown, options?: unknown): Promise<CommandResult> =>
        new Promise((resolve) => {
            if (phase === 'faulted' || phase === 'disposed') {
                resolve(rejected('not-ready'));
                return;
            }
            // An intent that a queued intent's events enqueue sits one level deeper.
            queue.push({ id, payload, options, depth: depth + 1, resolve });
            liveResources.intents += 1;
            drain();
        });

    const cancelReady = () => {
        if (readyFrame !== undefined) {
            cancelAnimationFrame(readyFrame);
            readyFrame = undefined;
            liveResources.frames -= 1;
        }
    };

    const detach = () => {
        cancelReady();
        if (view !== undefined) {
            liveResources.views.delete(view);
            try {
                view.destroy();
            } catch (error) {
                // A view that threw on an update runs it again while it is destroyed, and `dispose` throws nothing.
                if (recovery === undefined) {
                    throw error;
                }
            }
            view = undefined;
        }
    };

    const dispose = () => {
        if (phase === 'disposed') {
            return;
        }
        saves?.dispose();
        // A listener of what the coordinator reported may have disposed the session already.
        if (isDisposed()) {
            return;
        }
        // Set first, so `disposed` listeners read the final phase and what they enqueue settles at once.
        phase = 'disposed';
        ended.abort();
        settling.cancel();
        settleQueue('not-ready');
        deferred.length = 0;
        const release = releaseTargets(state);
        if (release !== undefined) {
            liveResources.targets -= countTargets(state);
            state = state.apply(release);
        }
        emit('disposed', session);
        clear();
        detach();
        liveResources.installedFeatures.delete(handle);
    };

    const focus = (where: 'current' | 'start' | 'end' = 'current') => {
        if (phase !== 'ready' || view === undefined) {
            return;
        }
        if (where === 'start') {
            commit(state.tr.setSelection(Selection.atStart(state.doc)));
        }
        if (where === 'end') {
            commit(state.tr.setSelection(Selection.atEnd(state.doc)));
        }
        if (shownMode === 'editable') {
            view.focus();
            return;
        }
        // ProseMirror's `focus()` does nothing while the view is not editable, and it syncs no DOM selection there.
        view.dom.focus();
        const anchor = view.domAtPos(state.selection.anchor);
        const head = view.domAtPos(state.selection.head);
        const selection = view.dom.ownerDocument.getSelection();
        if (selection !== null) {
            selection.setBaseAndExtent(anchor.node, anchor.offset, head.node, head.offset);
        }
    };

    const commitSnapshot = (commitOptions: CommitOptions): Promise<CommitResult> => {
        if (saves === undefined) {
            return Promise.resolve({ status: 'blocked', code: 'unmanaged' });
        }
        return saves.commit(commitOptions);
    };

    /** Whether the session has unsaved changes; an unmanaged one acknowledges only what it loaded. */
    const unsavedChanges = () => {
        if (saves !== undefined) {
            return saves.unsaved();
        }
        return sequence > 0;
    };

    /** Replacement step 5 for a session with unsaved changes: `undefined` when the policy lets the replacement go on. */
    const leaveUnsaved = async (unsaved: ReplaceDocumentRequest['unsaved']): Promise<ReplaceCode | undefined> => {
        // A host in JavaScript may pass no policy at all.
        if (!isRecord(unsaved)) {
            return 'unsaved';
        }
        if (unsaved.action === 'save') {
            const result = await commitSnapshot({ reason: 'navigate' });
            // A write whose outcome is unknown goes on to step 6, which refuses it.
            if (result.status === 'acknowledged' || (result.status === 'failed' && result.outcome === 'unknown')) {
                return undefined;
            }
            return 'unsaved';
        }
        if (unsaved.action === 'checkpoint') {
            // A checkpoint with no receipt cannot hold the current stamp.
            if (!isRecord(unsaved.receipt) || !isRecord(unsaved.receipt.stamp)) {
                return 'unsaved';
            }
            if (sameStamp(unsaved.receipt.stamp, { ...session, sequence })) {
                return undefined;
            }
            return 'checkpoint-invalid';
        }
        if (unsaved.action === 'discard' && unsaved.confirmed === true) {
            return undefined;
        }
        return 'unsaved';
    };

    /**
     * Gives focus back to a surface that had it when the replacement started, editable or readonly, unless focus moved
     * on meanwhile, in its own document or out of it to a parent page; Chromium blurs a focused surface whose
     * `contenteditable` turns false.
     */
    const refocus = (focused: boolean) => {
        if (!focused || view === undefined) {
            return;
        }
        const owner = view.dom.ownerDocument;
        const { activeElement, body } = owner;
        if (owner.hasFocus() && (activeElement === null || activeElement === body)) {
            focus();
        }
    };

    /** Leaves `transitioning` after a failed step, so what waited runs on the unchanged session. */
    const resume = (code: ReplaceCode, focused: boolean): ReplaceResult => {
        phase = 'ready';
        refreshView();
        saves?.settled();
        drain();
        refocus(focused);
        return refused(code);
    };

    /**
     * Replacement step 8: the decoded document in a fresh state with empty history, in the next generation of the
     * session; a view that throws while it installs the state faults the session.
     */
    const installNext = (
        request: ReplaceDocumentRequest,
        tree: TreeNode,
        stored: readonly CapabilityRef[],
        focused: boolean,
    ): ReplaceResult => {
        let fresh: EditorState;
        try {
            const doc = definition.schema.nodeFromJSON(tree);
            let selection = Selection.atStart(doc);
            if (request.selection === 'end') {
                selection = Selection.atEnd(doc);
            }
            fresh = reset(state, doc, selection);
        } catch {
            fault(diagnostic('runtime.view-fault', undefined, undefined, 'error'));
            return refused('faulted');
        }
        // Roots that plugin views dispatch while the state installs commit in the new generation.
        const installed = guarded(() => {
            installingNext = true;
            const shown = installState(fresh);
            installingNext = false;
            if (!shown) {
                return false;
            }
            // Intents of the old generation end before anything can drain them into the next.
            settleQueue('wrong-session');
            const previous = { ...session, sequence };
            session = {
                documentId: request.next.documentId,
                sessionId: session.sessionId,
                generation: session.generation + 1,
            };
            sequence = 0;
            published = state;
            capabilities = stored;
            exceedsLimits = createLimitCheck(definition.model, capabilities);
            if (saves === undefined) {
                unmanaged = createUnmanagedStatus(request.next.revision);
            } else {
                saves.replaced(request.next.revision, previous);
            }
            phase = 'ready';
            refreshView();
            return true;
        });
        if (!installed) {
            return refused('faulted');
        }
        busyWith(notify);
        emitSelection();
        emitSaveStatus();
        emit('replaced', session);
        refocus(focused);
        return { status: 'replaced', session };
    };

    /** `EditorHandle.replaceDocument`: the Replacement steps in order, stopping at the first that fails. */
    const replace = async (request: ReplaceDocumentRequest): Promise<ReplaceResult> => {
        if (phase !== 'ready') {
            return refused('not-ready');
        }
        const { next } = request;
        const { document } = next;
        // The input is untrusted: only a record names a model, and `decodeToTree` judges any other input.
        if (isRecord(document) && isRecord(document.model) && document.model.id !== definition.model.ref.id) {
            return refused('wrong-model');
        }
        const { result, tree } = decodeToTree(document, definition.model, { limits });
        if (result.status !== 'editable' || tree === undefined) {
            return refused('invalid-document');
        }
        // A host that echoes its own save gets the current session back with nothing changed; hashing waits for a checked document.
        if (
            next.documentId === session.documentId &&
            next.revision === saveStatus().revision &&
            hashDocument(document) === hashDocument(handle.getSnapshot().document)
        ) {
            return { status: 'replaced', session };
        }
        if (!sameStamp(request.expected, { ...session, sequence })) {
            return refused('changed-since-request');
        }
        if (settling.active()) {
            return refused('composition-active');
        }
        const focused = view?.hasFocus() === true;
        phase = 'transitioning';
        refreshView();
        if (unsavedChanges()) {
            const code = await leaveUnsaved(request.unsaved);
            // The session was disposed, or faulted, while the step 5 write ran.
            if (phase !== 'transitioning') {
                return refused('not-ready');
            }
            if (code !== undefined) {
                return resume(code, focused);
            }
        }
        if (saves?.outcomeUnknown() === true) {
            return resume('save-unresolved', focused);
        }
        // A keystroke the view read during step 5 is kept, not replaced.
        if (!sameStamp(request.expected, { ...session, sequence })) {
            return resume('changed-since-request', focused);
        }
        return installNext(request, tree, result.document.requiredCapabilities, focused);
    };

    const handle: RuntimeHandle = {
        getSummary: () => {
            return {
                session,
                phase,
                mode,
                commitSequence,
                sequence,
                compositionActive: settling.active(),
                selection: summarize(state.selection),
            };
        },
        // The same frozen object until the published document or the composition state changes.
        getSnapshot: () => {
            const composing = settling.active();
            const acknowledged = saveStatus().revision;
            if (
                snapshotCache === undefined ||
                snapshotCache.doc !== published.doc ||
                snapshotCache.composing !== composing ||
                snapshotCache.revision !== acknowledged
            ) {
                const value: Snapshot = snapshot({
                    stamp: { ...session, sequence },
                    document: encode(published.doc),
                    acknowledgedRevision: acknowledged,
                    compositionActive: composing,
                });
                snapshotCache = { doc: published.doc, composing, revision: acknowledged, value };
            }
            return snapshotCache.value;
        },
        getSaveStatus: saveStatus,
        getRecoveryCandidate: () => {
            if (phase !== 'faulted' || recovery === undefined) {
                return null;
            }
            return encode(recovery.doc);
        },
        query,
        execute,
        enqueue,
        captureTarget: (options) => captureRange(options, undefined),
        releaseTarget: (target) => {
            const owned = ownTarget(target);
            if (phase === 'disposed' || typeof owned === 'string') {
                return;
            }
            const release = releaseTargets(state, [owned.id]);
            if (release !== undefined) {
                commit(release);
            }
        },
        requestCommit: (commitOptions) => {
            // Only the replacement's own `save` writes while the document is replaced.
            if (saves !== undefined && phase === 'transitioning') {
                return Promise.resolve({ status: 'blocked', code: 'not-ready' });
            }
            return commitSnapshot(commitOptions);
        },
        replaceDocument: async (request) => {
            const started = Date.now();
            const result = await replace(request);
            let failureCode: string | null = null;
            if (result.status === 'rejected') {
                failureCode = result.code;
            }
            measure('replace', started, failureCode);
            return result;
        },
        setMode: (next) => {
            if (phase === 'disposed') {
                return;
            }
            mode = next;
            refreshView();
        },
        // Applies to the next query and commit; the schema, view and plugins stay.
        updatePolicy: (next) => {
            policy = authoringOf(definition.model, next);
            busyWith(notify);
        },
        focus,
        subscribe,
        dispose,
    };

    const runtime: EditorRuntime = {
        handle,
        definition,
        get view() {
            return view;
        },
        get state() {
            return state;
        },
        limits,
        attach: (element) => {
            if (phase === 'disposed') {
                return;
            }
            detach();
            const { threw, value: attached } = callView(
                () =>
                    new EditorView(
                        { mount: element },
                        {
                            state,
                            editable: () => phase === 'ready' && shownMode === 'editable',
                            attributes: (current) => {
                                const attributes: Record<string, string> = {};
                                if (shownMode === 'readonly') {
                                    // A surface that is not contenteditable takes no focus by itself.
                                    attributes.tabindex = '0';
                                    attributes['aria-readonly'] = 'true';
                                }
                                if (isEmpty(current)) {
                                    attributes['data-rte-empty'] = '';
                                }
                                // Selection and copy keep working on a surface that takes no edits.
                                if (phase === 'transitioning') {
                                    attributes['aria-busy'] = 'true';
                                }
                                return attributes;
                            },
                            nodeViews,
                            dispatchTransaction: commit,
                        },
                    ),
            );
            if (attached === undefined || threw) {
                // A node view that throws leaves the half-built view's DOM observer and input handlers on the element
                // unless that view is destroyed.
                const halfBuilt = attached;
                if (halfBuilt !== undefined) {
                    try {
                        halfBuilt.destroy();
                    } catch {
                        // Its node views may throw again while it is destroyed.
                    }
                }
                // A view or node view constructor that throws keeps the decoded document as the snapshot.
                fault(diagnostic('runtime.view-fault', undefined, undefined, 'error'));
                return;
            }
            view = attached;
            liveResources.views.add(attached);
            viewRuntimes.set(attached, runtime);
            if (secondCopyAtMount(state)) {
                report(DUPLICATE_ENGINE);
            }
            if (phase !== 'mounting') {
                return;
            }
            // Frames run after microtasks, so the first portal flush of the initial document precedes `ready`.
            readyFrame = requestAnimationFrame(() => {
                readyFrame = undefined;
                liveResources.frames -= 1;
                phase = 'ready';
                refreshView();
                emit('ready', session);
                measure('mount', createdAt, null);
            });
            liveResources.frames += 1;
        },
        detach,
        report,
        refusal: (command, base, payload) => {
            if (refusesReadOnly(command)) {
                return 'readonly';
            }
            return policyRefusal(command, base, payload);
        },
        writeRefusal: (before, transaction) => {
            const checked = finalCheck(before, transaction.doc, transaction.mapping);
            if (checked.policy) {
                return 'policy';
            }
            if (checked.limit !== undefined) {
                return 'limit';
            }
            return undefined;
        },
        perform: (command, performOptions) =>
            runOn(command, { payload: undefined }, () => baseOf(performOptions), 'host'),
        select: (target) => {
            let transaction = state.tr;
            if ('node' in target) {
                transaction = transaction.setSelection(NodeSelection.create(state.doc, target.node));
            } else {
                transaction = transaction.setSelection(TextSelection.create(state.doc, target.anchor, target.head));
            }
            commit(transaction);
        },
        watch,
        changeServices: (members) => {
            if (members.includes('persistence')) {
                saves?.serviceChanged();
            }
        },
        faultView: () => {
            if (viewCall) {
                viewThrew = true;
                return;
            }
            if ((phase === 'mounting' || phase === 'ready') && view !== undefined) {
                viewFault(view, state);
            }
        },
        nodeActions,
        saveStatusChanged: emitSaveStatus,
        measure: (kind, started, failureCode) => measure(kind, started, failureCode),
    };
    if (options.nodeViews !== undefined) {
        nodeViews = options.nodeViews(runtime);
    }
    if (options.saves !== undefined) {
        saves = options.saves(runtime);
    }
    shownStatus = saveStatus();
    runtimes.set(handle, runtime);
    liveResources.installedFeatures.set(
        handle,
        definition.model.capabilities.map(({ id }) => id),
    );
    return runtime;
};
