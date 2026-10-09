/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentModel, type Diagnostic, type RichTextDocument, type RuntimeEnvironment } from '#/model';
import { diagnostic } from '#/model/format';
import { packageVersionOf } from '#/model/migrate';
import { type EditorRuntime } from '#/runtime/runtime';
import { type SaveCoordinator } from '#/runtime/saves';
import {
    type CommitOptions,
    type CommitResult,
    type DocumentStamp,
    type SaveAcknowledgment,
    type SaveStatus,
    type ServerRevision,
} from '#/runtime/types';

import {
    type LoadedDocument,
    type PersistenceOptions,
    type PersistenceService,
    type SaveRequest,
    type SaveResponse,
} from './types';

type Timing = Required<Omit<PersistenceOptions, 'onConflict'>>;
const DEFAULTS: Timing = {
    autosave: 'debounced',
    delayMs: 500,
    maxWaitMs: 5000,
    timeoutMs: 30_000,
    maxRetries: 5,
    backoffMs: 1000,
};
// Each retry delay moves by up to this share either way, so editors that failed together do not retry together.
const JITTER = 0.2;

export interface SaveCoordinatorOptions {
    /** Read at each use, so a write after a services change goes to the new service (SPEC-rich-text-runtime/AC-073). */
    readonly service: () => PersistenceService;
    /** Read at each use, so the host's newest options and `onConflict` apply. */
    readonly options: () => PersistenceOptions | undefined;
    /** The loaded record's revision, `null` for a new record. */
    readonly revision: ServerRevision | null;
    /** The document holds changes a failed session never saved, as after Retry (SPEC-rich-text-react/AC-085). */
    readonly unsavedOnMount: boolean;
    readonly model: ContentModel;
    readonly environment: RuntimeEnvironment;
}

/** The one write in flight, and when it started on the environment clock. */
interface InFlight {
    readonly request: SaveRequest;
    readonly controller: AbortController;
    readonly started: number;
}

/** A snapshot `requestCommit` pinned, which is written as it is, ahead of any later autosave (AC-020, AC-021). */
interface Checkpoint {
    readonly stamp: DocumentStamp;
    readonly document: RichTextDocument;
    readonly result: Promise<CommitResult>;
    /** Resolves `result`; only the first call counts. */
    readonly settle: (result: CommitResult) => void;
}

/** A `requestCommit` call, which waits in the coordinator while input has not settled (AC-026). */
interface Call {
    capture(): void;
    finish(result: CommitResult): void;
}

const DISPOSED: CommitResult = { status: 'failed', code: 'disposed', outcome: 'unknown' };

const sameStamp = (a: DocumentStamp, b: DocumentStamp) =>
    a.documentId === b.documentId &&
    a.sessionId === b.sessionId &&
    a.generation === b.generation &&
    a.sequence === b.sequence;

const STATUS_KEYS = [
    'state',
    'latestSequence',
    'acknowledgedSequence',
    'revision',
    'inFlightOperationId',
    'diagnostic',
] as const;

/**
 * Orders a session's writes through the host's `PersistenceService`: one write in flight, a debounced autosave with a
 * longest wait, the same operation replayed while its outcome is unknown, and writes paused on a conflict or a
 * rejection (`SPEC-rich-text-persistence`, Save states).
 */
export const createSaveCoordinator = (runtime: EditorRuntime, given: SaveCoordinatorOptions): SaveCoordinator => {
    const { environment } = given;
    const { clock } = environment;
    const writer: SaveRequest['writer'] = {
        build: packageVersionOf(),
        formatVersion: 1,
        model: { id: given.model.ref.id, version: given.model.ref.version },
        capabilities: given.model.capabilities.map(({ id, version }) => ({ id, version })),
    };
    const option = <K extends keyof Timing>(name: K): Timing[K] => {
        const options = given.options();
        if (options === undefined || options[name] === undefined) {
            return DEFAULTS[name];
        }
        return options[name] as Timing[K];
    };

    let state: SaveStatus['state'] = 'clean';
    let latest = 0;
    // A new record starts below the first sequence, an existing one at it (AC-004, AC-005).
    let acknowledged = 0;
    if (given.revision === null) {
        acknowledged = -1;
    }
    // Cleared by the first accepted acknowledgment, which saves what the session mounted with.
    let unsavedOnMount = given.unsavedOnMount;
    if (unsavedOnMount) {
        state = 'dirty';
    }
    let revision = given.revision;
    // What `requestCommit` answers with while it holds for the current stamp: the loaded record's, then each accepted one (AC-024).
    let accepted: SaveAcknowledgment | undefined;
    if (given.revision !== null && !unsavedOnMount) {
        const stamp = { ...runtime.handle.getSummary().session, sequence: 0 };
        accepted = { operationId: null, stamp, revision: given.revision };
    }
    // In call order; the oldest stays until its write is answered (AC-022).
    const pinned: Checkpoint[] = [];
    const waiting = new Set<Call>();
    let problem: Diagnostic | null = null;
    let inFlight: InFlight | undefined;
    // The write whose outcome is not known yet, which every later try replays unchanged (AC-012).
    let unresolved: SaveRequest | undefined;
    let replays = 0;
    // A write came due while a write in flight, a replay, the network or unsettled input held it.
    let due = false;
    let delay: number | undefined;
    let longest: number | undefined;
    let retry: number | undefined;
    let timeout: number | undefined;
    // Aborted by `dispose`, which ends the session's reads and every later step.
    const ended = new AbortController();

    const build = (): SaveStatus => {
        let inFlightOperationId: string | null = null;
        if (inFlight !== undefined) {
            inFlightOperationId = inFlight.request.operationId;
        }
        return {
            state,
            latestSequence: latest,
            acknowledgedSequence: acknowledged,
            revision,
            inFlightOperationId,
            diagnostic: problem,
        };
    };
    let status = Object.freeze(build());
    /** Builds the status again, keeping the same object while no field changed; `true` when one did. */
    const refresh = (): boolean => {
        const next = build();
        if (STATUS_KEYS.every((key) => next[key] === status[key])) {
            return false;
        }
        status = Object.freeze(next);
        return true;
    };
    const publish = () => {
        if (refresh()) {
            runtime.saveStatusChanged();
        }
    };

    // A new record that nobody changed has nothing to save (`SPEC-rich-text-persistence`, Save states).
    const unsaved = () => (latest > acknowledged && latest > 0) || unsavedOnMount;
    // A faulted session writes only what `requestCommit` pinned (SPEC-rich-text-runtime/AC-016, AC-091).
    const writable = () => {
        const { phase } = runtime.handle.getSummary();
        return phase === 'ready' || (phase === 'faulted' && pinned.length > 0);
    };
    /** The oldest pinned checkpoint when `request` writes it. */
    const pinnedFor = (request: SaveRequest) => {
        const [checkpoint] = pinned;
        if (checkpoint !== undefined && sameStamp(checkpoint.stamp, request.stamp)) {
            return checkpoint;
        }
        return undefined;
    };
    /** Sets state `offline` while the browser reports no network; `true` when it did (AC-015). */
    const parkedOffline = () => {
        if (navigator.onLine) {
            return false;
        }
        state = 'offline';
        publish();
        return true;
    };
    const idle = () => {
        state = 'clean';
        if (unsaved()) {
            state = 'dirty';
        }
    };
    const clear = (handle: number | undefined) => {
        if (handle !== undefined) {
            clock.clearTimeout(handle);
        }
    };
    const stopTimers = () => {
        clear(delay);
        clear(longest);
        delay = undefined;
        longest = undefined;
    };
    const paused = () => state === 'conflict' || state === 'error';

    /** The write the latest change makes due: `delayMs` after it, or `maxWaitMs` after the first unsaved one (AC-007). */
    const schedule = () => {
        if (option('autosave') === 'off' || paused()) {
            return;
        }
        clear(delay);
        delay = clock.setTimeout(flush, option('delayMs'));
        if (longest === undefined) {
            longest = clock.setTimeout(flush, option('maxWaitMs'));
        }
    };

    const end = (current: InFlight) => {
        clear(timeout);
        timeout = undefined;
        if (inFlight === current) {
            inFlight = undefined;
        }
    };

    const write = (request: SaveRequest) => {
        const current: InFlight = { request, controller: new AbortController(), started: clock.now() };
        inFlight = current;
        state = 'saving';
        // The signal aborts at the timeout, which leaves the outcome unknown (AC-012).
        timeout = clock.setTimeout(() => fail(current, 'timeout'), option('timeoutMs'));
        publish();
        const context = { signal: current.controller.signal, session: runtime.handle.getSummary().session };
        let response: Promise<SaveResponse>;
        try {
            response = given.service().save(request, context);
        } catch {
            response = Promise.reject(new Error('PersistenceService.save threw.'));
        }
        // A response that cannot be read leaves the outcome unknown, as a transport failure does.
        response.then((value) => answer(current, value)).catch(() => fail(current, 'transport'));
    };

    const start = (stamp: DocumentStamp, document: RichTextDocument) => {
        unresolved = Object.freeze({
            operationId: environment.ids.next('operation'),
            stamp,
            baseRevision: revision,
            document,
            writer,
        });
        replays = 0;
        write(unresolved);
    };

    /**
     * Sends the oldest pinned checkpoint, else the latest snapshot, once nothing holds it (AC-006, AC-013, AC-015,
     * AC-022, AC-057, `SPEC-rich-text-runtime/AC-091`).
     */
    const send = () => {
        // A write in flight stays unresolved until its answer, so this keeps at most one in flight (AC-006).
        if (ended.signal.aborted || unresolved !== undefined || state === 'conflict') {
            return;
        }
        const [checkpoint] = pinned;
        if (checkpoint !== undefined) {
            if (writable() && !parkedOffline()) {
                start(checkpoint.stamp, checkpoint.document);
            }
            return;
        }
        if (!due || paused()) {
            return;
        }
        const summary = runtime.handle.getSummary();
        if (summary.phase !== 'ready' || summary.compositionActive) {
            return;
        }
        if (!unsaved()) {
            due = false;
            return;
        }
        if (parkedOffline()) {
            return;
        }
        due = false;
        const snapshot = runtime.handle.getSnapshot();
        start(snapshot.stamp, snapshot.document);
    };

    const flush = () => {
        stopTimers();
        due = true;
        send();
    };

    const replay = () => {
        retry = undefined;
        if (unresolved === undefined || ended.signal.aborted || !writable()) {
            return;
        }
        if (parkedOffline()) {
            return;
        }
        replays += 1;
        write(unresolved);
    };

    /** A write with an unknown outcome: replayed after a backoff while online, after the `online` event while offline. */
    const fail = (current: InFlight, code: 'timeout' | 'transport') => {
        if (inFlight !== current) {
            return;
        }
        end(current);
        current.controller.abort();
        pinnedFor(current.request)?.settle({ status: 'failed', code, outcome: 'unknown' });
        if (parkedOffline()) {
            runtime.measure('save', current.started, code);
            return;
        }
        if (replays >= option('maxRetries')) {
            state = 'error';
            problem = diagnostic('persistence.retries-exhausted', undefined, { retries: replays }, 'error');
            publish();
            runtime.report(problem);
            runtime.measure('save', current.started, code);
            return;
        }
        state = 'uncertain';
        publish();
        runtime.measure('save', current.started, code);
        const jitter = (environment.random() * 2 - 1) * JITTER;
        retry = clock.setTimeout(replay, option('backoffMs') * 2 ** replays * (1 + jitter));
    };

    /** Hands the server's copy, or `null` when it cannot be read, and the local snapshot to `onConflict` (AC-058). */
    const readRemote = () => {
        const session = runtime.handle.getSummary().session;
        let read: Promise<LoadedDocument | null>;
        try {
            read = given.service().read(session.documentId, { signal: ended.signal, session });
        } catch {
            read = Promise.resolve(null);
        }
        const handOver = (remote: LoadedDocument | null) => {
            const onConflict = given.options()?.onConflict;
            if (!ended.signal.aborted && onConflict !== undefined) {
                onConflict(remote, runtime.handle.getSnapshot());
            }
        };
        read.then(
            (remote) => remote,
            () => null,
        )
            .then(handOver)
            // A host callback that throws is reported as a throwing listener is (SPEC-rich-text-runtime/AC-027).
            .catch(() => runtime.report(diagnostic('runtime.listener-error', undefined, undefined, 'error')));
    };

    const answer = (current: InFlight, response: SaveResponse) => {
        if (inFlight !== current) {
            return;
        }
        if (response.status === 'saved') {
            const { acknowledgment } = response;
            // Only the in-flight request's own acknowledgment counts; any other leaves it in flight until its timeout (AC-010).
            if (
                acknowledgment.operationId !== current.request.operationId ||
                !sameStamp(acknowledgment.stamp, current.request.stamp)
            ) {
                runtime.report(diagnostic('persistence.ack-mismatch', undefined, undefined, 'warning'));
                return;
            }
            end(current);
            unresolved = undefined;
            acknowledged = acknowledgment.stamp.sequence;
            revision = acknowledgment.revision;
            accepted = acknowledgment;
            unsavedOnMount = false;
            const checkpoint = pinnedFor(current.request);
            if (checkpoint !== undefined) {
                pinned.shift();
                checkpoint.settle({ status: 'acknowledged', acknowledgment });
            }
            problem = null;
            // A newer change keeps the session dirty, and the next write takes this revision as its base (AC-011).
            idle();
            publish();
            runtime.measure('save', current.started, null);
            send();
            return;
        }
        end(current);
        unresolved = undefined;
        due = false;
        stopTimers();
        if (response.status === 'conflict') {
            // Only replacement leaves a conflict, so no pinned checkpoint is written (AC-018, AC-029).
            for (const checkpoint of pinned.splice(0)) {
                checkpoint.settle({ status: 'blocked', code: 'conflict' });
            }
            state = 'conflict';
            const details = { currentRevision: response.currentRevision };
            problem = diagnostic('persistence.conflict', undefined, details, 'error');
            publish();
            runtime.report(problem);
            runtime.measure('save', current.started, 'conflict');
            readRemote();
            return;
        }
        const checkpoint = pinnedFor(current.request);
        if (checkpoint !== undefined) {
            pinned.shift();
            let refused: CommitResult = { status: 'blocked', code: 'forbidden' };
            if (response.code !== 'forbidden') {
                refused = { status: 'failed', code: response.code, outcome: 'rejected' };
            }
            checkpoint.settle(refused);
        }
        state = 'error';
        problem = response.diagnostics[0] ?? null;
        publish();
        for (const reported of response.diagnostics) {
            runtime.report(reported);
        }
        runtime.measure('save', current.started, response.code);
        // A later pinned checkpoint is a `requestCommit` call, which `error` lets through (Save states).
        send();
    };

    /**
     * Pins the published snapshot, or answers at once while a conflict holds or the snapshot is acknowledged already
     * (AC-020, AC-024, AC-025, AC-066, AC-073).
     */
    const pin = (): Promise<CommitResult> => {
        if (state === 'conflict') {
            return Promise.resolve({ status: 'blocked', code: 'conflict' });
        }
        const { stamp, document } = runtime.handle.getSnapshot();
        if (accepted !== undefined && sameStamp(accepted.stamp, stamp)) {
            return Promise.resolve({ status: 'acknowledged', acknowledgment: accepted });
        }
        const last = pinned.at(-1);
        if (last !== undefined && sameStamp(last.stamp, stamp)) {
            return last.result;
        }
        let settle: Checkpoint['settle'] = () => undefined;
        const result = new Promise<CommitResult>((resolve) => {
            settle = resolve;
        });
        pinned.push({ stamp, document, result, settle });
        // The write a fault, the network or spent retries left unresolved goes first, unchanged (AC-014, `SPEC-rich-text-runtime/AC-091`).
        if (unresolved !== undefined && inFlight === undefined && retry === undefined) {
            replay();
        }
        send();
        if (!navigator.onLine) {
            settle({ status: 'failed', code: 'transport', outcome: 'not-sent' });
        }
        return result;
    };

    const online = () => {
        if (ended.signal.aborted || state !== 'offline') {
            return;
        }
        // The write whose outcome the network left unknown goes first, unchanged (AC-016).
        if (unresolved !== undefined) {
            if (writable()) {
                write(unresolved);
            }
            return;
        }
        idle();
        publish();
        send();
    };
    window.addEventListener('online', online);
    // A session that never became ready, such as StrictMode's throwaway mount, leaves nothing the author saw unsaved.
    let shown = false;
    runtime.handle.subscribe('ready', () => {
        shown = true;
    });
    if (unsavedOnMount) {
        schedule();
    }

    return {
        status: () => status,
        changed: () => {
            if (ended.signal.aborted) {
                return;
            }
            latest = runtime.handle.getSummary().sequence;
            if (state === 'clean') {
                state = 'dirty';
            }
            schedule();
            refresh();
        },
        settled: () => {
            for (const call of waiting) {
                call.capture();
            }
            send();
        },
        commit: (options: CommitOptions) => {
            const summary = runtime.handle.getSummary();
            // A faulted session still saves its last published snapshot (`SPEC-rich-text-runtime/AC-016`, AC-064).
            if (summary.phase !== 'ready' && summary.phase !== 'faulted') {
                return Promise.resolve({ status: 'blocked', code: 'not-ready' });
            }
            if (summary.compositionActive && options.composition === 'reject') {
                return Promise.resolve({ status: 'blocked', code: 'composition-active' });
            }
            let stamp: DocumentStamp | undefined;
            let resolveCall: (result: CommitResult | Promise<CommitResult>) => void = () => undefined;
            const captured = new Promise<CommitResult>((resolve) => {
                resolveCall = resolve;
            });
            const call: Call = {
                capture: () => {
                    waiting.delete(call);
                    stamp = runtime.handle.getSnapshot().stamp;
                    resolveCall(pin());
                },
                finish: resolveCall,
            };
            let timer: number | undefined;
            // Past the timeout the call resolves, while its pinned checkpoint stays for the write (AC-026, AC-030, AC-072).
            const expired = new Promise<CommitResult>((resolve) => {
                timer = clock.setTimeout(
                    () => {
                        let outcome: 'not-sent' | 'unknown' = 'not-sent';
                        if (stamp !== undefined && unresolved !== undefined && sameStamp(unresolved.stamp, stamp)) {
                            outcome = 'unknown';
                        }
                        resolve({ status: 'failed', code: 'timeout', outcome });
                    },
                    options.timeoutMs ?? option('timeoutMs'),
                );
            });
            if (summary.compositionActive) {
                waiting.add(call);
            } else {
                call.capture();
            }
            return Promise.race([captured, expired]).then((result) => {
                waiting.delete(call);
                clear(timer);
                return result;
            });
        },
        serviceChanged: () => {
            const current = inFlight;
            if (current === undefined || unresolved === undefined) {
                return;
            }
            // The old service's answer no longer counts; the same operation goes to the new one (AC-012).
            end(current);
            current.controller.abort();
            if (!writable()) {
                state = 'uncertain';
                publish();
                return;
            }
            write(unresolved);
        },
        dispose: () => {
            if (ended.signal.aborted) {
                return;
            }
            ended.abort();
            window.removeEventListener('online', online);
            stopTimers();
            clear(retry);
            if (inFlight !== undefined) {
                const current = inFlight;
                end(current);
                current.controller.abort();
                refresh();
            }
            for (const checkpoint of pinned.splice(0)) {
                checkpoint.settle(DISPOSED);
            }
            for (const call of waiting) {
                call.finish(DISPOSED);
            }
            // A session that leaves unsaved changes says so and starts no write (AC-041).
            if (shown && unsaved()) {
                runtime.report(diagnostic('persistence.disposed-dirty', undefined, undefined, 'warning'));
            }
        },
    };
};
