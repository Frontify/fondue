/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorRuntimeOptions } from '../../runtime';
import { type SelectionHandle } from '../../types';
import { createActions } from '../editing/actions';
import { createCommands } from '../editing/commands';
import { createFocus } from '../editing/focus';
import { createQueue } from '../lifecycle/queue';
import { createTargetsService } from '../lifecycle/targets';

import { type Editing } from './assembleEditing';
import { type LateSlot, ready } from './late';
import { liveResources } from './registry';

export type Operations = ReturnType<typeof assembleOperations>;

/** The targets, commands, queue and node actions that run on the commit path. */
export const assembleOperations = (editing: Editing, options: EditorRuntimeOptions, slot: LateSlot) => {
    const { definition, limits } = options;
    const { generate, identity, lifecycle, busy, report, policy, mode, saving, store, settling, display } = editing;
    const { views, faults, batches, commit, notifications } = editing;
    const targets = createTargetsService({
        store,
        identity,
        lifecycle,
        busy,
        policy,
        composition: settling,
        commit: commit.commit,
        generate,
        report,
        serviceChanged: saving.serviceChanged,
        // A result runs as its command's payload through `commit` from the current state.
        apply: (operation, result) => {
            let target: { target: SelectionHandle } | undefined;
            if (operation.target !== null) {
                target = { target: operation.target };
            }

            const outcome = commands.run(operation.command, result, target, 'async');
            if (outcome.status === 'rejected') {
                return outcome.code;
            }

            return undefined;
        },
    });
    const focus = createFocus({ lifecycle, view: views, store, commit, shown: display, mode });
    const commands = createCommands({
        definition,
        store,
        identity,
        lifecycle,
        mode,
        policy,
        busy,
        composition: settling,
        commit: {
            prepare: (root, ids, fromView) => batches.prepare(root, ids, fromView),
            install: (prepared) => commit.install(prepared),
            installedId: () => batches.installedId(),
            queriedIds: () => batches.queriedIds(),
        },
        baseOf: targets.baseOf,
        focus: focus.focus,
        report,
        fault: (found) => faults.fault(found),
        inRender: () => options.inRender?.(),
        commandHost: options.commandHost,
        runtime: () => ready(slot).runtime,
        notifications,
    });
    const queue = createQueue({
        lifecycle,
        busy,
        composition: settling,
        run: commands.run,
        report,
        resources: liveResources,
    });
    busy.afterEach(queue.drain);
    const actions = createActions({ definition, limits, store, commit, commands, targets });

    return { ...editing, targets, focus, commands, queue, actions };
};
