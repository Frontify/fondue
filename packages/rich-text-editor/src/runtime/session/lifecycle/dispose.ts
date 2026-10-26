/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentChecks } from '../../capabilities/checks/contentIssues';
import { type Uploads } from '../../capabilities/media/uploads';
import { countTargets, releaseTargets } from '../../statePlugins/targets';
import { type SessionToken } from '../../types';
import { type Commit } from '../editing/commit';
import { type ViewService } from '../editing/view';
import { type Composition } from '../state/composition';
import { type Identity } from '../state/identity';
import { type Lifecycle } from '../state/lifecycle';
import { type Store } from '../state/store';

import { type Queue } from './queue';
import { type Saving } from './saving';
import { type TargetsService } from './targets';

// The handle is built after this service, so it is read lazily.
export const createDispose = (a: {
    lifecycle: Pick<Lifecycle, 'is' | 'to' | 'isDisposed'>;
    saving: Pick<Saving, 'dispose'>;
    composition: Pick<Composition, 'cancel' | 'resolve'>;
    checks: Pick<ContentChecks, 'dispose'>;
    targets: Pick<TargetsService, 'coordinator' | 'clearDeferred'>;
    uploads: Pick<Uploads, 'dispose'>;
    queue: Pick<Queue, 'settle'>;
    commit: Pick<Commit, 'clearDeferred'>;
    store: Store;
    view: Pick<ViewService, 'detach'>;
    events: { emit: (event: 'disposed', value: SessionToken) => void; clear: () => void };
    identity: Pick<Identity, 'session'>;
    resources: { targets: number; installedFeatures: Map<object, unknown> };
    handle: () => object;
}): (() => void) => {
    const { lifecycle, saving, composition, checks, targets, uploads, queue, commit, store, view, events } = a;
    const { identity, resources, handle } = a;

    return () => {
        if (lifecycle.is('disposed')) {
            return;
        }

        saving.dispose();
        // A listener of what the coordinator reported may have disposed the session already.
        if (lifecycle.isDisposed()) {
            return;
        }

        // Set first, so `disposed` listeners read the final phase and what they enqueue settles at once.
        lifecycle.to('disposed');
        composition.cancel();
        checks.dispose();
        composition.resolve('disposed');
        targets.coordinator.dispose();
        uploads.dispose(store.state.doc);
        queue.settle('not-ready');
        commit.clearDeferred();
        targets.clearDeferred();
        const release = releaseTargets(store.state);
        if (release !== undefined) {
            resources.targets -= countTargets(store.state);
            store.set(store.state.apply(release));
        }

        events.emit('disposed', identity.session());
        events.clear();
        view.detach();
        resources.installedFeatures.delete(handle());
    };
};
