/* (c) Copyright Frontify Ltd., all rights reserved. */

import { diagnostic } from '#/model/internal';

import { suggestionHosts } from '../../capabilities/suggestions/host';
import { secondCopyAtMount } from '../../guards/engines';
import { type EditorRuntimeOptions } from '../../runtime';
import { createCommit } from '../editing/commit';
import { createPrepare, DUPLICATE_ENGINE } from '../editing/prepare';
import { createView } from '../editing/view';
import { createFaults } from '../lifecycle/faults';
import { createSettle } from '../lifecycle/settle';

import { type State } from './assembleState';
import { type Late } from './late';
import { liveResources, viewRuntimes } from './registry';

export type Editing = ReturnType<typeof assembleEditing>;

/** The view, the faults and the commit path. */
export const assembleEditing = (state: State, options: EditorRuntimeOptions, late: Late) => {
    const { limits } = options;
    const { generate, identity, lifecycle, busy, notify, notifyWatchers, emit, report, metrics, policy } = state;
    const { mode, columns, saving, encoder, store, settling, display, history, uploads, checks } = state;
    const views = createView({
        store,
        lifecycle,
        shown: display,
        mode,
        columns,
        metrics,
        emit,
        notify: notifyWatchers,
        session: identity.session,
        resources: liveResources,
        suggestionListId: state.suggestionListId,
        createdAt: state.createdAt,
        composing: () => settling.active(),
        hasRecovery: () => faults.hasRecovery(),
        dispatch: (transaction) => commit.commit(transaction),
        fault: () => faults.fault(diagnostic('runtime.view-fault', undefined, undefined, 'error')),
        viewFault: (attached, candidate) => faults.viewFault(attached, candidate),
        onAttached: (attached) => {
            viewRuntimes.set(attached, late.runtime);
            suggestionHosts.set(attached, {
                creates: (featureId) => policy.current().features[featureId]?.create !== false,
                accept: late.actions.acceptSuggestion,
                commandHost: options.commandHost,
                search: late.actions.searchSuggestions,
            });
            if (secondCopyAtMount(store.state)) {
                report(DUPLICATE_ENGINE);
            }
        },
        scrollSelectionIntoView: () => options.scrollSelectionIntoView?.(),
    });
    const faults = createFaults({
        lifecycle,
        identity,
        encode: encoder.encode,
        saving,
        composition: settling,
        shown: display,
        view: views,
        queue: () => late.queue,
        targets: () => late.targets,
        report,
        notify: notifyWatchers,
        recovery: () => options.recovery?.(),
    });
    const batches = createPrepare({
        store,
        composition: settling,
        shown: display,
        policy,
        history,
        limits,
        generate,
        inputRules: () => options.inputRules?.(),
    });
    const commit = createCommit({
        store,
        identity,
        lifecycle,
        policy,
        shown: display,
        views,
        busy,
        metrics,
        prepare: batches,
        encode: encoder.encode,
        emit,
        notify,
        report,
        resources: liveResources,
        hooks: {
            committed: uploads.raw.committed,
            changed: () => {
                saving.changed();
                checks.changed();
            },
        },
        fault: faults.fault,
        viewFault: faults.viewFault,
    });
    const settleInput = createSettle({
        busy,
        commit,
        shown: display,
        view: views,
        targets: () => late.targets,
        saving,
        composition: settling,
    });

    return { ...state, views, faults, batches, commit, settleInput };
};
