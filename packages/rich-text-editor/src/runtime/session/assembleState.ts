/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState, Plugin, PluginKey } from 'prosemirror-state';

import { stylesPlugin } from '#/runtime/styles';

import { createContentChecks } from '../capabilities/checks/contentIssues';
import { uploadSlotsPlugin } from '../capabilities/media/uploadSlots';
import { columnsPlugin } from '../columns';
import { groupsPlugin } from '../history';
import { createKeyGuard } from '../keys';
import { nodeStatePlugin } from '../nodeState';
import { type EditorRuntimeOptions } from '../runtime';
import { targetsPlugin } from '../targets';

import { type Core } from './assembleCore';
import { createComposition } from './composition';
import { createHistory } from './history';
import { type Late } from './late';
import { createShown } from './shown';
import { createStore } from './store';
import { createUploadService } from './uploadsWiring';

export type State = ReturnType<typeof assembleState>;

/** The document store, its first plugins and the services that read it. */
export const assembleState = (core: Core, options: EditorRuntimeOptions, late: Late) => {
    const { definition, limits } = options;
    const { generate, identity, lifecycle, busy, notify, emit, report, policy, mode, columns, saving, encoder } = core;
    const uploads = createUploadService({
        definition,
        limits,
        identity,
        lifecycle,
        policy,
        generate,
        host: options,
        state: () => store.state,
        commit: () => late.commit.commit,
        commands: () => late.commands,
        targets: () => late.targets,
        report: (found) => report(found),
        changed: () => busy.run(notify),
    });

    // Records typing before any other handler sees the event, so the view itself gets no event handler.
    const typingRecorder = new Plugin({
        key: new PluginKey('rte.typing'),
        view: (editorView) => {
            late.views.capture(editorView);
            return {};
        },
        props: {
            handleDOMEvents: {
                beforeinput: () => {
                    late.commit.markTyping();
                    return false;
                },
            },
        },
    });
    const settling = createComposition({
        composing: () => late.views.current()?.composing === true,
        onSettled: () => late.settleInput(),
    });
    const keyGuard = createKeyGuard(
        () => options.tabMovesFocus?.() === true,
        () => options.enterKeys,
        () => policy.current().enterBehavior,
    );
    const store = createStore(
        EditorState.create({
            doc: definition.schema.nodeFromJSON(options.tree),
            plugins: [
                typingRecorder,
                keyGuard,
                settling.plugin,
                targetsPlugin,
                groupsPlugin,
                columnsPlugin(() => display.columns()),
                stylesPlugin(() => options.styles?.() ?? []),
                uploadSlotsPlugin(uploads.raw),
                nodeStatePlugin(),
                ...definition.plugins,
            ],
        }),
    );
    busy.onIdle(
        () => core.metrics.flush(),
        () => late.targets.flushCaptures(),
        () => uploads.raw.flush(),
    );
    const history = createHistory({
        store,
        lifecycle,
        composition: settling,
        notify: () => busy.run(notify),
        install: (next) => late.commit.installState(next),
        publish: () => display.setPublished(store.state),
        uploads: (d, k) => uploads.raw.reset(d, k),
    });
    const display = createShown({
        store,
        mode: mode.mode(),
        columns: columns.current(),
        emit,
        saveStatus: saving.status,
        composing: () => settling.active(),
        stamp: identity.stamp,
        encodeByBlock: encoder.encodeByBlock,
    });
    // The checks read the stored document, so their issues and IDs are those `findContentIssues` gives a host.
    const checks = createContentChecks({
        state: () => store.state,
        sequence: identity.sequence,
        encode: () => encoder.encode(store.state.doc),
        composing: () => settling.active(),
        ready: () => !lifecycle.is('faulted', 'disposed'),
        commit: (transaction) => late.commit.commit(transaction),
        options: () => {
            const given = options.contentChecks?.();
            const shown = given ?? { locale: { translationStrings: {} } };
            return {
                ...shown,
                model: definition.model,
                creatableHeadingLevels: policy.current().creatableHeadingLevels,
            };
        },
    });
    return { ...core, uploads, settling, store, history, display, checks };
};
