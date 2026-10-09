/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic, type IdSource } from '#/model';
import { diagnostic } from '#/model/format';

import { type FeaturePolicy, type SelectionHandle, type SessionToken } from './types';

/** What a capability hands the coordinator: the service call and the command that applies its result. */
export interface AsyncRequest {
    /** The interaction whose newer request supersedes an older one, such as one mention search. */
    readonly key: string;
    /** The `services` member the call uses, so a changed member aborts it (SPEC-rich-text-runtime/AC-073). */
    readonly service: string;
    /** The feature and the policy action its result performs (SPEC-rich-text-runtime/AC-069). */
    readonly featureId: string;
    readonly action: keyof FeaturePolicy;
    readonly target?: SelectionHandle;
    readonly run: (context: { readonly signal: AbortSignal; readonly session: SessionToken }) => Promise<unknown>;
    /** The command that takes the result as its payload, whose declaration checks it as untrusted input. */
    readonly command: string;
}

/** A registered operation (SPEC-rich-text-runtime/AC-046). */
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
    readonly ids: IdSource;
    readonly session: () => SessionToken;
    readonly policyRevision: () => number;
    readonly isDisposed: () => boolean;
    /** Whether results wait for input to settle (SPEC-rich-text-runtime/AC-089). */
    readonly holding: () => boolean;
    /** Applies a result through `commit` from the current state, or returns why it cannot (SPEC-rich-text-runtime/AC-048). */
    readonly apply: (operation: AsyncOperation, result: unknown) => string | undefined;
    readonly report: (diagnostic: Diagnostic) => void;
}

/** Registers each async operation, aborts the ones a newer request, a policy, a service or `dispose` ends, and checks each result. */
export const createAsyncCoordinator = (options: AsyncCoordinatorOptions) => {
    const { ids, session, policyRevision, isDisposed, holding, apply, report } = options;
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
        // An aborted or superseded request is ignored by its request sequence, even when its service resolves (AC-047).
        if (operations.get(operation.id) !== operation || requests.get(operation.key) !== operation.request) {
            discard('superseded');
            return;
        }
        const current = session();
        if (operation.session.sessionId !== current.sessionId || operation.session.generation !== current.generation) {
            forget(operation);
            discard('wrong-session');
            return;
        }
        if (holding()) {
            held.push({ operation, result });
            return;
        }
        forget(operation);
        const code = apply(operation, result);
        if (code !== undefined) {
            discard(code);
        }
    };

    const start = (request: AsyncRequest): AsyncOperation => {
        const { key } = request;
        const sequence = (requests.get(key) ?? 0) + 1;
        requests.set(key, sequence);
        abortWhere((operation) => operation.key === key);
        const operation: AsyncOperation = Object.freeze({
            id: ids.next('operation'),
            session: session(),
            target: request.target ?? null,
            policyRevision: policyRevision(),
            controller: new AbortController(),
            key,
            request: sequence,
            service: request.service,
            featureId: request.featureId,
            action: request.action,
            command: request.command,
        });
        operations.set(operation.id, operation);
        liveOperations.add(operation);
        request
            .run({ signal: operation.controller.signal, session: operation.session })
            .then((result) => arrive(operation, result))
            // A failed service call leaves the document as it is.
            .catch(() => forget(operation));
        return operation;
    };

    /** Checks and applies the results held during composition again, now that input has settled (AC-089). */
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
