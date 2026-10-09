/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentModel, type Diagnostic, type RuntimeEnvironment } from '#/model';
import { diagnostic } from '#/model/format';
import { packageVersionOf } from '#/model/migrate';
import { type EditorRuntime } from '#/runtime/runtime';
import { type SaveCoordinator } from '#/runtime/saves';
import { type DocumentStamp, type SaveStatus, type ServerRevision } from '#/runtime/types';

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
    readonly service: PersistenceService;
    /** Read at each use, so the host's newest options and `onConflict` apply. */
    readonly options: () => PersistenceOptions | undefined;
    /** The loaded record's revision, `null` for a new record. */
    readonly revision: ServerRevision | null;
    readonly model: ContentModel;
    readonly environment: RuntimeEnvironment;
}

/** The one write in flight, and when it started on the environment clock. */
interface InFlight {
    readonly request: SaveRequest;
    readonly controller: AbortController;
    readonly started: number;
}

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
    const { service, environment } = given;
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
    let revision = given.revision;
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
    let disposed = false;
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
    const unsaved = () => latest > acknowledged && latest > 0;
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
            response = service.save(request, context);
        } catch {
            response = Promise.reject(new Error('PersistenceService.save threw.'));
        }
        // A response that cannot be read leaves the outcome unknown, as a transport failure does.
        response.then((value) => answer(current, value)).catch(() => fail(current, 'transport'));
    };

    /** Sends the latest snapshot once nothing holds it (AC-006, AC-013, AC-015, AC-057, `SPEC-rich-text-runtime/AC-091`). */
    const send = () => {
        // A write in flight stays unresolved until its answer, so this keeps at most one in flight (AC-006).
        if (!due || disposed || unresolved !== undefined || paused()) {
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
        if (!navigator.onLine) {
            state = 'offline';
            publish();
            return;
        }
        due = false;
        const snapshot = runtime.handle.getSnapshot();
        unresolved = Object.freeze({
            operationId: environment.ids.next('operation'),
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
        if (unresolved === undefined || disposed) {
            return;
        }
        if (!navigator.onLine) {
            state = 'offline';
            publish();
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
        if (!navigator.onLine) {
            state = 'offline';
            publish();
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
            read = service.read(session.documentId, { signal: ended.signal, session });
        } catch {
            read = Promise.resolve(null);
        }
        const handOver = (remote: LoadedDocument | null) => {
            const onConflict = given.options()?.onConflict;
            if (!disposed && onConflict !== undefined) {
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
        if (disposed || state !== 'offline') {
            return;
        }
        // The write whose outcome the network left unknown goes first, unchanged (AC-016).
        if (unresolved !== undefined) {
            write(unresolved);
            return;
        }
        idle();
        publish();
        send();
    };
    window.addEventListener('online', online);

    return {
        status: () => status,
        changed: () => {
            if (disposed) {
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
        dispose: () => {
            if (disposed) {
                return;
            }
            disposed = true;
            window.removeEventListener('online', online);
            stopTimers();
            clear(retry);
            if (inFlight !== undefined) {
                const current = inFlight;
                end(current);
                current.controller.abort();
            }
            ended.abort();
            // A session that leaves unsaved changes says so and starts no write (AC-041).
            if (unsaved()) {
                runtime.report(diagnostic('persistence.disposed-dirty', undefined, undefined, 'warning'));
            }
        },
    };
};
