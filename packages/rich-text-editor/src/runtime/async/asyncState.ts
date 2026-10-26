/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type SelectionHandle, type SessionToken } from '../types';

import { type AsyncOperation, type AsyncRequest } from './async';

type Pool = NonNullable<AsyncRequest['pool']>;

/** An operation waiting for room in its pool, with the request that starts it. */
export type Entry = {
    operation: AsyncOperation;
    request: AsyncRequest;
};

/** A result that waits for input to settle. */
export type Held = {
    operation: AsyncOperation;
    result: unknown;
};

/** What the coordinator remembers between events. */
export type AsyncMachine = {
    operations: ReadonlyMap<string, AsyncOperation>;
    /** The request sequence of each interaction key. */
    requests: ReadonlyMap<string, number>;
    held: readonly Held[];
    /** Operations whose target the coordinator captured, and so releases once they end. */
    captured: ReadonlySet<AsyncOperation>;
    /** The pooled operations whose service call runs, and those that wait for room, by pool name. */
    running: ReadonlyMap<string, ReadonlySet<AsyncOperation>>;
    waiting: ReadonlyMap<string, readonly Entry[]>;
    pools: ReadonlyMap<AsyncOperation, Pool>;
};

/** What the transport observed when it fed the event. */
export type AsyncFacts = {
    disposed: boolean;
    faulted: boolean;
    holding: boolean;
    session: SessionToken;
    /** An abort is running, so a pool starts no waiting operation that the same abort may end next. */
    aborting: boolean;
};

export type AsyncEvent = { facts: AsyncFacts } & (
    | { type: 'start'; request: AsyncRequest; reply: (operation: AsyncOperation) => void }
    | {
          type: 'built';
          operation: AsyncOperation;
          request: AsyncRequest;
          owned: boolean;
      }
    | {
          type: 'admit';
          operation: AsyncOperation;
          request: AsyncRequest;
          owned: boolean;
      }
    | { type: 'abortWhere'; aborts: (operation: AsyncOperation) => boolean }
    | { type: 'dispose' }
    | { type: 'resume' }
    | { type: 'pump'; name: string }
    | { type: 'arrive'; operation: AsyncOperation; result: unknown }
    | { type: 'delivered'; operation: AsyncOperation; code: string | undefined }
    | {
          type: 'rejected';
          operation: AsyncOperation;
          request: AsyncRequest;
          error: unknown;
          aborted: boolean;
      }
    | { type: 'settle' }
);

type Distribute<E> = E extends unknown ? Omit<E, 'facts'> : never;
/** An event before the transport adds its facts. */
export type AsyncEventInput = Distribute<AsyncEvent>;

export type AsyncEffect =
    | {
          type: 'build';
          request: AsyncRequest;
          reply: (operation: AsyncOperation) => void;
          target: SelectionHandle | null;
          capture: boolean;
          sequence: number;
      }
    | { type: 'abort'; operation: AsyncOperation }
    | {
          type: 'supersede';
          operation: AsyncOperation;
          request: AsyncRequest;
          owned: boolean;
      }
    | { type: 'register'; operation: AsyncOperation }
    | { type: 'unregister'; operation: AsyncOperation }
    | { type: 'release'; target: SelectionHandle }
    | { type: 'pump'; name: string }
    | { type: 'call'; operation: AsyncOperation; request: AsyncRequest }
    | { type: 'deliver'; operation: AsyncOperation; result: unknown }
    | { type: 'replay'; operation: AsyncOperation; result: unknown }
    | { type: 'fail'; request: AsyncRequest; error: unknown }
    | { type: 'discard'; reason: string };

export type AsyncStep = {
    state: AsyncMachine;
    effects: readonly AsyncEffect[];
};

/** A copy of the machine whose collections a handler changes, and the effects it appends, so `next` never changes its input. */
export type Draft = {
    m: {
        operations: Map<string, AsyncOperation>;
        requests: Map<string, number>;
        held: Held[];
        captured: Set<AsyncOperation>;
        running: Map<string, Set<AsyncOperation>>;
        waiting: Map<string, Entry[]>;
        pools: Map<AsyncOperation, Pool>;
    };
    fx: AsyncEffect[];
    facts: AsyncFacts;
};

export const initial = (): AsyncMachine => ({
    operations: new Map(),
    requests: new Map(),
    held: [],
    captured: new Set(),
    running: new Map(),
    waiting: new Map(),
    pools: new Map(),
});
