/* (c) Copyright Frontify Ltd., all rights reserved. */

import { macBaseKeymap, pcBaseKeymap } from 'prosemirror-commands';
import { keydownHandler } from 'prosemirror-keymap';
import { type NodeType } from 'prosemirror-model';
import { liftListItem } from 'prosemirror-schema-list';
import { type Command, type EditorState, Plugin, PluginKey, TextSelection } from 'prosemirror-state';

import { BASE_KEYS_PLUGIN, CONTAINER_KEYS_PLUGIN, LIST_KEYS_PLUGIN } from '#/model/capabilities';
import { isApple, modOn } from '#/model/platform';

import { itemAt, splitItem } from './lists';
import { showsOptions } from './suggestions/plugin';

// The physical key of a letter or digit, which with Ctrl and Alt alone types itself on any layout.
const PHYSICAL = /^(?:Key([A-Z])|Digit(\d))$/;

/** Whether AltGr typed a character: a key other than its physical key's own, or a symbol from a key `code` cannot name. */
const typesThroughAltGraph = (event: KeyboardEvent): boolean => {
    // No layout types a character with ⌘, and Firefox on macOS reports Option as AltGraph, which ⌥⌘ shortcuts hold.
    if (event.metaKey || Array.from(event.key).length !== 1) {
        return false;
    }
    if (!event.getModifierState('AltGraph') && !(event.ctrlKey && event.altKey)) {
        return false;
    }
    const physical = PHYSICAL.exec(event.code);
    if (physical === null) {
        return !/^[a-z0-9]$/i.test(event.key);
    }
    const [, letter, digit] = physical;
    let own = digit;
    if (letter !== undefined) {
        own = letter.toLowerCase();
    }
    return event.key.toLowerCase() !== own;
};

/**
 * Whether a keydown belongs to a composition, or types a character through AltGr, which current browsers report with
 * the `AltGraph` modifier and older ones on Windows as Ctrl and Alt, so the browser handles it and no package key
 * handler, keymap or toolbar shortcut acts on it.
 */
export const passesToBrowser = (event: KeyboardEvent): boolean =>
    event.isComposing || event.keyCode === 229 || typesThroughAltGraph(event);

/** Whether a keydown holds no Shift, Alt, Ctrl or ⌘. */
const unmodified = (event: KeyboardEvent): boolean =>
    !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey;

/** Whether a keydown is Tab or Shift+Tab, with no Alt, Ctrl or ⌘. */
const isTab = (event: KeyboardEvent): boolean =>
    event.key === 'Tab' && !event.altKey && !event.ctrlKey && !event.metaKey;

/**
 * Composition keys and AltGr characters reach the browser before any keymap runs, and so do Tab and Shift+Tab while
 * `tabMovesFocus` holds and no suggestion list shows options, so they move focus and indent nothing. ProseMirror
 * prevents every Escape and Enter keydown, so an Escape, or an Enter with a modifier, that no handler takes stays
 * unprevented for the browser and the host; a plain Enter keeps ProseMirror's
 * own handling, which mobile keyboards need.
 */
export const createKeyGuard = (tabMovesFocus: () => boolean) =>
    new Plugin({
        key: new PluginKey('rte.key-guard'),
        props: {
            handleDOMEvents: {
                keydown: (view, event) => {
                    if (passesToBrowser(event)) {
                        return true;
                    }
                    // ProseMirror runs no key handler on a surface that takes no edits, and neither does this branch.
                    if (!view.editable) {
                        return false;
                    }
                    if (isTab(event) && tabMovesFocus() && !showsOptions(view.state)) {
                        return true;
                    }
                    if (event.key !== 'Escape' && !(event.key === 'Enter' && !unmodified(event))) {
                        return false;
                    }
                    if (view.someProp('handleKeyDown', (handle) => handle(view, event))) {
                        event.preventDefault();
                    }
                    return true;
                },
            },
        },
    });

/**
 * The leaf right before a caret at the start of a top-level block, or before a gap cursor between top-level blocks,
 * when only the document takes it, as a column break, which sits only between top-level blocks.
 */
const breakBefore = (state: EditorState): { readonly from: number; readonly to: number } | undefined => {
    const { selection } = state;
    const { $from } = selection;
    if (!selection.empty) {
        return undefined;
    }
    let at = $from.pos;
    if ($from.parent.inlineContent) {
        if ($from.parentOffset > 0) {
            return undefined;
        }
        for (let depth = $from.depth; depth > 1; depth -= 1) {
            if ($from.index(depth - 1) > 0) {
                return undefined;
            }
        }
        at = $from.before(1);
    } else if ($from.depth > 0) {
        return undefined;
    }
    const before = state.doc.resolve(at).nodeBefore;
    if (before === null || !before.isLeaf || before.type.isInGroup('block')) {
        return undefined;
    }
    return { from: at - before.nodeSize, to: at };
};

/**
 * Enter splits a list or task item, or lifts an empty one out one level, and Backspace at the start of an item's first
 * block lifts the item, so a nested item outdents and a top-level one becomes a paragraph with its child lists after it;
 * right after a column break, Backspace is left to the base keys, which remove the break.
 */
export const listKeysPlugin = () =>
    new Plugin({
        key: new PluginKey(LIST_KEYS_PLUGIN.id),
        props: {
            handleKeyDown: (view, event) => {
                const { state } = view;
                const { $from, empty } = state.selection;
                const item = itemAt($from);
                if (item === undefined || !unmodified(event)) {
                    return false;
                }
                if (event.key === 'Enter') {
                    if (empty && $from.parent.content.size === 0 && $from.node(-1).childCount === 1) {
                        return liftListItem(item)(state, view.dispatch);
                    }
                    return splitItem(item)(state, view.dispatch);
                }
                if (event.key === 'Backspace' && empty && $from.parentOffset === 0 && $from.index(-1) === 0) {
                    if (breakBefore(state) !== undefined) {
                        return false;
                    }
                    return liftListItem(item)(state, view.dispatch);
                }
                return false;
            },
        },
    });

/**
 * Whether `type` is a container: a block whose content takes only blocks, such as a quote, and not a list item,
 * table cell or figure, which are no blocks or take other content.
 */
const isContainer = (type: NodeType) =>
    type.isInGroup('block') &&
    !type.isTextblock &&
    Object.values(type.schema.nodes).every(
        (child) => type.contentMatch.matchType(child) === null || child.isInGroup('block'),
    );

/** Enter in the empty last paragraph of a container removes it and puts a new paragraph after the container. */
export const containerKeysPlugin = () =>
    new Plugin({
        key: new PluginKey(CONTAINER_KEYS_PLUGIN.id),
        props: {
            handleKeyDown: (view, event) => {
                const { state } = view;
                const { $cursor } = state.selection as TextSelection;
                if (
                    event.key !== 'Enter' ||
                    !unmodified(event) ||
                    $cursor === undefined ||
                    $cursor === null ||
                    $cursor.depth < 2
                ) {
                    return false;
                }
                const paragraph = $cursor.parent;
                const container = $cursor.node(-1);
                const last = $cursor.index(-1) === container.childCount - 1;
                if (
                    paragraph.type.name !== 'paragraph' ||
                    paragraph.content.size > 0 ||
                    !last ||
                    !isContainer(container.type)
                ) {
                    return false;
                }
                const after = $cursor.after(-1);
                const transaction = state.tr;
                if (container.childCount === 1) {
                    transaction.delete($cursor.before(-1), after);
                } else {
                    transaction.delete($cursor.before(), $cursor.after());
                }
                const at = transaction.mapping.map(after);
                transaction.insert(at, paragraph.type.create());
                view.dispatch(transaction.setSelection(TextSelection.create(transaction.doc, at + 1)).scrollIntoView());
                return true;
            },
        },
    });

/** Backspace right after a column break removes it, where the base keymap would select it from an empty block. */
const removeBreakBefore: Command = (state, dispatch) => {
    const found = breakBefore(state);
    if (found === undefined) {
        return false;
    }
    dispatch?.(state.tr.delete(found.from, found.to).scrollIntoView());
    return true;
};
const BREAK_KEYS = keydownHandler({ Backspace: removeBreakBefore });

/** ProseMirror's base keymap of the platform, with `Mod` bound as the editor's own platform check reads it. */
const baseKeysOf = (keymap: typeof pcBaseKeymap, apple: boolean) =>
    keydownHandler(Object.fromEntries(Object.entries(keymap).map(([key, command]) => [modOn(key, apple), command])));
const BASE_KEYS = { apple: baseKeysOf(macBaseKeymap, true), other: baseKeysOf(pcBaseKeymap, false) };

/**
 * Enter, Backspace, Delete and select-all, which ProseMirror leaves to its base keymap: without them it prevents
 * Enter and a Backspace at a block start, and the browser's own select-all stops at a node view's chrome.
 */
export const baseKeysPlugin = () =>
    new Plugin({
        key: new PluginKey(BASE_KEYS_PLUGIN.id),
        props: {
            handleKeyDown: (view, event) => {
                if (BREAK_KEYS(view, event)) {
                    return true;
                }
                const owner = view.dom.ownerDocument.defaultView;
                if (owner !== null && isApple(owner.navigator)) {
                    return BASE_KEYS.apple(view, event);
                }
                return BASE_KEYS.other(view, event);
            },
        },
    });
