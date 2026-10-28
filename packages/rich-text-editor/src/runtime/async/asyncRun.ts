/* (c) Copyright Frontify Ltd., all rights reserved. */

import { diagnostic } from '#/model/internal';

import { type SelectionHandle } from '../types';

import { type AsyncCoordinatorOptions, type AsyncOperation, type AsyncRequest } from './async';
import {
    initial,
    next,
    type AsyncEffect,
    type AsyncEventInput,
    type AsyncFacts,
    type AsyncMachine,
} from './asyncMachine';

/** The registered operations of every live runtime, which the `src/testing` probe reads. */
export const liveOperations = new Set<AsyncOperation>();

/** One coordinator's machine and how deep an abort sweep currently is. */
type AsyncContext = {
    options: AsyncCoordinatorOptions;
    machine: AsyncMachine;
    /** While an abort runs, a pool starts no waiting operation that the same abort may end next. */
    aborting: number;
};

/** A fresh machine for `options`, before any operation is registered. */
export const createAsyncContext = (options: AsyncCoordinatorOptions): AsyncContext => ({
    options,
    machine: initial(),
    aborting: 0,
});

const readFacts = (context: AsyncContext): AsyncFacts => ({
    disposed: context.options.isDisposed(),
    faulted: context.options.isFaulted(),
    holding: context.options.holding(),
    session: context.options.session(),
    aborting: context.aborting > 0,
});

/** Applies a result through its `deliver`, or `apply`; a result that throws while it is read fails its check. */
const deliverResult = (context: AsyncContext, operation: AsyncOperation, result: unknown): string | undefined => {
    try {
        if (operation.deliver === undefined) {
            return context.options.apply(operation, result);
        }

        return operation.deliver(result);
    } catch {
        return 'invalid-payload';
    }
};

/** The frozen operation that a build effect registers for `request`, aimed at `target`. */
const buildOperation = (
    { generateId, session, policyRevision }: AsyncCoordinatorOptions,
    request: AsyncRequest,
    target: SelectionHandle | null,
    sequence: number,
): AsyncOperation => {
    const { deliver } = request;
    let delivered: Pick<AsyncOperation, 'deliver'> = {};
    if (deliver !== undefined) {
        delivered = { deliver };
    }

    return Object.freeze({
        id: generateId(),
        session: session(),
        target,
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
};

type Of<T extends AsyncEffect['type']> = Extract<AsyncEffect, { type: T }>;

/** Feeds an event to the machine, keeps its next state and runs the effects in order. */
export const dispatchAsync = (context: AsyncContext, input: AsyncEventInput) => {
    const step = next(context.machine, { ...input, facts: readFacts(context) });
    context.machine = step.state;
    for (const effect of step.effects) {
        runEffect(context, effect);
    }
};

/** Runs an event that ends operations, then lets every pool start what the abort held back. */
export const sweepAsync = (context: AsyncContext, input: AsyncEventInput) => {
    context.aborting += 1;
    try {
        dispatchAsync(context, input);
    } finally {
        context.aborting -= 1;
    }

    dispatchAsync(context, { type: 'resume' });
};

/** What each effect does outside the machine. */
const EFFECTS: { readonly [T in AsyncEffect['type']]: (context: AsyncContext, effect: Of<T>) => void } = {
    build: (context, { request, reply, target, capture: captures, sequence }) => {
        let chosen = target;
        if (captures) {
            chosen = context.options.capture() ?? null;
        }

        const operation = buildOperation(context.options, request, chosen, sequence);
        reply(operation);
        dispatchAsync(context, { type: 'built', operation, request, owned: captures && chosen !== null });
    },
    abort: (_context, { operation }) => {
        operation.controller.abort();
    },
    supersede: (context, { operation, request, owned }) => {
        sweepAsync(context, { type: 'abortWhere', aborts: (other) => other.key === operation.key });
        dispatchAsync(context, { type: 'admit', operation, request, owned });
    },
    register: (_context, { operation }) => {
        liveOperations.add(operation);
    },
    unregister: (_context, { operation }) => {
        liveOperations.delete(operation);
    },
    release: (context, { target }) => {
        context.options.release(target);
    },
    pump: (context, { name }) => {
        dispatchAsync(context, { type: 'pump', name });
    },
    call: (context, { operation, request }) => {
        const { signal } = operation.controller;
        request
            .run({ signal, session: operation.session, operationId: operation.id })
            .then((result) => dispatchAsync(context, { type: 'arrive', operation, result }))
            // A failed service call leaves the document as it is.
            .catch((error: unknown) =>
                dispatchAsync(context, { type: 'rejected', operation, request, error, aborted: signal.aborted }),
            );
    },
    deliver: (context, { operation, result }) => {
        dispatchAsync(context, { type: 'delivered', operation, code: deliverResult(context, operation, result) });
    },
    replay: (context, { operation, result }) => {
        dispatchAsync(context, { type: 'arrive', operation, result });
    },
    fail: (_context, { request, error }) => {
        request.fail?.(error);
    },
    discard: (context, { reason }) => {
        context.options.report(diagnostic('runtime.async-discarded', undefined, { reason }, 'info'));
    },
};

const runEffect = <T extends AsyncEffect['type']>(context: AsyncContext, effect: Of<T>) => {
    EFFECTS[effect.type](context, effect);
};

/** Starts `request` and returns the operation the build effect registered. */
export const startAsync = (context: AsyncContext, request: AsyncRequest): AsyncOperation => {
    let started: AsyncOperation | undefined;
    dispatchAsync(context, {
        type: 'start',
        request,
        reply: (operation) => {
            started = operation;
        },
    });

    // The build effect always replies before `dispatch` returns.
    return started as AsyncOperation;
};
