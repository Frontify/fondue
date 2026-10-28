/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentModel } from '#/model';
import { diagnostic, packageVersionOf } from '#/model/internal';
import { type EditorRuntime } from '#/runtime/runtime';
import { type CommitOptions, type CommitResult, type SaveStatus, type ServerRevision } from '#/runtime/types';

import {
    gate,
    initial,
    next,
    statusOf,
    timing,
    type Effect,
    type EventInput,
    type Facts,
    type SaveMachine,
    type Timer,
} from './saveMachine';
import {
    type LoadedDocument,
    type PersistenceOptions,
    type PersistenceService,
    type SaveRequest,
    type SaveResponse,
} from './types';

/** What the save coordinator needs from the host and the session that it cannot read from the runtime. */
export type SaveCoordinatorOptions = {
    /** Read at each use, so a write after a services change goes to the new service. */
    service: () => PersistenceService;
    /** Read at each use, so the host's newest options and `onConflict` apply. */
    options: () => PersistenceOptions | undefined;
    /** The loaded record's revision, `null` for a new record. */
    revision: ServerRevision | null;
    /** The document holds changes a failed session never saved, as after Retry. */
    unsavedOnMount: boolean;
    /** The write a failed session left with an unknown outcome, which this session replays unchanged before its own. */
    carried?: SaveRequest | undefined;
    /** Its ref and capabilities are recorded as the writer of each save. */
    model: ContentModel;
    /** Operation ids, the same source as the session id and new `nodeId`s. */
    generateId: () => string;
};

// Each retry delay moves by up to this share either way, so editors that failed together do not retry together.
const JITTER = 0.2;

const STATUS_KEYS = [
    'state',
    'latestSequence',
    'acknowledgedSequence',
    'revision',
    'inFlightOperationId',
    'diagnostic',
] as const;

/** What the effects act on: the machine, its timers, the write in flight and the `requestCommit` calls. */
type Link = {
    runtime: EditorRuntime;
    given: SaveCoordinatorOptions;
    writer: SaveRequest['writer'];
    /** Aborted by `dispose`, which ends the session's reads and every later step. */
    ended: AbortController;
    timers: Map<Timer, ReturnType<typeof setTimeout>>;
    /** Each call's way to answer, until it does. */
    finishers: Map<number, (result: CommitResult) => void>;
    /** The captures of calls that wait for input to settle. */
    waiting: Map<number, () => void>;
    onOnline: () => void;
    machine: SaveMachine;
    status: SaveStatus;
    controller: AbortController;
    calls: number;
};

/** The coordinator's handle on the machine: feed it events, call `commit`, and read its state and status. */
export type Transport = {
    dispatch: (input: EventInput) => void;
    commit: (options: CommitOptions) => Promise<CommitResult>;
    captureWaiting: () => void;
    machine: () => SaveMachine;
    status: () => SaveStatus;
};

/** What the machine may not read itself: the clock, the network and the runtime's summary. */
const readFacts = (link: Link): Facts => {
    const summary = link.runtime.handle.getSummary();

    return {
        now: Date.now(),
        online: navigator.onLine,
        phase: summary.phase,
        composing: summary.compositionActive,
        sequence: summary.sequence,
        session: summary.session,
        options: link.given.options(),
    };
};

/** Builds the status again, keeping the same object while no field changed; `true` when one did. */
const refresh = (link: Link): boolean => {
    const built = statusOf(link.machine);
    if (STATUS_KEYS.every((key) => built[key] === link.status[key])) {
        return false;
    }

    link.status = Object.freeze(built);

    return true;
};

/** Cancels the named timers that are running. */
const clear = (link: Link, timers: readonly Timer[]) => {
    for (const timer of timers) {
        const handle = link.timers.get(timer);
        if (handle !== undefined) {
            clearTimeout(handle);
            link.timers.delete(timer);
        }
    }
};

const arm = (link: Link, timer: Timer, milliseconds: number, fire: () => void) => {
    link.timers.set(timer, setTimeout(fire, milliseconds));
};

/** Calls the host's save; an answer or a failure comes back as an event. */
const save = (link: Link, request: SaveRequest, serial: number) => {
    const context = { signal: link.controller.signal, session: link.runtime.handle.getSummary().session };
    let response: Promise<SaveResponse>;
    try {
        response = link.given.service().save(request, context);
    } catch {
        response = Promise.reject(new Error('PersistenceService.save threw.'));
    }

    // A response that cannot be read leaves the outcome unknown, as a transport failure does.
    response
        .then((value) => dispatch(link, { type: 'answered', serial, response: value }))
        .catch(() => dispatch(link, { type: 'failed', serial, code: 'transport' }));
};

/** Hands the server's copy, or `null` when it cannot be read, and the local snapshot to `onConflict`. */
const readRemote = (link: Link) => {
    const { runtime, given } = link;
    const session = runtime.handle.getSummary().session;
    let read: Promise<LoadedDocument | null>;
    try {
        read = given.service().read(session.documentId, { signal: link.ended.signal, session });
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
        if (!link.ended.signal.aborted && same && onConflict !== undefined) {
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

type EffectOf<EffectType extends Effect['type']> = Extract<Effect, { type: EffectType }>;

/** What each effect does outside the machine. */
const EFFECTS: { readonly [EffectType in Effect['type']]: (link: Link, effect: EffectOf<EffectType>) => void } = {
    publish: (link) => {
        if (refresh(link)) {
            link.runtime.saveStatusChanged();
        }
    },
    refresh: (link) => {
        refresh(link);
    },
    send: (link) => {
        dispatch(link, { type: 'send' });
    },
    end: (link) => {
        link.ended.abort();
        window.removeEventListener('online', link.onOnline);
    },
    abort: (link) => {
        link.controller.abort();
    },
    readRemote,
    captureWaiting: (link) => {
        for (const capture of link.waiting.values()) {
            capture();
        }
    },
    report: (link, effect) => {
        link.runtime.report(effect.diagnostic);
    },
    measure: (link, { started, code }) => {
        link.runtime.measure('save', started, code);
    },
    arm: (link, { timer, milliseconds }) => {
        arm(link, timer, milliseconds, () => dispatch(link, { type: 'flush' }));
    },
    backoff: (link, { milliseconds }) => {
        const jitter = (Math.random() * 2 - 1) * JITTER;
        arm(link, 'retry', milliseconds * (1 + jitter), () => dispatch(link, { type: 'retryDue' }));
    },
    clear: (link, { timers }) => {
        clear(link, timers);
    },
    open: (link, { serial, timeoutMs }) => {
        link.controller = new AbortController();
        // The signal aborts at the timeout, which leaves the outcome unknown.
        arm(link, 'timeout', timeoutMs, () => dispatch(link, { type: 'failed', serial, code: 'timeout' }));
    },
    save: (link, { request, serial }) => {
        save(link, request, serial);
    },
    prepare: (link, { source }) => {
        const { stamp, document } = source ?? link.runtime.handle.getSnapshot();
        const request: SaveRequest = Object.freeze({
            operationId: link.given.generateId(),
            stamp,
            baseRevision: link.machine.revision,
            document,
            writer: link.writer,
        });
        dispatch(link, { type: 'prepared', request });
    },
    snapshot: (link, { call }) => {
        const { stamp, document } = link.runtime.handle.getSnapshot();
        dispatch(link, { type: 'pinned', call, stamp, document });
    },
    answer: (link, { calls, result }) => {
        for (const call of calls) {
            link.finishers.get(call)?.(result);
        }
    },
    answerWaiting: (link, { result }) => {
        for (const call of [...link.waiting.keys()]) {
            link.waiting.delete(call);
            link.finishers.get(call)?.(result);
        }
    },
};

const run = <EffectType extends Effect['type']>(link: Link, effect: EffectOf<EffectType>) => {
    EFFECTS[effect.type](link, effect);
};

/** Feeds an event to the machine, keeps its next state and runs the effects in order. */
const dispatch = (link: Link, input: EventInput) => {
    const step = next(link.machine, { ...input, facts: readFacts(link) });
    link.machine = step.state;
    for (const effect of step.effects) {
        run(link, effect);
    }
};

/** Tracks one `requestCommit` call: its timeout, its capture once input settles, and its answer. */
const track = (link: Link, options: CommitOptions, facts: Facts, resolve: (result: CommitResult) => void) => {
    link.calls += 1;
    const call = link.calls;
    const finish = (result: CommitResult) => {
        clearTimeout(timer);
        link.finishers.delete(call);
        resolve(result);
    };

    link.finishers.set(call, finish);
    const timer = setTimeout(
        () => {
            link.waiting.delete(call);
            dispatch(link, { type: 'callTimedOut', call });
        },
        options.timeoutMs ?? timing(facts, 'timeoutMs'),
    );
    const capture = () => {
        // A replacement that started after this call answers it; its own save starts while transitioning,
        // and `dispose` answers every call even mid-replacement.
        if (
            !link.machine.ended &&
            link.runtime.handle.getSummary().phase === 'transitioning' &&
            facts.phase !== 'transitioning'
        ) {
            return;
        }

        link.waiting.delete(call);
        dispatch(link, { type: 'pin', call });
    };

    link.waiting.set(call, capture);
    // ProseMirror reads a DOM change in a microtask queued before this one, so the capture holds the last keystroke.
    queueMicrotask(() => {
        if (link.waiting.has(call) && !link.runtime.handle.getSummary().compositionActive) {
            capture();
        }
    });
};

/** Answers at once when the machine refuses, else resolves when the call's checkpoint is written or fails. */
const commit = (link: Link, options: CommitOptions): Promise<CommitResult> => {
    const facts = readFacts(link);
    const refused = gate(link.machine, facts, options.composition);
    if (refused !== undefined) {
        return Promise.resolve(refused);
    }

    return new Promise<CommitResult>((resolve) => {
        track(link, options, facts, resolve);
    });
};

/** Runs the save machine's effects against the host's service, the browser's timers and the editor runtime. */
export const createTransport = (runtime: EditorRuntime, given: SaveCoordinatorOptions): Transport => {
    const machine = initial(
        { revision: given.revision, unsavedOnMount: given.unsavedOnMount, carried: given.carried },
        runtime.handle.getSummary().session,
    );
    const link: Link = {
        runtime,
        given,
        writer: {
            build: packageVersionOf(),
            formatVersion: 1,
            model: { id: given.model.ref.id, version: given.model.ref.version },
            capabilities: given.model.capabilities.map(({ id, version }) => ({ id, version })),
        },
        ended: new AbortController(),
        timers: new Map(),
        finishers: new Map(),
        waiting: new Map(),
        onOnline: () => {
            dispatch(link, { type: 'online' });
        },
        machine,
        status: Object.freeze(statusOf(machine)),
        controller: new AbortController(),
        calls: 0,
    };
    window.addEventListener('online', link.onOnline);
    runtime.handle.subscribe('ready', () => {
        dispatch(link, { type: 'ready' });
    });
    dispatch(link, { type: 'mounted' });

    return {
        dispatch: (input) => {
            dispatch(link, input);
        },
        commit: (options) => commit(link, options),
        captureWaiting: () => {
            EFFECTS.captureWaiting(link, { type: 'captureWaiting' });
        },
        machine: () => link.machine,
        status: () => link.status,
    };
};
