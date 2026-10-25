/* (c) Copyright Frontify Ltd., all rights reserved. */

import { diagnostic } from '#/model/internal';

import { suggestionHosts } from '../capabilities/suggestions/host';
import { secondCopyAtMount } from '../engines';
import { type EditorRuntimeOptions } from '../runtime';

import { type State } from './assemble-state';
import { createCommit } from './commit';
import { createFaults } from './faults';
import { type Late } from './late';
import { createPrepare, DUPLICATE_ENGINE } from './prepare';
import { liveResources, viewRuntimes } from './registry';
import { createSettle } from './settle';
import { createView } from './view';

export type Editing = ReturnType<typeof assembleEditing>;

/** The view, the faults and the commit path. */
export const assembleEditing = (state: State, options: EditorRuntimeOptions, late: Late) => {
    const { limits } = options;
    const { generate, identity, lifecycle, busy, notify, emit, report, metrics, policy, mode, columns, saving } = state;
    const { encoder, store, settling, display, history, uploads, checks } = state;
    const views = createView({
        store,
        lifecycle,
        shown: display,
        mode,
        columns,
        metrics,
        emit,
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
