/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic } from '#/model';

import { type FeaturePolicy, type SelectionHandle, type SessionToken } from '../types';

import { createAsyncContext, dispatchAsync, startAsync, sweepAsync } from './asyncRun';

export { liveOperations } from './asyncRun';

type RunContext = { signal: AbortSignal; session: SessionToken; operationId: string };

/** What a capability hands the coordinator: the service call and the command that applies its result. */
export type AsyncRequest<Result = unknown> = {
    /** The interaction whose newer request supersedes an older one, such as one mention search. */
    key: string;
    /** The `services` member the call uses, so a changed member aborts it. */
    service: string;
    /** The feature and the policy action its result performs. */
    featureId: string;
    action: keyof FeaturePolicy;
    /** Where the result applies; without one, the coordinator captures a `map` target at the selection. */
    target?: SelectionHandle;
    run: (context: RunContext) => Promise<Result>;
    /** The command that takes the result as its payload, whose declaration checks it as untrusted input. */
    command: string;
    /**
     * Takes a result that changes no content, such as the options of a search, in place of `command`, and returns why
     * it cannot, as `apply` does. Such an operation captures no target.
     */
    deliver?: (result: Result) => string | undefined;
    /** Hears a service call that rejected while the operation was still registered, which no abort caused. */
    fail?: (error: unknown) => void;
    /** At most `limit` operations of the pool `name` run at once; the others wait registered, in start order. */
    pool?: { name: string; limit: number };
};

/** What a stored run resolves to: the payload, and the request's `deliver` already closed over it. */
export type Delivered = {
    payload: unknown;
    deliver: (() => string | undefined) | undefined;
};

/** A request after its result type is closed over, so the coordinator stores no `Result`. */
export type StoredRequest = {
    key: string;
    service: string;
    featureId: string;
    action: keyof FeaturePolicy;
    command: string;
    target?: SelectionHandle;
    fail?: (error: unknown) => void;
    pool?: { name: string; limit: number };
    /** Present when the request delivers. The coordinator only checks that; `run` calls the real deliver. */
    deliver?: () => string | undefined;
    run: (context: RunContext) => Promise<Delivered>;
    /** Set by the call effect so the result is delivered on the original promise's turn. */
    hear?: (delivered: Delivered) => void;
    hearError?: (error: unknown) => void;
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
    /** Present when the operation delivers its result instead of applying `command`. */
    deliver?: (result: unknown) => string | undefined;
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
        start: <Result>(request: AsyncRequest<Result>) => startAsync(context, request),
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
