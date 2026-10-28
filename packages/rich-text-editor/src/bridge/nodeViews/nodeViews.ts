/* (c) Copyright Frontify Ltd., all rights reserved. */

import { snapshot } from '#/model/internal';
import {
    firstBlockId,
    labelsFirstBlock,
    layersOf,
    type SurfaceView,
    tagOf,
    type ViewNode,
    type ViewNodeConstructor,
    type ViewNodeView,
} from '#/runtime/dom/viewBridge';
import { type EditorRuntime, liveResources, type NodeTarget } from '#/runtime/runtime';

import { type NodeViewDeclaration } from '../pluginApi/define';

import { createPlacement, ignoresMutation, sameTags, stopsEvent, syncLayers } from './helpers/nodeViewParts';
import { type PortalEntry, type PortalStore } from './helpers/portals';
import { ISLAND_VIEWS } from './IslandFallback/IslandFallback';

/** What the node views of one editor share: its portals and the session they act on. */
export type NodeViewHost = {
    portals: PortalStore;
    runtime: EditorRuntime;
};

// A throw never reaches ProseMirror: the portals close and the session faults, which stops editing.
const faultOnThrow = <Result>(host: NodeViewHost, fallback: () => Result, work: () => Result): Result => {
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
    node: ViewNode,
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
    node: ViewNode,
    view: SurfaceView,
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
    node: ViewNode,
    view: SurfaceView,
    getPos: () => number | undefined,
): ViewNodeView => {
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
): Record<string, ViewNodeConstructor> => {
    let created = 0;
    const constructors: Record<string, ViewNodeConstructor> = {};
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
