/* (c) Copyright Frontify Ltd., all rights reserved. */

import { diagnostic } from '#/model/internal';

import { type AsyncOperation } from '../../../async';
import { INSERT_IMAGE, pickedAsset, type PickedAsset, REPLACE_IMAGE } from '../media';

import { type UploadCache } from './cache';
import { completion, nodeIn } from './commands';
import { POOL, UPLOAD_FEATURE } from './constants';
import { type Effect, next, type SlotEvent, type SlotState } from './machine';
import { type UploadHost, type UploadServiceLike } from './types';

/** A slot's machine state, held by the map and by every upload call of the slot, even after a reset drops it. */
export type Cell = {
    slot: SlotState;
};

/** What the effects act on: the host, the cache, the cells and the batches that a commit hands on. */
export type Link = {
    readonly host: UploadHost;
    readonly cache: UploadCache;
    readonly cells: Map<string, Cell>;
    /** Completions that a history change asks for from the cache, applied once no commit runs. */
    readonly fills: string[];
    /** Operations a commit ended, aborted together. */
    readonly ended: AsyncOperation[];
};

/** One send of a slot's file: the service call's cleanup and what the coordinator's callbacks answer with. */
type Call = {
    own: AsyncOperation | undefined;
    /** Set once the service call is sent and cleared once it runs, so a cleanup runs at most once. */
    release: (() => void) | undefined;
    /** The service's own answer to the request, after which a cleanup can no longer race it. */
    settled: Promise<unknown>;
    reply: string | undefined;
};

type Context = {
    readonly cell: Cell;
    readonly call: Call | undefined;
    readonly service: UploadServiceLike | undefined;
};

const nothing = () => undefined;

const releaseOnce = (call: Call) => {
    const { release } = call;
    call.release = undefined;
    if (release !== undefined) {
        call.settled.then(release).catch(nothing);
    }
};

type Of<T extends Effect['type']> = Extract<Effect, { readonly type: T }>;

export type Transport = {
    readonly link: Link;
    /** Sends the slot's file as a new operation, and announces its start unless its gesture announces it. */
    readonly send: (cell: Cell, announce?: boolean) => void;
    /** Feeds an event that no upload call belongs to. */
    readonly feed: (cell: Cell, event: SlotEvent) => void;
};

/** Runs the upload machine's effects against the host's coordinator, the service and the cache. */
export const createTransport = (host: UploadHost, cache: UploadCache): Transport => {
    const link: Link = { host, cache, cells: new Map(), fills: [], ended: [] };

    /** What each effect does outside the machine; the ones that get an answer feed it back as an event. */
    const EFFECTS: { readonly [T in Effect['type']]: (context: Context, effect: Of<T>) => void } = {
        changed: () => host.changed(),
        release: ({ call }) => call && releaseOnce(call),
        reply: ({ call }, { code }) => call && (call.reply = code),
        parse: (context, { value }) => {
            let asset: PickedAsset | undefined;
            try {
                asset = pickedAsset(value, { mediaTypes: host.acceptTypes, maxLength: host.limits.maxAttributeLength });
            } catch {
                // An answer whose accessor throws while it is read holds no asset either.
            }
            dispatch(context, { type: 'parsed', asset });
        },
        fill: (context, { asset }) => {
            const { nodeId } = context.cell.slot;
            const code = host.fill(completion(nodeId, asset));
            // The image's alternative-text intent after its fill says whether it still asks for a text.
            dispatch(context, {
                type: 'filled',
                asset,
                code,
                intent: nodeIn(host.state().doc, nodeId)?.attrs.altIntent,
            });
        },
        cache: ({ cell, call }, { operationId, asset }) =>
            cache.write(operationId, { nodeId: cell.slot.nodeId, asset, release: () => call && releaseOnce(call) }),
        announce: (_, { event }) => host.event(event),
        reportFailure: () => host.report(diagnostic('media.upload-failed', undefined, undefined, 'warning')),
        replaced: ({ cell }, { assetId }) => host.replaced(cell.slot.nodeId, assetId),
        start: (context, { announce }) => start(context, announce),
        watch: (context, { operation }) =>
            operation.controller.signal.addEventListener('abort', () =>
                dispatch(context, { type: 'aborted', operation }),
            ),
        end: (_, { operation }) => link.ended.push(operation),
        refill: ({ cell }) => link.fills.push(cell.slot.nodeId),
        drop: ({ cell }) => link.cells.delete(cell.slot.nodeId),
    };

    /** Feeds an event to the slot's machine, keeps its next state and runs the effects in order. */
    const dispatch = (context: Context, event: SlotEvent) => {
        const step = next(context.cell.slot, event);
        context.cell.slot = step.state;
        for (const effect of step.effects) {
            (EFFECTS[effect.type] as (context: Context, effect: Effect) => void)(context, effect);
        }
    };

    /** Sends the slot's file as a new operation, which waits while `maxConcurrentUploads` others run. */
    const start = (context: Context, announce: boolean) => {
        const { slot } = context.cell;
        const { service } = context;
        const { file } = slot;
        if (service === undefined || file === undefined) {
            return;
        }
        const call: Call = { own: undefined, release: undefined, settled: Promise.resolve(), reply: undefined };
        const ctx: Context = { ...context, call };
        const started = host.start({
            key: `upload:${slot.nodeId}`,
            service: 'uploads',
            featureId: UPLOAD_FEATURE,
            action: slot.kind === 'insert' ? 'create' : 'edit',
            command: slot.kind === 'insert' ? INSERT_IMAGE : REPLACE_IMAGE,
            pool: { name: POOL, limit: Math.max(1, host.limits.maxConcurrentUploads) },
            run: ({ signal, session, operationId }) => {
                call.release = () => {
                    // The session may have ended, so the cleanup gets a signal of its own.
                    try {
                        service
                            .releaseUnused(operationId, { signal: new AbortController().signal, session })
                            .catch(nothing);
                    } catch {
                        // A service that throws instead of rejecting cleans up nothing either.
                    }
                };
                dispatch(ctx, { type: 'running', own: call.own });
                const reportProgress = (fraction: number) =>
                    dispatch(ctx, { type: 'progress', fraction, aborted: signal.aborted });
                // A service that throws instead of rejecting fails the same way.
                const upload = Promise.resolve().then(() =>
                    service.upload(
                        { operationId, blob: file, filename: slot.name },
                        { signal, session, reportProgress },
                    ),
                );
                call.settled = upload.then(nothing, nothing);
                return upload;
            },
            deliver: (value) => {
                call.reply = undefined;
                dispatch(ctx, { type: 'answered', own: call.own, value });
                return call.reply;
            },
            fail: () => dispatch(ctx, { type: 'failed', own: call.own }),
        });
        call.own = started;
        dispatch(ctx, { type: 'started', operation: started, aborted: started.controller.signal.aborted, announce });
    };

    return {
        link,
        send: (cell, announce = true) => {
            const service = host.service();
            dispatch({ cell, call: undefined, service }, { type: 'send', announce, service: service !== undefined });
        },
        feed: (cell, event) => dispatch({ cell, call: undefined, service: undefined }, event),
    };
};
