/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AsyncOperation, type AsyncRequest } from './async';
import { type SelectionHandle, type SessionToken } from './types';

type Pool = NonNullable<AsyncRequest['pool']>;

/** An operation waiting for room in its pool, with the request that starts it. */
export type Entry = {
    readonly operation: AsyncOperation;
    readonly request: AsyncRequest;
};

/** A result that waits for input to settle. */
export type Held = {
    readonly operation: AsyncOperation;
    readonly result: unknown;
};

/** What the coordinator remembers between events. */
export type AsyncMachine = {
    readonly operations: ReadonlyMap<string, AsyncOperation>;
    /** The request sequence of each interaction key. */
    readonly requests: ReadonlyMap<string, number>;
    readonly held: readonly Held[];
    /** Operations whose target the coordinator captured, and so releases once they end. */
    readonly captured: ReadonlySet<AsyncOperation>;
    /** The pooled operations whose service call runs, and those that wait for room, by pool name. */
    readonly running: ReadonlyMap<string, ReadonlySet<AsyncOperation>>;
    readonly waiting: ReadonlyMap<string, readonly Entry[]>;
    readonly pools: ReadonlyMap<AsyncOperation, Pool>;
};

/** What the transport observed when it fed the event. */
export type AsyncFacts = {
    readonly disposed: boolean;
    readonly faulted: boolean;
    readonly holding: boolean;
    readonly session: SessionToken;
    /** An abort is running, so a pool starts no waiting operation that the same abort may end next. */
    readonly aborting: boolean;
};

export type AsyncEvent = { readonly facts: AsyncFacts } & (
    | { readonly type: 'start'; readonly request: AsyncRequest; readonly reply: (operation: AsyncOperation) => void }
    | {
          readonly type: 'built';
          readonly operation: AsyncOperation;
          readonly request: AsyncRequest;
          readonly owned: boolean;
      }
    | {
          readonly type: 'admit';
          readonly operation: AsyncOperation;
          readonly request: AsyncRequest;
          readonly owned: boolean;
      }
    | { readonly type: 'abortWhere'; readonly aborts: (operation: AsyncOperation) => boolean }
    | { readonly type: 'dispose' }
    | { readonly type: 'resume' }
    | { readonly type: 'pump'; readonly name: string }
    | { readonly type: 'arrive'; readonly operation: AsyncOperation; readonly result: unknown }
    | { readonly type: 'delivered'; readonly operation: AsyncOperation; readonly code: string | undefined }
    | {
          readonly type: 'rejected';
          readonly operation: AsyncOperation;
          readonly request: AsyncRequest;
          readonly error: unknown;
          readonly aborted: boolean;
      }
    | { readonly type: 'settle' }
);

type Distribute<E> = E extends unknown ? Omit<E, 'facts'> : never;
/** An event before the transport adds its facts. */
export type AsyncEventInput = Distribute<AsyncEvent>;

export type AsyncEffect =
    | {
          readonly type: 'build';
          readonly request: AsyncRequest;
          readonly reply: (operation: AsyncOperation) => void;
          readonly target: SelectionHandle | null;
          readonly capture: boolean;
          readonly sequence: number;
      }
    | { readonly type: 'abort'; readonly operation: AsyncOperation }
    | {
          readonly type: 'supersede';
          readonly operation: AsyncOperation;
          readonly request: AsyncRequest;
          readonly owned: boolean;
      }
    | { readonly type: 'register'; readonly operation: AsyncOperation }
    | { readonly type: 'unregister'; readonly operation: AsyncOperation }
    | { readonly type: 'release'; readonly target: SelectionHandle }
    | { readonly type: 'pump'; readonly name: string }
    | { readonly type: 'call'; readonly operation: AsyncOperation; readonly request: AsyncRequest }
    | { readonly type: 'deliver'; readonly operation: AsyncOperation; readonly result: unknown }
    | { readonly type: 'replay'; readonly operation: AsyncOperation; readonly result: unknown }
    | { readonly type: 'fail'; readonly request: AsyncRequest; readonly error: unknown }
    | { readonly type: 'discard'; readonly reason: string };

export type AsyncStep = {
    readonly state: AsyncMachine;
    readonly effects: readonly AsyncEffect[];
};

/** A copy of the machine whose collections a handler changes, and the effects it appends, so `next` never changes its input. */
export type Draft = {
    readonly m: {
        operations: Map<string, AsyncOperation>;
        requests: Map<string, number>;
        held: Held[];
        captured: Set<AsyncOperation>;
        running: Map<string, Set<AsyncOperation>>;
        waiting: Map<string, Entry[]>;
        pools: Map<AsyncOperation, Pool>;
    };
    readonly fx: AsyncEffect[];
    readonly facts: AsyncFacts;
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
