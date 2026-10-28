/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Listener } from '../../reporting/events';
import { type RuntimeHandle } from '../../runtime';
import { type Unsubscribe } from '../../types';
import { type Commands } from '../editing/commands';
import { type Focus } from '../editing/focus';
import { type Composition } from '../state/composition';
import { type Identity } from '../state/identity';
import { type Lifecycle } from '../state/lifecycle';
import { type ModeService } from '../state/mode';
import { type PolicyService } from '../state/policy';
import { type Shown, summarize } from '../state/shown';
import { type Store } from '../state/store';

import { type Faults } from './faults';
import { type Queue } from './queue';
import { type Replace } from './replace';
import { type Saving } from './saving';
import { type TargetsService } from './targets';

/** What the host calls: each member is the service that owns it, or one line over it. */
export const createHandle = (args: {
    identity: Pick<Identity, 'session' | 'commitSequence' | 'sequence'>;
    lifecycle: Pick<Lifecycle, 'phase'>;
    mode: Pick<ModeService, 'mode' | 'set'>;
    composition: Pick<Composition, 'active'>;
    store: Store;
    shown: Pick<Shown, 'snapshot'>;
    saving: Pick<Saving, 'status' | 'request'>;
    faults: Pick<Faults, 'candidate'>;
    commands: Pick<Commands, 'query' | 'execute'>;
    queue: Pick<Queue, 'enqueue'>;
    targets: Pick<TargetsService, 'captureRange' | 'releaseTarget'>;
    replace: Replace;
    policy: Pick<PolicyService, 'update'>;
    focus: Pick<Focus, 'focus'>;
    interactionRoots: Set<HTMLElement>;
    subscribe: (event: string, listener: Listener) => Unsubscribe;
    dispose: () => void;
}): RuntimeHandle => {
    const { identity, lifecycle, mode, composition, store, shown, saving, faults, commands, queue } = args;
    const { targets, replace, policy, focus, interactionRoots } = args;

    return {
        getSummary: () => {
            return {
                session: identity.session(),
                phase: lifecycle.phase(),
                mode: mode.mode(),
                commitSequence: identity.commitSequence(),
                sequence: identity.sequence(),
                compositionActive: composition.active(),
                selection: summarize(store.state.selection),
            };
        },
        getSnapshot: shown.snapshot,
        getSaveStatus: saving.status,
        getRecoveryCandidate: faults.candidate,
        query: commands.query,
        execute: commands.execute,
        enqueue: queue.enqueue,
        captureTarget: (options) => targets.captureRange(options, undefined),
        releaseTarget: targets.releaseTarget,
        requestCommit: saving.request,
        replaceDocument: replace.replaceDocument,
        setMode: mode.set,
        // Applies to the next query and commit; the schema, view and plugins stay.
        updatePolicy: (next) => {
            policy.update(next);
        },
        focus: focus.focus,
        registerInteractionRoot: (element) => {
            interactionRoots.add(element);

            return () => {
                interactionRoots.delete(element);
            };
        },
        subscribe: args.subscribe,
        dispose: args.dispose,
    };
};
