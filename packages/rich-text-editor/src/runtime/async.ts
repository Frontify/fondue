/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic } from '#/model';
import { diagnostic } from '#/model/internal';

import { initial, next, type AsyncEffect, type AsyncEventInput, type AsyncFacts } from './asyncMachine';
import { type FeaturePolicy, type SelectionHandle, type SessionToken } from './types';

/** What a capability hands the coordinator: the service call and the command that applies its result. */
export type AsyncRequest = {
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
};

/** A registered operation; only one that never started, or one that delivers its result, has no target. */
export type AsyncOperation = {
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
};

/** The registered operations of every live runtime, which the `src/testing` probe reads. */
export const liveOperations = new Set<AsyncOperation>();

export type AsyncCoordinatorOptions = {
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
};

type Of<T extends AsyncEffect['type']> = Extract<AsyncEffect, { readonly type: T }>;

/** Registers each async operation, aborts the ones a newer request, a policy, a service or `dispose` ends, and checks each result. */
export const createAsyncCoordinator = (options: AsyncCoordinatorOptions) => {
    const { generateId, session, policyRevision, isDisposed, isFaulted, holding, capture, release, apply, report } =
        options;
    let machine = initial();
    // While an abort runs, a pool starts no waiting operation that the same abort may end next.
    let aborting = 0;

    const readFacts = (): AsyncFacts => ({
        disposed: isDisposed(),
        faulted: isFaulted(),
        holding: holding(),
        session: session(),
        aborting: aborting > 0,
    });

    /** Applies a result through its `deliver`, or `apply`; a result that throws while it is read fails its check. */
    const deliverResult = (operation: AsyncOperation, result: unknown): string | undefined => {
        try {
            if (operation.deliver === undefined) {
                return apply(operation, result);
            }
            return operation.deliver(result);
        } catch {
            return 'invalid-payload';
        }
    };

    /** What each effect does outside the machine. */
    const EFFECTS: { readonly [T in AsyncEffect['type']]: (effect: Of<T>) => void } = {
        build: ({ request, reply, target, capture: captures, sequence }) => {
            let chosen = target;
            if (captures) {
                chosen = capture() ?? null;
            }
            const { deliver } = request;
            let delivered: Pick<AsyncOperation, 'deliver'> = {};
            if (deliver !== undefined) {
                delivered = { deliver };
            }
            const operation: AsyncOperation = Object.freeze({
                id: generateId(),
                session: session(),
                target: chosen,
                policyRevision: policyRevision(),
                controller: new AbortController(),
                key: request.key,
                request: sequence,
                service: request.service,
                featureId: request.featureId,
                action: request.action,
                command: request.command,
                ...delivered,
            });
            reply(operation);
            dispatch({ type: 'built', operation, request, owned: captures && chosen !== null });
        },
        abort: ({ operation }) => {
            operation.controller.abort();
        },
        supersede: ({ operation, request, owned }) => {
            sweep({ type: 'abortWhere', aborts: (other) => other.key === operation.key });
            dispatch({ type: 'admit', operation, request, owned });
        },
        register: ({ operation }) => {
            liveOperations.add(operation);
        },
        unregister: ({ operation }) => {
            liveOperations.delete(operation);
        },
        release: ({ target }) => {
            release(target);
        },
        pump: ({ name }) => {
            dispatch({ type: 'pump', name });
        },
        call: ({ operation, request }) => {
            const { signal } = operation.controller;
            request
                .run({ signal, session: operation.session, operationId: operation.id })
                .then((result) => dispatch({ type: 'arrive', operation, result }))
                // A failed service call leaves the document as it is.
                .catch((error: unknown) =>
                    dispatch({ type: 'rejected', operation, request, error, aborted: signal.aborted }),
                );
        },
        deliver: ({ operation, result }) => {
            dispatch({ type: 'delivered', operation, code: deliverResult(operation, result) });
        },
        replay: ({ operation, result }) => {
            dispatch({ type: 'arrive', operation, result });
        },
        fail: ({ request, error }) => {
            request.fail?.(error);
        },
        discard: ({ reason }) => {
            report(diagnostic('runtime.async-discarded', undefined, { reason }, 'info'));
        },
    };

    const run = <T extends AsyncEffect['type']>(effect: Of<T>) => {
        EFFECTS[effect.type](effect);
    };

    /** Feeds an event to the machine, keeps its next state and runs the effects in order. */
    const dispatch = (input: AsyncEventInput) => {
        const step = next(machine, { ...input, facts: readFacts() });
        machine = step.state;
        for (const effect of step.effects) {
            run(effect);
        }
    };

    /** Runs an event that ends operations, then lets every pool start what the abort held back. */
    const sweep = (input: AsyncEventInput) => {
        aborting += 1;
        try {
            dispatch(input);
        } finally {
            aborting -= 1;
        }
        dispatch({ type: 'resume' });
    };

    const start = (request: AsyncRequest): AsyncOperation => {
        let started: AsyncOperation | undefined;
        dispatch({
            type: 'start',
            request,
            reply: (operation) => {
                started = operation;
            },
        });
        // The build effect always replies before `dispatch` returns.
        return started as AsyncOperation;
    };

    return {
        start,
        abortWhere: (aborts: (operation: AsyncOperation) => boolean) => {
            sweep({ type: 'abortWhere', aborts });
        },
        // Checks and applies the results held during composition again, now that input has settled.
        settle: () => {
            dispatch({ type: 'settle' });
        },
        dispose: () => {
            sweep({ type: 'dispose' });
        },
    };
};
