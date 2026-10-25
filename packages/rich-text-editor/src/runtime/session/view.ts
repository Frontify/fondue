/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, type Transaction } from 'prosemirror-state';
import {
    type DirectEditorProps,
    EditorView,
    type MarkViewConstructor,
    type NodeViewConstructor,
} from 'prosemirror-view';

import { suggestionOptionId } from '../capabilities/suggestions/optionId';
import { activeSuggestion } from '../capabilities/suggestions/plugin';
import { type SessionToken } from '../types';

import { type Columns } from './columns';
import { type Lifecycle } from './lifecycle';
import { type Metrics } from './metrics';
import { type ModeService } from './mode';
import { type Shown } from './shown';
import { type Store } from './store';

/** One empty paragraph is an empty document, which shows the placeholder. */
export const isEmpty = ({ doc }: EditorState) =>
    doc.childCount === 1 && doc.firstChild !== null && doc.firstChild.isTextblock && doc.firstChild.content.size === 0;

export interface ViewService {
    current(): EditorView | undefined;
    readonly nodeViews: Readonly<Record<string, NodeViewConstructor>>;
    setNodeViews(next: Readonly<Record<string, NodeViewConstructor>>): void;
    setMarkViews(next: Readonly<Record<string, MarkViewConstructor>>): void;
    /** The plugin view hook: the view the constructor is building, before it returns. */
    capture(built: EditorView): void;
    /** Runs a view call; `threw` when it threw or a node view inside it threw, which the bridge reports through `faultView`. */
    call<T>(work: () => T): { readonly threw: boolean; readonly value: T | undefined };
    /** Recomputes `editable`, the surface attributes and the break decorations once input has settled. */
    refresh(): void;
    repaint(): void;
    attach(element: HTMLElement, props?: Partial<DirectEditorProps>): void;
    detach(): void;
    cancelReady(): void;
    faultView(): void;
}

/** Tracks the view call in progress, so a node view throw the bridge caught faults that call. */
const createCalls = () => {
    let viewCall = false;
    let viewThrew = false;
    const call = <T>(work: () => T): { readonly threw: boolean; readonly value: T | undefined } => {
        let value: T | undefined;
        viewCall = true;
        try {
            value = work();
        } catch {
            viewThrew = true;
        } finally {
            viewCall = false;
        }
        const threw = viewThrew;
        viewThrew = false;
        return { threw, value };
    };
    /** `true` when a call is running, which then reports the throw itself. */
    const caught = () => {
        if (viewCall) {
            viewThrew = true;
        }
        return viewCall;
    };
    return { call, caught };
};

const surfaceAttributes = (
    a: {
        shown: Pick<Shown, 'mode'>;
        mode: Pick<ModeService, 'disabled'>;
        lifecycle: Lifecycle;
        suggestionListId: string;
    },
    current: EditorState,
) => {
    const result: Record<string, string> = {};
    if (a.shown.mode() === 'readonly') {
        // A surface that is not contenteditable takes no focus by itself,
        // unless it is disabled, which leaves the Tab order.
        if (!a.mode.disabled()) {
            result.tabindex = '0';
        }
        result['aria-readonly'] = 'true';
    }
    if (isEmpty(current)) {
        result['data-rte-empty'] = '';
    }
    // Selection and copy keep working on a surface that takes no edits.
    if (a.lifecycle.is('transitioning')) {
        result['aria-busy'] = 'true';
    }
    // The surface keeps focus while a suggestion list shows options, and names the active one.
    const suggestion = activeSuggestion(current);
    if (suggestion !== null) {
        const option = suggestion.items[suggestion.index];
        if (option !== undefined) {
            result['aria-autocomplete'] = 'list';
            result['aria-controls'] = a.suggestionListId;
            result['aria-activedescendant'] = suggestionOptionId(a.suggestionListId, option.key);
        }
    }
    return result;
};

interface ViewArgs {
    store: Pick<Store, 'state'>;
    lifecycle: Lifecycle;
    shown: Pick<Shown, 'mode' | 'sync'>;
    mode: Pick<ModeService, 'mode' | 'disabled'>;
    columns: Pick<Columns, 'current'>;
    metrics: Pick<Metrics, 'measure'>;
    emit: (event: 'ready', value: SessionToken) => void;
    session: () => SessionToken;
    /** The live registries the `src/testing` probe counts. */
    resources: { readonly views: Set<EditorView>; frames: number };
    suggestionListId: string;
    createdAt: number;
    composing: () => boolean;
    hasRecovery: () => boolean;
    dispatch: (transaction: Transaction) => void;
    fault: () => void;
    viewFault: (view: EditorView, candidate: EditorState) => void;
    onAttached: (view: EditorView) => void;
    scrollSelectionIntoView: () => boolean | undefined;
}

export const createView = (a: ViewArgs): ViewService => {
    let view: EditorView | undefined;
    // The view the last `EditorView` constructor built, which plugin views receive before the constructor returns.
    let built: EditorView | undefined;
    let readyFrame: number | undefined;
    // Node views come from the bridge once the runtime exists, since they act on it.
    const registered: {
        nodeViews: Readonly<Record<string, NodeViewConstructor>>;
        markViews: Readonly<Record<string, MarkViewConstructor>>;
    } = { nodeViews: {}, markViews: {} };

    const { call, caught } = createCalls();

    const refresh = () => {
        if (a.composing() || a.hasRecovery()) {
            return;
        }
        a.shown.sync(a.mode.mode(), a.columns.current());
        if (view !== undefined) {
            view.setProps({});
        }
    };

    const cancelReady = () => {
        if (readyFrame !== undefined) {
            cancelAnimationFrame(readyFrame);
            readyFrame = undefined;
            a.resources.frames -= 1;
        }
    };

    const detach = () => {
        cancelReady();
        if (view !== undefined) {
            a.resources.views.delete(view);
            try {
                view.destroy();
            } catch (error) {
                // A view that threw on an update runs it again while it is destroyed, and `dispose` throws nothing.
                if (!a.hasRecovery()) {
                    throw error;
                }
            }
            view = undefined;
        }
    };

    const attach = (element: HTMLElement, props?: Partial<DirectEditorProps>) => {
        if (a.lifecycle.is('disposed')) {
            return;
        }
        detach();
        built = undefined;
        const { threw, value: attached } = call(
            () =>
                new EditorView(
                    { mount: element },
                    {
                        ...props,
                        state: a.store.state,
                        editable: () => a.lifecycle.is('ready') && a.shown.mode() === 'editable',
                        attributes: (current) => surfaceAttributes(a, current),
                        nodeViews: registered.nodeViews,
                        markViews: registered.markViews,
                        // Returning true reports the scroll as handled, so the view leaves it out.
                        handleScrollToSelection: () => a.scrollSelectionIntoView() === false,
                        dispatchTransaction: a.dispatch,
                    },
                ),
        );
        if (attached === undefined || threw) {
            // ProseMirror starts its DOM observer and input handlers before plugin views, so a plugin view that throws
            // leaves them on the element unless the half-built view is destroyed.
            const halfBuilt = attached ?? (built as EditorView | undefined);
            if (halfBuilt !== undefined) {
                try {
                    halfBuilt.destroy();
                } catch {
                    // Its node views may throw again while it is destroyed.
                }
            }
            // A view or node view constructor that throws keeps the decoded document as the snapshot.
            a.fault();
            return;
        }
        view = attached;
        a.resources.views.add(attached);
        a.onAttached(attached);
        if (!a.lifecycle.is('mounting')) {
            return;
        }
        // Frames run after microtasks, so the first portal flush of the initial document precedes `ready`.
        readyFrame = requestAnimationFrame(() => {
            readyFrame = undefined;
            a.resources.frames -= 1;
            a.lifecycle.to('ready');
            refresh();
            a.emit('ready', a.session());
            a.metrics.measure('mount', a.createdAt, null);
        });
        a.resources.frames += 1;
    };

    return {
        current: () => view,
        get nodeViews() {
            return registered.nodeViews;
        },
        setNodeViews: (next) => {
            registered.nodeViews = next;
        },
        setMarkViews: (next) => {
            registered.markViews = next;
        },
        capture: (next) => {
            built = next;
        },
        call,
        refresh,
        repaint: () => view?.setProps({}),
        attach,
        detach,
        cancelReady,
        faultView: () => {
            if (caught()) {
                return;
            }
            if (a.lifecycle.is('mounting', 'ready') && view !== undefined) {
                a.viewFault(view, a.store.state);
            }
        },
    };
};
