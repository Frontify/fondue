/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Busy } from './busy';
import { type Commit } from './commit';
import { type Composition } from './composition';
import { type Saving } from './saving';
import { type Shown } from './shown';
import { type TargetsService } from './targets';
import { type ViewService } from './view';

/**
 * Once input has settled, checks the provisional batches as one change from the published document and publishes
 * them, or restores the state from before the composition, then runs the
 * deferred `contenteditable` change, the queued intents and the held async results.
 */
// The targets are built after the commit, so they are read lazily.
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
