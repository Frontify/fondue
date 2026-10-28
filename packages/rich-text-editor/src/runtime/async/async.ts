/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic } from '#/model';

import { type FeaturePolicy, type SelectionHandle, type SessionToken } from '../types';

import { createAsyncContext, dispatchAsync, startAsync, sweepAsync } from './asyncRun';

export { liveOperations } from './asyncRun';

/** What a capability hands the coordinator: the service call and the command that applies its result. */
export type AsyncRequest = {
    /** The interaction whose newer request supersedes an older one, such as one mention search. */
    key: string;
    /** The `services` member the call uses, so a changed member aborts it. */
    service: string;
    /** The feature and the policy action its result performs. */
    featureId: string;
    action: keyof FeaturePolicy;
    /** Where the result applies; without one, the coordinator captures a `map` target at the selection. */
    target?: SelectionHandle;
    run: (context: { signal: AbortSignal; session: SessionToken; operationId: string }) => Promise<unknown>;
    /** The command that takes the result as its payload, whose declaration checks it as untrusted input. */
    command: string;
    /**
     * Takes a result that changes no content, such as the options of a search, in place of `command`, and returns why
     * it cannot, as `apply` does. Such an operation captures no target.
     */
    deliver?: (result: unknown) => string | undefined;
    /** Hears a service call that rejected while the operation was still registered, which no abort caused. */
    fail?: (error: unknown) => void;
    /** At most `limit` operations of the pool `name` run at once; the others wait registered, in start order. */
    pool?: { name: string; limit: number };
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

export type AsyncCoordinatorOptions = {
    generateId: () => string;
    session: () => SessionToken;
    policyRevision: () => number;
    isDisposed: () => boolean;
    /** Whether the session faulted, which discards every result as not-ready. */
    isFaulted: () => boolean;
    /** Whether results wait for input to settle. */
    holding: () => boolean;
    /** Captures a `map` target at the selection, after the running commit when one runs, or `undefined` when not ready. */
    capture: () => SelectionHandle | undefined;
    release: (target: SelectionHandle) => void;
    /** Applies a result through `commit` from the current state, or returns why it cannot. */
    apply: (operation: AsyncOperation, result: unknown) => string | undefined;
    report: (diagnostic: Diagnostic) => void;
};

/** Registers each async operation, aborts the ones a newer request, a policy, a service or `dispose` ends, and checks each result. */
export const createAsyncCoordinator = (options: AsyncCoordinatorOptions) => {
    const context = createAsyncContext(options);

    return {
        start: (request: AsyncRequest) => startAsync(context, request),
        abortWhere: (aborts: (operation: AsyncOperation) => boolean) => {
            sweepAsync(context, { type: 'abortWhere', aborts });
        },
        // Checks and applies the results held during composition again, now that input has settled.
        settle: () => {
            dispatchAsync(context, { type: 'settle' });
        },
        dispose: () => {
            sweepAsync(context, { type: 'dispose' });
        },
    };
};
