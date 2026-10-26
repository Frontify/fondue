/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ServerRevision, type SessionToken } from '#/runtime/types';

import { answered, callTimedOut, capture, failed, pinned } from './saveAnswers';
import { type Draft, type Mutable, type SaveEvent, type SaveMachine, type Step } from './saveState';
import {
    dispose,
    load,
    online,
    replaced,
    replay,
    schedule,
    send,
    serviceChanged,
    stopTimers,
    write,
} from './saveSteps';
import { type SaveRequest } from './types';

export {
    gate,
    outcomeUnknown,
    refusal,
    statusOf,
    timing,
    unsavedOf,
    type Effect,
    type EventInput,
    type Facts,
    type Flight,
    type Pin,
    type Rejection,
    type SaveEvent,
    type SaveMachine,
    type SaveState,
    type Step,
    type Timer,
} from './saveState';

/**
 * The save states and the transitions between them as one pure function: `next(machine, event)` returns the machine
 * after the event and the effects a transport runs, in order. It reads no clock, network or timer, so a transport
 * passes in what it observed as `facts` and feeds every result back as an event.
 */
export type MachineConfig = {
    /** The loaded record's revision, `null` for a new record. */
    revision: ServerRevision | null;
    unsavedOnMount: boolean;
    carried: SaveRequest | undefined;
};

export const initial = (config: MachineConfig, session: SessionToken): SaveMachine => {
    const m: Mutable<SaveMachine> = {
        state: 'clean',
        latest: 0,
        acknowledged: 0,
        unsavedOnMount: false,
        revision: null,
        accepted: undefined,
        rejection: null,
        committed: false,
        problem: null,
        flight: undefined,
        unresolved: config.carried,
        carried: config.carried,
        replays: 0,
        due: false,
        pinned: [],
        writes: 0,
        ended: false,
        shown: false,
        retrying: false,
        longest: false,
    };
    load(m, config.revision, config.unsavedOnMount, session);

    return m;
};

type Of<T extends SaveEvent['type']> = Extract<SaveEvent, { type: T }>;

/** The transition table: what each event does to a machine in any state. */
const TRANSITIONS: { readonly [T in SaveEvent['type']]: (d: Draft, event: Of<T>) => void } = {
    mounted: (d) => {
        // The write a failed session left, and the changes it never saved, wait for the debounce.
        if (d.m.unsavedOnMount) {
            schedule(d);
        }
    },
    changed: (d) => {
        const { m, facts } = d;
        if (m.ended) {
            return;
        }

        m.latest = facts.sequence;
        if (m.state === 'clean') {
            m.state = 'dirty';
        }

        schedule(d);
        d.fx.push({ type: 'refresh' });
    },
    flush: (d) => {
        stopTimers(d);
        d.m.due = true;
        send(d);
    },
    send,
    retryDue: replay,
    ready: (d) => {
        d.m.shown = true;
        // A write a failed session left unresolved goes first, unchanged.
        if (d.m.unresolved !== undefined) {
            replay(d);
        }
    },
    online,
    serviceChanged,
    dispose,
    failed,
    answered,
    prepared: (d, { request }) => {
        d.m.unresolved = request;
        d.m.replays = 0;
        write(d, request);
    },
    pin: capture,
    pinned,
    callTimedOut,
    replaced,
};

const apply = <T extends SaveEvent['type']>(d: Draft, event: Of<T>) => {
    TRANSITIONS[event.type](d, event);
};

export const next = (state: SaveMachine, event: SaveEvent): Step => {
    const d: Draft = { m: { ...state }, fx: [], facts: event.facts };
    apply(d, event);

    return { state: d.m, effects: d.fx };
};
