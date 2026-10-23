/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic } from '#/model';
import { diagnostic } from '#/model/format';

import { type FeaturePolicy, type SelectionHandle, type SessionToken } from './types';

/** What a capability hands the coordinator: the service call and the command that applies its result. */
export interface AsyncRequest {
    /** The interaction whose newer request supersedes an older one, such as one mention search. */
    readonly key: string;
    /** The `services` member the call uses, so a changed member aborts it. */
    readonly service: string;
    /** The feature and the policy action its result performs. */
    readonly featureId: string;
    readonly action: keyof FeaturePolicy;
    /** Where the result applies; without one, the coordinator captures a `map` target at the selection. */
    readonly target?: SelectionHandle;
    readonly run: (context: {
        readonly signal: AbortSignal;
        readonly session: SessionToken;
        readonly operationId: string;
    }) => Promise<unknown>;
    /** The command that takes the result as its payload, whose declaration checks it as untrusted input. */
    readonly command: string;
    /**
     * Takes a result that changes no content, such as the options of a search, in place of `command`, and returns why
     * it cannot, as `apply` does. Such an operation captures no target.
     */
    readonly deliver?: (result: unknown) => string | undefined;
    /** Hears a service call that rejected while the operation was still registered, which no abort caused. */
    readonly fail?: (error: unknown) => void;
    /** At most `limit` operations of the pool `name` run at once; the others wait registered, in start order. */
    readonly pool?: { readonly name: string; readonly limit: number };
}

/** A registered operation; only one that never started, or one that delivers its result, has no target. */
export interface AsyncOperation {
    readonly id: string;
    readonly session: SessionToken;
    readonly target: SelectionHandle | null;
    readonly policyRevision: number;
    readonly controller: AbortController;
    readonly key: string;
    /** The request sequence of its interaction key, separate from `SessionToken.generation`. */
    readonly request: number;
    readonly service: string;
    readonly featureId: string;
    readonly action: keyof FeaturePolicy;
    readonly command: string;
    readonly deliver?: (result: unknown) => string | undefined;
}

/** The registered operations of every live runtime, which the `src/testing` probe reads. */
export const liveOperations = new Set<AsyncOperation>();

export interface AsyncCoordinatorOptions {
    readonly generateId: () => string;
    readonly session: () => SessionToken;
    readonly policyRevision: () => number;
    readonly isDisposed: () => boolean;
    /** Whether the session faulted, which discards every result as not-ready. */
    readonly isFaulted: () => boolean;
    /** Whether results wait for input to settle. */
    readonly holding: () => boolean;
    /** Captures a `map` target at the selection, after the running commit when one runs, or `undefined` when not ready. */
    readonly capture: () => SelectionHandle | undefined;
    readonly release: (target: SelectionHandle) => void;
    /** Applies a result through `commit` from the current state, or returns why it cannot. */
    readonly apply: (operation: AsyncOperation, result: unknown) => string | undefined;
    readonly report: (diagnostic: Diagnostic) => void;
}

/** Registers each async operation, aborts the ones a newer request, a policy, a service or `dispose` ends, and checks each result. */
export const createAsyncCoordinator = (options: AsyncCoordinatorOptions) => {
    const { generateId, session, policyRevision, isDisposed, isFaulted, holding, capture, release, apply, report } =
        options;
    const operations = new Map<string, AsyncOperation>();
    const requests = new Map<string, number>();
    const held: { readonly operation: AsyncOperation; readonly result: unknown }[] = [];
    // Operations whose target the coordinator captured, and so releases once they end.
    const captured = new Set<AsyncOperation>();
    // The pooled operations whose service call runs, and those that wait for room, by pool name.
    const running = new Map<string, Set<AsyncOperation>>();
    const waiting = new Map<string, { readonly operation: AsyncOperation; readonly request: AsyncRequest }[]>();
    const pools = new Map<AsyncOperation, AsyncRequest['pool']>();

    const forget = (operation: AsyncOperation) => {
        operations.delete(operation.id);
        liveOperations.delete(operation);
    };

    const end = (operation: AsyncOperation) => {
        forget(operation);
        if (captured.delete(operation) && operation.target !== null) {
            release(operation.target);
        }
        const pool = pools.get(operation);
        if (pool === undefined) {
            return;
        }
        pools.delete(operation);
        const queued = waiting.get(pool.name) ?? [];
        const at = queued.findIndex((entry) => entry.operation === operation);
        if (at >= 0) {
            queued.splice(at, 1);
        }
        if (running.get(pool.name)?.delete(operation) === true) {
            next(pool.name);
        }
    };

    // While an abort runs, a pool starts no waiting operation that the same abort may end next.
    let aborting = 0;
    const abortWhere = (aborts: (operation: AsyncOperation) => boolean) => {
        aborting += 1;
        try {
            for (const operation of [...operations.values()]) {
                if (aborts(operation)) {
                    end(operation);
                    operation.controller.abort();
                }
            }
        } finally {
            aborting -= 1;
        }
        for (const name of [...waiting.keys()]) {
            next(name);
        }
    };

    const discard = (reason: string) => report(diagnostic('runtime.async-discarded', undefined, { reason }, 'info'));

    const arrive = (operation: AsyncOperation, result: unknown) => {
        if (isDisposed()) {
            return;
        }
        // Checked first, since a replacement also aborts and unregisters what the old generation started.
        const current = session();
        if (operation.session.sessionId !== current.sessionId || operation.session.generation !== current.generation) {
            end(operation);
            discard('wrong-session');
            return;
        }
        // A newer request on its key aborts and unregisters an older one, whose result is then ignored.
        if (operations.get(operation.id) !== operation) {
            discard('superseded');
            return;
        }
        if (isFaulted()) {
            end(operation);
            operation.controller.abort();
            discard('not-ready');
            return;
        }
        if (holding()) {
            held.push({ operation, result });
            return;
        }
        forget(operation);
        let code: string | undefined;
        try {
            if (operation.deliver === undefined) {
                code = apply(operation, result);
            } else {
                code = operation.deliver(result);
            }
        } catch {
            // A result whose accessor or proxy throws while it is read is untrusted input that fails its check.
            code = 'invalid-payload';
        }
        // The captured target stays until the result has applied through it.
        end(operation);
        if (code !== undefined) {
            discard(code);
        }
    };

    const call = (operation: AsyncOperation, request: AsyncRequest) => {
        const { signal } = operation.controller;
        request
            .run({ signal, session: operation.session, operationId: operation.id })
            .then((result) => arrive(operation, result))
            // A failed service call leaves the document as it is.
            .catch((error: unknown) => {
                const live = operations.get(operation.id) === operation && !signal.aborted;
                end(operation);
                if (live) {
                    request.fail?.(error);
                }
            });
    };

    /** Starts the next waiting operation of pool `name` while it has room. */
    const next = (name: string) => {
        if (aborting > 0 || isDisposed()) {
            return;
        }
        const queued = waiting.get(name) ?? [];
        const busy = running.get(name) ?? new Set<AsyncOperation>();
        running.set(name, busy);
        while (queued.length > 0) {
            const entry = queued[0];
            if (entry === undefined) {
                return;
            }
            const { pool } = entry.request;
            let limit = 0;
            if (pool !== undefined) {
                limit = pool.limit;
            }
            if (busy.size >= limit) {
                return;
            }
            queued.shift();
            busy.add(entry.operation);
            call(entry.operation, entry.request);
        }
    };

    const start = (request: AsyncRequest): AsyncOperation => {
        const { key } = request;
        const { deliver } = request;
        let target: SelectionHandle | null = null;
        let owned = false;
        let ready = false;
        if (!isDisposed()) {
            target = request.target ?? null;
            if (target === null && deliver === undefined) {
                target = capture() ?? null;
                owned = target !== null;
            }
            ready = target !== null || deliver !== undefined;
        }
        let delivered: Pick<AsyncOperation, 'deliver'> = {};
        if (deliver !== undefined) {
            delivered = { deliver };
        }
        const operation: AsyncOperation = Object.freeze({
            id: generateId(),
            session: session(),
            target,
            policyRevision: policyRevision(),
            controller: new AbortController(),
            key,
            request: (requests.get(key) ?? 0) + 1,
            service: request.service,
            featureId: request.featureId,
            action: request.action,
            command: request.command,
            ...delivered,
        });
        // A session that is not ready starts nothing: the operation is aborted and unregistered.
        if (!ready) {
            operation.controller.abort();
            return operation;
        }
        requests.set(key, operation.request);
        abortWhere((other) => other.key === key);
        if (owned) {
            captured.add(operation);
        }
        operations.set(operation.id, operation);
        liveOperations.add(operation);
        const { pool } = request;
        if (pool === undefined) {
            call(operation, request);
            return operation;
        }
        pools.set(operation, pool);
        const queued = waiting.get(pool.name) ?? [];
        queued.push({ operation, request });
        waiting.set(pool.name, queued);
        next(pool.name);
        return operation;
    };

    /** Checks and applies the results held during composition again, now that input has settled. */
    const settle = () => {
        for (const { operation, result } of held.splice(0)) {
            arrive(operation, result);
        }
    };

    const dispose = () => {
        held.length = 0;
        abortWhere(() => true);
    };

    return { start, abortWhere, settle, dispose };
};
