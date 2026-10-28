/* (c) Copyright Frontify Ltd., all rights reserved. */

import { diagnostic } from '#/model/internal';

import { type AsyncOperation } from '../../../async/async';
import { INSERT_IMAGE, pickedAsset, type PickedAsset, REPLACE_IMAGE } from '../media';

import { completion, nodeIn } from './commands';
import { POOL, UPLOAD_FEATURE } from './constants';
import { type Effect, next, type SlotEvent } from './machine';
import { type Cell, type Link } from './transport';
import { type UploadServiceLike } from './types';

/** One send of a slot's file: the service call's cleanup and what the coordinator's callbacks answer with. */
type Call = {
    own: AsyncOperation | undefined;
    /** Set once the service call is sent and cleared once it runs, so a cleanup runs at most once. */
    release: (() => void) | undefined;
    /** The service's own answer to the request, after which a cleanup can no longer race it. */
    settled: Promise<unknown>;
    reply: string | undefined;
};

type TransportContext = {
    cell: Cell;
    call: Call | undefined;
    service: UploadServiceLike | undefined;
};

const nothing = () => undefined;

/** Runs the call's cleanup once its service call has settled, so it never races the answer. */
const releaseOnce = (call: Call) => {
    const { release } = call;
    call.release = undefined;
    if (release !== undefined) {
        call.settled.then(release).catch(nothing);
    }
};

type EffectOf<EffectType extends Effect['type']> = Extract<Effect, { type: EffectType }>;

/** Feeds an event to the slot's machine, keeps its next state and runs the effects in order. */
const dispatch = (link: Link, context: TransportContext, event: SlotEvent) => {
    const step = next(context.cell.slot, event);
    context.cell.slot = step.state;
    for (const effect of step.effects) {
        runEffect(link, context, effect);
    }
};

/** Sends the slot's file as a new operation, which waits while `maxConcurrentUploads` others run. */
const startUpload = (link: Link, context: TransportContext, announce: boolean) => {
    const { host } = link;
    const { slot } = context.cell;
    const { service } = context;
    const { file } = slot;
    if (service === undefined || file === undefined) {
        return;
    }

    let action: 'create' | 'edit' = 'edit';
    let command: typeof INSERT_IMAGE | typeof REPLACE_IMAGE = REPLACE_IMAGE;
    if (slot.kind === 'insert') {
        action = 'create';
        command = INSERT_IMAGE;
    }

    const call: Call = { own: undefined, release: undefined, settled: Promise.resolve(), reply: undefined };
    const sending: TransportContext = { ...context, call };
    const started = host.start({
        key: `upload:${slot.nodeId}`,
        service: 'uploads',
        featureId: UPLOAD_FEATURE,
        action,
        command,
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

            dispatch(link, sending, { type: 'running', own: call.own });
            const reportProgress = (fraction: number) =>
                dispatch(link, sending, { type: 'progress', fraction, aborted: signal.aborted });
            // A service that throws instead of rejecting fails the same way.
            const upload = Promise.resolve().then(() =>
                service.upload({ operationId, blob: file, filename: slot.name }, { signal, session, reportProgress }),
            );
            call.settled = upload.then(nothing, nothing);

            return upload;
        },
        deliver: (value) => {
            call.reply = undefined;
            dispatch(link, sending, { type: 'answered', own: call.own, value });

            return call.reply;
        },
        fail: () => dispatch(link, sending, { type: 'failed', own: call.own }),
    });
    call.own = started;
    dispatch(link, sending, {
        type: 'started',
        operation: started,
        aborted: started.controller.signal.aborted,
        announce,
    });
};

/** What each effect does outside the machine; the ones that get an answer feed it back as an event. */
const EFFECTS: {
    readonly [EffectType in Effect['type']]: (
        link: Link,
        context: TransportContext,
        effect: EffectOf<EffectType>,
    ) => void;
} = {
    changed: (link) => link.host.changed(),
    release: (_link, { call }) => call && releaseOnce(call),
    reply: (_link, { call }, { code }) => call && (call.reply = code),
    parse: (link, context, { value }) => {
        let asset: PickedAsset | undefined;
        try {
            asset = pickedAsset(value, {
                mediaTypes: link.host.acceptTypes,
                maxLength: link.host.limits.maxAttributeLength,
            });
        } catch {
            // An answer whose accessor throws while it is read holds no asset either.
        }

        dispatch(link, context, { type: 'parsed', asset });
    },
    fill: (link, context, { asset }) => {
        const { nodeId } = context.cell.slot;
        const code = link.host.fill(completion(nodeId, asset));
        // The image's alternative-text intent after its fill says whether it still asks for a text.
        dispatch(link, context, {
            type: 'filled',
            asset,
            code,
            intent: nodeIn(link.host.state().doc, nodeId)?.attrs.altIntent,
        });
    },
    cache: (link, { cell, call }, { operationId, asset }) =>
        link.cache.write(operationId, { nodeId: cell.slot.nodeId, asset, release: () => call && releaseOnce(call) }),
    announce: (link, _context, { event }) => link.host.event(event),
    reportFailure: (link) => link.host.report(diagnostic('media.upload-failed', undefined, undefined, 'warning')),
    replaced: (link, { cell }, { assetId }) => link.host.replaced(cell.slot.nodeId, assetId),
    start: (link, context, { announce }) => startUpload(link, context, announce),
    watch: (link, context, { operation }) =>
        operation.controller.signal.addEventListener('abort', () =>
            dispatch(link, context, { type: 'aborted', operation }),
        ),
    end: (link, _context, { operation }) => link.ended.push(operation),
    refill: (link, { cell }) => link.fills.push(cell.slot.nodeId),
    drop: (link, { cell }) => link.cells.delete(cell.slot.nodeId),
};

const runEffect = (link: Link, context: TransportContext, effect: Effect) => {
    (EFFECTS[effect.type] as (link: Link, context: TransportContext, effect: Effect) => void)(link, context, effect);
};

/** Sends the slot's file as a new operation, and announces its start unless its gesture announces it. */
export const sendUpload = (link: Link, cell: Cell, announce = true) => {
    const service = link.host.service();
    dispatch(link, { cell, call: undefined, service }, { type: 'send', announce, service: service !== undefined });
};

/** Feeds an event that no upload call belongs to. */
export const feedUpload = (link: Link, cell: Cell, event: SlotEvent) => {
    dispatch(link, { cell, call: undefined, service: undefined }, event);
};
