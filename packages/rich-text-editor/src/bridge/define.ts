/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, createContext, useContext } from 'react';

import { type CodecContext, type JsonObject } from '#/model';
import { type ReaderContext } from '#/model/internal';
import {
    type CommandArgs,
    type CommandKey,
    type CommandResult,
    type CommandState,
    type ShippedCommands,
} from '#/runtime/types';

import { useRenderMark } from './devChecks';

export { suggestionOptionId } from '#/runtime/capabilities/suggestions/optionId';
export {
    CheckedSlot,
    ChromeToolbarButton,
    keepFocus,
    type MenuOption,
    NodeChromeButton,
    NodeChromeMenu,
    NodeChromeToolbar,
    OptionItem,
    OptionsMenu,
} from './chromeToolbar';
export { EditorDialog, type EditorDialogControl, useEditorDialog } from './EditorDialog';
export { lazyPart } from './lazyPart';
export { Listbox, type ListboxOption } from './Listbox';
export { NodeViewContent } from './NodeViewContent';
export { NodeChromeTurnInto, type TurnIntoCommands, TurnIntoMenu } from './turnInto';
export { type EditorOverlay, OverlayBody, useEditorOverlay } from './overlays';

/** What node chrome reads besides attributes: the reader's `ReaderContext`, which `src/bridge` may not import from the reader. */
export type NodeViewContext = ReaderContext;

/** What `useRichTextNodeView` returns: plain data and actions that find their node, never a position or a ProseMirror value. */
export type NodeViewState<C extends object = ShippedCommands> = {
    /** `null` for a node type that carries no `nodeId`, such as `code_block`, whose actions read its live position instead. */
    nodeId: string | null;
    attrs: JsonObject;
    selected: boolean;
    /**
     * The `id` of the element that names the node, which chrome takes as its label, as the task checkbox does: the content
     * element, or the first block of a node with a `nodeId` that holds blocks; `null` for a leaf or atom.
     */
    contentId: string | null;
    context: NodeViewContext;
    /**
     * Node view actions keyed by the node's ID, or its live position when it has none; never a position held from
     * before. `update` merges: it sets the attributes it names and keeps the others, and changes nothing and is
     * rejected when one is undeclared, is `nodeId`, or has a value its declaration refuses.
     */
    update: (attrs: JsonObject) => CommandResult;
    remove: () => CommandResult;
    select: () => void;
    /** Selects this node at execution time, then runs or queries the command, so a delayed menu action still reaches this node. */
    execute: <K extends CommandKey<C>>(id: K, ...args: CommandArgs<C, K>) => CommandResult;
    query: <K extends CommandKey<C>>(id: K, ...args: CommandArgs<C, K>) => CommandState;
    /** The node's running async operation; never a document attribute. */
    pending: NodePending | null;
};

/** An upload into the node: running or waiting with its whole percent once known, or failed or stopped. */
export type NodePending = {
    kind: 'upload';
    state: 'running' | 'failed';
    progress: number | null;
};

/** A React component that draws a node of a block in the editor, with the attributes only the editor gives its content element. */
export type NodeViewDeclaration = {
    node: string;
    component: ComponentType<object>;
    /** Attributes only the editor gives the content element, such as `spellcheck`, which the stored HTML never holds. */
    contentAttributes?: Readonly<Record<string, string>>;
};

/** What a panel renders with: close it, read package strings, and hear its command run again while it is open. */
export type PanelComponentProps = {
    close: () => void;
    t: CodecContext['t'];
    /** Counts the runs of its command while it is open, for a panel that does not toggle; each change asks it to move focus. */
    requested: number;
};

/** A panel a plugin opens by its control id, and the React component that draws it. */
export type PanelDeclaration = {
    /** The id a plugin opens this panel by, such as `checks`. */
    control: string;
    component: ComponentType<PanelComponentProps>;
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

    return state as NodeViewState<C>;
};
