/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as ProseMirrorNode } from 'prosemirror-model';
import { type EditorView, type NodeView, type NodeViewConstructor } from 'prosemirror-view';

import { snapshot } from '#/model/values';
import { type EditorRuntime, liveResources, type NodeTarget } from '#/runtime/runtime';

import { type NodeViewDeclaration } from './define';
import { ISLAND_VIEWS } from './island';
import { createPlacement, ignoresMutation, layersOf, sameTags, stopsEvent, syncLayers, tagOf } from './node-view-parts';
import { type PortalEntry, type PortalStore } from './portals';

/** What the node views of one editor share: its portals and the session they act on. */
export interface NodeViewHost {
    readonly portals: PortalStore;
    readonly runtime: EditorRuntime;
}

const viewIndexes = new WeakMap<HTMLElement, string>();
/**
 * The `id` that the chrome view's decoration gives the first block of the node `nodeId`, which names a node that
 * holds blocks, as a task item's text does without its child tasks; unique per surface, since a page may show a document twice.
 */
export const firstBlockId = (surface: HTMLElement, nodeId: string, domId: () => string): string => {
    let index = viewIndexes.get(surface);
    if (index === undefined) {
        index = domId();
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

// A throw never reaches ProseMirror: the portals close and the session faults, which stops editing.
const faultOnThrow = <T>(host: NodeViewHost, fallback: () => T, work: () => T): T => {
    try {
        return work();
    } catch {
        host.portals.close();
        host.runtime.faultView();
        return fallback();
    }
};

const stateOf = (
    host: NodeViewHost,
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

/** The elements of one node view: `dom`, its chrome slot, its `contentDOM`, and the spec layers it keeps in sync. */
const createElements = (
    { contentAttributes = {} }: NodeViewDeclaration,
    node: ProseMirrorNode,
    view: EditorView,
    host: NodeViewHost,
) => {
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
            contentId = firstBlockId(view.dom, labeled.nodeId, host.runtime.nextDomId);
        } else {
            contentId = `rte-node-content-${host.runtime.nextDomId()}`;
            contentDOM.id = contentId;
        }
    }
    return { dom, chrome, contentDOM, contentId, layers, shown };
};

const buildNodeView = (
    host: NodeViewHost,
    key: string,
    declaration: NodeViewDeclaration,
    node: ProseMirrorNode,
    view: EditorView,
    getPos: () => number | undefined,
): NodeView => {
    const { component } = declaration;
    const document = view.dom.ownerDocument;
    const {
        dom,
        chrome,
        contentDOM,
        contentId,
        layers,
        shown: firstShown,
    } = createElements(declaration, node, view, host);
    let shown = firstShown;
    const parts = { dom, chrome, contentDOM, layers };
    const { place, movedContent } = createPlacement(chrome, contentDOM);
    let current = node;
    let state = stateOf(host, node, false, contentId, getPos);
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
                host,
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
                        publish(stateOf(host, next, state.selected, contentId, getPos));
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
        ignoreMutation: (mutation) => ignoresMutation(parts, mutation, movedContent),
        stopEvent: (event) => stopsEvent(parts, event),
        destroy: () =>
            faultOnThrow(
                host,
                () => undefined,
                () => {
                    liveResources.nodeViews -= 1;
                    host.portals.remove(key);
                },
            ),
    };
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
    const constructors: Record<string, NodeViewConstructor> = {};
    const islands = [...ISLAND_VIEWS].map(([node, component]): [string, NodeViewDeclaration] => [
        node,
        { node, component },
    ]);
    for (const [name, declaration] of [...islands, ...views]) {
        constructors[name] = (node, view, getPos) =>
            faultOnThrow(
                host,
                () => ({ dom: view.dom.ownerDocument.createElement(tagOf(node)) }),
                () => {
                    created += 1;
                    return buildNodeView(host, String(created), declaration, node, view, getPos);
                },
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
