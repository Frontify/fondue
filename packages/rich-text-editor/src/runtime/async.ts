/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic } from '#/model';
import { diagnostic } from '#/model/format';

import { type FeaturePolicy, type SessionToken } from './types';

/** What a capability hands the coordinator: the service call and the function that takes its result. */
export interface AsyncRequest {
    /** The interaction whose newer request supersedes an older one, such as one suggestion search. */
    readonly key: string;
    /** The `services` member the call uses, so a changed member aborts it. */
    readonly service: string;
    /** The feature and the policy action its result performs. */
    readonly featureId: string;
    readonly action: keyof FeaturePolicy;
    readonly run: (context: { readonly signal: AbortSignal; readonly session: SessionToken }) => Promise<unknown>;
    /** Takes a result that changes no content, such as the options of a search, and returns why it cannot. */
    readonly deliver: (result: unknown) => string | undefined;
}

/** A registered operation. */
export interface AsyncOperation {
    readonly id: string;
    readonly session: SessionToken;
    readonly controller: AbortController;
    readonly key: string;
    /** The request sequence of its interaction key, separate from `SessionToken.generation`. */
    readonly request: number;
    readonly service: string;
    readonly featureId: string;
    readonly action: keyof FeaturePolicy;
    readonly deliver: (result: unknown) => string | undefined;
}

/** The registered operations of every live runtime, which the `src/testing` probe reads. */
export const liveOperations = new Set<AsyncOperation>();

export interface AsyncCoordinatorOptions {
    readonly generateId: () => string;
    readonly session: () => SessionToken;
    readonly isDisposed: () => boolean;
    /** Whether the session faulted, which discards every result as not-ready. */
    readonly isFaulted: () => boolean;
    /** Whether results wait for input to settle. */
    readonly holding: () => boolean;
    readonly report: (diagnostic: Diagnostic) => void;
}

/** Registers each async operation, aborts the ones a newer request, a policy, a service or `dispose` ends, and checks each result. */
export const createAsyncCoordinator = (options: AsyncCoordinatorOptions) => {
    const { generateId, session, isDisposed, isFaulted, holding, report } = options;
    const operations = new Map<string, AsyncOperation>();
    const requests = new Map<string, number>();
    const held: { readonly operation: AsyncOperation; readonly result: unknown }[] = [];

    const forget = (operation: AsyncOperation) => {
        operations.delete(operation.id);
        liveOperations.delete(operation);
    };

    const abortWhere = (aborts: (operation: AsyncOperation) => boolean) => {
        for (const operation of [...operations.values()]) {
            if (aborts(operation)) {
                forget(operation);
                operation.controller.abort();
            }
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
            forget(operation);
            discard('wrong-session');
            return;
        }
        // A newer request on its key aborts and unregisters an older one, whose result is then ignored.
        if (operations.get(operation.id) !== operation) {
            discard('superseded');
            return;
        }
        if (isFaulted()) {
            forget(operation);
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
            code = operation.deliver(result);
        } catch {
            // A result whose accessor or proxy throws while it is read is untrusted input that fails its check.
            code = 'invalid-payload';
        }
        if (code !== undefined) {
            discard(code);
        }
    };

    const call = (operation: AsyncOperation, request: AsyncRequest) => {
        const { signal } = operation.controller;
        request
            .run({ signal, session: operation.session })
            .then((result) => arrive(operation, result))
            // A failed service call leaves the document as it is.
            .catch(() => forget(operation));
    };

    const start = (request: AsyncRequest): AsyncOperation => {
        const { key } = request;
        const operation: AsyncOperation = Object.freeze({
            id: generateId(),
            session: session(),
            controller: new AbortController(),
            key,
            request: (requests.get(key) ?? 0) + 1,
            service: request.service,
            featureId: request.featureId,
            action: request.action,
            deliver: request.deliver,
        });
        // A session that is not ready starts nothing: the operation is aborted and unregistered.
        if (isDisposed()) {
            operation.controller.abort();
            return operation;
        }
        requests.set(key, operation.request);
        abortWhere((other) => other.key === key);
        operations.set(operation.id, operation);
        liveOperations.add(operation);
        call(operation, request);
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
