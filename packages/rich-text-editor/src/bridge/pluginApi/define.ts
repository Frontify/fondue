/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType } from 'react';

import { type CodecContext, type JsonObject } from '#/model';
import { type ReaderContext } from '#/model/internal';
import {
    type CommandArgs,
    type CommandKey,
    type CommandResult,
    type CommandState,
    type ShippedCommands,
} from '#/runtime/types';

export {
    toggleMark,
    type ToggleMarkInputRule,
    type ToggleMarkParts,
    type ToggleMarkOptions,
    type ToggleMarkToolbar,
} from './toggleMark';
export { suggestionOptionId } from '#/runtime/capabilities/suggestions/optionId';
export { CheckedSlot } from '../chrome/components/CheckedSlot';
export { ChromeToolbarButton } from '../chrome/components/ChromeToolbarButton';
export { keepFocus } from '../chrome/helpers/keepFocus';
export { NodeChromeButton } from '../chrome/components/NodeChromeButton';
export { NodeChromeMenu } from '../chrome/components/NodeChromeMenu';
export { NodeChromeToolbar } from '../chrome/components/NodeChromeToolbar';
export { OptionItem } from '../chrome/components/OptionItem';
export { type MenuOption, OptionsMenu } from '../chrome/components/OptionsMenu';
export { EditorDialog } from '../overlays/components/EditorDialog';
export { type EditorDialogControl, useEditorDialog } from '../overlays/hooks/useEditorDialog';
export { lazyPart } from '../session/helpers/lazyPart';
export { Listbox, type ListboxOption } from '../chrome/components/Listbox';
export { NodeViewContent } from '../nodeViews/components/NodeViewContent';
export { NodeChromeTurnInto } from '../chrome/components/NodeChromeTurnInto';
export { type TurnIntoCommands } from '../chrome/helpers/turnInto';
export { TurnIntoMenu } from '../chrome/components/TurnIntoMenu';
export { OverlayBody } from '../overlays/components/OverlayBody';
export { type EditorOverlay } from '../overlays/helpers/overlayContext';
export { useEditorOverlay } from '../overlays/hooks/useEditorOverlay';
export { NodeViewStateContext } from '../nodeViews/helpers/nodeViewStateContext';
export { useRichTextNodeView } from '../nodeViews/hooks/useRichTextNodeView';

/** What node chrome reads besides attributes: the reader's `ReaderContext`, which `src/bridge` may not import from the reader. */
export type NodeViewContext = ReaderContext;

/** What `useRichTextNodeView` returns: plain data and actions that find their node, never a position or a ProseMirror value. */
export type NodeViewState<C extends object = ShippedCommands> = {
    /** `null` for a node type that carries no `nodeId`, such as `code_block`, whose actions read its live position instead. */
    nodeId: string | null;
    /** The node's attributes. */
    attrs: JsonObject;
    /** Whether the node is selected or holds the caret. */
    selected: boolean;
    /**
     * The `id` of the element that names the node, which chrome takes as its label, as the task checkbox does: the content
     * element, or the first block of a node with a `nodeId` that holds blocks; `null` for a leaf or atom.
     */
    contentId: string | null;
    /** The reader's context for this node. */
    context: NodeViewContext;
    /**
     * Node view actions keyed by the node's ID, or its live position when it has none; never a position held from
     * before. `update` merges: it sets the attributes it names and keeps the others, and changes nothing and is
     * rejected when one is undeclared, is `nodeId`, or has a value its declaration refuses.
     */
    update: (attrs: JsonObject) => CommandResult;
    /** Deletes the node. */
    remove: () => CommandResult;
    /** Selects the node as a whole. */
    select: () => void;
    /** Selects this node at execution time, then runs or queries the command, so a delayed menu action still reaches this node. */
    execute: <K extends CommandKey<C>>(id: K, ...args: CommandArgs<C, K>) => CommandResult;
    /** Selects this node at execution time, then reads the state of the command. */
    query: <K extends CommandKey<C>>(id: K, ...args: CommandArgs<C, K>) => CommandState;
    /** The node's running async operation; never a document attribute. */
    pending: NodePending | null;
};

/** An upload into the node: running or waiting with its whole percent once known, or failed or stopped. */
export type NodePending = {
    kind: 'upload';
    /** `running` while it transfers or waits, `failed` once it stopped or failed. */
    state: 'running' | 'failed';
    /** The whole percent done, `null` until known. */
    progress: number | null;
};

/** A React component that draws a node of a block in the editor, with the attributes only the editor gives its content element. */
export type NodeViewDeclaration = {
    /** The node type the component draws, such as `asset_image`. */
    node: string;
    /** The component that draws the node's chrome around its content. */
    component: ComponentType<object>;
    /** Attributes only the editor gives the content element, such as `spellcheck`, which the stored HTML never holds. */
    contentAttributes?: Readonly<Record<string, string>>;
};

/** What a panel renders with: close it, read package strings, and hear its command run again while it is open. */
export type PanelComponentProps = {
    /** Closes the panel. */
    close: () => void;
    /** The package's own chrome strings in the editor's locale. */
    t: CodecContext['t'];
    /** Counts the runs of its command while it is open, for a panel that does not toggle; each change asks it to move focus. */
    requested: number;
};

/** A panel a plugin opens by its control id, and the React component that draws it. */
export type PanelDeclaration = {
    /** The id a plugin opens this panel by, such as `checks`. */
    control: string;
    /** The component that draws the panel. */
    component: ComponentType<PanelComponentProps>;
};
