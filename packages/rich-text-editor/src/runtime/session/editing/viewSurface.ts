/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, type Transaction } from 'prosemirror-state';
import {
    type DirectEditorProps,
    EditorView,
    type MarkViewConstructor,
    type NodeViewConstructor,
} from 'prosemirror-view';

import { type Diagnostic } from '#/model';

import { pluginError } from '../../reporting/events';
import { type SessionToken } from '../../types';
import { type Columns } from '../state/columns';
import { type Lifecycle } from '../state/lifecycle';
import { type Metrics } from '../state/metrics';
import { type ModeService } from '../state/mode';
import { type Shown } from '../state/shown';
import { type Store } from '../state/store';

/** The services the editor view reads. */
export type ViewArgs = {
    store: Pick<Store, 'state'>;
    lifecycle: Lifecycle;
    shown: Pick<Shown, 'mode' | 'sync'>;
    mode: Pick<ModeService, 'mode' | 'disabled'>;
    columns: Pick<Columns, 'current'>;
    metrics: Pick<Metrics, 'measure'>;
    emit: (event: 'ready', value: SessionToken) => void;
    /** Tells selector stores the session is ready, after the ready listeners. */
    notify: () => void;
    session: () => SessionToken;
    /** The live registries the `src/testing` probe counts. */
    resources: { views: Set<EditorView>; frames: number };
    suggestionListId: string;
    createdAt: number;
    composing: () => boolean;
    hasRecovery: () => boolean;
    dispatch: (transaction: Transaction) => void;
    fault: (error: unknown) => void;
    viewFault: (view: EditorView, candidate: EditorState, error: unknown) => void;
    report: (found: Diagnostic) => void;
    onAttached: (view: EditorView) => void;
    scrollSelectionIntoView: () => boolean | undefined;
};

/** The view arguments, the view being built, its registries and ready frame, and the call the bridge watches. */
type SurfaceContext = ViewArgs & {
    view: EditorView | undefined;
    built: EditorView | undefined;
    readyFrame: number | undefined;
    nodeViews: Readonly<Record<string, NodeViewConstructor>>;
    markViews: Readonly<Record<string, MarkViewConstructor>>;
    call: <Result>(work: () => Result) => { threw: boolean; value: Result | undefined };
    caught: (error: unknown) => boolean;
    thrown: () => unknown;
    attributes: (current: EditorState) => Record<string, string>;
};

const refreshSurface = (context: SurfaceContext) => {
    if (context.composing() || context.hasRecovery()) {
        return;
    }

    context.shown.sync(context.mode.mode(), context.columns.current());
    if (context.view !== undefined) {
        context.view.setProps({});
    }
};

const cancelReadyFrame = (context: SurfaceContext) => {
    if (context.readyFrame !== undefined) {
        cancelAnimationFrame(context.readyFrame);
        context.readyFrame = undefined;
        context.resources.frames -= 1;
    }
};

const detachSurface = (context: SurfaceContext) => {
    cancelReadyFrame(context);
    const attached = context.view;
    if (attached === undefined) {
        return;
    }

    context.resources.views.delete(attached);
    try {
        attached.destroy();
    } catch (error) {
        // A view that threw on an update runs it again while it is destroyed, and `dispose` throws nothing.
        if (!context.hasRecovery()) {
            if (context.lifecycle.is('disposed')) {
                context.report(pluginError(error, undefined));
            } else {
                throw error;
            }
        }
    } finally {
        context.view = undefined;
    }
};

const attachSurface = (context: SurfaceContext, element: HTMLElement, props?: Partial<DirectEditorProps>) => {
    if (context.lifecycle.is('disposed')) {
        return;
    }

    detachSurface(context);
    context.built = undefined;
    const viewProps: DirectEditorProps = {
        ...props,
        state: context.store.state,
        editable: () => context.lifecycle.is('ready') && context.shown.mode() === 'editable',
        attributes: (current) => context.attributes(current),
        nodeViews: context.nodeViews,
        markViews: context.markViews,
        // Returning true reports the scroll as handled, so the view leaves it out.
        handleScrollToSelection: () => context.scrollSelectionIntoView() === false,
        dispatchTransaction: context.dispatch,
    };
    const { threw, value: attached } = context.call(() => new EditorView({ mount: element }, viewProps));
    if (attached === undefined || threw) {
        // ProseMirror starts its DOM observer and input handlers before plugin views, so a plugin view that throws
        // leaves them on the element unless the half-built view is destroyed.
        const halfBuilt = attached ?? context.built;
        if (halfBuilt !== undefined) {
            try {
                halfBuilt.destroy();
            } catch {
                // Its node views may throw again while it is destroyed.
            }
        }

        // A view or node view constructor that throws keeps the decoded document as the snapshot.
        context.fault(context.thrown());

        return;
    }

    context.view = attached;
    context.resources.views.add(attached);
    context.onAttached(attached);
    if (!context.lifecycle.is('mounting')) {
        return;
    }

    // Frames run after microtasks, so the first portal flush of the initial document precedes `ready`.
    context.readyFrame = requestAnimationFrame(() => {
        context.readyFrame = undefined;
        context.resources.frames -= 1;
        context.lifecycle.to('ready');
        refreshSurface(context);
        context.emit('ready', context.session());
        context.notify();
        context.metrics.measure('mount', context.createdAt, null);
    });
    context.resources.frames += 1;
};

const faultSurface = (context: SurfaceContext, error: unknown) => {
    if (context.caught(error)) {
        return;
    }

    if (context.lifecycle.is('mounting', 'ready') && context.view !== undefined) {
        context.viewFault(context.view, context.store.state, error);
    }
};

/** The view, its registries and the frame that marks the session ready. */
export const createSurfaceHost = (
    args: ViewArgs,
    attributes: (current: EditorState) => Record<string, string>,
    call: <Result>(work: () => Result) => { threw: boolean; value: Result | undefined },
    caught: (error: unknown) => boolean,
    thrown: () => unknown,
) => {
    const context: SurfaceContext = {
        ...args,
        view: undefined,
        built: undefined,
        readyFrame: undefined,
        nodeViews: {},
        markViews: {},
        call,
        caught,
        thrown,
        attributes,
    };

    const surface: Pick<SurfaceContext, 'view' | 'built' | 'nodeViews' | 'markViews'> = context;

    return {
        surface,
        refresh: () => refreshSurface(context),
        cancelReady: () => cancelReadyFrame(context),
        detach: () => detachSurface(context),
        attach: (element: HTMLElement, props?: Partial<DirectEditorProps>) => attachSurface(context, element, props),
        faultView: (error: unknown) => faultSurface(context, error),
    };
};
