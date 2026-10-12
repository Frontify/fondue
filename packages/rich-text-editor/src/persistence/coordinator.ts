/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentModel, type Diagnostic } from '#/model';
import { diagnostic } from '#/model/format';
import { packageVersionOf } from '#/model/migrate';
import { type EditorRuntime } from '#/runtime/runtime';
import { sameStamp, type SaveCoordinator } from '#/runtime/saves';
import { type SaveStatus, type ServerRevision } from '#/runtime/types';

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
export const createSaveCoordinator = (runtime: EditorRuntime, given: SaveCoordinatorOptions): SaveCoordinator => {
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
    // A new record starts below the first sequence, an existing one at it.
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
    let problem: Diagnostic | null = null;
    let inFlight: InFlight | undefined;
    // The write whose outcome is not known yet, which every later try replays unchanged.
    let unresolved: SaveRequest | undefined;
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
    const unsaved = () => (latest > acknowledged && latest > 0) || unsavedOnMount;
    // A session that is not ready, such as a faulted one, writes nothing.
    const ready = () => runtime.handle.getSummary().phase === 'ready';
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

    /** Sends the latest snapshot once nothing holds it. */
    const send = () => {
        // A write in flight stays unresolved until its answer, so this keeps at most one in flight.
        if (!due || ended.signal.aborted || unresolved !== undefined || paused()) {
            return;
        }
        const summary = runtime.handle.getSummary();
        if (!ready() || summary.compositionActive) {
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
        unresolved = Object.freeze({
            operationId: generateId(),
            stamp: snapshot.stamp,
            baseRevision: revision,
            document: snapshot.document,
            writer,
        });
        replays = 0;
        write(unresolved);
    };

    const flush = () => {
        stopTimers();
        due = true;
        send();
    };

    const replay = () => {
        retry = undefined;
        if (unresolved === undefined || ended.signal.aborted || !ready()) {
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
            if (!ended.signal.aborted && onConflict !== undefined) {
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
            acknowledged = acknowledgment.stamp.sequence;
            revision = acknowledgment.revision;
            unsavedOnMount = false;
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
            state = 'conflict';
            const details = { currentRevision: response.currentRevision };
            problem = diagnostic('persistence.conflict', undefined, details, 'error');
            publish();
            runtime.report(problem);
            runtime.measure('save', current.started, 'conflict');
            readRemote();
            return;
        }
        state = 'error';
        problem = response.diagnostics[0] ?? null;
        publish();
        for (const reported of response.diagnostics) {
            runtime.report(reported);
        }
        runtime.measure('save', current.started, response.code);
    };

    const online = () => {
        if (ended.signal.aborted || state !== 'offline') {
            return;
        }
        // The write whose outcome the network left unknown goes first, unchanged.
        if (unresolved !== undefined) {
            if (ready()) {
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
        settled: send,
        serviceChanged: () => {
            const current = inFlight;
            if (current === undefined || unresolved === undefined) {
                return;
            }
            // The old service's answer no longer counts; the same operation goes to the new one.
            end(current);
            current.controller.abort();
            if (!ready()) {
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
            // A session that leaves unsaved changes says so and starts no write.
            if (shown && unsaved()) {
                runtime.report(diagnostic('persistence.disposed-dirty', undefined, undefined, 'warning'));
            }
        },
    };
};
