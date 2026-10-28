/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, type Transaction } from 'prosemirror-state';

import { type Diagnostic, isRecord } from '#/model';

import { type AsyncOperation, createAsyncCoordinator } from '../../async/async';
import { captureTarget, releaseTargets, targetSelection } from '../../statePlugins/targets';
import { type CaptureResult, type CaptureTargetOptions, type SelectionHandle } from '../../types';
import { type Busy } from '../state/busy';
import { type Composition } from '../state/composition';
import { type Identity } from '../state/identity';
import { type Lifecycle } from '../state/lifecycle';
import { type PolicyService } from '../state/policy';
import { type Store } from '../state/store';
import { type RejectedCode } from '../state/types';

import { createDeferredTargets } from './deferredTargets';

// The target an async operation started with none gets at the selection.
const ASYNC_TARGET: CaptureTargetOptions = { purpose: 'insert', onIntersectingEdit: 'map' };

export type TargetsService = {
    coordinator: ReturnType<typeof createAsyncCoordinator>;
    /** The state a command runs on: the current one, or with the selection at its target's mapped range. */
    baseOf(options: unknown): EditorState | RejectedCode;
    /** Captures the selection, or `range`, as a new target, unless a commit or notification runs. */
    captureRange(options: CaptureTargetOptions, range: { from: number; to: number } | undefined): CaptureResult;
    /** Releases a target this session captured; ignores a foreign one and does nothing once disposed. */
    releaseTarget(target: SelectionHandle): void;
    /** Captures each target deferred during a commit, once none runs. */
    flushCaptures(): void;
    /** Drops the captures that wait for a commit to end. */
    clearDeferred(): void;
    /** Aborts the async operations of the changed services, and tells the save coordinator when persistence is one. */
    changeServices(members: readonly string[]): void;
};

/** The services a target capture reads. */
type TargetArgs = {
    store: Store;
    identity: Identity;
    lifecycle: Lifecycle;
    busy: Pick<Busy, 'isBusy'>;
    policy: Pick<PolicyService, 'revision'>;
    composition: Pick<Composition, 'active'>;
    commit: (root: Transaction) => unknown;
    generate: () => string;
    report: (diagnostic: Diagnostic) => void;
    serviceChanged: () => void;
    apply: (operation: AsyncOperation, result: unknown) => RejectedCode | undefined;
};

/** The target arguments plus the captures a commit has not flushed. */
type TargetContext = TargetArgs & { deferred: ReturnType<typeof createDeferredTargets> };

/** The ID of a target this session captured, or why it is not one. */
const ownTarget = (context: TargetContext, target: unknown): { id: string } | RejectedCode => {
    if (!isRecord(target) || typeof target.id !== 'string' || !isRecord(target.session)) {
        return 'target-invalid';
    }

    if (
        target.session.sessionId !== context.identity.session().sessionId ||
        target.session.generation !== context.identity.session().generation
    ) {
        return 'wrong-session';
    }

    return { id: target.id };
};

const baseFor = (context: TargetContext, options: unknown): EditorState | RejectedCode => {
    if (!isRecord(options) || options.target === undefined) {
        return context.store.state;
    }

    const target = ownTarget(context, options.target);
    if (typeof target === 'string') {
        return target;
    }

    const selection = targetSelection(context.store.state, target.id);
    if (selection === undefined) {
        return 'target-invalid';
    }

    return context.store.state.apply(context.store.state.tr.setSelection(selection));
};

/** Commits a capture of the selection, or of `range`, as target `id`. */
const captureNow = (
    context: TargetContext,
    id: string,
    options: CaptureTargetOptions,
    range?: { from: number; to: number },
) => context.commit(captureTarget(context.store.state, id, options, range));

/** The handle of target `id` in this session; the one place a `SelectionHandle` brand is minted. */
const handleOf = (context: TargetContext, id: string) =>
    Object.freeze({ id, session: context.identity.session() }) as unknown as SelectionHandle;

const captureRange = (
    context: TargetContext,
    options: CaptureTargetOptions,
    range: { from: number; to: number } | undefined,
): CaptureResult => {
    // During a commit or notification the capture's root would wait or go stale, so it is refused, as `execute` is.
    if (!context.lifecycle.is('ready') || context.busy.isBusy()) {
        return { status: 'rejected', code: 'not-ready' };
    }

    const id = context.generate();
    captureNow(context, id, options, range);

    return { status: 'captured', target: handleOf(context, id) };
};

/**
 * Captures each deferred target once no commit runs, at the selection the commit left, which ProseMirror maps
 * through the commit's steps (`Transaction.selection`).
 */
const flushDeferred = (context: TargetContext) => {
    for (let id = context.deferred.shift(); id !== undefined; id = context.deferred.shift()) {
        if (context.lifecycle.is('ready')) {
            captureNow(context, id, ASYNC_TARGET);
        }
    }
};

const releaseOwned = (context: TargetContext, target: SelectionHandle) => {
    const owned = ownTarget(context, target);
    if (context.lifecycle.is('disposed') || typeof owned === 'string') {
        return;
    }

    context.deferred.drop(owned.id);
    const release = releaseTargets(context.store.state, [owned.id]);
    if (release !== undefined) {
        context.commit(release);
    }
};

const captureForAsync = (context: TargetContext) => {
    if (!context.lifecycle.is('ready')) {
        return undefined;
    }

    const id = context.generate();
    if (context.busy.isBusy()) {
        context.deferred.push(id);
    } else {
        captureNow(context, id, ASYNC_TARGET);
    }

    return handleOf(context, id);
};

export const createTargetsService = (args: TargetArgs): TargetsService => {
    const context: TargetContext = { ...args, deferred: createDeferredTargets() };
    const releaseTarget = (target: SelectionHandle) => releaseOwned(context, target);
    const coordinator = createAsyncCoordinator({
        generateId: args.generate,
        session: args.identity.session,
        policyRevision: args.policy.revision,
        isDisposed: args.lifecycle.isDisposed,
        isFaulted: () => args.lifecycle.is('faulted'),
        // A result waits out a replacement, which applies it if it fails and discards it in the next generation.
        holding: () => args.composition.active() || args.lifecycle.is('transitioning'),
        capture: () => captureForAsync(context),
        release: (target) => releaseTarget(target),
        apply: args.apply,
        report: args.report,
    });

    return {
        coordinator,
        baseOf: (options) => baseFor(context, options),
        captureRange: (options, range) => captureRange(context, options, range),
        releaseTarget,
        flushCaptures: () => flushDeferred(context),
        clearDeferred: () => {
            context.deferred.clear();
        },
        changeServices: (members) => {
            coordinator.abortWhere((operation) => members.includes(operation.service));
            if (members.includes('persistence')) {
                args.serviceChanged();
            }
        },
    };
};
