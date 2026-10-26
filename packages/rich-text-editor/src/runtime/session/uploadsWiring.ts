/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, type Transaction } from 'prosemirror-state';

import { type CompiledDefinition } from '#/definition';
import { type Diagnostic, type ResourceLimits, REPLACED_ASSET } from '#/model';
import { compiledModel } from '#/model/internal';

import { type MediaSession } from '../capabilities/media/session';
import {
    createUploads,
    DEFAULT_ACCEPT_TYPES,
    UPLOAD_FEATURE,
    type UploadEvent,
    type UploadPlace,
    type UploadServiceLike,
    type Uploads,
} from '../capabilities/media/uploads';
import { withNodeState } from '../nodeState';
import { type EditorRuntime } from '../runtime';
import { type UploadStatus } from '../types';

import { type Commands } from './commands';
import { type Identity } from './identity';
import { type Lifecycle } from './lifecycle';
import { type PolicyService } from './policy';
import { type TargetsService } from './targets';

export type UploadService = {
    /** The session's upload machine, which the slot plugin, the idle hook and the history read. */
    readonly raw: Uploads;
    /** The media types `media.image` takes, `undefined` without it. */
    readonly accepts: readonly string[] | undefined;
    /** Whether files upload now at `place`: `media.image` is installed, the host has `services.uploads` and the cache and policy allow it. */
    available(place: UploadPlace): boolean;
    begin(files: readonly File[], place: UploadPlace): Promise<void>;
    retry(nodeId: string): void;
    pick(nodeId: string | undefined): void;
    statusOf(nodeId: string): UploadStatus | undefined;
};

// The service is built before the store, whose first state holds its plugin, so what is built later is read lazily.
export const createUploadService = (a: {
    definition: CompiledDefinition;
    limits: ResourceLimits;
    identity: Pick<Identity, 'session'>;
    lifecycle: Pick<Lifecycle, 'is'>;
    policy: Pick<PolicyService, 'current'>;
    generate: () => string;
    host: {
        readonly uploads?: () => UploadServiceLike | undefined;
        readonly pick?: (nodeId: string | undefined) => void;
        readonly uploadEvent?: (event: UploadEvent) => void;
    };
    state: () => EditorState;
    commit: () => (root: Transaction) => void;
    commands: () => Pick<Commands, 'runOn'>;
    targets: () => Pick<TargetsService, 'coordinator' | 'captureRange' | 'releaseTarget' | 'baseOf'>;
    report: (diagnostic: Diagnostic) => void;
    changed: () => void;
}): UploadService => {
    const { definition, limits, identity, lifecycle, policy, generate, host, state, report, changed } = a;
    // `media.image` and the media types it accepts, which its `acceptTypes` option sets.
    const imageFeature = compiledModel(definition.model).features.find(({ id }) => id === UPLOAD_FEATURE);
    let acceptTypes: readonly string[] | undefined;
    if (imageFeature !== undefined) {
        const option: unknown = imageFeature.options.acceptTypes;
        acceptTypes = Array.isArray(option)
            ? option.filter((type): type is string => typeof type === 'string')
            : DEFAULT_ACCEPT_TYPES;
    }
    const raw = createUploads({
        state,
        limits,
        acceptTypes: acceptTypes ?? [],
        service: () => (acceptTypes === undefined ? undefined : host.uploads?.()),
        session: identity.session,
        generateId: () => generate(),
        allows: (action) => policy.current().features[UPLOAD_FEATURE]?.[action] !== false,
        start: (request) => a.targets().coordinator.start(request),
        abort: (operations) => a.targets().coordinator.abortWhere((other) => operations.includes(other)),
        capture: (range) => {
            const captured = a.targets().captureRange({ purpose: 'replace-text', onIntersectingEdit: 'map' }, range);
            return captured.status === 'captured' ? captured.target : undefined;
        },
        release: (target) => a.targets().releaseTarget(target),
        run: (command, target) =>
            a
                .commands()
                .runOn(
                    command,
                    { payload: undefined },
                    () => (target === undefined ? state() : a.targets().baseOf({ target })),
                    'host',
                ).status === 'applied',
        fill: (command) => {
            const result = a.commands().runOn(command, { payload: undefined }, state, 'async');
            if (result.status === 'rejected') {
                return result.code;
            }
            return result.status === 'applied' ? undefined : 'not-applicable';
        },
        // A completed upload's record is session state, no undo step; it completed in the background.
        replaced: (nodeId, assetId) => {
            const value = { assetId, focus: false };
            a.commit()(
                withNodeState(state().tr, [{ nodeId, key: REPLACED_ASSET, value }]).setMeta('addToHistory', false),
            );
        },
        report: (found) => report(found),
        event: (event) => {
            if (!lifecycle.is('disposed')) {
                host.uploadEvent?.(event);
            }
        },
        changed: () => {
            if (!lifecycle.is('disposed')) {
                changed();
            }
        },
    });
    return {
        raw,
        accepts: acceptTypes,
        available: (place) => acceptTypes !== undefined && host.uploads?.() !== undefined && raw.admits(place),
        begin: (files, place) => raw.begin(files, place),
        retry: (nodeId) => raw.retry(nodeId),
        pick: (nodeId) => host.pick?.(nodeId),
        statusOf: (nodeId) => raw.statusOf(nodeId),
    };
};

const sessions = new WeakMap<EditorRuntime, MediaSession>();

/** Gives `runtime` its media session when the model installs `media.image`, else nothing. */
export const installMedia = (
    runtime: EditorRuntime,
    uploads: UploadService,
    placeAsset: MediaSession['placeAsset'],
): void => {
    if (uploads.accepts === undefined) {
        return;
    }
    sessions.set(runtime, {
        placeAsset,
        uploads: {
            accepts: uploads.accepts,
            available: uploads.available,
            begin: uploads.begin,
            retry: uploads.retry,
            pick: uploads.pick,
            statusOf: uploads.statusOf,
        },
    });
};

/** The media session of `runtime`, `undefined` when its model does not install `media.image`. */
export const mediaOf = (runtime: EditorRuntime): MediaSession | undefined => sessions.get(runtime);
