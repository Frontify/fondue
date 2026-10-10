/* (c) Copyright Frontify Ltd., all rights reserved. */

import { macBaseKeymap, pcBaseKeymap } from 'prosemirror-commands';
import { keydownHandler } from 'prosemirror-keymap';
import { type NodeType } from 'prosemirror-model';
import { Plugin, PluginKey, TextSelection } from 'prosemirror-state';

import { BASE_KEYS_PLUGIN, CONTAINER_KEYS_PLUGIN } from '#/model/capabilities';
import { isApple, modOn } from '#/model/platform';

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
 * handler, keymap or toolbar shortcut acts on it (SPEC-rich-text-editing/AC-003, AC-074).
 */
export const passesToBrowser = (event: KeyboardEvent): boolean =>
    event.isComposing || event.keyCode === 229 || typesThroughAltGraph(event);

/** Whether a keydown holds no Shift, Alt, Ctrl or ⌘. */
const unmodified = (event: KeyboardEvent): boolean =>
    !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey;

/**
 * Composition keys and AltGr characters reach the browser before any keymap runs (Key precedence row 1). ProseMirror
 * prevents every Escape and Enter keydown, so an Escape, or an Enter with a modifier, that no handler takes stays
 * unprevented for the browser and the host (SPEC-rich-text-editing/AC-002, row 10); a plain Enter keeps ProseMirror's
 * own handling, which mobile keyboards need.
 */
export const keyGuard = new Plugin({
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
 * Whether `type` is a container: a block whose content takes only blocks, such as a quote, and not a list item,
 * table cell or figure, which are no blocks or take other content (SPEC-rich-text-editing/AC-026).
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
                const owner = view.dom.ownerDocument.defaultView;
                if (owner !== null && isApple(owner.navigator)) {
                    return BASE_KEYS.apple(view, event);
                }
                return BASE_KEYS.other(view, event);
            },
        },
    });
