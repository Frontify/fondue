/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import {
    EditorState,
    NodeSelection,
    Plugin,
    PluginKey,
    Selection,
    TextSelection,
    type Transaction,
} from 'prosemirror-state';
import {
    type DirectEditorProps,
    type EditorView,
    type MarkViewConstructor,
    type NodeViewConstructor,
} from 'prosemirror-view';

import { type CompiledDefinition, type EngineCommand, ORIGIN_META } from '#/definition';
import {
    type CapabilityRef,
    checkHref,
    type ContentCheckOptions,
    type Diagnostic,
    hashDocument,
    type HrefPolicy,
    type JsonObject,
    type PresentationStyle,
    type ResourceLimits,
    type RichTextDocument,
} from '#/model';
import { REPLACED_ASSET } from '#/model/assets';
import { attributesOf, compiledModel } from '#/model/compile';
import { type TreeNode } from '#/model/content';
import { decodeToTree } from '#/model/decode';
import { diagnostic } from '#/model/format';
import { hrefPolicyOf } from '#/model/href';
import { randomId } from '#/model/random-id';
import { findInvalidPayload, findUnsafeJson, isRecord, isValidValue, snapshot } from '#/model/values';

import { type AsyncOperation, type AsyncRequest } from './async';
import { createContentChecks } from './capabilities/checks/content-issues';
import { insertPicked, pickedAsset, refillPicked } from './capabilities/media/media';
import { uploadSlotsPlugin } from './capabilities/media/upload-slots';
import {
    createUploads,
    DEFAULT_ACCEPT_TYPES,
    UPLOAD_FEATURE,
    type UploadEvent,
    type UploadPlace,
    type UploadServiceLike,
} from './capabilities/media/uploads';
import { type SuggestionHost, suggestionHosts } from './capabilities/suggestions/host';
import { type ColumnState, columnsPlugin, ONE_COLUMN } from './columns';
import { createDomIds } from './dom-ids';
import { secondCopyAtMount } from './engines';
import { createEventBus, type Listener } from './events';
import { groupsPlugin } from './history';
import { createKeyGuard, type EnterKeys } from './keys';
import { type ExceededLimit } from './limits';
import { nodeStatePlugin, withNodeState } from './node-state';
import { positionOf } from './positions';
import { sameStamp, type SaveCoordinator } from './saves';
import { createBusy } from './session/busy';
import { createColumns } from './session/columns';
import { createCommit } from './session/commit';
import { createComposition } from './session/composition';
import { createEncoder } from './session/encode';
import { createHistory } from './session/history';
import { createIdentity } from './session/identity';
import { createLifecycle } from './session/lifecycle';
import { createMetrics } from './session/metrics';
import { createMode } from './session/mode';
import { createPolicy } from './session/policy';
import { createPrepare, DUPLICATE_ENGINE, pluginError } from './session/prepare';
import { createSaving } from './session/saving';
import { createShown, summarize } from './session/shown';
import { createStore } from './session/store';
import { createTargetsService } from './session/targets';
import {
    type Attempt,
    type InputOutcome,
    type Intent,
    type Mode,
    type RejectedCode,
    type ReplaceCode,
    type Route,
} from './session/types';
import { createView, isEmpty } from './session/view';
import { stylesPlugin } from './styles';
import { countTargets, releaseTargets, targetsPlugin } from './targets';
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
    type RecoveryReceipt,
    type RecoveryService,
    type ReplaceDocumentRequest,
    type ReplaceResult,
    type SaveStatus,
    type SelectionHandle,
    type ServerRevision,
    type Snapshot,
    type Unsubscribe,
    type UploadStatus,
} from './types';

// Queued intents whose listeners keep enqueuing stop past this depth.
const MAX_ENQUEUE_DEPTH = 32;

export type { InputOutcome };

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
    /**
     * Applies a host asset picker's result, checked as untrusted input, as one undo step: a figure at the insert
     * `target`, or the image `nodeId` refilled, which then asks the author to review its alternative text.
     */
    placeAsset(
        asset: unknown,
        place: { readonly target: SelectionHandle } | { readonly nodeId: string },
    ): CommandResult;
    /** The session's uploads: `accepts` holds the media types `media.image` takes, `undefined` without it. */
    readonly uploads: {
        readonly accepts: readonly string[] | undefined;
        /**
         * Whether files upload now at `place`: `media.image` is installed, the host has `services.uploads`, the cache
         * has room and the policy allows it.
         */
        available(place: UploadPlace): boolean;
        /** Checks `files` and starts their uploads at `place`, once their headers are read. */
        begin(files: readonly File[], place: UploadPlace): Promise<void>;
        /** Sends the file of the failed or stopped slot `nodeId` again, with no undo step. */
        retry(nodeId: string): void;
        /** Opens the host asset picker, else the file chooser, for new images or for the image `nodeId`. */
        pick(nodeId: string | undefined): void;
        /** What the chrome of slot `nodeId` shows of its upload. */
        statusOf(nodeId: string): UploadStatus | undefined;
    };
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

export { isEmpty, summarize };

const rejected = (code: RejectedCode): CommandResult => ({ status: 'rejected', code });
const refused = (code: ReplaceCode): ReplaceResult => ({ status: 'rejected', code });
/** The payload as one frozen JSON copy, which is what is checked and run; `undefined` for one that is not plain JSON. */
const checkedPayload = (given: unknown): { readonly payload: unknown } | undefined => {
    if (given !== undefined && findUnsafeJson(given, '') !== undefined) {
        return undefined;
    }
    return { payload: snapshot(given) };
};
/** One editing session: its state, its view while a surface is attached, the commit path and its events. */
export const createEditorRuntime = (options: EditorRuntimeOptions): EditorRuntime => {
    const { definition, limits } = options;
    const generate = options.generateId ?? randomId;
    const identity = createIdentity({ documentId: options.documentId, generate });
    const suggestionListId = `rte-suggestions-${identity.session().sessionId}`;
    const createdAt = Date.now();
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
    const encoder = createEncoder(definition.model, options.capabilities);
    const { encode, encodeByBlock } = encoder;
    const lifecycle = createLifecycle();
    const policy = createPolicy({
        model: definition.model,
        limits,
        initial: options.policy,
        capabilities: encoder.capabilities,
        onUpdate: (next) => {
            // An operation whose result the new policy forbids ends now.
            coordinator.abortWhere((operation) => {
                const rules = next.features[operation.featureId];
                return rules === undefined || !rules[operation.action];
            });
            busy.run(notify);
        },
    });
    const mode = createMode({
        initial: options.mode,
        isDisposed: lifecycle.isDisposed,
        onModeChange: (next) => {
            // A read-only session takes no upload's result, so none runs or waits.
            if (next === 'readonly') {
                coordinator.abortWhere(
                    (operation) => operation.service === 'uploads' && operation.featureId === UPLOAD_FEATURE,
                );
            }
            views.refresh();
        },
        onDisabledChange: () => views.repaint(),
    });
    const columns = createColumns({ initial: options.columns ?? ONE_COLUMN, onChange: () => views.refresh() });
    // The state the view threw on, which `getRecoveryCandidate` offers until `dispose`.
    // ProseMirror runs that throwing update again on `setProps` and `destroy`.
    let recovery: EditorState | undefined;
    // Set while replacement step 8 installs the next document.
    let installingNext = false;
    let draining = false;
    let depth = 0;
    const queue: Intent[] = [];
    // `media.image` and the media types it accepts, which its `acceptTypes` option sets.
    const imageFeature = compiledModel(definition.model).features.find(({ id }) => id === UPLOAD_FEATURE);
    let acceptTypes: readonly string[] | undefined;
    if (imageFeature !== undefined) {
        const option: unknown = imageFeature.options.acceptTypes;
        acceptTypes = Array.isArray(option)
            ? option.filter((type): type is string => typeof type === 'string')
            : DEFAULT_ACCEPT_TYPES;
    }
    const uploads = createUploads({
        state: () => store.state,
        limits,
        acceptTypes: acceptTypes ?? [],
        service: () => (acceptTypes === undefined ? undefined : options.uploads?.()),
        session: identity.session,
        generateId: () => generate(),
        allows: (action) => policy.current().features[UPLOAD_FEATURE]?.[action] !== false,
        start: (request) => coordinator.start(request),
        abort: (operations) => coordinator.abortWhere((other) => operations.includes(other)),
        capture: (range) => {
            const captured = captureRange({ purpose: 'replace-text', onIntersectingEdit: 'map' }, range);
            return captured.status === 'captured' ? captured.target : undefined;
        },
        release: (target) => handle.releaseTarget(target),
        run: (command, target) =>
            runOn(
                command,
                { payload: undefined },
                () => (target === undefined ? store.state : baseOf({ target })),
                'host',
            ).status === 'applied',
        fill: (command) => {
            const result = runOn(command, { payload: undefined }, () => store.state, 'async');
            if (result.status === 'rejected') {
                return result.code;
            }
            return result.status === 'applied' ? undefined : 'not-applicable';
        },
        // A completed upload's record is session state, no undo step; it completed in the background.
        replaced: (nodeId, assetId) => {
            const value = { assetId, focus: false };
            commit(
                withNodeState(store.state.tr, [{ nodeId, key: REPLACED_ASSET, value }]).setMeta('addToHistory', false),
            );
        },
        report: (found) => report(found),
        event: (event) => {
            if (!lifecycle.is('disposed')) {
                options.uploadEvent?.(event);
            }
        },
        changed: () => {
            if (!lifecycle.is('disposed')) {
                busy.run(notify);
            }
        },
    });

    // Records typing before any other handler sees the event, so the view itself gets no event handler.
    const typingRecorder = new Plugin({
        key: new PluginKey('rte.typing'),
        view: (editorView) => {
            views.capture(editorView);
            return {};
        },
        props: {
            handleDOMEvents: {
                beforeinput: () => {
                    markTyping();
                    return false;
                },
            },
        },
    });
    const settling = createComposition({
        composing: () => views.current()?.composing === true,
        onSettled: () => settleInput(),
    });
    const keyGuard = createKeyGuard(
        () => options.tabMovesFocus?.() === true,
        () => options.enterKeys,
        () => policy.current().enterBehavior,
    );
    const store = createStore(
        EditorState.create({
            doc: definition.schema.nodeFromJSON(options.tree),
            plugins: [
                typingRecorder,
                keyGuard,
                settling.plugin,
                targetsPlugin,
                groupsPlugin,
                columnsPlugin(() => display.columns()),
                stylesPlugin(() => options.styles?.() ?? []),
                uploadSlotsPlugin(uploads),
                nodeStatePlugin(),
                ...definition.plugins,
            ],
        }),
    );

    // Commits and notifications in progress, during which `execute` is busy and `enqueue` waits.
    const busy = createBusy();
    busy.onIdle(
        () => metrics.flush(),
        () => targets.flushCaptures(),
        () => uploads.flush(),
    );
    busy.afterEach(() => drain());

    const { isDisposed } = lifecycle;
    const { emit, notify, subscribe, watch, clear } = createEventBus({ isDisposed, around: busy.run });

    const history = createHistory({
        store,
        lifecycle,
        composition: settling,
        notify: () => busy.run(notify),
        install: (next) => installState(next),
        publish: () => display.setPublished(store.state),
        uploads: (d, k) => uploads.reset(d, k),
    });

    const report = (diagnostic: Diagnostic) => emit('diagnostic', diagnostic);

    const metrics = createMetrics({ model: definition.model, session: identity.session, emit });
    const { measure } = metrics;

    const saving = createSaving({ revision: options.revision ?? null, sequence: identity.sequence, lifecycle });
    const saveStatus = saving.status;
    const display = createShown({
        store,
        mode: mode.mode(),
        columns: columns.current(),
        emit,
        saveStatus,
        composing: () => settling.active(),
        stamp: identity.stamp,
        encodeByBlock,
    });

    const settleQueue = (code: RejectedCode) => {
        for (const intent of queue.splice(0)) {
            liveResources.intents -= 1;
            intent.resolve(rejected(code));
        }
    };

    // The checks read the stored document, so their issues and IDs are those `findContentIssues` gives a host.
    const checks = createContentChecks({
        state: () => store.state,
        sequence: identity.sequence,
        encode: () => encode(store.state.doc),
        composing: () => settling.active(),
        ready: () => !lifecycle.is('faulted', 'disposed'),
        commit: (transaction) => commit(transaction),
        options: () => {
            const given = options.contentChecks?.();
            const shown = given ?? { locale: { translationStrings: {} } };
            return {
                ...shown,
                model: definition.model,
                creatableHeadingLevels: policy.current().creatableHeadingLevels,
            };
        },
    });

    const views = createView({
        store,
        lifecycle,
        shown: display,
        mode,
        columns,
        metrics,
        emit,
        session: identity.session,
        resources: liveResources,
        suggestionListId,
        createdAt,
        composing: () => settling.active(),
        hasRecovery: () => recovery !== undefined,
        dispatch: (transaction) => commit(transaction),
        fault: () => fault(diagnostic('runtime.view-fault', undefined, undefined, 'error')),
        viewFault: (attached, candidate) => viewFault(attached, candidate),
        onAttached: (attached) => {
            viewRuntimes.set(attached, runtime);
            suggestionHosts.set(attached, {
                creates: (featureId) => policy.current().features[featureId]?.create !== false,
                accept: acceptSuggestion,
                commandHost: options.commandHost,
                search: searchSuggestions,
            });
            if (secondCopyAtMount(store.state)) {
                report(DUPLICATE_ENGINE);
            }
        },
        scrollSelectionIntoView: () => options.scrollSelectionIntoView?.(),
    });

    const fault = (diagnostic: Diagnostic) => {
        if (isDisposed()) {
            return;
        }
        lifecycle.to('faulted');
        // A frame still pending would otherwise move the faulted session to ready.
        views.cancelReady();
        // A composition that settles later publishes nothing.
        settling.cancel();
        display.takeProvisional();
        views.refresh();
        settleQueue('not-ready');
        report(diagnostic);
        // Results held for that settle are discarded now, as the faulted session takes none.
        coordinator.settle();
        coordinator.abortWhere(() => true);
    };

    /** Stores the candidate of a view fault with the host's recovery service. */
    const storeRecovery = (candidate: EditorState) => {
        const service = options.recovery?.();
        if (service === undefined || isDisposed()) {
            return;
        }
        const checkpoint = {
            stamp: { ...identity.session(), sequence: identity.sequence() + 1 },
            acknowledgedRevision: saveStatus().revision,
            document: encode(candidate.doc),
        };
        let stored: Promise<RecoveryReceipt>;
        try {
            stored = service.store(checkpoint, { signal: lifecycle.ended, session: identity.session() });
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

    const batches = createPrepare({
        store,
        composition: settling,
        shown: display,
        policy,
        history,
        limits,
        generate,
        inputRules: () => options.inputRules?.(),
    });
    const { prepare, installedId, queriedIds, exceededLimit } = batches;
    const { commit, install, installState, guarded, settleProvisional, select, markTyping, clearDeferred } =
        createCommit({
            store,
            identity,
            lifecycle,
            policy,
            shown: display,
            views,
            busy,
            metrics,
            prepare: batches,
            encode,
            emit,
            notify,
            report,
            resources: liveResources,
            hooks: {
                committed: uploads.committed,
                changed: () => {
                    saving.changed();
                    checks.changed();
                },
            },
            fault,
            viewFault,
        });

    /**
     * Once input has settled, checks the provisional batches as one change from the published document and publishes
     * them, or restores the state from before the composition, then runs the
     * deferred `contenteditable` change, the queued intents and the held async results.
     */
    const settleInput = () => {
        const mapping = display.takeProvisional();
        busy.run(() => {
            // Roots that plugin views dispatch while the settled state installs commit after its check.
            if (mapping !== undefined && !guarded(() => settleProvisional(mapping))) {
                return;
            }
            views.refresh();
        });
        coordinator.settle();
        saving.settled();
        settling.resolve('settled');
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
        if (lifecycle.is('transitioning')) {
            return { code: 'busy' };
        }
        if (!lifecycle.is('ready')) {
            return { code: 'not-ready' };
        }
        if (mode.refusesReadOnly(command)) {
            return { code: 'readonly' };
        }
        if (typeof base === 'string') {
            return { code: base };
        }
        const refused = policy.refusal(command, base, payload);
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
        } catch (error) {
            // A plugin that throws while a command's API write applies drops the command, as it drops a batch.
            return {
                code: 'not-applicable',
                diagnostic: pluginError(error, command.featureId),
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
        if (mode.mode() === 'readonly' && root.docChanged) {
            return { code: 'readonly' };
        }
        // Work that runs later through a target maps the user's selection through its change instead of moving it there.
        if (route !== 'host' && base !== store.state) {
            root.setSelection(store.state.selection.map(root.doc, root.mapping));
        }
        // An async completion is no undo step of its own.
        if (route === 'async') {
            root.setMeta(ORIGIN_META, 'async').setMeta('addToHistory', false);
        }
        const prepared = prepare(root, ids, false);
        // A host call never changes content during a composition, which queued intents and async results wait out.
        if ('candidate' in prepared && prepared.candidate.doc !== store.state.doc && settling.active()) {
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
        if (busy.isBusy()) {
            return rejected('busy');
        }
        const effects: (() => void)[] = [];
        const result = busy.run((): CommandResult => {
            const attempted = attempt(command, checked, base(), installedId, route, effects);
            if ('unchanged' in attempted) {
                return { status: 'no-op', stamp: identity.stamp(), contentChanged: false };
            }
            if ('candidate' in attempted) {
                const before = identity.commitSequence();
                const contentChanged = install(attempted);
                // The view faulted while it installed the batch, which a later fault or `dispose` from a listener leaves applied.
                if (identity.commitSequence() === before) {
                    return rejected('not-ready');
                }
                return { status: 'applied', stamp: identity.stamp(), contentChanged };
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
    /** The state with exactly `from` to `to` selected as text, which an accepted suggestion replaces. */
    const rangeBase = (from: number, to: number): EditorState | RejectedCode => {
        if (from < 0 || to > store.state.doc.content.size || from > to) {
            return 'target-invalid';
        }
        const selection = TextSelection.between(store.state.doc.resolve(from), store.state.doc.resolve(to));
        if (selection.from !== from || selection.to !== to) {
            return 'target-invalid';
        }
        return store.state.apply(store.state.tr.setSelection(selection));
    };
    const acceptSuggestion = (range: { readonly from: number; readonly to: number }, id: string, payload: JsonObject) =>
        runOn(definition.commands.get(id), checkedPayload(payload), () => rangeBase(range.from, range.to), 'host');
    const execute = (id: string, given?: unknown, commandOptions?: unknown): CommandResult => {
        // Commands belong in event handlers; a call inside a notification is already `busy`.
        if (!busy.isBusy() && options.inRender?.() === true) {
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
        const pos = targetIn(store.state.doc, target);
        if (pos === undefined) {
            return 'target-invalid';
        }
        return store.state.apply(store.state.tr.setSelection(NodeSelection.create(store.state.doc, pos)));
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
            return runOn(update, { payload: undefined }, () => store.state, 'host');
        },
        remove: () => {
            const remove = nodeCommand(target, (tr, pos, node) => {
                tr.delete(pos, pos + node.nodeSize);
                return true;
            });
            return runOn(remove, { payload: undefined }, () => store.state, 'host');
        },
        select: () => {
            const pos = targetIn(store.state.doc, target);
            if (pos !== undefined) {
                commit(store.state.tr.setSelection(NodeSelection.create(store.state.doc, pos)));
            }
        },
        // The author's selection stays, so typing after a press on chrome, such as a task checkbox, keeps the node.
        execute: (id, payload) =>
            runOn(definition.commands.get(id), checkedPayload(payload), () => nodeBase(target), 'node'),
        query: (id, payload) => queryOn(definition.commands.get(id), checkedPayload(payload), nodeBase(target)),
    });

    const placeAsset: EditorRuntime['placeAsset'] = (value, place) => {
        const asset = pickedAsset(value, { maxLength: limits.maxAttributeLength });
        if (asset === undefined) {
            return rejected('invalid-payload');
        }
        if ('target' in place) {
            const insert = insertPicked(definition.schema, asset);
            return runOn(insert, { payload: undefined }, () => baseOf({ target: place.target }), 'host');
        }
        const { nodeId } = place;
        if (positionOf(store.state.doc, nodeId) === undefined) {
            return rejected('target-invalid');
        }
        return runOn(refillPicked(nodeId, asset), { payload: undefined }, () => store.state, 'host');
    };

    const targets = createTargetsService({
        store,
        identity,
        lifecycle,
        busy,
        policy,
        composition: settling,
        commit,
        generate,
        report,
        serviceChanged: saving.serviceChanged,
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
    });
    const { coordinator, baseOf, captureRange } = targets;

    /** One search of a suggestion list, as one operation of the coordinator that the list's newer search supersedes. */
    const searchSuggestions: SuggestionHost['search'] = ({ key, featureId, command, run }, receive) => {
        const operation = coordinator.start({
            key,
            // The only host service a search reaches through the editor API.
            service: 'references',
            featureId,
            action: 'create',
            command,
            run: ({ signal }) => run(signal),
            deliver: (result) => {
                receive(result as Awaited<ReturnType<typeof run>>);
                return undefined;
            },
        });
        return () => coordinator.abortWhere((other) => other === operation);
    };

    /**
     * Runs queued intents in call order once no commit or notification is in progress
     * and input has settled.
     */
    const drain = () => {
        if (draining || busy.isBusy() || !lifecycle.is('ready') || settling.active()) {
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
            if (lifecycle.is('faulted', 'disposed')) {
                resolve(rejected('not-ready'));
                return;
            }
            // An intent that a queued intent's events enqueue sits one level deeper.
            queue.push({ id, payload, options, depth: depth + 1, resolve });
            liveResources.intents += 1;
            drain();
        });

    const dispose = () => {
        if (lifecycle.is('disposed')) {
            return;
        }
        saving.dispose();
        // A listener of what the coordinator reported may have disposed the session already.
        if (isDisposed()) {
            return;
        }
        // Set first, so `disposed` listeners read the final phase and what they enqueue settles at once.
        lifecycle.to('disposed');
        settling.cancel();
        checks.dispose();
        settling.resolve('disposed');
        coordinator.dispose();
        uploads.dispose(store.state.doc);
        settleQueue('not-ready');
        clearDeferred();
        targets.clearDeferred();
        const release = releaseTargets(store.state);
        if (release !== undefined) {
            liveResources.targets -= countTargets(store.state);
            store.set(store.state.apply(release));
        }
        emit('disposed', identity.session());
        clear();
        views.detach();
        liveResources.installedFeatures.delete(handle);
    };

    const focus = (where: 'current' | 'start' | 'end' = 'current') => {
        if (!lifecycle.is('ready') || views.current() === undefined) {
            return;
        }
        if (where === 'start') {
            commit(store.state.tr.setSelection(Selection.atStart(store.state.doc)));
        }
        if (where === 'end') {
            commit(store.state.tr.setSelection(Selection.atEnd(store.state.doc)));
        }
        // A listener of those commits may have ended the session, which leaves no view.
        const view = views.current() as EditorView;
        if (display.mode() === 'editable') {
            view.focus();
            return;
        }
        // ProseMirror's `focus()` does nothing while the view is not editable, and it syncs no DOM selection there.
        view.dom.focus();
        const anchor = view.domAtPos(store.state.selection.anchor);
        const head = view.domAtPos(store.state.selection.head);
        const selection = view.dom.ownerDocument.getSelection();
        if (selection !== null) {
            selection.setBaseAndExtent(anchor.node, anchor.offset, head.node, head.offset);
        }
    };

    /** Replacement step 5 for a session with unsaved changes: `undefined` when the policy lets the replacement go on. */
    const leaveUnsaved = async (unsaved: ReplaceDocumentRequest['unsaved']): Promise<ReplaceCode | undefined> => {
        // A host in JavaScript may pass no policy at all.
        if (!isRecord(unsaved)) {
            return 'unsaved';
        }
        if (unsaved.action === 'save') {
            const result = await saving.commit({ reason: 'navigate' });
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
            if (sameStamp(unsaved.receipt.stamp, identity.stamp())) {
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
        // A disabled surface leaves the Tab order and takes no focus.
        const view = views.current();
        if (!focused || mode.disabled() || view === undefined) {
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
        // A listener may have faulted or disposed the session since the step began.
        if (lifecycle.is('transitioning')) {
            lifecycle.to('ready');
        }
        views.refresh();
        coordinator.settle();
        saving.settled();
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
            fresh = history.fresh(doc, selection);
        } catch {
            fault(diagnostic('runtime.view-fault', undefined, undefined, 'error'));
            return refused('faulted');
        }
        const outgoing = store.state.doc;
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
            const previous = identity.nextGeneration(request.next.documentId);
            display.setPublished(store.state);
            encoder.capabilities = stored;
            policy.setCapabilities(encoder.capabilities);
            saving.replaced(request.next.revision, previous);
            // A plugin view may have faulted or disposed the session while the state installed.
            if (lifecycle.is('transitioning')) {
                lifecycle.to('ready');
            }
            views.refresh();
            return true;
        });
        if (!installed) {
            return refused('faulted');
        }
        // What the old generation started or queued ends now and changes nothing here.
        coordinator.abortWhere(() => true);
        uploads.reset(outgoing);
        coordinator.settle();
        busy.run(notify);
        display.emitSelection();
        display.emitSaveStatus();
        emit('replaced', identity.session());
        refocus(focused);
        return { status: 'replaced', session: identity.session() };
    };

    /** `EditorHandle.replaceDocument`: the Replacement steps in order, stopping at the first that fails. */
    const replace = async (request: ReplaceDocumentRequest): Promise<ReplaceResult> => {
        if (!lifecycle.is('ready')) {
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
            next.documentId === identity.session().documentId &&
            next.revision === saveStatus().revision &&
            hashDocument(document) === hashDocument(handle.getSnapshot().document)
        ) {
            return { status: 'replaced', session: identity.session() };
        }
        if (!sameStamp(request.expected, identity.stamp())) {
            return refused('changed-since-request');
        }
        if (settling.active()) {
            return refused('composition-active');
        }
        const focused = views.current()?.hasFocus() === true;
        lifecycle.to('transitioning');
        views.refresh();
        if (saving.unsaved()) {
            const code = await leaveUnsaved(request.unsaved);
            // The session was disposed, or faulted, while the step 5 write ran.
            if (!lifecycle.is('transitioning')) {
                return refused('not-ready');
            }
            if (code !== undefined) {
                return resume(code, focused);
            }
        }
        if (saving.outcomeUnknown()) {
            return resume('save-unresolved', focused);
        }
        // A keystroke the view read during step 5 is kept, not replaced.
        if (!sameStamp(request.expected, identity.stamp())) {
            return resume('changed-since-request', focused);
        }
        return installNext(request, tree, result.document.requiredCapabilities, focused);
    };

    const interactionRoots = new Set<HTMLElement>();
    const handle: RuntimeHandle = {
        getSummary: () => {
            return {
                session: identity.session(),
                phase: lifecycle.phase(),
                mode: mode.mode(),
                commitSequence: identity.commitSequence(),
                sequence: identity.sequence(),
                compositionActive: settling.active(),
                selection: summarize(store.state.selection),
            };
        },
        getSnapshot: display.snapshot,
        getSaveStatus: saveStatus,
        getRecoveryCandidate: () => {
            if (!lifecycle.is('faulted') || recovery === undefined) {
                return null;
            }
            return encode(recovery.doc);
        },
        query,
        execute,
        enqueue,
        captureTarget: (options) => captureRange(options, undefined),
        releaseTarget: targets.releaseTarget,
        requestCommit: saving.request,
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
        setMode: mode.set,
        // Applies to the next query and commit; the schema, view and plugins stay.
        updatePolicy: (next) => {
            policy.update(next);
        },
        focus,
        registerInteractionRoot: (element) => {
            interactionRoots.add(element);
            return () => {
                interactionRoots.delete(element);
            };
        },
        subscribe,
        dispose,
    };

    const runtime: EditorRuntime = {
        handle,
        definition,
        suggestionListId,
        nextDomId: createDomIds(identity.session().sessionId),
        get view() {
            return views.current();
        },
        interactionRoots,
        get state() {
            return store.state;
        },
        get policy() {
            return policy.current();
        },
        get nodeViews() {
            return views.nodeViews;
        },
        limits,
        exceededLimit,
        attach: views.attach,
        detach: views.detach,
        report,
        captureRange: (range, captureOptions) => captureRange(captureOptions, range),
        refusal: (command, base, payload) => {
            if (mode.refusesReadOnly(command)) {
                return 'readonly';
            }
            return policy.refusal(command, base, payload);
        },
        writeRefusal: policy.writeRefusal,
        perform: (command, performOptions) =>
            runOn(command, { payload: undefined }, () => baseOf(performOptions), 'host'),
        select,
        watch,
        startAsync: coordinator.start,
        changeServices: targets.changeServices,
        setDisabled: mode.setDisabled,
        setColumns: columns.set,
        faultView: views.faultView,
        nodeActions,
        placeAsset,
        uploads: {
            accepts: acceptTypes,
            available: (place) =>
                acceptTypes !== undefined && options.uploads?.() !== undefined && uploads.admits(place),
            begin: (files, place) => uploads.begin(files, place),
            retry: (nodeId) => uploads.retry(nodeId),
            pick: (nodeId) => options.pick?.(nodeId),
            statusOf: (nodeId) => uploads.statusOf(nodeId),
        },
        saveStatusChanged: display.emitSaveStatus,
        clearHistory: () => history.clear(),
        afterInput: (settled, timeoutMs) => settling.wait(settled, timeoutMs),
        measure: (kind, started, failureCode) => measure(kind, started, failureCode),
        runChecks: () => checks.run(),
    };
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
        definition.model.capabilities.map(({ id }) => id),
    );
    return runtime;
};
