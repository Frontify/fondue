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
    /** Whether the changes a failed session never saved are still unsaved. */
    unsavedOnMount: boolean;
    /** The write a failed session left with an unknown outcome, replayed first. */
    carried: SaveRequest | undefined;
};

/** The machine of a new session, `clean` unless a carried write or unsaved changes need saving. */
export const initial = (config: MachineConfig, session: SessionToken): SaveMachine => {
    const machine: Mutable<SaveMachine> = {
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
    load(machine, config.revision, config.unsavedOnMount, session);

    return machine;
};

type EventOf<EventType extends SaveEvent['type']> = Extract<SaveEvent, { type: EventType }>;

/** The transition table: what each event does to a machine in any state. */
const TRANSITIONS: { readonly [EventType in SaveEvent['type']]: (draft: Draft, event: EventOf<EventType>) => void } = {
    mounted: (draft) => {
        // The write a failed session left, and the changes it never saved, wait for the debounce.
        if (draft.machine.unsavedOnMount) {
            schedule(draft);
        }
    },
    changed: (draft) => {
        const { machine, facts } = draft;
        if (machine.ended) {
            return;
        }

        machine.latest = facts.sequence;
        if (machine.state === 'clean') {
            machine.state = 'dirty';
        }

        schedule(draft);
        draft.effects.push({ type: 'refresh' });
    },
    flush: (draft) => {
        stopTimers(draft);
        draft.machine.due = true;
        send(draft);
    },
    send,
    retryDue: replay,
    ready: (draft) => {
        draft.machine.shown = true;
        // A write a failed session left unresolved goes first, unchanged.
        if (draft.machine.unresolved !== undefined) {
            replay(draft);
        }

        // A flush can land before the session is ready.
        if (draft.machine.due) {
            send(draft);
        }
    },
    online,
    serviceChanged,
    dispose,
    failed,
    answered,
    prepared: (draft, { request }) => {
        draft.machine.unresolved = request;
        draft.machine.replays = 0;
        write(draft, request);
    },
    pin: capture,
    pinned,
    callTimedOut,
    replaced,
};

const apply = <EventType extends SaveEvent['type']>(draft: Draft, event: EventOf<EventType>) => {
    TRANSITIONS[event.type](draft, event);
};

/** The machine after `event` and the effects to run, in order; `state` is not changed. */
export const next = (state: SaveMachine, event: SaveEvent): Step => {
    const draft: Draft = { machine: { ...state }, effects: [], facts: event.facts };
    apply(draft, event);

    return { state: draft.machine, effects: draft.effects };
};
