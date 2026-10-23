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
    type EngineCommand,
    ORIGIN_META,
    type PluginOrigin,
} from '#/definition';
import {
    type CapabilityRef,
    checkHref,
    type Diagnostic,
    type HrefPolicy,
    type ResourceLimits,
    type RichTextDocument,
} from '#/model';
import { compiledModel } from '#/model/compile';
import { type TreeNode } from '#/model/content';
import { encodeTree } from '#/model/encode';
import { diagnostic } from '#/model/format';
import { hrefPolicyOf } from '#/model/href';
import { randomId } from '#/model/random-id';
import { findInvalidPayload, findUnsafeJson, isRecord, snapshot } from '#/model/values';

import { secondCopyAtMount, secondCopyInView } from './engines';
import { createEventBus, type Listener } from './events';
import { createLimitCheck } from './limits';
import { nodeStatePlugin } from './node-state';
import { authoringOf, createPolicyCheck } from './policy';
import { captureTarget, countTargets, releaseTargets, targetSelection, targetsPlugin } from './targets';
import {
    type AuthoringPolicy,
    type CaptureResult,
    type CaptureTargetOptions,
    type ChangeOrigin,
    type CommandResult,
    type CommandState,
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

/** What the host calls. */
export interface RuntimeHandle {
    getSummary(): EditorSummary;
    query(id: string, ...args: readonly unknown[]): CommandState;
    execute(id: string, ...args: readonly unknown[]): CommandResult;
    enqueue(id: string, ...args: readonly unknown[]): Promise<CommandResult>;
    captureTarget(options: CaptureTargetOptions): CaptureResult;
    releaseTarget(target: SelectionHandle): void;
    setMode(mode: Mode): void;
    updatePolicy(policy: AuthoringPolicy): void;
    focus(where?: 'current' | 'start' | 'end'): void;
    subscribe(event: string, listener: Listener): Unsubscribe;
    dispose(): void;
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
    /** What the editor layer hands the plugin commands it runs. */
    readonly commandHost?: unknown;
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

const UI_ORIGINS: ReadonlySet<string> = new Set(['paste', 'cut', 'drop']);

/** The origin of an action: a command, paste, cut or drop. */
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

/** A batch checked against policy and limits and not installed. */
interface Candidate {
    readonly candidate: EditorState;
    readonly root: Transaction;
}
/** A candidate, or why a batch cannot be installed. */
type Prepared =
    | Candidate
    | {
          readonly code: RejectedCode;
          readonly diagnostic?: Diagnostic;
          readonly fault?: Diagnostic;
      };
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
    const { capabilities } = options;
    const exceedsLimits = createLimitCheck(definition.model, capabilities);
    let policy = options.policy;
    let phase: EditorSummary['phase'] = 'mounting';
    let mode = options.mode;
    // The mode the surface shows, which follows `mode` until the view faults.
    let shownMode = mode;
    let commitSequence = 0;
    let sequence = 0;
    let typing = false;
    let view: EditorView | undefined;
    // The state the view threw on.
    // ProseMirror runs that throwing update again on `setProps` and `destroy`.
    let recovery: EditorState | undefined;
    let readyFrame: number | undefined;
    // Set when a view call threw.
    let viewThrew = false;
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
    let state = EditorState.create({
        doc: definition.schema.nodeFromJSON(options.tree),
        plugins: [typingRecorder, targetsPlugin, nodeStatePlugin(), ...definition.plugins],
    });
    // The state whose document `sequence` last published.
    let published = state;

    const busyWith = <T>(work: () => T): T => {
        busy += 1;
        try {
            return work();
        } finally {
            busy -= 1;
            drain();
        }
    };

    const isDisposed = () => phase === 'disposed';
    const { emit, notify, subscribe, watch, clear } = createEventBus({ isDisposed, around: busyWith });

    const report = (diagnostic: Diagnostic) => emit('diagnostic', diagnostic);

    const settleQueue = (code: RejectedCode) => {
        for (const intent of queue.splice(0)) {
            liveResources.intents -= 1;
            intent.resolve(rejected(code));
        }
    };

    const encode = (doc: Node): RichTextDocument =>
        encodeTree(doc.toJSON() as TreeNode, definition.model, capabilities).document;

    // Recomputes `editable` and the surface attributes from the phase and the mode.
    const refreshView = () => {
        if (recovery !== undefined) {
            return;
        }
        shownMode = mode;
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

    /** The view threw while it installed `candidate`: editing stops. */
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

    /** The final check of a change from `before` to `doc`: whether the policy refuses it, and the limit it exceeds. */
    const finalCheck = (before: Node, doc: Node, mapping: Transaction['mapping']) => ({
        policy: breaksPolicy(policy, before, doc, mapping),
        limit: exceedsLimits(doc, limits, before),
    });

    /** Applies a root transaction and every transaction plugins append to it, then the final policy and limit check. */
    const prepare = (root: Transaction, ids: () => string): Prepared => {
        const batch: AppendBatch = {
            limit: limits.maxAppendedTransactions,
            now: () => Date.now(),
            generateId: ids,
            chain: [],
        };
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
        if (doc !== state.doc) {
            const { policy: refused, limit } = finalCheck(state.doc, doc, mapping);
            if (refused || limit !== undefined) {
                return { code: 'not-allowed' };
            }
        }
        return { candidate: applied.state, root };
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
     * change.
     */
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
        }
        return changed;
    };

    /** Runs a view call; `threw` when it threw. */
    const callView = <T>(work: () => T): { readonly threw: boolean; readonly value: T | undefined } => {
        let value: T | undefined;
        try {
            value = work();
        } catch {
            viewThrew = true;
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

    /** Installs a batch in the view and counts it, then publishes it. */
    const publish = ({ candidate, root }: Candidate): boolean => {
        if (!installState(candidate)) {
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
        if (typed && actionOrigin(root) === undefined) {
            root.setMeta(ORIGIN_META, 'input');
        }
        busyWith(() => {
            const prepared = prepare(root, installedId);
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
        const prepared = prepare(root, ids);
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
        const attempted = attempt(command, checked, base, queriedIds());
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
    ): CommandResult => {
        if (busy > 0) {
            return rejected('busy');
        }
        const effects: (() => void)[] = [];
        const result = busyWith((): CommandResult => {
            const attempted = attempt(command, checked, base(), installedId, effects);
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
    const run = (id: string, given: unknown, options: unknown): CommandResult =>
        runOn(definition.commands.get(id), checkedPayload(given), () => baseOf(options));
    const execute = (id: string, given?: unknown, commandOptions?: unknown): CommandResult => {
        const result = run(id, given, commandOptions);
        // Without `focus: 'editor'` a command leaves focus where it is.
        if (isRecord(commandOptions) && commandOptions.focus === 'editor') {
            focus();
        }
        return result;
    };

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

    /** Runs queued intents in call order once no commit or notification is in progress. */
    const drain = () => {
        if (draining || busy > 0 || phase !== 'ready') {
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
                    intent.resolve(run(intent.id, intent.payload, intent.options));
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

    const handle: RuntimeHandle = {
        getSummary: () => {
            return {
                session,
                phase,
                mode,
                commitSequence,
                sequence,
                compositionActive: view !== undefined && view.composing,
                selection: summarize(state.selection),
            };
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
                                return attributes;
                            },
                            dispatchTransaction: commit,
                        },
                    ),
            );
            if (attached === undefined || threw) {
                // A view constructor that throws faults the session, which keeps the decoded document.
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
        perform: (command, performOptions) => runOn(command, { payload: undefined }, () => baseOf(performOptions)),
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
    };
    runtimes.set(handle, runtime);
    liveResources.installedFeatures.set(
        handle,
        definition.model.capabilities.map(({ id }) => id),
    );
    return runtime;
};
