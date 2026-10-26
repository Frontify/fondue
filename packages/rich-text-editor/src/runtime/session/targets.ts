/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, type Transaction } from 'prosemirror-state';

import { type Diagnostic, isRecord } from '#/model';

import { type AsyncOperation, createAsyncCoordinator } from '../async';
import { captureTarget, releaseTargets, targetSelection } from '../targets';
import { type CaptureResult, type CaptureTargetOptions, type SelectionHandle } from '../types';

import { type Busy } from './busy';
import { type Composition } from './composition';
import { type Identity } from './identity';
import { type Lifecycle } from './lifecycle';
import { type PolicyService } from './policy';
import { type Store } from './store';
import { type RejectedCode } from './types';

// The target an async operation started with none gets at the selection.
const ASYNC_TARGET: CaptureTargetOptions = { purpose: 'insert', onIntersectingEdit: 'map' };

export type TargetsService = {
    readonly coordinator: ReturnType<typeof createAsyncCoordinator>;
    /** The state a command runs on: the current one, or with the selection at its target's mapped range. */
    baseOf(options: unknown): EditorState | RejectedCode;
    /** Captures the selection, or `range`, as a new target, unless a commit or notification runs. */
    captureRange(
        options: CaptureTargetOptions,
        range: { readonly from: number; readonly to: number } | undefined,
    ): CaptureResult;
    releaseTarget(target: SelectionHandle): void;
    /** Captures each target deferred during a commit, once none runs. */
    flushCaptures(): void;
    clearDeferred(): void;
    changeServices(members: readonly string[]): void;
};

export const createTargetsService = (a: {
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
}): TargetsService => {
    const { store, identity, lifecycle, busy, policy, composition, commit, generate, report, serviceChanged, apply } =
        a;
    // Targets the coordinator captures during a commit, such as from a running command, captured once it ends.
    const deferredCaptures: string[] = [];

    /** The ID of a target this session captured, or why it is not one. */
    const ownTarget = (target: unknown): { readonly id: string } | RejectedCode => {
        if (!isRecord(target) || typeof target.id !== 'string' || !isRecord(target.session)) {
            return 'target-invalid';
        }
        if (
            target.session.sessionId !== identity.session().sessionId ||
            target.session.generation !== identity.session().generation
        ) {
            return 'wrong-session';
        }
        return { id: target.id };
    };

    const baseOf = (options: unknown): EditorState | RejectedCode => {
        if (!isRecord(options) || options.target === undefined) {
            return store.state;
        }
        const target = ownTarget(options.target);
        if (typeof target === 'string') {
            return target;
        }
        const selection = targetSelection(store.state, target.id);
        if (selection === undefined) {
            return 'target-invalid';
        }
        return store.state.apply(store.state.tr.setSelection(selection));
    };

    /** Commits a capture of the selection, or of `range`, as target `id`. */
    const captureNow = (
        id: string,
        options: CaptureTargetOptions,
        range?: { readonly from: number; readonly to: number },
    ) => commit(captureTarget(store.state, id, options, range));

    /** The handle of target `id` in this session; the one place a `SelectionHandle` brand is minted. */
    const handleOf = (id: string) => Object.freeze({ id, session: identity.session() }) as unknown as SelectionHandle;

    const captureRange: TargetsService['captureRange'] = (options, range) => {
        // During a commit or notification the capture's root would wait or go stale, so it is refused, as `execute` is.
        if (!lifecycle.is('ready') || busy.isBusy()) {
            return { status: 'rejected', code: 'not-ready' };
        }
        const id = generate();
        captureNow(id, options, range);
        return { status: 'captured', target: handleOf(id) };
    };

    /**
     * Captures each deferred target once no commit runs, at the selection the commit left, which ProseMirror maps
     * through the commit's steps (`Transaction.selection`).
     */
    const flushCaptures = () => {
        for (let id = deferredCaptures.shift(); id !== undefined; id = deferredCaptures.shift()) {
            if (lifecycle.is('ready')) {
                captureNow(id, ASYNC_TARGET);
            }
        }
    };

    const releaseTarget = (target: SelectionHandle) => {
        const owned = ownTarget(target);
        if (lifecycle.is('disposed') || typeof owned === 'string') {
            return;
        }
        const waiting = deferredCaptures.indexOf(owned.id);
        if (waiting >= 0) {
            deferredCaptures.splice(waiting, 1);
        }
        const release = releaseTargets(store.state, [owned.id]);
        if (release !== undefined) {
            commit(release);
        }
    };

    const coordinator = createAsyncCoordinator({
        generateId: generate,
        session: identity.session,
        policyRevision: policy.revision,
        isDisposed: lifecycle.isDisposed,
        isFaulted: () => lifecycle.is('faulted'),
        // A result waits out a replacement, which applies it if it fails and discards it in the next generation.
        holding: () => composition.active() || lifecycle.is('transitioning'),
        capture: () => {
            if (!lifecycle.is('ready')) {
                return undefined;
            }
            const id = generate();
            if (busy.isBusy()) {
                deferredCaptures.push(id);
            } else {
                captureNow(id, ASYNC_TARGET);
            }
            return handleOf(id);
        },
        release: (target) => releaseTarget(target),
        apply,
        report,
    });

    return {
        coordinator,
        baseOf,
        captureRange,
        releaseTarget,
        flushCaptures,
        clearDeferred: () => {
            deferredCaptures.length = 0;
        },
        changeServices: (members) => {
            coordinator.abortWhere((operation) => members.includes(operation.service));
            if (members.includes('persistence')) {
                serviceChanged();
            }
        },
    };
};
