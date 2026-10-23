/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, createContext, useContext } from 'react';

import { type JsonObject } from '#/model';
import { type ReaderContext } from '#/model/declarations';
import {
    type CommandArgs,
    type CommandKey,
    type CommandResult,
    type CommandState,
    type ShippedCommands,
} from '#/runtime/types';

import { useRenderMark } from './dev-checks';

export { suggestionOptionId } from '#/runtime/suggestions/option-id';
export { NodeChromeButton, NodeChromeMenu, NodeChromeToolbar, OptionItem, OptionsMenu } from './chrome-toolbar';
export { Listbox, type ListboxOption } from './listbox';
export { NodeViewContent } from './node-view-content';
export { type EditorOverlay, OverlayBody, useEditorOverlay } from './overlays';

/** What node chrome reads besides attributes: the reader's `ReaderContext`, which `src/bridge` may not import from the reader. */
export type NodeViewContext = ReaderContext;

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
    /**
     * Node view actions keyed by the node's ID, or its live position when it has none; never a position held from
     * before. `update` merges: it sets the attributes it names and keeps the others, and changes nothing and is
     * rejected when one is undeclared, is `nodeId`, or has a value its declaration refuses.
     */
    readonly update: (attrs: JsonObject) => CommandResult;
    readonly remove: () => CommandResult;
    readonly select: () => void;
    /** Selects this node at execution time, then runs or queries the command, so a delayed menu action still reaches this node. */
    readonly execute: <K extends CommandKey<C>>(id: K, ...args: CommandArgs<C, K>) => CommandResult;
    readonly query: <K extends CommandKey<C>>(id: K, ...args: CommandArgs<C, K>) => CommandState;
}

/** A React component that draws a node of a block in the editor, with the attributes only the editor gives its content element. */
export interface NodeViewDeclaration {
    readonly node: string;
    readonly component: ComponentType<object>;
    /** Attributes only the editor gives the content element, such as `spellcheck`, which the stored HTML never holds. */
    readonly contentAttributes?: Readonly<Record<string, string>>;
}

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
