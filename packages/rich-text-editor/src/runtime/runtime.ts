/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { EditorState, Plugin, PluginKey, Selection, type Transaction } from 'prosemirror-state';
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
    hashDocument,
    type PresentationStyle,
    type ResourceLimits,
    type RichTextDocument,
} from '#/model';
import { type TreeNode } from '#/model/content';
import { decodeToTree } from '#/model/decode';
import { diagnostic } from '#/model/format';
import { randomId } from '#/model/random-id';
import { isRecord } from '#/model/values';

import { type AsyncOperation, type AsyncRequest } from './async';
import { createContentChecks } from './capabilities/checks/content-issues';
import { uploadSlotsPlugin } from './capabilities/media/upload-slots';
import {
    UPLOAD_FEATURE,
    type UploadEvent,
    type UploadPlace,
    type UploadServiceLike,
} from './capabilities/media/uploads';
import { suggestionHosts } from './capabilities/suggestions/host';
import { type ColumnState, columnsPlugin, ONE_COLUMN } from './columns';
import { createDomIds } from './dom-ids';
import { secondCopyAtMount } from './engines';
import { createEventBus, type Listener } from './events';
import { groupsPlugin } from './history';
import { createKeyGuard, type EnterKeys } from './keys';
import { type ExceededLimit } from './limits';
import { nodeStatePlugin } from './node-state';
import { sameStamp, type SaveCoordinator } from './saves';
import { createActions, type NodeActions, type NodeTarget } from './session/actions';
import { createBusy } from './session/busy';
import { createColumns } from './session/columns';
import { createCommands } from './session/commands';
import { createCommit } from './session/commit';
import { createComposition } from './session/composition';
import { createEncoder } from './session/encode';
import { createFaults } from './session/faults';
import { createFocus } from './session/focus';
import { createHistory } from './session/history';
import { createIdentity } from './session/identity';
import { createLifecycle } from './session/lifecycle';
import { createMetrics } from './session/metrics';
import { createMode } from './session/mode';
import { createPolicy } from './session/policy';
import { createPrepare, DUPLICATE_ENGINE } from './session/prepare';
import { createQueue } from './session/queue';
import { createSaving } from './session/saving';
import { createSettle } from './session/settle';
import { createShown, summarize } from './session/shown';
import { createStore } from './session/store';
import { createTargetsService } from './session/targets';
import { type InputOutcome, type Mode, type RejectedCode, type ReplaceCode } from './session/types';
import { createUploadService } from './session/uploads-wiring';
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

const refused = (code: ReplaceCode): ReplaceResult => ({ status: 'rejected', code });
/** One editing session: its state, its view while a surface is attached, the commit path and its events. */
export const createEditorRuntime = (options: EditorRuntimeOptions): EditorRuntime => {
    const { definition, limits } = options;
    const generate = options.generateId ?? randomId;
    const identity = createIdentity({ documentId: options.documentId, generate });
    const suggestionListId = `rte-suggestions-${identity.session().sessionId}`;
    const createdAt = Date.now();
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
    const uploads = createUploadService({
        definition,
        limits,
        identity,
        lifecycle,
        policy,
        generate,
        host: options,
        state: () => store.state,
        commit: () => commit,
        commands: () => commands,
        targets: () => targets,
        report: (found) => report(found),
        changed: () => busy.run(notify),
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
                uploadSlotsPlugin(uploads.raw),
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
        () => uploads.raw.flush(),
    );

    const { isDisposed } = lifecycle;
    const { emit, notify, subscribe, watch, clear } = createEventBus({ isDisposed, around: busy.run });

    const history = createHistory({
        store,
        lifecycle,
        composition: settling,
        notify: () => busy.run(notify),
        install: (next) => installState(next),
        publish: () => display.setPublished(store.state),
        uploads: (d, k) => uploads.raw.reset(d, k),
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
        hasRecovery: () => faults.hasRecovery(),
        dispatch: (transaction) => commit(transaction),
        fault: () => faults.fault(diagnostic('runtime.view-fault', undefined, undefined, 'error')),
        viewFault: (attached, candidate) => faults.viewFault(attached, candidate),
        onAttached: (attached) => {
            viewRuntimes.set(attached, runtime);
            suggestionHosts.set(attached, {
                creates: (featureId) => policy.current().features[featureId]?.create !== false,
                accept: actions.acceptSuggestion,
                commandHost: options.commandHost,
                search: actions.searchSuggestions,
            });
            if (secondCopyAtMount(store.state)) {
                report(DUPLICATE_ENGINE);
            }
        },
        scrollSelectionIntoView: () => options.scrollSelectionIntoView?.(),
    });

    const faults = createFaults({
        lifecycle,
        identity,
        encode,
        saving,
        composition: settling,
        shown: display,
        view: views,
        queue: () => queue,
        targets: () => targets,
        report,
        recovery: () => options.recovery?.(),
    });

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
                committed: uploads.raw.committed,
                changed: () => {
                    saving.changed();
                    checks.changed();
                },
            },
            fault: faults.fault,
            viewFault: faults.viewFault,
        });

    const settleInput = createSettle({
        busy,
        commit: { guarded, settleProvisional },
        shown: display,
        view: views,
        targets: () => targets,
        saving,
        composition: settling,
    });

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
            const outcome = commands.run(operation.command, result, options, 'async');
            if (outcome.status === 'rejected') {
                return outcome.code;
            }
            return undefined;
        },
    });
    const { coordinator, baseOf, captureRange } = targets;
    const focus = createFocus({ lifecycle, view: views, store, commit: { commit }, shown: display, mode });
    const commands = createCommands({
        definition,
        store,
        identity,
        lifecycle,
        mode,
        policy,
        busy,
        composition: settling,
        commit: {
            prepare: (root, ids, fromView) => prepare(root, ids, fromView),
            install: (prepared) => install(prepared),
            installedId: () => installedId(),
            queriedIds: () => queriedIds(),
        },
        baseOf,
        focus: focus.focus,
        report,
        fault: (found) => faults.fault(found),
        inRender: () => options.inRender?.(),
        commandHost: options.commandHost,
        runtime: () => runtime,
    });
    const queue = createQueue({
        lifecycle,
        busy,
        composition: settling,
        run: commands.run,
        report,
        resources: liveResources,
    });
    busy.afterEach(queue.drain);

    const actions = createActions({ definition, limits, store, commit: { commit }, commands, targets });

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
        uploads.raw.dispose(store.state.doc);
        queue.settle('not-ready');
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

    /** Leaves `transitioning` after a failed step, so what waited runs on the unchanged session. */
    const resume = (code: ReplaceCode, focused: boolean): ReplaceResult => {
        // A listener may have faulted or disposed the session since the step began.
        if (lifecycle.is('transitioning')) {
            lifecycle.to('ready');
        }
        views.refresh();
        coordinator.settle();
        saving.settled();
        queue.drain();
        focus.refocus(focused);
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
            faults.fault(diagnostic('runtime.view-fault', undefined, undefined, 'error'));
            return refused('faulted');
        }
        const outgoing = store.state.doc;
        // Roots that plugin views dispatch while the state installs commit in the new generation.
        const installed = guarded(() => {
            const shown = faults.withoutRecovery(() => installState(fresh));
            if (!shown) {
                return false;
            }
            // Intents of the old generation end before anything can drain them into the next.
            queue.settle('wrong-session');
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
        uploads.raw.reset(outgoing);
        coordinator.settle();
        busy.run(notify);
        display.emitSelection();
        display.emitSaveStatus();
        emit('replaced', identity.session());
        focus.refocus(focused);
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
        getRecoveryCandidate: faults.candidate,
        query: commands.query,
        execute: commands.execute,
        enqueue: queue.enqueue,
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
        focus: focus.focus,
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
        refusal: commands.refusal,
        perform: commands.perform,
        select,
        writeRefusal: policy.writeRefusal,
        watch,
        startAsync: coordinator.start,
        changeServices: targets.changeServices,
        setDisabled: mode.setDisabled,
        setColumns: columns.set,
        faultView: views.faultView,
        nodeActions: actions.nodeActions,
        placeAsset: actions.placeAsset,
        uploads: {
            accepts: uploads.accepts,
            available: uploads.available,
            begin: uploads.begin,
            retry: uploads.retry,
            pick: uploads.pick,
            statusOf: uploads.statusOf,
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
