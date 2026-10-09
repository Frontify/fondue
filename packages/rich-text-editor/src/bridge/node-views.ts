/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as ProseMirrorNode } from 'prosemirror-model';
import { type EditorView, type NodeView, type NodeViewConstructor } from 'prosemirror-view';
import { type ComponentType } from 'react';

import { snapshot } from '#/model/values';
import { type EditorRuntime, liveResources } from '#/runtime/runtime';

import { type NodeViewContext, type NodeViewState } from './define';
import { type PortalStore } from './portals';

/** What the node views of one editor share: its portals, what chrome reads, and the session they act on. */
export interface NodeViewHost {
    readonly portals: PortalStore;
    readonly context: NodeViewContext;
    readonly runtime: () => EditorRuntime | undefined;
}

const tagOf = (node: ProseMirrorNode) => {
    if (node.isInline) {
        return 'span';
    }
    return 'div';
};

/**
 * The node views of one editor by node name. Each builds `dom`, its chrome slot and `contentDOM` with DOM calls and
 * renders `component` into the slot through `host`'s portals (SPEC-rich-text-react/AC-011, AC-012).
 */
export const createNodeViews = (
    views: ReadonlyMap<string, ComponentType<object>>,
    host: NodeViewHost,
): Record<string, NodeViewConstructor> => {
    let created = 0;

    // A throw never reaches ProseMirror: the surface stops editing, the portals close and the session faults (SPEC-rich-text-runtime/AC-014).
    const guarded = <T>(view: EditorView, fallback: () => T, work: () => T): T => {
        try {
            return work();
        } catch {
            view.dom.setAttribute('contenteditable', 'false');
            host.portals.close();
            host.runtime()?.faultView();
            return fallback();
        }
    };

    const stateOf = (node: ProseMirrorNode, selected: boolean): NodeViewState<object> => {
        let nodeId = '';
        if (typeof node.attrs.nodeId === 'string') {
            nodeId = node.attrs.nodeId;
        }
        const runtime = host.runtime();
        if (runtime === undefined) {
            throw new Error('A node view was built with no session.');
        }
        const actions = runtime.nodeActions(nodeId);
        return {
            nodeId,
            attrs: snapshot(node.attrs),
            selected,
            context: host.context,
            update: actions.update,
            remove: actions.remove,
            select: actions.select,
            execute: actions.execute as NodeViewState<object>['execute'],
            query: actions.query as NodeViewState<object>['query'],
        };
    };

    const build = (component: ComponentType<object>, node: ProseMirrorNode, view: EditorView): NodeView => {
        created += 1;
        const key = String(created);
        const document = view.dom.ownerDocument;
        const tag = tagOf(node);
        const dom = document.createElement(tag);
        const chrome = document.createElement(tag);
        chrome.setAttribute('contenteditable', 'false');
        chrome.setAttribute('data-rte-chrome', '');
        dom.append(chrome);
        // Leaf and atom views have no `contentDOM`, so their chrome shows the node.
        let contentDOM: HTMLElement | null = null;
        if (!node.isAtom) {
            contentDOM = document.createElement(tag);
            dom.append(contentDOM);
        }
        let current = node;
        let state = stateOf(node, false);
        const publish = (next: NodeViewState<object>) => {
            state = next;
            host.portals.set({ key, slot: chrome, component, state });
        };
        publish(state);
        liveResources.nodeViews += 1;
        // As ProseMirror's own `selectNode` does, which a custom one replaces (SPEC-rich-text-react/AC-070).
        const draggable = () => contentDOM !== null || current.type.spec.draggable !== true;
        return {
            dom,
            contentDOM,
            update: (next) =>
                guarded(
                    view,
                    () => true,
                    () => {
                        if (next.type !== current.type) {
                            return false;
                        }
                        const changed = next.attrs !== current.attrs;
                        current = next;
                        // Chrome reads attributes only, so typing inside the node rerenders nothing (SPEC-rich-text-react/AC-097).
                        if (changed) {
                            publish(stateOf(next, state.selected));
                        }
                        return true;
                    },
                ),
            selectNode: () => {
                dom.classList.add('ProseMirror-selectednode');
                if (draggable()) {
                    dom.draggable = true;
                }
                publish({ ...state, selected: true });
            },
            deselectNode: () => {
                dom.classList.remove('ProseMirror-selectednode');
                if (draggable()) {
                    dom.removeAttribute('draggable');
                }
                publish({ ...state, selected: false });
            },
            // Chrome mutations are React's; ProseMirror reads the rest, a removed `contentDOM` included (SPEC-rich-text-react/AC-015, AC-018).
            ignoreMutation: (mutation) => mutation.type !== 'selection' && chrome.contains(mutation.target),
            stopEvent: (event) => event.target instanceof Node && chrome.contains(event.target),
            destroy: () =>
                guarded(
                    view,
                    () => undefined,
                    () => {
                        liveResources.nodeViews -= 1;
                        host.portals.remove(key);
                    },
                ),
        };
    };

    const constructors: Record<string, NodeViewConstructor> = {};
    for (const [name, component] of views) {
        constructors[name] = (node, view) =>
            guarded(
                view,
                () => ({ dom: view.dom.ownerDocument.createElement(tagOf(node)) }),
                () => build(component, node, view),
            );
    }
    return constructors;
};

/** Writes the editor selection to the DOM again after a portal flush, while the surface has focus (SPEC-rich-text-react/AC-100). */
export const resyncSelection = (view: EditorView | undefined): void => {
    // A composition keeps its own DOM selection until it ends.
    if (view !== undefined && view.hasFocus() && !view.composing) {
        view.focus();
    }
};
