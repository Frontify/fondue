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
    type PluginOrigin,
} from '#/definition';
import {
    type CapabilityRef,
    type Diagnostic,
    type ResourceLimits,
    type RichTextDocument,
    type RuntimeEnvironment,
} from '#/model';
import { type TreeNode } from '#/model/content';
import { encodeTree } from '#/model/encode';
import { findInvalidPayload } from '#/model/values';

import { createLimitCheck } from './limits';
import { authoringOf, createPolicyCheck } from './policy';
import {
    type AuthoringPolicy,
    type ChangeOrigin,
    type CommandResult,
    type CommandState,
    type DocumentChange,
    type EditorSummary,
    type SelectionSummary,
    type SessionToken,
    type Unsubscribe,
} from './types';

type Mode = EditorSummary['mode'];
type RejectedCode = Extract<CommandResult, { readonly status: 'rejected' }>['code'];

/** The events this runtime emits; the handle accepts the other `EditorEventMap` names, which later layers emit. */
interface RuntimeEvents {
    readonly ready: SessionToken;
    readonly documentChange: DocumentChange;
    readonly diagnostic: Diagnostic;
    readonly disposed: SessionToken;
}
type Listener = (value: never) => void;

// Queued intents whose listeners keep enqueuing stop past this depth (SPEC-rich-text-runtime/AC-030).
const MAX_ENQUEUE_DEPTH = 32;

const notBuiltYet = (member: string, pair: string) => (): never => {
    throw new Error(`EditorHandle.${member} is not built yet; it lands with ${pair}.`);
};

/** What the host calls: the `EditorHandle` members a later pair builds throw an error naming that pair (DR-063). */
export interface RuntimeHandle {
    getSummary(): EditorSummary;
    getSnapshot(): never;
    getSaveStatus(): never;
    getRecoveryCandidate(): never;
    query(id: string, ...args: readonly unknown[]): CommandState;
    execute(id: string, ...args: readonly unknown[]): CommandResult;
    enqueue(id: string, ...args: readonly unknown[]): Promise<CommandResult>;
    captureTarget(): never;
    releaseTarget(): never;
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
    /** Shows the document in `element`, which becomes the editable surface. */
    attach(element: HTMLElement): void;
    /** Destroys the view synchronously; the session and its state stay. */
    detach(): void;
    report(diagnostic: Diagnostic): void;
    /** Selects the text between two positions, or the node at one, as the `src/testing` helpers name it. */
    select(target: { readonly anchor: number; readonly head: number } | { readonly node: number }): void;
    /**
     * A selector store: `listener` gets each new value of `read` after a commit or a policy update, unless `isEqual`
     * holds between it and the last value (SPEC-rich-text-runtime/AC-025, AC-079).
     */
    watch<T>(read: () => T, isEqual: (previous: T, next: T) => boolean, listener: (value: T) => void): Unsubscribe;
}

export interface EditorRuntimeOptions {
    readonly definition: CompiledDefinition;
    readonly documentId: string;
    /** The decoded island tree the session's document starts from. */
    readonly tree: TreeNode;
    /** The stored document's capabilities, kept while islands keep their content. */
    readonly capabilities: readonly CapabilityRef[];
    readonly environment: RuntimeEnvironment;
    readonly mode: Mode;
    readonly policy: AuthoringPolicy;
    readonly limits: ResourceLimits;
}

/** What every live runtime owns, which the `src/testing` probe reads. */
export const liveResources = {
    views: new Set<EditorView>(),
    /** The installed feature IDs of each session not yet disposed, by handle. */
    sessions: new Map<object, readonly string[]>(),
    subscriptions: 0,
    selectors: 0,
    intents: 0,
    frames: 0,
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

/** Where a batch came from: typing is a DOM change after a recorded `beforeinput`, which ProseMirror does not mark. */
const originOf = (root: Transaction, typing: boolean): ChangeOrigin => {
    const event: unknown = root.getMeta('uiEvent');
    if (root.getMeta(COMMAND_META) !== undefined) {
        return 'command';
    }
    if (typeof event === 'string' && UI_ORIGINS.has(event)) {
        return event as ChangeOrigin;
    }
    if (typing) {
        return 'input';
    }
    return 'unknown';
};

/** One empty paragraph is an empty document, which shows the placeholder (SPEC-rich-text-react/AC-030). */
const isEmpty = ({ doc }: EditorState) =>
    doc.childCount === 1 && doc.firstChild !== null && doc.firstChild.isTextblock && doc.firstChild.content.size === 0;

const rejected = (code: RejectedCode): CommandResult => ({ status: 'rejected', code });
const runtimeDiagnostic = (
    code: Diagnostic['code'],
    severity: Diagnostic['severity'],
    details?: Diagnostic['details'],
): Diagnostic => {
    if (details === undefined) {
        return { code, severity, messageKey: code };
    }
    return { code, severity, messageKey: code, details };
};
const unique = (values: readonly string[]) => [...new Set(values)];

/** A batch checked against policy and limits and not installed, or why it cannot be. */
type Prepared =
    | { readonly candidate: EditorState; readonly root: Transaction }
    | { readonly code: RejectedCode; readonly diagnostic?: Diagnostic; readonly fault?: Diagnostic };
/** What a command would do now: nothing, a prepared batch, or a rejection. */
type Attempt = Prepared | { readonly unchanged: true };

interface Watcher {
    readonly read: () => unknown;
    readonly isEqual: (previous: unknown, next: unknown) => boolean;
    readonly listener: (value: unknown) => void;
    value: unknown;
}
interface Intent {
    readonly id: string;
    readonly payload: unknown;
    readonly depth: number;
    readonly resolve: (result: CommandResult) => void;
}

/** One editing session: its state, its view while a surface is attached, the commit path and its events. */
export const createEditorRuntime = (options: EditorRuntimeOptions): EditorRuntime => {
    const { definition, environment, limits } = options;
    const session: SessionToken = {
        documentId: options.documentId,
        sessionId: environment.ids.next('session'),
        generation: 0,
    };
    const breaksPolicy = createPolicyCheck(definition.model);
    const exceedsLimits = createLimitCheck(definition.model, options.capabilities);
    let policy = options.policy;
    let phase: EditorSummary['phase'] = 'mounting';
    let mode = options.mode;
    let commitSequence = 0;
    let sequence = 0;
    let typing = false;
    let view: EditorView | undefined;
    let readyFrame: number | undefined;
    // Commits and notifications in progress, during which `execute` is busy and `enqueue` waits.
    let busy = 0;
    let draining = false;
    let depth = 0;
    const listeners = new Map<string, Set<Listener>>();
    const watchers = new Set<Watcher>();
    const queue: Intent[] = [];

    // Records typing before any other handler sees the event, so the view itself gets no event handler (SPEC-rich-text-runtime/AC-001).
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
    let state = EditorState.create({
        doc: definition.schema.nodeFromJSON(options.tree),
        plugins: [typingRecorder, ...definition.plugins],
    });

    const busyWith = <T>(work: () => T): T => {
        busy += 1;
        try {
            return work();
        } finally {
            busy -= 1;
            drain();
        }
    };

    /** Calls one listener and tells whether it returned without a throw. */
    const call = (listener: Listener, value: unknown) => {
        try {
            (listener as (value: unknown) => void)(value);
            return true;
        } catch {
            return false;
        }
    };

    /** Reports each listener that threw once, to every diagnostic listener but that one (SPEC-rich-text-runtime/AC-027). */
    const reportThrows = (throwers: readonly Listener[]) => {
        const diagnostic = runtimeDiagnostic('runtime.listener-error', 'error');
        for (const thrower of throwers) {
            for (const listener of [...(listeners.get('diagnostic') ?? [])]) {
                // A diagnostic listener that throws on this report gets no report of it, so reporting never recurses.
                if (listener !== thrower) {
                    call(listener, diagnostic);
                }
            }
        }
    };

    const emit = <K extends keyof RuntimeEvents>(event: K, value: RuntimeEvents[K]) =>
        busyWith(() => {
            const throwers = [...(listeners.get(event) ?? [])].filter((listener) => !call(listener, value));
            reportThrows(throwers);
        });

    const report = (diagnostic: Diagnostic) => emit('diagnostic', diagnostic);

    const notifySelectors = () => {
        const throwers: Listener[] = [];
        for (const watcher of [...watchers]) {
            const next = watcher.read();
            if (!watcher.isEqual(watcher.value, next)) {
                watcher.value = next;
                if (!call(watcher.listener as Listener, next)) {
                    throwers.push(watcher.listener as Listener);
                }
            }
        }
        reportThrows(throwers);
    };

    const settleQueue = (code: RejectedCode) => {
        for (const intent of queue.splice(0)) {
            liveResources.intents -= 1;
            intent.resolve(rejected(code));
        }
    };

    const encode = (doc: Node): RichTextDocument =>
        encodeTree(doc.toJSON() as TreeNode, definition.model, options.capabilities).document;

    // Recomputes `editable` and the surface attributes from the phase and the mode.
    const refreshView = () => {
        if (view !== undefined) {
            view.setProps({});
        }
    };

    const fault = (diagnostic: Diagnostic) => {
        phase = 'faulted';
        refreshView();
        settleQueue('not-ready');
        report(diagnostic);
    };

    /** Applies a root transaction and every transaction plugins append to it, then the final policy and limit check. */
    const prepare = (root: Transaction): Prepared => {
        const batch: AppendBatch = {
            limit: limits.maxAppendedTransactions,
            now: () => environment.clock.now(),
            chain: [],
        };
        let applied: ReturnType<EditorState['applyTransaction']>;
        try {
            applied = state.applyTransaction(root.setMeta(APPEND_BATCH_META, batch));
        } catch (error) {
            if (!(error instanceof AppendLimitError)) {
                throw error;
            }
            const chain: readonly PluginOrigin[] = error.chain;
            const details = {
                features: unique(chain.map(({ featureId }) => featureId)),
                capabilities: unique(chain.map(({ capability }) => capability)),
                count: chain.length,
            };
            return { code: 'not-ready', fault: runtimeDiagnostic('runtime.append-limit', 'error', details) };
        }
        if (applied.transactions.length === 0) {
            return { code: 'not-applicable' };
        }
        // A batch that keeps the document, such as a selection move, has nothing to check.
        const { doc } = applied.state;
        if (doc !== state.doc && (breaksPolicy(policy, state.doc, doc) || exceedsLimits(doc, limits))) {
            return { code: 'not-allowed' };
        }
        return { candidate: applied.state, root };
    };

    /** Installs a checked batch in the view, counts it, notifies selector stores, then emits its change. */
    const install = (candidate: EditorState, root: Transaction, typed: boolean): boolean => {
        const previous = state;
        state = candidate;
        if (view !== undefined) {
            view.updateState(candidate);
        }
        commitSequence += 1;
        // An effective change compares documents by node equality, never by serializing them (SPEC-rich-text-runtime/AC-019).
        const changed = !candidate.doc.eq(previous.doc);
        if (changed) {
            sequence += 1;
        }
        notifySelectors();
        if (!changed) {
            return false;
        }
        let document: RichTextDocument | undefined;
        const command: unknown = root.getMeta(COMMAND_META);
        let commandId: string | null = null;
        if (typeof command === 'string') {
            commandId = command;
        }
        emit('documentChange', {
            stamp: { ...session, sequence },
            commitSequence,
            origin: originOf(root, typed),
            commandId,
            readDocument: () => {
                if (document === undefined) {
                    document = encode(candidate.doc);
                }
                return document;
            },
        });
        return true;
    };

    /** The view's `dispatchTransaction`: the one path by which any change reaches the view (SPEC-rich-text-runtime/AC-001). */
    const commit = (root: Transaction) => {
        // A recorded `beforeinput` describes this batch only, accepted or not.
        const typed = typing;
        typing = false;
        if (root.before !== state.doc) {
            report(runtimeDiagnostic('runtime.stale-transaction', 'error'));
            return;
        }
        busyWith(() => {
            const prepared = prepare(root);
            if ('candidate' in prepared) {
                install(prepared.candidate, root, typed);
            } else if (prepared.fault !== undefined) {
                fault(prepared.fault);
            }
        });
    };

    /** Runs a command against the current state with a dispatch that captures its transaction, then prepares it. */
    const attempt = (id: string, payload: unknown): Attempt => {
        const command = definition.commands.get(id);
        if (command === undefined) {
            return { code: 'unknown-command' };
        }
        if (findInvalidPayload(command.payload, payload) !== undefined) {
            return { code: 'invalid-payload' };
        }
        if (phase !== 'ready') {
            return { code: 'not-ready' };
        }
        if (mode === 'readonly') {
            return { code: 'readonly' };
        }
        const dispatched: Transaction[] = [];
        const applicable = command.run(state, (transaction) => dispatched.push(transaction), payload);
        if (dispatched.length > 1) {
            return { code: 'not-applicable', diagnostic: runtimeDiagnostic('runtime.multiple-dispatch', 'error') };
        }
        const [root] = dispatched;
        if (!applicable) {
            return { code: 'not-applicable' };
        }
        if (root === undefined) {
            return { unchanged: true };
        }
        return prepare(root);
    };

    const query = (id: string, payload?: unknown): CommandState => {
        const command = definition.commands.get(id);
        let active: boolean | 'mixed' = false;
        if (command !== undefined) {
            active = command.active(state);
        }
        const attempted = attempt(id, payload);
        if ('code' in attempted) {
            return { enabled: false, active, disabledReason: attempted.code };
        }
        return { enabled: true, active, disabledReason: null };
    };

    // Installs exactly what `query` checked, so the two agree (SPEC-rich-text-runtime/AC-036).
    const execute = (id: string, payload?: unknown): CommandResult => {
        if (busy > 0) {
            return rejected('busy');
        }
        return busyWith((): CommandResult => {
            const attempted = attempt(id, payload);
            if ('unchanged' in attempted) {
                return { status: 'no-op', stamp: { ...session, sequence }, contentChanged: false };
            }
            if ('candidate' in attempted) {
                const contentChanged = install(attempted.candidate, attempted.root, false);
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

    /** Runs queued intents in call order once no commit or notification is in progress (SPEC-rich-text-runtime/AC-029). */
    const drain = () => {
        if (draining || busy > 0 || phase !== 'ready') {
            return;
        }
        draining = true;
        try {
            let intent = queue.shift();
            while (intent !== undefined) {
                liveResources.intents -= 1;
                if (intent.depth > MAX_ENQUEUE_DEPTH) {
                    report(runtimeDiagnostic('runtime.enqueue-loop', 'warning'));
                    intent.resolve(rejected('busy'));
                } else {
                    depth = intent.depth;
                    intent.resolve(execute(intent.id, intent.payload));
                    depth = 0;
                }
                intent = queue.shift();
            }
        } finally {
            draining = false;
        }
    };

    const enqueue = (id: string, payload?: unknown): Promise<CommandResult> =>
        new Promise((resolve) => {
            // An intent that a queued intent's events enqueue sits one level deeper (SPEC-rich-text-runtime/AC-030).
            queue.push({ id, payload, depth: depth + 1, resolve });
            liveResources.intents += 1;
            drain();
        });

    const cancelReady = () => {
        if (readyFrame !== undefined) {
            environment.scheduler.cancelFrame(readyFrame);
            readyFrame = undefined;
            liveResources.frames -= 1;
        }
    };

    const detach = () => {
        cancelReady();
        if (view !== undefined) {
            liveResources.views.delete(view);
            view.destroy();
            view = undefined;
        }
    };

    const dispose = () => {
        if (phase === 'disposed') {
            return;
        }
        settleQueue('not-ready');
        emit('disposed', session);
        for (const set of listeners.values()) {
            liveResources.subscriptions -= set.size;
        }
        listeners.clear();
        liveResources.selectors -= watchers.size;
        watchers.clear();
        detach();
        liveResources.sessions.delete(handle);
        phase = 'disposed';
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
        if (mode === 'editable') {
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
            let compositionActive = false;
            if (view !== undefined) {
                compositionActive = view.composing;
            }
            return {
                session,
                phase,
                mode,
                commitSequence,
                sequence,
                compositionActive,
                selection: summarize(state.selection),
            };
        },
        getSnapshot: notBuiltYet('getSnapshot', 'pair 13, TASK-rte-runtime-async'),
        getSaveStatus: notBuiltYet('getSaveStatus', 'pair 17, TASK-rte-persistence'),
        getRecoveryCandidate: notBuiltYet('getRecoveryCandidate', 'pair 13, TASK-rte-runtime-async'),
        query,
        execute,
        enqueue,
        captureTarget: notBuiltYet('captureTarget', 'pair 11, TASK-rte-runtime'),
        releaseTarget: notBuiltYet('releaseTarget', 'pair 13, TASK-rte-runtime-async'),
        requestCommit: notBuiltYet('requestCommit', 'pair 17, TASK-rte-persistence'),
        replaceDocument: notBuiltYet('replaceDocument', 'pair 17, TASK-rte-persistence'),
        setMode: (next) => {
            if (phase === 'disposed') {
                return;
            }
            mode = next;
            refreshView();
        },
        // Applies to the next query and commit; the schema, view and plugins stay (SPEC-rich-text-runtime/AC-011).
        updatePolicy: (next) => {
            policy = authoringOf(definition.model, next);
            busyWith(notifySelectors);
        },
        focus,
        registerInteractionRoot: notBuiltYet('registerInteractionRoot', 'pair 19, TASK-rte-chrome'),
        subscribe: (event, listener) => {
            if (phase === 'disposed') {
                return () => undefined;
            }
            let set = listeners.get(event);
            if (set === undefined) {
                set = new Set();
                listeners.set(event, set);
            }
            const subscribed = set;
            subscribed.add(listener);
            liveResources.subscriptions += 1;
            return () => {
                if (subscribed.delete(listener)) {
                    liveResources.subscriptions -= 1;
                }
            };
        },
        dispose,
    };

    const runtime: EditorRuntime = {
        handle,
        get view() {
            return view;
        },
        attach: (element) => {
            if (phase === 'disposed') {
                return;
            }
            detach();
            const attached = new EditorView(
                { mount: element },
                {
                    state,
                    editable: () => phase === 'ready' && mode === 'editable',
                    attributes: (current) => {
                        const attributes: Record<string, string> = {};
                        if (mode === 'readonly') {
                            // A surface that is not contenteditable takes no focus by itself (SPEC-rich-text-react/AC-028).
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
            view = attached;
            liveResources.views.add(attached);
            if (phase !== 'mounting') {
                return;
            }
            // The first frame stands in for the first portal flush, which node views join (TASK-rte-bridge).
            readyFrame = environment.scheduler.frame(() => {
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
        watch: (read, isEqual, listener) => {
            if (phase === 'disposed') {
                return () => undefined;
            }
            const watcher = { read, isEqual, listener, value: read() } as Watcher;
            watchers.add(watcher);
            liveResources.selectors += 1;
            return () => {
                if (watchers.delete(watcher)) {
                    liveResources.selectors -= 1;
                }
            };
        },
    };
    runtimes.set(handle, runtime);
    liveResources.sessions.set(
        handle,
        definition.model.capabilities.map(({ id }) => id),
    );
    return runtime;
};
