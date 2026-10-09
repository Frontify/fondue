/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as ProseMirrorNode } from 'prosemirror-model';
import { type EditorView, type NodeView, type NodeViewConstructor } from 'prosemirror-view';
import { type ComponentType } from 'react';

import { snapshot } from '#/model/values';
import { type EditorRuntime, liveResources } from '#/runtime/runtime';

import { ISLAND_VIEWS } from './island';
import { type PortalEntry, type PortalStore } from './portals';

/** What the node views of one editor share: its portals and the session they act on. */
export interface NodeViewHost {
    readonly portals: PortalStore;
    readonly runtime: EditorRuntime;
}

const CONTROLS = 'input, textarea, select, button';
// Drop-target events over chrome stay stopped, so ProseMirror never accepts a drop it would then not receive.
const DRAG_SOURCE_EVENTS: ReadonlySet<string> = new Set(['dragstart', 'drag', 'dragend']);

/** Whether `target` sits in an interactive control of the chrome, which keeps its own events. */
const inControl = (chrome: HTMLElement, target: Node) => {
    let element: Element | null = target.parentElement;
    if (target instanceof Element) {
        element = target;
    }
    const control = element?.closest(CONTROLS);
    return control !== null && control !== undefined && chrome.contains(control);
};

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

    // A throw never reaches ProseMirror: the portals close and the session faults, which stops editing (SPEC-rich-text-runtime/AC-014).
    const faultOnThrow = <T>(fallback: () => T, work: () => T): T => {
        try {
            return work();
        } catch {
            host.portals.close();
            host.runtime.faultView();
            return fallback();
        }
    };

    const stateOf = (node: ProseMirrorNode, selected: boolean): PortalEntry['state'] => {
        let nodeId = '';
        if (typeof node.attrs.nodeId === 'string') {
            nodeId = node.attrs.nodeId;
        }
        return {
            ...host.runtime.nodeActions(nodeId),
            nodeId,
            attrs: snapshot(node.attrs),
            selected,
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
        const publish = (next: PortalEntry['state']) => {
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
                faultOnThrow(
                    () => true,
                    () => {
                        // A node with another ID is another node, which must not take this one's chrome state.
                        if (next.type !== current.type || next.attrs.nodeId !== current.attrs.nodeId) {
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
            stopEvent: (event) => {
                const { target } = event;
                if (!(target instanceof Node) || !chrome.contains(target)) {
                    return false;
                }
                // A draggable node drags from its chrome, as ProseMirror's default and Tiptap's NodeView let drag events through.
                return !DRAG_SOURCE_EVENTS.has(event.type) || !dom.draggable || inControl(chrome, target);
            },
            destroy: () =>
                faultOnThrow(
                    () => undefined,
                    () => {
                        liveResources.nodeViews -= 1;
                        host.portals.remove(key);
                    },
                ),
        };
    };

    const constructors: Record<string, NodeViewConstructor> = {};
    for (const [name, component] of [...ISLAND_VIEWS, ...views]) {
        constructors[name] = (node, view) =>
            faultOnThrow(
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
