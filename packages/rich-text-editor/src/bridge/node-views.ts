/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as ProseMirrorNode } from 'prosemirror-model';
import { type EditorView, type NodeView, type NodeViewConstructor } from 'prosemirror-view';
import { type ComponentType } from 'react';

import { snapshot } from '#/model/values';
import { type EditorRuntime, liveResources, type NodeTarget } from '#/runtime/runtime';

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

const viewIndexes = new WeakMap<EditorView, number>();
// One counter keeps label and content ids distinct across every editor on a page.
let ids = 0;
const nextId = (): number => {
    ids += 1;
    return ids;
};
/**
 * The `id` that the chrome view's decoration gives the first block of the node `nodeId`, which names a node that
 * holds blocks, as a task item's text does without its child tasks; unique per view, since a page may show a document twice.
 */
export const firstBlockId = (view: EditorView, nodeId: string): string => {
    let index = viewIndexes.get(view);
    if (index === undefined) {
        index = nextId();
        viewIndexes.set(view, index);
    }
    return `rte-node-label-${index}-${encodeURIComponent(nodeId)}`;
};

/** The first block that carries `node`'s label id: a block container with a `nodeId`, not a textblock. */
export const labelsFirstBlock = (
    node: ProseMirrorNode,
): { readonly nodeId: string; readonly block: ProseMirrorNode } | undefined => {
    const block = node.firstChild;
    const { nodeId } = node.attrs;
    if (node.isAtom || node.isTextblock || block === null || !block.isBlock || typeof nodeId !== 'string') {
        return undefined;
    }
    return { nodeId, block };
};

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

/** A list item keeps its `li`, since a list holds only `li` children. */
const outerTagOf = (node: ProseMirrorNode) => {
    const spec = node.type.spec.toDOM?.(node);
    if (Array.isArray(spec) && spec[0] === 'li') {
        return 'li';
    }
    return tagOf(node);
};

/** Whether `value` is a `code` element whose hole is the node's content. */
const isCodeHole = (value: unknown): boolean => {
    if (!Array.isArray(value)) {
        return false;
    }
    const [tag, second, third] = value as readonly unknown[];
    return tag === 'code' && (second === 0 || third === 0);
};

/** A `pre` whose content hole is a `code` element, as a code block's HTML spec writes it. */
const codeShell = (node: ProseMirrorNode): boolean => {
    const spec = node.type.spec.toDOM?.(node);
    if (!Array.isArray(spec) || spec[0] !== 'pre') {
        return false;
    }
    return isCodeHole(spec[spec.length - 1]);
};

/**
 * The node views of one editor by node name. Each builds `dom`, its chrome slot and `contentDOM` with DOM calls and
 * renders `component` into the slot through `host`'s portals.
 */
export const createNodeViews = (
    views: ReadonlyMap<string, ComponentType<object>>,
    host: NodeViewHost,
): Record<string, NodeViewConstructor> => {
    let created = 0;

    // A throw never reaches ProseMirror: the portals close and the session faults, which stops editing.
    const faultOnThrow = <T>(fallback: () => T, work: () => T): T => {
        try {
            return work();
        } catch {
            host.portals.close();
            host.runtime.faultView();
            return fallback();
        }
    };

    const stateOf = (
        node: ProseMirrorNode,
        selected: boolean,
        contentId: string | null,
        getPos: () => number | undefined,
    ): PortalEntry['state'] => {
        let nodeId: string | null = null;
        let target: NodeTarget = getPos;
        if (typeof node.attrs.nodeId === 'string') {
            nodeId = node.attrs.nodeId;
            target = nodeId;
        }
        return {
            ...host.runtime.nodeActions(target),
            nodeId,
            attrs: snapshot(node.attrs),
            selected,
            contentId,
        };
    };

    const build = (
        component: ComponentType<object>,
        node: ProseMirrorNode,
        view: EditorView,
        getPos: () => number | undefined,
    ): NodeView => {
        created += 1;
        const key = String(created);
        const document = view.dom.ownerDocument;
        const tag = tagOf(node);
        const shell = codeShell(node);
        const dom = document.createElement(shell ? 'pre' : outerTagOf(node));
        const chrome = document.createElement(tag);
        chrome.setAttribute('contenteditable', 'false');
        chrome.setAttribute('data-rte-chrome', '');
        dom.append(chrome);
        // Leaf and atom views have no `contentDOM`, so their chrome shows the node.
        let contentDOM: HTMLElement | null = null;
        let contentId: string | null = null;
        if (!node.isAtom) {
            contentDOM = document.createElement(shell ? 'code' : tag);
            // Editing attributes stay off the HTML spec, so copied and read HTML stays the stored markup.
            if (node.type.spec.code === true) {
                contentDOM.spellcheck = false;
                contentDOM.setAttribute('autocorrect', 'off');
                contentDOM.setAttribute('autocapitalize', 'off');
            }
            dom.append(contentDOM);
            const labeled = labelsFirstBlock(node);
            if (labeled !== undefined) {
                contentId = firstBlockId(view, labeled.nodeId);
            } else {
                contentId = `rte-node-content-${nextId()}`;
                contentDOM.id = contentId;
            }
        }
        let current = node;
        let state = stateOf(node, false, contentId, getPos);
        const publish = (next: PortalEntry['state']) => {
            state = next;
            host.portals.set({ key, slot: chrome, component, state });
        };
        publish(state);
        liveResources.nodeViews += 1;
        // As ProseMirror's own `selectNode` does, which a custom one replaces.
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
                        // Chrome reads attributes only, so typing inside the node rerenders nothing.
                        if (changed) {
                            publish(stateOf(next, state.selected, contentId, getPos));
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
            // Chrome mutations are React's; ProseMirror reads the rest, a removed `contentDOM` included.
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
        constructors[name] = (node, view, getPos) =>
            faultOnThrow(
                () => ({ dom: view.dom.ownerDocument.createElement(tagOf(node)) }),
                () => build(component, node, view, getPos),
            );
    }
    return constructors;
};

/** Writes the editor selection to the DOM again after a portal flush, while the surface has focus. */
export const resyncSelection = (view: EditorView | undefined): void => {
    // A composition keeps its own DOM selection until it ends.
    if (view !== undefined && view.hasFocus() && !view.composing) {
        view.focus();
    }
};
