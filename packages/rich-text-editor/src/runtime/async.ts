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
    readonly run: (context: { readonly signal: AbortSignal; readonly session: SessionToken }) => Promise<unknown>;
    /** The command that takes the result as its payload, whose declaration checks it as untrusted input. */
    readonly command: string;
}

/** A registered operation; only one that never started has no target. */
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
}

/** The registered operations of every live runtime, which the `src/testing` probe reads. */
export const liveOperations = new Set<AsyncOperation>();

export interface AsyncCoordinatorOptions {
    readonly generateId: () => string;
    readonly session: () => SessionToken;
    readonly policyRevision: () => number;
    readonly isDisposed: () => boolean;
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
    const { generateId, session, policyRevision, isDisposed, holding, capture, release, apply, report } = options;
    const operations = new Map<string, AsyncOperation>();
    const requests = new Map<string, number>();
    const held: { readonly operation: AsyncOperation; readonly result: unknown }[] = [];
    // Operations whose target the coordinator captured, and so releases once they end.
    const captured = new Set<AsyncOperation>();

    const forget = (operation: AsyncOperation) => {
        operations.delete(operation.id);
        liveOperations.delete(operation);
    };

    const end = (operation: AsyncOperation) => {
        forget(operation);
        if (captured.delete(operation) && operation.target !== null) {
            release(operation.target);
        }
    };

    const abortWhere = (aborts: (operation: AsyncOperation) => boolean) => {
        for (const operation of [...operations.values()]) {
            if (aborts(operation)) {
                end(operation);
                operation.controller.abort();
            }
        }
    };

    const discard = (reason: string) => report(diagnostic('runtime.async-discarded', undefined, { reason }, 'info'));

    const arrive = (operation: AsyncOperation, result: unknown) => {
        if (isDisposed()) {
            return;
        }
        // A newer request on its key aborts and unregisters an older one, whose result is then ignored.
        if (operations.get(operation.id) !== operation) {
            discard('superseded');
            return;
        }
        const current = session();
        if (operation.session.sessionId !== current.sessionId || operation.session.generation !== current.generation) {
            end(operation);
            discard('wrong-session');
            return;
        }
        if (holding()) {
            held.push({ operation, result });
            return;
        }
        forget(operation);
        let code: string | undefined;
        try {
            code = apply(operation, result);
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

    const start = (request: AsyncRequest): AsyncOperation => {
        const { key } = request;
        let target: SelectionHandle | null = null;
        let owned = false;
        if (!isDisposed()) {
            target = request.target ?? null;
            if (target === null) {
                target = capture() ?? null;
                owned = target !== null;
            }
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
        });
        // A session that is not ready starts nothing: the operation is aborted and unregistered.
        if (target === null) {
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
        request
            .run({ signal: operation.controller.signal, session: operation.session })
            .then((result) => arrive(operation, result))
            // A failed service call leaves the document as it is.
            .catch(() => end(operation));
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
