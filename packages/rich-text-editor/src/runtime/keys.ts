/* (c) Copyright Frontify Ltd., all rights reserved. */

import { macBaseKeymap, pcBaseKeymap } from 'prosemirror-commands';
import { keydownHandler } from 'prosemirror-keymap';
import { type NodeType } from 'prosemirror-model';
import { type Command, type EditorState, Plugin, PluginKey, TextSelection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { BASE_KEYS_PLUGIN, CONTAINER_KEYS_PLUGIN, isApple, modOn } from '#/model/internal';

import { passesToBrowser } from './browserKeys';
import { showsOptions } from './capabilities/suggestions/plugin';
import { ENTER_RULES_META } from './inputRules';
import { type AuthoringPolicy } from './types';

/** Whether a keydown holds no Shift, Alt, Ctrl or ⌘. */
const unmodified = (event: KeyboardEvent): boolean =>
    !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey;

/** Whether a keydown is Tab or Shift+Tab, with no Alt, Ctrl or ⌘. */
const isTab = (event: KeyboardEvent): boolean =>
    event.key === 'Tab' && !event.altKey && !event.ctrlKey && !event.metaKey;

/** How the surface's Enter, Shift+Enter and Mod+Enter act before the structural keys. */
export type EnterKeys = {
    /** The Inline profile: Shift+Enter and Mod+Enter act as Enter, and no key adds a block or a line. */
    readonly singleLine: boolean;
    /** The Comment profile: Mod+Enter submits. */
    readonly modSubmits: boolean;
    /** Whether the host listens for submits. */
    readonly submits: () => boolean;
    /** Submits the committed snapshot, or announces why it is not valid. */
    readonly submit: () => void;
};

/** Which Enter a keydown is, with no Alt and no modifier but Shift or the platform's Mod. */
const enterOf = (view: EditorView, event: KeyboardEvent): 'enter' | 'shift' | 'mod' | undefined => {
    if (event.key !== 'Enter' || event.altKey) {
        return undefined;
    }
    const owner = view.dom.ownerDocument.defaultView;
    const apple = owner !== null && isApple(owner.navigator);
    let mod = event.ctrlKey && !event.metaKey;
    let other = event.metaKey;
    if (apple) {
        mod = event.metaKey && !event.ctrlKey;
        other = event.ctrlKey;
    }
    if (other) {
        return undefined;
    }
    if (mod && !event.shiftKey) {
        return 'mod';
    }
    if (mod) {
        return undefined;
    }
    if (event.shiftKey) {
        return 'shift';
    }
    return 'enter';
};

/** Fires the rules that Enter ends, such as an autolink, before the submit takes the snapshot. */
const submit = (view: EditorView, keys: EnterKeys) => {
    view.dispatch(view.state.tr.setMeta(ENTER_RULES_META, true));
    keys.submit();
};

/**
 * Whether the guard took an Enter, after composition and an open suggestion list passed it
 * on. A single-line field leaves an Enter it does not submit unprevented, as a one-line `input` does.
 */
const takesEnter = (
    view: EditorView,
    event: KeyboardEvent,
    keys: EnterKeys,
    behavior: AuthoringPolicy['enterBehavior'],
): boolean => {
    const enter = enterOf(view, event);
    if (enter === undefined) {
        return false;
    }
    const submitting = behavior === 'submit' && keys.submits();
    if (keys.singleLine) {
        if (submitting) {
            event.preventDefault();
            submit(view, keys);
        }
        return true;
    }
    // Mod+Enter belongs to submit even with no `onSubmit`, so the base keymap's `exitCode` never runs.
    if (enter === 'mod' && keys.modSubmits) {
        if (keys.submits()) {
            event.preventDefault();
            submit(view, keys);
        }
        return true;
    }
    if (enter === 'enter' && submitting) {
        event.preventDefault();
        submit(view, keys);
        return true;
    }
    if (enter !== 'shift' || behavior !== 'submit') {
        return false;
    }
    // Shift+Enter runs the structural action of Enter, so a list item still splits.
    const owner = view.dom.ownerDocument.defaultView ?? window;
    const plain = new owner.KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, cancelable: true });
    view.someProp('handleKeyDown', (handle) => handle(view, plain));
    event.preventDefault();
    return true;
};

/**
 * Composition keys and AltGr characters reach the browser before any keymap runs, and so do Tab and Shift+Tab while
 * `tabMovesFocus` holds and no suggestion list shows options, so they move focus and indent nothing. ProseMirror
 * prevents every Escape and Enter keydown, so an Escape, or an Enter with a modifier, that no handler takes stays
 * unprevented for the browser and the host; a plain Enter keeps ProseMirror's
 * own handling, which mobile keyboards need.
 */
export const createKeyGuard = (
    tabMovesFocus: () => boolean,
    enterKeys: () => EnterKeys | undefined,
    behavior: () => AuthoringPolicy['enterBehavior'],
) =>
    new Plugin({
        key: new PluginKey('rte.key-guard'),
        props: {
            // The untrusted Enter that ProseMirror sends after a mobile keyboard's `beforeinput` changes nothing either.
            handleKeyDown: (_, event) => event.key === 'Enter' && enterKeys()?.singleLine === true,
            handleDOMEvents: {
                // A single-line field takes no new block or line from the keyboard, on mobile ones too.
                beforeinput: (_, event) => {
                    const { inputType } = event;
                    if (enterKeys()?.singleLine !== true) {
                        return false;
                    }
                    if (inputType !== 'insertParagraph' && inputType !== 'insertLineBreak') {
                        return false;
                    }
                    event.preventDefault();
                    return true;
                },
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
                    const keys = enterKeys();
                    if (keys !== undefined && !showsOptions(view.state) && takesEnter(view, event, keys, behavior())) {
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
export const breakBefore = (state: EditorState): { readonly from: number; readonly to: number } | undefined => {
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
