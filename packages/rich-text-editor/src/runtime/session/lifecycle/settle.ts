/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Commit } from '../editing/commit';
import { type ViewService } from '../editing/view';
import { type Busy } from '../state/busy';
import { type Composition } from '../state/composition';
import { type Shown } from '../state/shown';

import { type Saving } from './saving';
import { type TargetsService } from './targets';

// The targets are built after the commit, so they are read lazily.
/**
 * Once input has settled, checks the provisional batches as one change from the published document and publishes
 * them, or restores the state from before the composition, then runs the deferred `contenteditable` change, the
 * queued intents and the held async results.
 */
export const createSettle = (a: {
    busy: Pick<Busy, 'run'>;
    commit: Pick<Commit, 'guarded' | 'settleProvisional'>;
    shown: Pick<Shown, 'takeProvisional'>;
    view: Pick<ViewService, 'refresh'>;
    targets: () => Pick<TargetsService, 'coordinator'>;
    saving: Pick<Saving, 'settled'>;
    composition: Pick<Composition, 'resolve'>;
}): (() => void) => {
    const { busy, commit, shown, view, targets, saving, composition } = a;

    return () => {
        const mapping = shown.takeProvisional();
        busy.run(() => {
            // Roots that plugin views dispatch while the settled state installs commit after its check.
            if (mapping !== undefined && !commit.guarded(() => commit.settleProvisional(mapping))) {
                return;
            }

            view.refresh();
        });
        targets().coordinator.settle();
        saving.settled();
        composition.resolve('settled');
    };
};
