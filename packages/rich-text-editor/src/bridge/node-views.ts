/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DOMSerializer, type Node as ProseMirrorNode } from 'prosemirror-model';
import { type EditorView, type NodeView, type NodeViewConstructor, type ViewMutationRecord } from 'prosemirror-view';

import { snapshot } from '#/model/values';
import { type EditorRuntime, liveResources, type NodeTarget } from '#/runtime/runtime';

import { type NodeViewDeclaration } from './define';
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
// A control with no text to copy, whose copy and cut events the editor's own selection owns.
const TEXTLESS_CONTROLS = 'input[type="checkbox"], input[type="radio"], button';
const CLIPBOARD_SOURCE_EVENTS: ReadonlySet<string> = new Set(['copy', 'cut']);

const viewIndexes = new WeakMap<HTMLElement, number>();
// One counter keeps label and content ids distinct across every editor on a page.
let ids = 0;
const nextId = (): number => {
    ids += 1;
    return ids;
};
/**
 * The `id` that the chrome view's decoration gives the first block of the node `nodeId`, which names a node that
 * holds blocks, as a task item's text does without its child tasks; unique per surface, since a page may show a document twice.
 */
export const firstBlockId = (surface: HTMLElement, nodeId: string): string => {
    let index = viewIndexes.get(surface);
    if (index === undefined) {
        index = nextId();
        viewIndexes.set(surface, index);
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

/** The elements of `node`'s HTML spec from its outer element to its content hole; none for a spec with no hole. */
const layersOf = (node: ProseMirrorNode, document: Document): readonly HTMLElement[] => {
    const spec = node.type.spec.toDOM?.(node);
    if (spec === undefined) {
        return [];
    }
    const { dom, contentDOM } = DOMSerializer.renderSpec(document, spec);
    const layers: HTMLElement[] = [];
    let at = contentDOM as HTMLElement | null | undefined;
    while (at !== null && at !== undefined) {
        layers.unshift(at);
        if (at === dom) {
            break;
        }
        at = at.parentElement;
    }
    return layers;
};

const sameTags = (a: readonly HTMLElement[], b: readonly HTMLElement[]) =>
    a.length === b.length && a.every((layer, index) => layer.tagName === b[index]?.tagName);

const attributesOf = (element: HTMLElement | undefined): readonly Attr[] => {
    if (element === undefined) {
        return [];
    }
    return [...element.attributes];
};

/** Gives each of `layers` the attributes of the same element of `fresh`, and drops those `fresh` no longer writes. */
const syncLayers = (layers: readonly HTMLElement[], shown: readonly HTMLElement[], fresh: readonly HTMLElement[]) => {
    for (const [index, layer] of layers.entries()) {
        const next = fresh[index];
        for (const { name } of attributesOf(shown[index])) {
            if (next?.hasAttribute(name) !== true) {
                layer.removeAttribute(name);
            }
        }
        for (const { name, value } of attributesOf(next)) {
            layer.setAttribute(name, value);
        }
    }
};

/**
 * The node views of one editor by node name. Each builds `dom`, its chrome slot and `contentDOM` with DOM calls and
 * renders `component` into the slot through `host`'s portals.
 */
export const createNodeViews = (
    views: ReadonlyMap<string, NodeViewDeclaration>,
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
        { component, contentAttributes = {} }: NodeViewDeclaration,
        node: ProseMirrorNode,
        view: EditorView,
        getPos: () => number | undefined,
    ): NodeView => {
        created += 1;
        const key = String(created);
        const document = view.dom.ownerDocument;
        const tag = tagOf(node);
        // The spec as last rendered, which the next attributes are diffed against.
        let shown: readonly HTMLElement[] = [];
        if (!node.isAtom) {
            shown = layersOf(node, document);
        }
        // A spec whose outer element is its hole gives its attributes to a content element, outside the chrome.
        let layers: readonly HTMLElement[] = [];
        const shownTag = shown[0]?.tagName.toLowerCase();
        let dom = document.createElement(shownTag ?? tag);
        if (shown.length > 1) {
            layers = layersOf(node, document);
            dom = layers[0] ?? dom;
        }
        const chrome = document.createElement(tag);
        chrome.setAttribute('contenteditable', 'false');
        chrome.setAttribute('data-rte-chrome', '');
        dom.prepend(chrome);
        // Leaf and atom views have no `contentDOM`, so their chrome shows the node.
        let contentDOM: HTMLElement | null = null;
        let contentId: string | null = null;
        if (!node.isAtom) {
            contentDOM = layers.at(-1) ?? null;
            if (contentDOM === null) {
                contentDOM = document.createElement(tag);
                layers = [contentDOM];
                syncLayers(layers, [], shown);
                dom.append(contentDOM);
            }
            for (const [name, value] of Object.entries(contentAttributes)) {
                contentDOM.setAttribute(name, value);
            }
            const labeled = labelsFirstBlock(node);
            if (labeled !== undefined) {
                contentId = firstBlockId(view.dom, labeled.nodeId);
            } else {
                contentId = `rte-node-content-${nextId()}`;
                contentDOM.id = contentId;
            }
        }
        const parent = contentDOM?.parentElement;
        const home = parent ?? null;
        // Each move here mutates one element outside the chrome, which the view must not read as an edit.
        let moves = 0;
        const place = (target: HTMLElement | null) => {
            if (contentDOM === null) {
                return;
            }
            if (target === null) {
                chrome.setAttribute('contenteditable', 'false');
                if (home !== null && contentDOM.parentElement !== home) {
                    moves += 1;
                    home.append(contentDOM);
                }
                return;
            }
            // Content under a non-editable element becomes its own editing host, whose focus the surface never sees.
            chrome.removeAttribute('contenteditable');
            if (contentDOM.parentElement === home) {
                moves += 1;
            }
            target.append(contentDOM);
        };
        const movedContent = (mutation: ViewMutationRecord) => {
            if (moves === 0 || contentDOM === null || mutation.type !== 'childList') {
                return false;
            }
            if (![...mutation.addedNodes, ...mutation.removedNodes].includes(contentDOM)) {
                return false;
            }
            moves -= 1;
            return true;
        };
        let current = node;
        let state = stateOf(node, false, contentId, getPos);
        const publish = (next: PortalEntry['state']) => {
            state = next;
            host.portals.set({ key, slot: chrome, component, state, place });
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
                        if (changed && layers.length > 0) {
                            const fresh = layersOf(next, document);
                            // A spec whose tag follows an attribute, as a heading's level does, needs new elements.
                            if (!sameTags(fresh, shown)) {
                                return false;
                            }
                            syncLayers(layers, shown, fresh);
                            shown = fresh;
                        }
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
            ignoreMutation: (mutation) => {
                if (mutation.type === 'selection') {
                    return false;
                }
                if (contentDOM?.contains(mutation.target) === true) {
                    return mutation.type === 'attributes' && mutation.target === contentDOM;
                }
                if (mutation.type === 'attributes' && layers.includes(mutation.target as HTMLElement)) {
                    return true;
                }
                return chrome.contains(mutation.target) || movedContent(mutation);
            },
            stopEvent: (event) => {
                const { target } = event;
                if (!(target instanceof Node) || !chrome.contains(target) || contentDOM?.contains(target) === true) {
                    return false;
                }
                // A selected node's copy comes from the first control the browser finds inside it, such as a task checkbox.
                if (
                    CLIPBOARD_SOURCE_EVENTS.has(event.type) &&
                    target instanceof Element &&
                    target.matches(TEXTLESS_CONTROLS)
                ) {
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
    const islands = [...ISLAND_VIEWS].map(([node, component]): [string, NodeViewDeclaration] => [
        node,
        { node, component },
    ]);
    for (const [name, declaration] of [...islands, ...views]) {
        constructors[name] = (node, view, getPos) =>
            faultOnThrow(
                () => ({ dom: view.dom.ownerDocument.createElement(tagOf(node)) }),
                () => build(declaration, node, view, getPos),
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
