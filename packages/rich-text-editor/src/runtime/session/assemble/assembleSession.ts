/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorRuntime, type EditorRuntimeOptions } from '../../runtime';
import { createDispose } from '../lifecycle/dispose';
import { createFacade } from '../lifecycle/facade';
import { createHandle } from '../lifecycle/handle';
import { createReplace } from '../lifecycle/replace';
import { installMedia } from '../lifecycle/uploadsWiring';

import { type Operations } from './assembleOperations';
import { liveResources } from './registry';

/** Replace, dispose, the host's handle and the testing facade over every earlier phase. */
export const assembleSession = (parts: Operations, options: EditorRuntimeOptions) => {
    const { definition, limits } = options;
    const { identity, lifecycle, busy, emit, notify, clear, subscribe, watch, report, metrics, policy, mode } = parts;
    const { columns, saving, encoder, uploads, store, settling, display, history, checks, views, faults } = parts;
    const { batches, commit, targets, focus, commands, queue, actions } = parts;
    const interactionRoots = new Set<HTMLElement>();
    const dispose = createDispose({
        lifecycle,
        saving,
        composition: settling,
        checks,
        targets,
        uploads: uploads.raw,
        queue,
        commit,
        store,
        view: views,
        events: { emit, clear },
        identity,
        resources: liveResources,
        handle: () => handle,
    });
    const replace = createReplace({
        definition,
        limits,
        lifecycle,
        identity,
        store,
        encoder,
        policy,
        saving,
        composition: settling,
        shown: display,
        view: views,
        commit,
        focus,
        targets,
        queue,
        uploads: uploads.raw,
        faults,
        busy,
        events: { notify, emit },
        metrics,
        history,
    });
    const handle = createHandle({
        identity,
        lifecycle,
        mode,
        composition: settling,
        store,
        shown: display,
        saving,
        faults,
        commands,
        queue,
        targets,
        replace,
        policy,
        focus,
        interactionRoots,
        subscribe,
        dispose,
    });
    const runtime: EditorRuntime = createFacade({
        handle,
        definition,
        limits,
        suggestionListId: parts.suggestionListId,
        interactionRoots,
        identity,
        store,
        policy,
        view: views,
        commit,
        prepare: batches,
        report,
        watch,
        targets,
        commands,
        mode,
        columns,
        actions,
        shown: display,
        history,
        composition: settling,
        metrics,
        checks,
    });
    installMedia(runtime, uploads, actions.placeAsset);

    return { handle, runtime };
};
