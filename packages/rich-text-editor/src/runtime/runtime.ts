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
import { EditorView } from 'prosemirror-view';

import {
    APPEND_BATCH_META,
    type AppendBatch,
    AppendLimitError,
    COMMAND_META,
    type CompiledDefinition,
    NORMALIZE_META,
    ORIGIN_META,
    type PluginOrigin,
} from '#/definition';
import { type CapabilityRef, type Diagnostic, type ResourceLimits, type RichTextDocument } from '#/model';
import { type TreeNode } from '#/model/content';
import { encodeTree } from '#/model/encode';
import { diagnostic } from '#/model/format';
import { randomId } from '#/model/random-id';
import { findInvalidPayload, findUnsafeJson, isRecord, snapshot } from '#/model/values';

import { type AsyncOperation, type AsyncRequest, createAsyncCoordinator } from './async';
import { secondCopyAtMount, secondCopyInView } from './engines';
import { createEventBus, type Listener } from './events';
import { groupRoot, groupsPlugin, isHistoryTransaction } from './history';
import { firedRule, withoutRules } from './input-rules';
import { createLimitCheck } from './limits';
import { authoringOf, createPolicyCheck } from './policy';
import { createInputSettling } from './settle';
import { captureTarget, countTargets, releaseTargets, restoreTargets, targetSelection, targetsPlugin } from './targets';
import {
    type AuthoringPolicy,
    type CaptureResult,
    type CaptureTargetOptions,
    type ChangeOrigin,
    type CommandResult,
    type CommandState,
    type DocumentStamp,
    type EditorSummary,
    type SelectionHandle,
    type SelectionSummary,
    type SessionToken,
    type Unsubscribe,
} from './types';

type Mode = EditorSummary['mode'];
type RejectedCode = Extract<CommandResult, { readonly status: 'rejected' }>['code'];
// Queued intents whose listeners keep enqueuing stop past this depth.
const MAX_ENQUEUE_DEPTH = 32;
// ProseMirror marks each DOM change it reads during a composition with this meta.
const COMPOSITION_META = 'composition';
// The target an async operation started with none gets at the selection.
const ASYNC_TARGET: CaptureTargetOptions = { purpose: 'insert', onIntersectingEdit: 'map' };

const notBuiltYet = (member: string) => (): never => {
    throw new Error(`EditorHandle.${member} is not built yet.`);
};

/** The published snapshot; `acknowledgedRevision` stays `null` until a save coordinator acknowledges a save. */
export interface RuntimeSnapshot {
    readonly stamp: DocumentStamp;
    readonly document: RichTextDocument;
    readonly acknowledgedRevision: null;
    readonly compositionActive: boolean;
}

/** What the host calls. Members this layer does not build throw an error naming the member. */
export interface RuntimeHandle {
    getSummary(): EditorSummary;
    getSnapshot(): RuntimeSnapshot;
    getSaveStatus(): never;
    getRecoveryCandidate(): RichTextDocument | null;
    query(id: string, ...args: readonly unknown[]): CommandState;
    execute(id: string, ...args: readonly unknown[]): CommandResult;
    enqueue(id: string, ...args: readonly unknown[]): Promise<CommandResult>;
    captureTarget(options: CaptureTargetOptions): CaptureResult;
    releaseTarget(target: SelectionHandle): void;
    requestCommit(): never;
    replaceDocument(): never;
    setMode(mode: Mode): void;
    updatePolicy(policy: AuthoringPolicy): void;
    focus(where?: 'current' | 'start' | 'end'): void;
    registerInteractionRoot(): never;
    subscribe(event: string, listener: Listener): Unsubscribe;
    dispose(): void;
}

export interface EditorRuntime {
    readonly handle: RuntimeHandle;
    /** The view on the attached surface, for the `src/testing` helpers. */
    readonly view: EditorView | undefined;
    /** The session's current state, which stays readable after `dispose`, for tests. */
    readonly state: EditorState;
    /** Shows the document in `element`, which becomes the editable surface. */
    attach(element: HTMLElement): void;
    /** Destroys the view synchronously; the session and its state stay. */
    detach(): void;
    report(diagnostic: Diagnostic): void;
    /** Selects the text between two positions, or the node at one, as the `src/testing` helpers name it. */
    select(target: { readonly anchor: number; readonly head: number } | { readonly node: number }): void;
    /**
     * A selector store: `listener` gets each new value of `read` after a commit or a policy update, unless `isEqual`
     * holds between it and the last value.
     */
    watch<T>(read: () => T, isEqual: (previous: T, next: T) => boolean, listener: (value: T) => void): Unsubscribe;
    /** Starts an async operation through the coordinator, as an `upload` or mention search capability does. */
    startAsync(request: AsyncRequest): AsyncOperation;
    /** Aborts the operations that the changed `services` members started. */
    changeServices(members: readonly string[]): void;
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
}

/** What every live runtime owns, which the `src/testing` probe reads. */
export const liveResources = {
    views: new Set<EditorView>(),
    /** The installed feature IDs of each session not yet disposed, by handle. */
    installedFeatures: new Map<object, readonly string[]>(),
    intents: 0,
    frames: 0,
    targets: 0,
};

const runtimes = new WeakMap<object, EditorRuntime>();

/** The runtime behind a handle this module made. */
export const runtimeOf = (handle: object): EditorRuntime | undefined => runtimes.get(handle);

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

const summarize = (selection: Selection): SelectionSummary => {
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
    if (root.getMeta(ORIGIN_META) === 'async') {
        return 'async';
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
const isEmpty = ({ doc }: EditorState) =>
    doc.childCount === 1 && doc.firstChild !== null && doc.firstChild.isTextblock && doc.firstChild.content.size === 0;

const rejected = (code: RejectedCode): CommandResult => ({ status: 'rejected', code });
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
}
/** A candidate, or why a batch cannot be installed. */
type Prepared =
    | Candidate
    | { readonly code: RejectedCode; readonly diagnostic?: Diagnostic; readonly fault?: Diagnostic };
/** Who runs a command: a host call, a queued intent, or an async result. */
type Route = 'host' | 'queue' | 'async';
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
    const session: SessionToken = {
        documentId: options.documentId,
        sessionId: generate(),
        generation: 0,
    };
    const breaksPolicy = createPolicyCheck(definition.model);
    const exceedsLimits = createLimitCheck(definition.model, options.capabilities);
    let policy = options.policy;
    let policyRevision = 0;
    let phase: EditorSummary['phase'] = 'mounting';
    let mode = options.mode;
    // The mode the surface shows, which follows `mode` once input has settled.
    let shownMode = mode;
    let commitSequence = 0;
    let sequence = 0;
    let typing = false;
    let view: EditorView | undefined;
    // The view the last `EditorView` constructor built, which plugin views receive before the constructor returns.
    let built: EditorView | undefined;
    // The state the view threw on, which `getRecoveryCandidate` offers until `dispose`.
    // ProseMirror runs that throwing update again on `setProps` and `destroy`.
    let recovery: EditorState | undefined;
    let readyFrame: number | undefined;
    // Commits and notifications in progress, during which `execute` is busy and `enqueue` waits.
    let busy = 0;
    let draining = false;
    let depth = 0;
    let installing = false;
    // Roots that plugin views dispatch while an install runs, committed once its selectors and events are done.
    const deferred: Transaction[] = [];
    // Targets the coordinator captures during a commit, such as from a running command, captured once it ends.
    const deferredCaptures: string[] = [];
    const queue: Intent[] = [];

    // Records typing before any other handler sees the event, so the view itself gets no event handler.
    const typingRecorder = new Plugin({
        key: new PluginKey('rte.typing'),
        view: (editorView) => {
            built = editorView;
            return {};
        },
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
        plugins: [typingRecorder, settling.plugin, targetsPlugin, groupsPlugin, ...definition.plugins],
    });
    // The state whose document the snapshot and `sequence` last published, and how later provisional batches map it.
    let published = state;
    let provisional: Transaction['mapping'] | undefined;
    let snapshotCache: { readonly doc: Node; readonly composing: boolean; readonly value: RuntimeSnapshot } | undefined;

    const busyWith = <T>(work: () => T): T => {
        busy += 1;
        try {
            return work();
        } finally {
            busy -= 1;
            if (busy === 0) {
                flushCaptures();
            }
            drain();
        }
    };

    const { emit, notify, subscribe, watch, clear } = createEventBus({
        isDisposed: () => phase === 'disposed',
        around: busyWith,
    });

    const report = (diagnostic: Diagnostic) => emit('diagnostic', diagnostic);

    const settleQueue = (code: RejectedCode) => {
        for (const intent of queue.splice(0)) {
            liveResources.intents -= 1;
            intent.resolve(rejected(code));
        }
    };

    const encode = (doc: Node): RichTextDocument =>
        encodeTree(doc.toJSON() as TreeNode, definition.model, options.capabilities).document;

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
        // Results held for that settle are discarded now, as the faulted session takes none.
        coordinator.settle();
    };

    /** The view threw while it installed `candidate`: editing stops and the snapshot stays. */
    const viewFault = (attached: EditorView, candidate: EditorState) => {
        recovery = candidate;
        attached.dom.setAttribute('contenteditable', 'false');
        fault(diagnostic('runtime.view-fault', undefined, undefined, 'error'));
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
        // History groups by this time, never by the `Date.now()` a transaction takes when created.
        root.setTime(Date.now());
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
        if (
            doc !== state.doc &&
            !(fromView && isProvisional(root)) &&
            root.getMeta(NORMALIZE_META) !== 'now' &&
            (breaksPolicy(policy, state.doc, doc, mapping) || exceedsLimits(doc, limits))
        ) {
            if (firedRule(applied.transactions)) {
                return prepare(withoutRules(root), ids, fromView);
            }
            return { code: 'not-allowed' };
        }
        return { candidate: applied.state, root, mapping };
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

    /** Publishes the current state's document: counts an effective change, notifies selector stores, then emits it. */
    const announce = (origin: ChangeOrigin, commandId: string | null): boolean => {
        const previous = published;
        const current = state;
        published = current;
        // An effective change compares documents by node equality, never by serializing them.
        const changed = !current.doc.eq(previous.doc);
        if (changed) {
            sequence += 1;
        }
        notify();
        if (!changed) {
            return false;
        }
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
        return true;
    };

    /** Installs a state in the view and counts it as a commit; `false` when the view threw and the session faulted. */
    const installState = (next: EditorState): boolean => {
        const previous = state;
        state = next;
        if (view !== undefined) {
            try {
                view.updateState(next);
            } catch {
                state = previous;
                viewFault(view, next);
                return false;
            }
        }
        commitSequence += 1;
        liveResources.targets += countTargets(next) - countTargets(previous);
        return true;
    };

    /** Installs a batch in the view and counts it, then publishes it, or keeps a provisional batch for input settling. */
    const publish = ({ candidate, root, mapping }: Candidate): boolean => {
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
        return announce(origin, commandId);
    };

    /** Repairs the provisional batches, then checks them as one change from the published document; `false` on a fault. */
    const settleProvisional = (mapping: Transaction['mapping']): boolean => {
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
        }
        if (!breaksPolicy(policy, published.doc, state.doc, mapping) && !exceedsLimits(state.doc, limits)) {
            announce('input', null);
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
     * deferred `contenteditable` change, the queued intents and the held async results.
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
        coordinator.settle();
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

    /** Runs a command against the current state with a dispatch that captures its transaction, then prepares it. */
    const attempt = (
        id: string,
        checked: { readonly payload: unknown } | undefined,
        base: EditorState | RejectedCode,
        ids: () => string,
        route: Route,
    ): Attempt => {
        const command = definition.commands.get(id);
        if (command === undefined) {
            return { code: 'unknown-command' };
        }
        // One JSON copy is checked and run, so an accessor or proxy cannot change the payload in between.
        if (checked === undefined) {
            return { code: 'invalid-payload' };
        }
        const { payload } = checked;
        if (findInvalidPayload(command.payload, payload) !== undefined) {
            return { code: 'invalid-payload' };
        }
        if (phase !== 'ready') {
            return { code: 'not-ready' };
        }
        if (mode === 'readonly') {
            return { code: 'readonly' };
        }
        if (typeof base === 'string') {
            return { code: base };
        }
        const dispatched: Transaction[] = [];
        const applicable = command.run(base, (transaction) => dispatched.push(transaction), payload);
        if (dispatched.length > 1) {
            return {
                code: 'not-applicable',
                diagnostic: diagnostic('runtime.multiple-dispatch', undefined, undefined, 'error'),
            };
        }
        const [root] = dispatched;
        if (!applicable) {
            return { code: 'not-applicable' };
        }
        if (root === undefined) {
            return { unchanged: true };
        }
        // Work that runs later through a target maps the user's selection through its change instead of moving it there.
        if (route !== 'host' && base !== state) {
            root.setSelection(state.selection.map(root.doc, root.mapping));
        }
        // An async completion is no undo step of its own.
        if (route === 'async') {
            root.setMeta(ORIGIN_META, 'async').setMeta('addToHistory', false);
        }
        const prepared = prepare(root, ids, false);
        // A host call never changes content during a composition, which queued intents and async results wait out.
        if ('candidate' in prepared && prepared.candidate.doc !== state.doc && settling.active()) {
            return { code: 'composition-active' };
        }
        return prepared;
    };

    const query = (id: string, given?: unknown, options?: unknown): CommandState => {
        const command = definition.commands.get(id);
        const checked = checkedPayload(given);
        const base = baseOf(options);
        let active: boolean | 'mixed' = false;
        if (command !== undefined && checked !== undefined && typeof base !== 'string') {
            active = command.active(base, checked.payload);
        }
        const attempted = attempt(id, checked, base, queriedIds(), 'host');
        if ('code' in attempted) {
            return { enabled: false, active, disabledReason: attempted.code };
        }
        return { enabled: true, active, disabledReason: null };
    };

    // Installs exactly what `query` checked, so the two agree.
    const run = (id: string, given: unknown, options: unknown, route: Route): CommandResult => {
        if (busy > 0) {
            return rejected('busy');
        }
        return busyWith((): CommandResult => {
            const attempted = attempt(id, checkedPayload(given), baseOf(options), installedId, route);
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
    };
    const execute = (id: string, given?: unknown, options?: unknown) => run(id, given, options, 'host');

    /** Commits a capture of the selection as target `id`. */
    const captureNow = (id: string, options: CaptureTargetOptions) => commit(captureTarget(state, id, options));
    /** The handle of target `id` in this session. */
    const handleOf = (id: string) => Object.freeze({ id, session }) as unknown as SelectionHandle;

    /**
     * Captures each deferred target once no commit runs, at the selection the commit left, which ProseMirror maps
     * through the commit's steps (`Transaction.selection`).
     */
    const flushCaptures = () => {
        for (let id = deferredCaptures.shift(); id !== undefined; id = deferredCaptures.shift()) {
            if (phase === 'ready') {
                captureNow(id, ASYNC_TARGET);
            }
        }
    };

    const coordinator = createAsyncCoordinator({
        generateId: generate,
        session: () => session,
        policyRevision: () => policyRevision,
        isDisposed: () => phase === 'disposed',
        isFaulted: () => phase === 'faulted',
        holding: () => settling.active(),
        capture: () => {
            if (phase !== 'ready') {
                return undefined;
            }
            const id = generate();
            if (busy > 0) {
                deferredCaptures.push(id);
            } else {
                captureNow(id, ASYNC_TARGET);
            }
            return handleOf(id);
        },
        release: (target) => handle.releaseTarget(target),
        // A result runs as its command's payload through `commit` from the current state.
        apply: (operation, result) => {
            let options: { readonly target: SelectionHandle } | undefined;
            if (operation.target !== null) {
                options = { target: operation.target };
            }
            const outcome = run(operation.command, result, options, 'async');
            if (outcome.status === 'rejected') {
                return outcome.code;
            }
            return undefined;
        },
        report,
    });

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
        // Set first, so `disposed` listeners read the final phase and what they enqueue settles at once.
        phase = 'disposed';
        settling.cancel();
        coordinator.dispose();
        settleQueue('not-ready');
        deferred.length = 0;
        deferredCaptures.length = 0;
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
            if (
                snapshotCache === undefined ||
                snapshotCache.doc !== published.doc ||
                snapshotCache.composing !== composing
            ) {
                const value: RuntimeSnapshot = snapshot({
                    stamp: { ...session, sequence },
                    document: encode(published.doc),
                    acknowledgedRevision: null,
                    compositionActive: composing,
                });
                snapshotCache = { doc: published.doc, composing, value };
            }
            return snapshotCache.value;
        },
        getSaveStatus: notBuiltYet('getSaveStatus'),
        getRecoveryCandidate: () => {
            if (phase !== 'faulted' || recovery === undefined) {
                return null;
            }
            return encode(recovery.doc);
        },
        query,
        execute,
        enqueue,
        captureTarget: (options) => {
            // During a commit or notification the capture's root would wait or go stale, so it is refused, as `execute` is.
            if (phase !== 'ready' || busy > 0) {
                return { status: 'rejected', code: 'not-ready' };
            }
            const id = generate();
            captureNow(id, options);
            return { status: 'captured', target: handleOf(id) };
        },
        releaseTarget: (target) => {
            const owned = ownTarget(target);
            if (phase === 'disposed' || typeof owned === 'string') {
                return;
            }
            const waiting = deferredCaptures.indexOf(owned.id);
            if (waiting >= 0) {
                deferredCaptures.splice(waiting, 1);
            }
            const release = releaseTargets(state, [owned.id]);
            if (release !== undefined) {
                commit(release);
            }
        },
        requestCommit: notBuiltYet('requestCommit'),
        replaceDocument: notBuiltYet('replaceDocument'),
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
            policyRevision += 1;
            // An operation whose result the new policy forbids ends now.
            coordinator.abortWhere((operation) => {
                const rules = policy.features[operation.featureId];
                return rules === undefined || !rules[operation.action];
            });
            busyWith(notify);
        },
        focus,
        registerInteractionRoot: notBuiltYet('registerInteractionRoot'),
        subscribe,
        dispose,
    };

    const runtime: EditorRuntime = {
        handle,
        get view() {
            return view;
        },
        get state() {
            return state;
        },
        attach: (element) => {
            if (phase === 'disposed') {
                return;
            }
            detach();
            let attached: EditorView;
            built = undefined;
            try {
                attached = new EditorView(
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
                            return attributes;
                        },
                        dispatchTransaction: commit,
                    },
                );
            } catch {
                // ProseMirror starts its DOM observer and input handlers before plugin views, so a plugin view that throws
                // leaves them on the element unless the half-built view is destroyed.
                const halfBuilt = built as EditorView | undefined;
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
            if (secondCopyAtMount(state)) {
                report(DUPLICATE_ENGINE);
            }
            if (phase !== 'mounting') {
                return;
            }
            // The first frame stands in for the first portal flush, which node views join.
            readyFrame = requestAnimationFrame(() => {
                readyFrame = undefined;
                liveResources.frames -= 1;
                phase = 'ready';
                refreshView();
                emit('ready', session);
            });
            liveResources.frames += 1;
        },
        detach,
        report,
        select: (target) => {
            if ('node' in target) {
                commit(state.tr.setSelection(NodeSelection.create(state.doc, target.node)));
                return;
            }
            commit(state.tr.setSelection(TextSelection.create(state.doc, target.anchor, target.head)));
        },
        watch,
        startAsync: coordinator.start,
        changeServices: (members) => coordinator.abortWhere((operation) => members.includes(operation.service)),
    };
    runtimes.set(handle, runtime);
    liveResources.installedFeatures.set(
        handle,
        definition.model.capabilities.map(({ id }) => id),
    );
    return runtime;
};
