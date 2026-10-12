/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, createContext, useContext } from 'react';

import {
    type CodecContext,
    type Feature,
    type FeatureDeclaration,
    type JsonObject,
    type ReferenceResolution,
} from '#/model';
import { attachedTo, attachToFeature, featureInternals } from '#/model/feature';
import {
    type CommandArgs,
    type CommandKey,
    type CommandResult,
    type CommandState,
    type ShippedCommands,
} from '#/runtime/types';

import { useRenderMark } from './dev-checks';

export { NodeChromeButton, NodeChromeToolbar } from './chrome-toolbar';
export { type EditorOverlay, OverlayBody, useEditorOverlay } from './overlays';

/** What node chrome reads besides attributes: the shape of the reader's `ReaderContext`, which `src/bridge` may not import. */
export interface NodeViewContext extends CodecContext {
    readonly resolveReference: (resourceType: string, resourceId: string) => ReferenceResolution;
}

/** What `useRichTextNodeView` returns: plain data and actions that find their node, never a position or a ProseMirror value. */
export interface NodeViewState<C extends object = ShippedCommands> {
    /** `null` for a node type that carries no `nodeId`, such as `code_block`, whose actions read its live position instead. */
    readonly nodeId: string | null;
    readonly attrs: JsonObject;
    readonly selected: boolean;
    /**
     * The `id` of the element that names the node, which chrome takes as its label, as the task checkbox does: the content
     * element, or the first block of a node with a `nodeId` that holds blocks; `null` for a leaf or atom.
     */
    readonly contentId: string | null;
    readonly context: NodeViewContext;
    /** Node view actions keyed by the node's ID, or its live position when it has none; never a position held from before. */
    readonly update: (attrs: JsonObject) => CommandResult;
    readonly remove: () => CommandResult;
    readonly select: () => void;
    /** Selects this node at execution time, then runs or queries the command, so a delayed menu action still reaches this node. */
    readonly execute: <K extends CommandKey<C>>(id: K, ...args: CommandArgs<C, K>) => CommandResult;
    readonly query: <K extends CommandKey<C>>(id: K, ...args: CommandArgs<C, K>) => CommandState;
    /** The node's running async operation; never a document attribute. */
    readonly pending: NodePending | null;
}

/** An upload into the node: running or waiting with its whole percent once known, or failed or stopped. */
export interface NodePending {
    readonly kind: 'upload';
    readonly state: 'running' | 'failed';
    readonly progress: number | null;
}

export interface NodeViewDeclaration {
    readonly node: string;
    readonly component: ComponentType<object>;
}

/** The node views attached to a compiled feature's declaration, which `defineEditor` reads from a compiled model. */
export const declaredViews = (declaration: FeatureDeclaration): readonly NodeViewDeclaration[] =>
    (attachedTo(declaration, 'views') as readonly NodeViewDeclaration[] | undefined) ?? [];

/** Attaches chrome to a feature's node; compilation rejects a node that no installed feature declares. */
export const defineNodeView = <F extends Feature>(feature: F, view: NodeViewDeclaration): F => {
    const internals = featureInternals(feature);
    if (internals === undefined) {
        return feature;
    }
    return attachToFeature(feature, 'views', [...declaredViews(internals.declaration), view]);
};

/** The state of the node view whose chrome renders, which the portal host provides. */
export const NodeViewStateContext = createContext<NodeViewState<object> | null>(null);
NodeViewStateContext.displayName = 'RichTextNodeViewContext';

/** The node of the chrome that calls it, with its node-ID actions. */
export const useRichTextNodeView = <C extends object = ShippedCommands>(): NodeViewState<C> => {
    useRenderMark();
    const state = useContext(NodeViewStateContext);
    if (state === null) {
        throw new Error('useRichTextNodeView must be called inside node view chrome.');
    }
    return state as unknown as NodeViewState<C>;
};
