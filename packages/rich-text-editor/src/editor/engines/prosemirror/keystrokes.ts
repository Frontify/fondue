/* (c) Copyright Frontify Ltd., all rights reserved. */

import { baseKeymap, setBlockType } from 'prosemirror-commands';
import { history, redo } from 'prosemirror-history';
import { InputRule, inputRules, undoInputRule } from 'prosemirror-inputrules';
import { keymap } from 'prosemirror-keymap';
import { type Mark as PmMark, type Node as PmNode, type Schema } from 'prosemirror-model';
import { type Command, type EditorState, Plugin, type Plugin as PmPlugin, TextSelection } from 'prosemirror-state';
import { canJoin, findWrapping } from 'prosemirror-transform';

import {
    type EditorControlApi,
    type HotkeyHandler,
    INLINE_PLACEHOLDER,
    type PluginRegistry,
    REDO_HOTKEY,
    type RteInputRule,
    UNDO_HOTKEY,
    WORD_START_CONTEXT,
} from '#/core';

import { autolinkOnEnter, markPatternRule } from './autolink';
import { keepCarriedAttrs, undoStep } from './controlApi';
import { EXTRA_ATTR } from './documentConversion';
import { listKeys } from './lists';
import {
    type RuleContext,
    type RuleHandler,
    type RuleOfKind,
    ruleContext,
    toInputRule,
    touchesExcludedMark,
    unlessRangeHasExcludedMark,
    withoutStateFlags,
} from './ruleContext';

/**
 * What happens when a key is pressed, as one ordered list of ProseMirror plugins.
 * Order is precedence: the first plugin to handle a key wins, so keep the list
 * in `keystrokePipeline` matching the numbers used below.
 *
 * 0. Every handler below steps aside for keys that enter text rather than
 *    command the editor (an input method's, AltGr combinations).
 * 1. Undo / redo, and Backspace right after a typing rewrite (takes the rewrite back).
 * 2. Enter and Shift-Enter link the address before the caret once the key has acted;
 *    Backspace right after takes the link back.
 * 3. Feature hotkeys (Mod-b, ...). Before the list keys so a feature can take a
 *    key lists would claim (`blurOnBreak` takes Enter).
 * 4. List keys (Enter, Tab, Shift-Tab, Backspace); only present when a list exists.
 * 5. Typing rewrites: declared `RteInputRule`s (`**bold**`, `- `, `-->`); held until a composition ends.
 * 6. Baseline keymap, plus Backspace resetting an emptied first heading.
 *
 * Mark input rules build their own transaction instead of calling
 * `api.marks.toggle`, because the input-rule machinery owns undo grouping.
 */

export const keystrokePipeline = (registry: PluginRegistry, schema: Schema, api: EditorControlApi): PmPlugin[] => {
    const hasLists = registry.itemTypeByList.size > 0;

    return [
        // 1
        history(),
        keymap({
            [UNDO_HOTKEY]: undoStep,
            'Mod-y': redo,
            [REDO_HOTKEY]: redo,
            Backspace: undoInputRule,
        }),
        // 2
        ...autolinkOnEnter(registry, schema),
        // 3
        keymap(featureHotkeys(registry.hotkeys, api)),
        characterHotkeys(registry.hotkeys, api),
        // 4
        ...(hasLists ? [keymap(listKeys(api, registry.itemTypeByList))] : []),
        // 5
        ...typingRewrites(registry, schema),
        // 6
        keymap({ Backspace: resetEmptyFirstBlock }),
        keymap(baseKeymap),
    ].map(ignoringTextEntryKeys);
};

// Text entry keys

// A Mac has no AltGr key, yet Firefox on macOS reports Option as AltGraph.
const isApple = (): boolean => typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

/**
 * A key an input method or an AltGr combination sends is text, not a command:
 * Enter that commits a composition must not split the block, and AltGr+q (`@` on
 * a German layout, Ctrl+Alt on Windows) must not run a Mod-Alt hotkey.
 */
const isTextEntryKey = (event: KeyboardEvent): boolean =>
    // `keyCode` 229 marks the input method's keydowns that `isComposing` misses, just before and after a composition.
    event.isComposing || event.keyCode === 229 || (!isApple() && (event.getModifierState?.('AltGraph') ?? false)); // NOSONAR

/**
 * The plugin with its key handler skipping those keys. It declines them rather
 * than claiming them: a claimed keydown is `preventDefault`ed, which would stop
 * the browser from typing the character.
 */
const ignoringTextEntryKeys = (plugin: PmPlugin): PmPlugin => {
    const { handleKeyDown } = plugin.props;
    if (!handleKeyDown) {
        return plugin;
    }
    return new Plugin({
        ...plugin.spec,
        props: {
            ...plugin.props,
            // ProseMirror itself calls this with plain `Event`s for Android's Enter and Backspace.
            handleKeyDown: (view, event) => !isTextEntryKey(event) && handleKeyDown.call(plugin, view, event),
        },
    });
};

// Feature hotkeys

/** `@`, not `Mod-b`: a hotkey that names a character rather than a key combination. */
const isCharacterHotkey = (keys: string): boolean => [...keys].length === 1;

/** Handlers for the same key run in mount order until one returns anything but `false`. */
const runUntilHandled = (handlers: readonly HotkeyHandler[], api: EditorControlApi): boolean =>
    handlers.some((handler) => handler(api) !== false);

const featureHotkeys = (hotkeys: PluginRegistry['hotkeys'], api: EditorControlApi): Record<string, Command> =>
    Object.fromEntries(
        [...hotkeys]
            .filter(([keys]) => !isCharacterHotkey(keys))
            .map(([keys, handlers]): [string, Command] => [keys, () => runUntilHandled(handlers, api)]),
    );

// An inline element is a word start here, so `@name` fires after a soft break; it cannot yet tell a mention from a soft break.
const WORD_BOUNDARY_BEFORE = new RegExp(`[${WORD_START_CONTEXT}${INLINE_PLACEHOLDER}]`);

/** The start of the block, or after whitespace, opening punctuation or an inline element. */
const isAtWordStart = (state: EditorState, from: number): boolean => {
    const $from = state.doc.resolve(from);
    if ($from.parentOffset === 0) {
        return true;
    }
    const before = $from.parent.textBetween($from.parentOffset - 1, $from.parentOffset, undefined, INLINE_PLACEHOLDER);
    return WORD_BOUNDARY_BEFORE.test(before);
};

/**
 * Character hotkeys fire on the character being TYPED, not on the keys pressed
 * (on a Swiss Mac `@` is Option-G, which a keymap would read as `Alt-@`). They
 * only fire at a word start: `@` in `noah@frontify.com` is not a mention.
 */
const characterHotkeys = (hotkeys: PluginRegistry['hotkeys'], api: EditorControlApi): PmPlugin =>
    new Plugin({
        props: {
            handleTextInput: (view, from, _to, text) => {
                // Mid-composition the character is not typed yet: the IME owns it.
                if (view.composing) {
                    return false;
                }
                const handlers = isCharacterHotkey(text) ? hotkeys.get(text) : undefined;
                return handlers && isAtWordStart(view.state, from) ? runUntilHandled(handlers, api) : false;
            },
        },
    });

// Typing rewrites: one function per `RteInputRule` kind
//
// Each `xxxRule` turns a declared rule into an engine `InputRule`, or `null`
// when it names a mark or block no mounted feature provides.

const typingRewrites = (registry: PluginRegistry, schema: Schema): PmPlugin[] => {
    const context = ruleContext(registry, schema);
    // The registry orders rules longest delimiter first; otherwise `**bold**`
    // reads as an italic `*` wrapping `*bold*`.
    const rules = registry.inputRules.flatMap((rule) => toEngineRule(rule, context) ?? []);

    return rules.length > 0 ? [rewritingOnlyComposedText(inputRules({ rules }))] : [];
};

/**
 * The rules run again when a composition ends, so mobile keyboards, which
 * compose ordinary typing, still get them. That run is skipped when the
 * composition left the document as it was: a keyboard recomposing the word
 * before the caret would otherwise redo a rewrite Backspace just took back.
 * This replaces the engine's own run, which waits a second timeout an unmount
 * can fall between. The plugin is edited in place: its undo bookkeeping is
 * keyed by the instance.
 */
const rewritingOnlyComposedText = (plugin: PmPlugin): PmPlugin => {
    const runRules = plugin.props.handleTextInput;
    if (!runRules) {
        return plugin;
    }
    let docAtStart: PmNode | null = null;
    plugin.props.handleDOMEvents = {
        ...plugin.props.handleDOMEvents,
        compositionstart: (view) => {
            docAtStart = view.state.doc;
            return false;
        },
        compositionend: (view) => {
            // Taken now: the next composition can start before the timeout runs.
            const started = docAtStart;
            // The last composed characters can land after `compositionend`.
            setTimeout(() => {
                if (view.isDestroyed || (started && view.state.doc.eq(started))) {
                    return;
                }
                const { selection } = view.state;
                if (selection instanceof TextSelection && selection.$cursor) {
                    const { pos } = selection.$cursor;
                    runRules.call(plugin, view, pos, pos, '', () => view.state.tr);
                }
            });
            return false;
        },
    };
    return plugin;
};

const toEngineRule = (rule: RteInputRule, context: RuleContext): InputRule | null => {
    switch (rule.kind) {
        case 'mark': {
            return markRule(rule, context);
        }
        case 'markPattern': {
            return markPatternRule(rule, context);
        }
        case 'block': {
            return blockRule(rule, context);
        }
        case 'list': {
            return listRule(rule, context);
        }
        case 'text': {
            return textRule(rule, context);
        }
    }
};

/**
 * A character that glues a closing delimiter to what follows it: a letter, digit, underscore or full stop.
 */
const GLUING_CHARACTER = /[\p{L}\p{N}_.]/u;

/**
 * Whether the text right after `pos` starts with a character that glues it to the word before.
 */
const isGluedAfter = (state: EditorState, pos: number): boolean => {
    const $pos = state.doc.resolve(pos);
    const { parent, parentOffset } = $pos;
    const next = parent.textBetween(parentOffset, Math.min(parentOffset + 1, parent.content.size), '', ' ');
    return GLUING_CHARACTER.test(next);
};

const escapeForRegExp = (text: string): string => text.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** `**bold**` -> a bold mark over `bold`. The engine ships block and text rules but no mark rule. */
const markRule = (rule: RuleOfKind<'mark'>, context: RuleContext): InputRule | null => {
    const markType = context.schema.marks[rule.key];
    if (!markType) {
        return null;
    }
    const { delimiter } = rule;
    const escaped = escapeForRegExp(delimiter);
    const firstChar = escapeForRegExp(delimiter.charAt(0));
    // The character before the opening delimiter must not be the delimiter
    // itself, or typing `**bold**` fires the italic rule on `**bold*` first.
    let before = `[^${firstChar}]`;
    if (rule.wordBounded === true) {
        before = `[${WORD_START_CONTEXT}]`;
    }
    const pattern = new RegExp(`(?:^|${before})${escaped}([^${firstChar}]+)${escaped}$`);

    const handler: RuleHandler = (state, match, start, end) => {
        const content = match[1];
        if (!content) {
            return null;
        }
        if (rule.wordBounded === true && isGluedAfter(state, end)) {
            return null;
        }
        // The match may include that preceding character. Derive every position
        // from `start`: the closing delimiter's last character is still to come
        // while typing, but already in the document after a composition.
        const leading = match[0].length - (delimiter.length * 2 + content.length);
        const from = start + leading;
        const contentFrom = from + delimiter.length;
        const contentTo = contentFrom + content.length;
        // Content may carry an excluded mark; the delimiters the rule deletes may not.
        if (
            touchesExcludedMark(state, context.excludedMarks, from, contentFrom) ||
            touchesExcludedMark(state, context.excludedMarks, contentTo, end)
        ) {
            return null;
        }
        // Only the delimiters go, closing first so the opening one's position
        // holds: the content stays as it is, inline elements and marks included.
        return state.tr
            .delete(contentTo, end)
            .delete(from, contentFrom)
            .addMark(from, contentTo - delimiter.length, markType.create())
            .removeStoredMark(markType);
    };
    return toInputRule({ pattern, handler }, context);
};

/**
 * `# ` at the start of a block turns it into another block type. The engine's
 * `textblockTypeInputRule`, except that the attributes every text block carries
 * (alignment) stay.
 */
const blockRule = (rule: RuleOfKind<'block'>, { schema, registry }: RuleContext): InputRule | null => {
    const nodeType = schema.nodes[rule.block];
    if (!nodeType) {
        return null;
    }
    return new InputRule(new RegExp(`^${escapeForRegExp(rule.match)}$`), (state, _match, start, end) => {
        const $start = state.doc.resolve(start);
        if (!$start.node(-1).canReplaceWith($start.index(-1), $start.indexAfter(-1), nodeType)) {
            return null;
        }
        return state.tr
            .delete(start, end)
            .setBlockType(start, start, nodeType, keepCarriedAttrs(registry, nodeType, rule.attributes));
    });
};

/** `- ` at the start of a block wraps it in a list, its new item carrying `itemAttributes`. */
const listRule = (rule: RuleOfKind<'list'>, { schema, registry }: RuleContext): InputRule | null => {
    const listType = schema.nodes[rule.list];
    const itemName = registry.itemTypeByList.get(rule.list);
    if (!listType || itemName === undefined) {
        return null;
    }
    const pattern = new RegExp(`^${escapeForRegExp(rule.match)}$`);
    const { itemAttributes } = rule;
    // The engine's `wrappingInputRule` cannot set attributes on the item, so it is repeated here with them.
    return new InputRule(pattern, (state, _match, start, end) => {
        const transaction = state.tr.delete(start, end);
        const range = transaction.doc.resolve(start).blockRange();
        if (!range) {
            return null;
        }
        const wrapping = findWrapping(range, listType);
        if (!wrapping) {
            return null;
        }
        const wrappers = wrapping.map((wrapper) => {
            if (itemAttributes && wrapper.type.name === itemName) {
                return { ...wrapper, attrs: itemAttributes };
            }
            return wrapper;
        });
        transaction.wrap(range, wrappers);
        const before = transaction.doc.resolve(start - 1).nodeBefore;
        if (before?.type === listType && canJoin(transaction.doc, start - 1)) {
            transaction.join(start - 1);
        }
        return transaction;
    });
};

/**
 * Matches right at the caret.
 */
const AT_CARET = '$';

/**
 * Matches one character before the caret, the one that was just typed.
 */
const ONE_CHARACTER_BEFORE_CARET = String.raw`[\s\S]${AT_CARET}`;

/**
 * Matches a `$1`-style reference to a group of the rule's pattern. Not `$0`: a rule that waits for
 * the run to end matches the ending character too, so the whole match would repeat it.
 */
const GROUP_REFERENCE = /\$([1-9])/g;

/**
 * A rule's `match` as a pattern anchored to the end of the text before the caret, then `suffix`.
 * @param suffix - pattern source appended after the anchored match
 */
const textPattern = (match: string | RegExp, suffix: string): RegExp => {
    if (typeof match === 'string') {
        return new RegExp(`${escapeForRegExp(match)}${suffix}`);
    }
    return new RegExp(`(?:${match.source})${suffix}`, withoutStateFlags(match));
};

/**
 * How many capturing groups a pattern has, read from a match of an empty alternative, which always matches.
 */
const groupCount = (pattern: RegExp): number => {
    const empty = new RegExp(`${pattern.source}|`, withoutStateFlags(pattern)).exec('');
    if (empty === null) {
        throw new Error(`Text rule ${String(pattern)} could not be read.`);
    }
    return empty.length - 1;
};

/**
 * A rule's replacement for what it found. `$1` stands for the first group of a pattern; a string
 * `match` has none, so its `replace` is taken as written. A reference to a group the pattern does
 * not have throws when the editor is built, not at the keystroke.
 */
const replacementOf = ({ match, replace }: RuleOfKind<'text'>): ((found: RegExpMatchArray) => string) => {
    if (typeof match === 'string') {
        return () => replace;
    }
    const groups = groupCount(match);
    for (const [reference, group] of replace.matchAll(GROUP_REFERENCE)) {
        if (Number(group) > groups) {
            throw new Error(`Text rule ${String(match)} replaces with "${reference}", but has ${groups} group(s).`);
        }
    }
    // A group that took no part in the match stands for nothing, as in `String.prototype.replace`.
    return (found) => replace.replaceAll(GROUP_REFERENCE, (_, group: string) => found[Number(group)] ?? '');
};

/**
 * The marks typed text gets: stored marks first, so a mark toggled off just before typing stays off.
 */
const typingMarks = (state: EditorState): readonly PmMark[] => state.storedMarks ?? state.selection.$from.marks();

/**
 * The marks of the first character from `start` that lies before the selection, kept by a
 * replacement even where a mark such as a link ends there. Typing marks otherwise, so text typed
 * over a selection does not take the selected text's marks.
 */
const replacedMarks = (state: EditorState, start: number, end: number): readonly PmMark[] => {
    const first = start < Math.min(end, state.selection.from) ? state.doc.nodeAt(start) : null;
    if (first === null) {
        return typingMarks(state);
    }
    return first.marks;
};

/** `->` -> `→`. The replacement carries the marks the matched text did. */
const textRule = (rule: RuleOfKind<'text'>, context: RuleContext): InputRule => {
    if (rule.waitForRunEnd) {
        return runEndTextRule(rule, context);
    }
    const replacement = replacementOf(rule);
    const pattern = textPattern(rule.match, AT_CARET);
    // `start` to `end` is the part of the match in the document: replacing it swaps all of it, typed character or not.
    const handler: RuleHandler = (state, found, start, end) =>
        state.tr.replaceWith(start, end, state.schema.text(replacement(found), replacedMarks(state, start, end)));
    return toInputRule({ pattern, handler: unlessRangeHasExcludedMark(context.excludedMarks, handler) }, context);
};

/**
 * The characters that end a run unless the rule says otherwise: whitespace and sentence punctuation. Not
 * quotes: one may close the quotation the run sits in, as in `"wait --"`.
 */
const DEFAULT_RUN_END = /[\s,;:!?)\]}…]/;

/**
 * `--` becomes a dash once a character that ends the run is typed, which stays.
 */
const runEndTextRule = (rule: RuleOfKind<'text'>, context: RuleContext): InputRule => {
    const replacement = replacementOf(rule);
    const endsRun = rule.runEnd ?? DEFAULT_RUN_END;
    const pattern = textPattern(rule.match, ONE_CHARACTER_BEFORE_CARET);
    const handler: RuleHandler = (state, found, start, end) => {
        const typed = found[0].slice(-1);
        if (!endsRun.test(typed)) {
            return null;
        }
        const runEnd = start + found[0].length - typed.length;
        const replaced = replacedMarks(state, start, runEnd);
        // After a composition the ending character is already in the document: only the run before it is replaced.
        if (state.selection.empty && runEnd + typed.length === end) {
            return state.tr.replaceWith(start, runEnd, state.schema.text(replacement(found), replaced));
        }
        // While typing the ending character is still to come, and it carries the marks typing carries.
        return state.tr.replaceWith(start, end, [
            state.schema.text(replacement(found), replaced),
            state.schema.text(typed, typingMarks(state)),
        ]);
    };
    return toInputRule({ pattern, handler: unlessRangeHasExcludedMark(context.excludedMarks, handler) }, context);
};

// Baseline

/**
 * Backspace in an emptied block at the very top that is not the default block
 * (a heading): nothing before it to join, so it turns back into a paragraph.
 */
const resetEmptyFirstBlock: Command = (state, dispatch) => {
    const { $from, empty } = state.selection;
    const paragraph = state.schema.topNodeType.contentMatch.defaultType;
    const block = $from.parent;
    if (!empty || !paragraph || $from.depth !== 1 || $from.index(0) !== 0) {
        return false;
    }
    if (!block.isTextblock || block.content.size > 0 || block.type === paragraph) {
        return false;
    }
    // A plain paragraph, but its undeclared stored keys stay: the block is still there.
    return setBlockType(paragraph, { [EXTRA_ATTR]: block.attrs[EXTRA_ATTR] as unknown })(state, dispatch);
};
