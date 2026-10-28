/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, type Transaction } from 'prosemirror-state';

import { type Diagnostic, type ResourceLimits, REPLACED_ASSET } from '#/model';
import { compiledModel } from '#/model/internal';
import { type CompiledDefinition, type EngineCommand } from '#/runtime/definition';

import { type AsyncOperation, type AsyncRequest } from '../../async/async';
import { type MediaSession } from '../../capabilities/media/session';
import {
    createUploads,
    DEFAULT_ACCEPT_TYPES,
    UPLOAD_FEATURE,
    type UploadEvent,
    type UploadPlace,
    type UploadServiceLike,
    type Uploads,
} from '../../capabilities/media/uploads';
import { type EditorRuntime } from '../../runtime';
import { withNodeState } from '../../statePlugins/nodeState';
import { type SelectionHandle, type UploadStatus } from '../../types';
import { type Commands } from '../editing/commands';
import { type Identity } from '../state/identity';
import { type Lifecycle } from '../state/lifecycle';
import { type PolicyService } from '../state/policy';

import { type TargetsService } from './targets';

export type SessionUploads = {
    /** The session's upload machine, which the slot plugin, the idle hook and the history read. */
    raw: Uploads;
    /** The media types `media.image` takes, `undefined` without it. */
    accepts: readonly string[] | undefined;
    /** Whether files upload now at `place`: `media.image` is installed, the host has `services.uploads` and the cache and policy allow it. */
    available(place: UploadPlace): boolean;
    /** Starts uploading `files` at `place`; resolves when they have all been handled. */
    begin(files: readonly File[], place: UploadPlace): Promise<void>;
    /** Starts the failed upload of `nodeId` again. */
    retry(nodeId: string): void;
    /** Asks the host to pick an asset for `nodeId`, or for a new node when it is `undefined`. */
    pick(nodeId: string | undefined): void;
    statusOf(nodeId: string): UploadStatus | undefined;
};

/** The services the upload machine calls back into, built before the store exists. */
type UploadArgs = {
    definition: CompiledDefinition;
    limits: ResourceLimits;
    identity: Pick<Identity, 'session'>;
    lifecycle: Pick<Lifecycle, 'is'>;
    policy: Pick<PolicyService, 'current'>;
    generate: () => string;
    host: {
        uploads?: () => UploadServiceLike | undefined;
        pick?: (nodeId: string | undefined) => void;
        uploadEvent?: (event: UploadEvent) => void;
    };
    state: () => EditorState;
    commit: () => (root: Transaction) => void;
    commands: () => Pick<Commands, 'runOn'>;
    targets: () => Pick<TargetsService, 'coordinator' | 'captureRange' | 'releaseTarget' | 'baseOf'>;
    report: (diagnostic: Diagnostic) => void;
    changed: () => void;
};

/** An upload machine's arguments plus the media types `media.image` accepts. */
type UploadContext = UploadArgs & { acceptTypes: readonly string[] | undefined };

// `media.image` and the media types it accepts, which its `acceptTypes` option sets.
const acceptTypesOf = (definition: CompiledDefinition): readonly string[] | undefined => {
    const imageFeature = compiledModel(definition.model).features.find(({ id }) => id === UPLOAD_FEATURE);
    if (imageFeature === undefined) {
        return undefined;
    }

    const option: unknown = imageFeature.options.acceptTypes;
    if (Array.isArray(option)) {
        return option.filter((type): type is string => typeof type === 'string');
    }

    return DEFAULT_ACCEPT_TYPES;
};

const hostedUploads = (context: UploadContext) => {
    if (context.acceptTypes === undefined) {
        return undefined;
    }

    return context.host.uploads?.();
};

const startUpload = (context: UploadContext, request: AsyncRequest) => context.targets().coordinator.start(request);

const abortUploads = (context: UploadContext, operations: readonly AsyncOperation[]) =>
    context.targets().coordinator.abortWhere((other) => operations.includes(other));

const captureUpload = (context: UploadContext, range: { from: number; to: number } | undefined) => {
    const captured = context.targets().captureRange({ purpose: 'replace-text', onIntersectingEdit: 'map' }, range);
    if (captured.status === 'captured') {
        return captured.target;
    }

    return undefined;
};

const runUpload = (context: UploadContext, command: EngineCommand, target: SelectionHandle | undefined) => {
    const baseOf = () => {
        if (target === undefined) {
            return context.state();
        }

        return context.targets().baseOf({ target });
    };

    const result = context.commands().runOn(command, { payload: undefined }, baseOf, 'host');

    return result.status === 'applied';
};

const fillUpload = (context: UploadContext, command: EngineCommand) => {
    const result = context.commands().runOn(command, { payload: undefined }, context.state, 'async');
    if (result.status === 'rejected') {
        return result.code;
    }

    if (result.status === 'applied') {
        return undefined;
    }

    return 'not-applicable';
};

// A completed upload's record is session state, no undo step; it completed in the background.
const replacedAsset = (context: UploadContext, nodeId: string, assetId: string) => {
    const value = { assetId, focus: false };
    context.commit()(
        withNodeState(context.state().tr, [{ nodeId, key: REPLACED_ASSET, value }]).setMeta('addToHistory', false),
    );
};

const emitUpload = (context: UploadContext, event: UploadEvent) => {
    if (!context.lifecycle.is('disposed')) {
        context.host.uploadEvent?.(event);
    }
};

const notifyUpload = (context: UploadContext) => {
    if (!context.lifecycle.is('disposed')) {
        context.changed();
    }
};

// The service is built before the store, whose first state holds its plugin, so what is built later is read lazily.
export const createUploadService = (args: UploadArgs): SessionUploads => {
    const acceptTypes = acceptTypesOf(args.definition);
    const context: UploadContext = { ...args, acceptTypes };
    const raw = createUploads({
        state: args.state,
        limits: args.limits,
        acceptTypes: acceptTypes ?? [],
        service: () => hostedUploads(context),
        session: args.identity.session,
        generateId: () => args.generate(),
        allows: (action) => args.policy.current().features[UPLOAD_FEATURE]?.[action] !== false,
        start: (request) => startUpload(context, request),
        abort: (operations) => abortUploads(context, operations),
        capture: (range) => captureUpload(context, range),
        release: (target) => args.targets().releaseTarget(target),
        run: (command, target) => runUpload(context, command, target),
        fill: (command) => fillUpload(context, command),
        replaced: (nodeId, assetId) => replacedAsset(context, nodeId, assetId),
        report: (found) => args.report(found),
        event: (event) => emitUpload(context, event),
        changed: () => notifyUpload(context),
    });

    return {
        raw,
        accepts: acceptTypes,
        available: (place) => acceptTypes !== undefined && args.host.uploads?.() !== undefined && raw.admits(place),
        begin: (files, place) => raw.begin(files, place),
        retry: (nodeId) => raw.retry(nodeId),
        pick: (nodeId) => args.host.pick?.(nodeId),
        statusOf: (nodeId) => raw.statusOf(nodeId),
    };
};

const sessions = new WeakMap<EditorRuntime, MediaSession>();

/** Gives `runtime` its media session when the model installs `media.image`, else nothing. */
export const installMedia = (
    runtime: EditorRuntime,
    uploads: SessionUploads,
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
