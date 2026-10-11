/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentModel, type Diagnostic, type RichTextDocument } from '#/model';
import { diagnostic } from '#/model/format';
import { packageVersionOf } from '#/model/migrate';
import { type EditorRuntime } from '#/runtime/runtime';
import { sameStamp, type SaveCoordinator } from '#/runtime/saves';
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
    /** Read at each use, so a write after a services change goes to the new service. */
    readonly service: () => PersistenceService;
    /** Read at each use, so the host's newest options and `onConflict` apply. */
    readonly options: () => PersistenceOptions | undefined;
    /** The loaded record's revision, `null` for a new record. */
    readonly revision: ServerRevision | null;
    /** The document holds changes a failed session never saved, as after Retry. */
    readonly unsavedOnMount: boolean;
    /** The write a failed session left with an unknown outcome, which this session replays unchanged before its own. */
    readonly carried?: SaveRequest | undefined;
    readonly model: ContentModel;
    /** Operation ids, the same source as the session id and new `nodeId`s. */
    readonly generateId: () => string;
}

/** The one write in flight, and when it started. */
interface InFlight {
    readonly request: SaveRequest;
    readonly controller: AbortController;
    readonly started: number;
}

/** A snapshot `requestCommit` pinned, which is written as it is, ahead of any later autosave. */
interface Checkpoint {
    readonly stamp: DocumentStamp;
    readonly document: RichTextDocument;
    /** The calls that share its next result; a call after that result waits for a later one. */
    readonly waiters: ((result: CommitResult) => void)[];
}

const DISPOSED: CommitResult = { status: 'failed', code: 'disposed', outcome: 'unknown' };
const CONFLICT: CommitResult = { status: 'blocked', code: 'conflict' };
const NOT_SENT: CommitResult = { status: 'failed', code: 'transport', outcome: 'not-sent' };

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
 * rejection.
 */
export const createSaveCoordinator = (
    runtime: EditorRuntime,
    given: SaveCoordinatorOptions,
): SaveCoordinator & { readonly unresolved: () => SaveRequest | undefined } => {
    const { generateId } = given;
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
    let acknowledged = 0;
    // Cleared by the first accepted acknowledgment, which saves what the session mounted with.
    let unsavedOnMount = false;
    let revision: ServerRevision | null = null;
    // What `requestCommit` answers with while it holds for the current stamp: the loaded record's, then each accepted one.
    let accepted: SaveAcknowledgment | undefined;
    /** Starts from a loaded record: at mount, and in the new generation of a replacement. */
    const load = (loaded: ServerRevision | null, unsavedAtLoad: boolean) => {
        latest = 0;
        // A new record starts below the first sequence, an existing one at it.
        acknowledged = 0;
        if (loaded === null) {
            acknowledged = -1;
        }
        unsavedOnMount = unsavedAtLoad;
        state = 'clean';
        if (unsavedOnMount) {
            state = 'dirty';
        }
        revision = loaded;
        accepted = undefined;
        if (loaded !== null && !unsavedOnMount) {
            const stamp = { ...runtime.handle.getSummary().session, sequence: 0 };
            accepted = { operationId: null, stamp, revision: loaded };
        }
    };
    load(given.revision, given.unsavedOnMount);
    // In call order; the oldest stays until its write is answered.
    const pinned: Checkpoint[] = [];
    // The captures of `requestCommit` calls that wait for input to settle.
    const waiting = new Map<() => void, (result: CommitResult) => void>();
    let problem: Diagnostic | null = null;
    let inFlight: InFlight | undefined;
    // The write whose outcome is not known yet, which every later try replays unchanged.
    let unresolved: SaveRequest | undefined = given.carried;
    let replays = 0;
    // A write came due while a write in flight, a replay, the network or unsettled input held it.
    let due = false;
    let delay: ReturnType<typeof setTimeout> | undefined;
    let longest: ReturnType<typeof setTimeout> | undefined;
    let retry: ReturnType<typeof setTimeout> | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;
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

    // A new record that nobody changed has nothing to save.
    // Reads the session's sequence, which a `documentChange` listener sees before `changed` runs.
    const unsaved = () => {
        const { sequence } = runtime.handle.getSummary();
        return (sequence > acknowledged && sequence > 0) || unsavedOnMount;
    };
    // A faulted session writes only what `requestCommit` pinned, and a replacement writes its `save`.
    const writable = () => {
        const { phase } = runtime.handle.getSummary();
        return phase === 'ready' || phase === 'transitioning' || (phase === 'faulted' && pinned.length > 0);
    };
    /** The oldest pinned checkpoint when `request` writes it. */
    const checkpointOf = (request: SaveRequest) => {
        const [checkpoint] = pinned;
        if (checkpoint !== undefined && sameStamp(checkpoint.stamp, request.stamp)) {
            return checkpoint;
        }
        return undefined;
    };
    const settle = (checkpoint: Checkpoint, result: CommitResult) => {
        for (const waiter of checkpoint.waiters.splice(0)) {
            waiter(result);
        }
    };
    /** Takes a call that got its own answer off `checkpoint`, so a later call there is not held by it. */
    const leave = (checkpoint: Checkpoint | undefined, waiter: Checkpoint['waiters'][number]) => {
        if (checkpoint === undefined) {
            return;
        }
        const index = checkpoint.waiters.indexOf(waiter);
        if (index >= 0) {
            checkpoint.waiters.splice(index, 1);
        }
    };
    /** Why `requestCommit` answers at once with no capture. */
    const refusal = (): CommitResult | undefined => {
        if (ended.signal.aborted) {
            return DISPOSED;
        }
        if (state === 'conflict') {
            return CONFLICT;
        }
        return undefined;
    };
    /** `unknown` once a write carried the snapshot of `stamp`, which the server may have stored. */
    const outcomeOf = (stamp: DocumentStamp | undefined): 'not-sent' | 'unknown' => {
        if (stamp !== undefined && unresolved !== undefined && sameStamp(unresolved.stamp, stamp)) {
            return 'unknown';
        }
        return 'not-sent';
    };
    /** Sets state `offline` while the browser reports no network; `true` when it did. */
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
    const clear = (handle: ReturnType<typeof setTimeout> | undefined) => {
        if (handle !== undefined) {
            clearTimeout(handle);
        }
    };
    const stopTimers = () => {
        clear(delay);
        clear(longest);
        delay = undefined;
        longest = undefined;
    };
    const paused = () => state === 'conflict' || state === 'error';

    /** The write the latest change makes due: `delayMs` after it, or `maxWaitMs` after the first unsaved one. */
    const schedule = () => {
        if (option('autosave') === 'off' || paused()) {
            return;
        }
        clear(delay);
        delay = setTimeout(flush, option('delayMs'));
        if (longest === undefined) {
            longest = setTimeout(flush, option('maxWaitMs'));
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
        const current: InFlight = { request, controller: new AbortController(), started: Date.now() };
        inFlight = current;
        state = 'saving';
        // The signal aborts at the timeout, which leaves the outcome unknown.
        timeout = setTimeout(() => fail(current, 'timeout'), option('timeoutMs'));
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

    const writeNew = (stamp: DocumentStamp, document: RichTextDocument) => {
        unresolved = Object.freeze({
            operationId: generateId(),
            stamp,
            baseRevision: revision,
            document,
            writer,
        });
        replays = 0;
        write(unresolved);
    };

    /**
     * Sends the oldest pinned checkpoint, else the latest snapshot, once nothing holds it.
     */
    const send = () => {
        // A write in flight stays unresolved until its answer, so this keeps at most one in flight.
        if (ended.signal.aborted || unresolved !== undefined || state === 'conflict') {
            return;
        }
        const [checkpoint] = pinned;
        if (checkpoint !== undefined) {
            if (writable() && !parkedOffline()) {
                writeNew(checkpoint.stamp, checkpoint.document);
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
        writeNew(snapshot.stamp, snapshot.document);
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
        const checkpoint = checkpointOf(current.request);
        if (checkpoint !== undefined) {
            settle(checkpoint, { status: 'failed', code, outcome: 'unknown' });
        }
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
        const jitter = (Math.random() * 2 - 1) * JITTER;
        retry = setTimeout(replay, option('backoffMs') * 2 ** replays * (1 + jitter));
    };

    /** Hands the server's copy, or `null` when it cannot be read, and the local snapshot to `onConflict`. */
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
            // A replacement since the read moved the session to another generation and document.
            const current = runtime.handle.getSummary().session;
            const same =
                current.documentId === session.documentId &&
                current.sessionId === session.sessionId &&
                current.generation === session.generation;
            if (!ended.signal.aborted && same && onConflict !== undefined) {
                onConflict(remote, runtime.handle.getSnapshot());
            }
        };
        read.then(
            (remote) => remote,
            () => null,
        )
            .then(handOver)
            // A host callback that throws is reported as a throwing listener is.
            .catch(() => runtime.report(diagnostic('runtime.listener-error', undefined, undefined, 'error')));
    };

    const answer = (current: InFlight, response: SaveResponse) => {
        if (inFlight !== current) {
            return;
        }
        if (response.status === 'saved') {
            const { acknowledgment } = response;
            // Only the in-flight request's own acknowledgment counts; any other leaves it in flight until its timeout.
            if (
                acknowledgment.operationId !== current.request.operationId ||
                !sameStamp(acknowledgment.stamp, current.request.stamp)
            ) {
                runtime.report(diagnostic('persistence.ack-mismatch', undefined, undefined, 'warning'));
                return;
            }
            end(current);
            unresolved = undefined;
            revision = acknowledgment.revision;
            // A failed session's write saved a sequence of that session, so what this one mounted with stays unsaved.
            if (current.request !== given.carried) {
                acknowledged = acknowledgment.stamp.sequence;
                accepted = acknowledgment;
                unsavedOnMount = false;
            }
            const checkpoint = checkpointOf(current.request);
            if (checkpoint !== undefined) {
                pinned.shift();
                settle(checkpoint, { status: 'acknowledged', acknowledgment });
            }
            problem = null;
            // A newer change keeps the session dirty, and the next write takes this revision as its base.
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
            // Only replacement leaves a conflict, so no pinned checkpoint is written.
            for (const checkpoint of pinned.splice(0)) {
                settle(checkpoint, CONFLICT);
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
        const checkpoint = checkpointOf(current.request);
        if (checkpoint !== undefined) {
            pinned.shift();
            let refused: CommitResult = { status: 'blocked', code: 'forbidden' };
            if (response.code !== 'forbidden') {
                refused = { status: 'failed', code: response.code, outcome: 'rejected' };
            }
            settle(checkpoint, refused);
        }
        state = 'error';
        problem = response.diagnostics[0] ?? null;
        publish();
        for (const reported of response.diagnostics) {
            runtime.report(reported);
        }
        runtime.measure('save', current.started, response.code);
        // A later pinned checkpoint is a `requestCommit` call, which `error` lets through.
        send();
    };

    /**
     * Pins the published snapshot for `finish` and returns its checkpoint, or answers at once when refused or
     * acknowledged already.
     */
    const pin = (finish: Checkpoint['waiters'][number]): Checkpoint | undefined => {
        const refused = refusal();
        if (refused !== undefined) {
            finish(refused);
            return undefined;
        }
        const { stamp, document } = runtime.handle.getSnapshot();
        if (accepted !== undefined && sameStamp(accepted.stamp, stamp)) {
            finish({ status: 'acknowledged', acknowledgment: accepted });
            return undefined;
        }
        let checkpoint = pinned.at(-1);
        if (checkpoint === undefined || !sameStamp(checkpoint.stamp, stamp)) {
            checkpoint = { stamp, document, waiters: [] };
            pinned.push(checkpoint);
        }
        checkpoint.waiters.push(finish);
        // The write a fault, the network or spent retries left unresolved goes first, unchanged.
        if (unresolved !== undefined && inFlight === undefined && retry === undefined) {
            replay();
        }
        send();
        // Only this call answers at once; the others keep waiting for the write.
        if (!navigator.onLine) {
            leave(checkpoint, finish);
            finish({ status: 'failed', code: 'transport', outcome: outcomeOf(stamp) });
        }
        return checkpoint;
    };

    const online = () => {
        if (ended.signal.aborted || state !== 'offline') {
            return;
        }
        // The write whose outcome the network left unknown goes first, unchanged.
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
        // A write a failed session left unresolved goes first, unchanged.
        if (unresolved !== undefined) {
            replay();
        }
    });
    if (given.unsavedOnMount) {
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
            for (const capture of waiting.keys()) {
                capture();
            }
            send();
        },
        commit: (options: CommitOptions) => {
            const summary = runtime.handle.getSummary();
            // A faulted session still saves its last published snapshot, and the runtime refuses a host call while `transitioning`.
            if (summary.phase === 'mounting' || summary.phase === 'disposed') {
                return Promise.resolve({ status: 'blocked', code: 'not-ready' });
            }
            // A listener of what `dispose` reported may call this while the phase is still `ready`.
            const refused = refusal();
            if (refused !== undefined) {
                return Promise.resolve(refused);
            }
            if (summary.compositionActive && options.composition === 'reject') {
                return Promise.resolve({ status: 'blocked', code: 'composition-active' });
            }
            const startedPhase = summary.phase;
            return new Promise<CommitResult>((resolve) => {
                let checkpoint: Checkpoint | undefined;
                const finish = (result: CommitResult) => {
                    clear(timer);
                    resolve(result);
                };
                // Past the timeout the call resolves, while its pinned checkpoint stays for the write.
                const timer = setTimeout(
                    () => {
                        waiting.delete(capture);
                        leave(checkpoint, finish);
                        resolve({ status: 'failed', code: 'timeout', outcome: outcomeOf(checkpoint?.stamp) });
                    },
                    options.timeoutMs ?? option('timeoutMs'),
                );
                const capture = () => {
                    // A replacement that started after this call answers it; its own save starts while transitioning,
                    // and `dispose` answers every call even mid-replacement.
                    if (
                        !ended.signal.aborted &&
                        runtime.handle.getSummary().phase === 'transitioning' &&
                        startedPhase !== 'transitioning'
                    ) {
                        return;
                    }
                    waiting.delete(capture);
                    checkpoint = pin(finish);
                };
                waiting.set(capture, finish);
                // ProseMirror reads a DOM change in a microtask queued before this one, so the capture holds the last keystroke.
                queueMicrotask(() => {
                    if (waiting.has(capture) && !runtime.handle.getSummary().compositionActive) {
                        capture();
                    }
                });
            });
        },
        serviceChanged: () => {
            const current = inFlight;
            if (current === undefined || unresolved === undefined) {
                return;
            }
            // The old service's answer no longer counts; the same operation goes to the new one.
            end(current);
            current.controller.abort();
            if (!writable()) {
                state = 'uncertain';
                publish();
                return;
            }
            write(unresolved);
        },
        unsaved,
        outcomeUnknown: () =>
            inFlight !== undefined || (unresolved !== undefined && (state === 'uncertain' || state === 'offline')),
        replaced: (next, previous) => {
            stopTimers();
            due = false;
            // A checkpoint held offline was never sent, and the next document does not hold it.
            for (const checkpoint of pinned.splice(0)) {
                settle(checkpoint, NOT_SENT);
            }
            // A call that has not captured yet answers for the old generation, never with the next document.
            let old: CommitResult = NOT_SENT;
            if (accepted !== undefined && sameStamp(accepted.stamp, previous)) {
                old = { status: 'acknowledged', acknowledgment: accepted };
            }
            for (const [capture, finish] of waiting) {
                waiting.delete(capture);
                finish(old);
            }
            // The operation that spent its retries in `error` is dropped with the document it carried.
            unresolved = undefined;
            replays = 0;
            problem = null;
            load(next, false);
            refresh();
        },
        unresolved: () => unresolved,
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
                settle(checkpoint, DISPOSED);
            }
            // With `ended` aborted, each waiting call's capture answers `disposed`.
            for (const capture of waiting.keys()) {
                capture();
            }
            // A session that leaves unsaved changes says so and starts no write.
            if (shown && unsaved()) {
                runtime.report(diagnostic('persistence.disposed-dirty', undefined, undefined, 'warning'));
            }
        },
    };
};
