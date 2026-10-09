/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, createContext, useContext } from 'react';

import {
    type CodecContext,
    type Feature,
    type FeatureDeclaration,
    type JsonObject,
    type ReferenceResolution,
} from '#/model';
import { createFeature, featureInternals } from '#/model/feature';
import {
    type CommandArgs,
    type CommandKey,
    type CommandResult,
    type CommandState,
    type ShippedCommands,
} from '#/runtime/types';

/** What node chrome reads besides attributes, as a reader override does; `ReaderContext` of `./reader` has this shape. */
export interface NodeViewContext extends CodecContext {
    readonly resolveReference: (resourceType: string, resourceId: string) => ReferenceResolution;
}

/** What `useRichTextNodeView` returns: plain data and node-ID actions, never a position or a ProseMirror value (DR-034). */
export interface NodeViewState<C extends object = ShippedCommands> {
    readonly nodeId: string;
    readonly attrs: JsonObject;
    readonly selected: boolean;
    readonly context: NodeViewContext;
    /** Node view actions keyed by the node's ID, never a position. */
    readonly update: (attrs: JsonObject) => CommandResult;
    readonly remove: () => CommandResult;
    readonly select: () => void;
    /** Selects this node by ID at execution time, then runs or queries the command, so a delayed menu action still reaches this node (SPEC-rich-text-react/AC-019). */
    readonly execute: <K extends CommandKey<C>>(id: K, ...args: CommandArgs<C, K>) => CommandResult;
    readonly query: <K extends CommandKey<C>>(id: K, ...args: CommandArgs<C, K>) => CommandState;
    /** The node's running async operation; never a document attribute (SPEC-rich-text-blocks/AC-014). */
    readonly pending: {
        readonly kind: 'upload';
        readonly state: 'running' | 'failed';
        readonly progress: number | null;
    } | null;
}

export interface NodeViewDeclaration {
    readonly node: string;
    readonly component: ComponentType<object>;
}

const DECLARED = new WeakMap<FeatureDeclaration, readonly NodeViewDeclaration[]>();

/** The node views attached to a compiled feature's declaration, which `defineEditor` reads from a compiled model. */
export const declaredViews = (declaration: FeatureDeclaration): readonly NodeViewDeclaration[] =>
    DECLARED.get(declaration) ?? [];

/** Attaches chrome to a feature's node; compilation rejects a node that no installed feature declares (SPEC-rich-text/AC-021). */
export const defineNodeView = <F extends Feature>(feature: F, view: NodeViewDeclaration): F => {
    const internals = featureInternals(feature);
    if (internals === undefined) {
        return feature;
    }
    // A fresh declaration copy keys the views to this feature, not to every model built from its factory.
    const declaration = Object.freeze({ ...internals.declaration });
    DECLARED.set(declaration, [...declaredViews(internals.declaration), view]);
    return createFeature(declaration, internals.options, internals.manifest) as F;
};

/** The state of the node view whose chrome renders, which the portal host provides. */
export const NodeViewStateContext = createContext<NodeViewState<object> | null>(null);
NodeViewStateContext.displayName = 'RichTextNodeViewContext';

/** The node of the chrome that calls it, with its node-ID actions (SPEC-rich-text-react/AC-019). */
export const useRichTextNodeView = <C extends object = ShippedCommands>(): NodeViewState<C> => {
    const state = useContext(NodeViewStateContext);
    if (state === null) {
        throw new Error('useRichTextNodeView must be called inside node view chrome.');
    }
    return state as unknown as NodeViewState<C>;
};
