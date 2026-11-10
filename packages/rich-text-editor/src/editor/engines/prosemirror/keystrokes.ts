/* (c) Copyright Frontify Ltd., all rights reserved. */

import { baseKeymap, chainCommands, setBlockType } from 'prosemirror-commands';
import { history, redo, undo } from 'prosemirror-history';
import { InputRule, inputRules, undoInputRule, wrappingInputRule } from 'prosemirror-inputrules';
import { keymap } from 'prosemirror-keymap';
import { type MarkType as PmMarkType, type Node as PmNode, type Schema } from 'prosemirror-model';
import {
    type Command,
    type EditorState,
    Plugin,
    type Plugin as PmPlugin,
    TextSelection,
    type Transaction,
} from 'prosemirror-state';

import { type EditorControlApi, type HotkeyHandler, type PluginRegistry, type RteInputRule } from '#/core';

import { keepCarriedAttrs } from './controlApi';
import { EXTRA_ATTR, valueAttrsFor } from './documentConversion';
import { listKeys } from './lists';

/**
 * What happens when a key is pressed, as one ordered list of ProseMirror plugins.
 * Order is precedence: the first plugin to handle a key wins, so keep the list
 * in `keystrokePipeline` matching the numbers used below.
 *
 * 0. Every handler below steps aside for keys that enter text rather than
 *    command the editor (an input method's, AltGr combinations).
 * 1. Undo / redo, and Backspace right after a typing rewrite (takes the rewrite back).
 * 2. Feature hotkeys (Mod-b, ...). Before the list keys so a feature can take a
 *    key lists would claim (`blurOnBreak` takes Enter).
 * 3. List keys (Enter, Tab, Shift-Tab, Backspace); only present when a list exists.
 * 4. Typing rewrites: declared `RteInputRule`s (`**bold**`, `- `, `-->`); held until a composition ends.
 * 5. Baseline keymap, plus Backspace resetting an emptied first heading.
 *
 * Mark input rules build their own transaction instead of calling
 * `api.marks.toggle`, because the input-rule machinery owns undo grouping.
 */

export const keystrokePipeline = (registry: PluginRegistry, schema: Schema, api: EditorControlApi): PmPlugin[] => {
    const hasLists = registry.itemTypeByList.size > 0;
    const excludedMarks = marksExcludingInputRules(registry, schema);

    return [
        // 1
        history(),
        keymap({
            'Mod-z': chainCommands(undoInputRule, undo),
            'Mod-y': redo,
            'Mod-Shift-z': redo,
            Backspace: undoInputRule,
        }),
        // 2
        keymap(featureHotkeys(registry.hotkeys, api)),
        characterHotkeys(registry.hotkeys, excludedMarks, api),
        // 3
        ...(hasLists ? [keymap(listKeys(api, registry.itemTypeByList))] : []),
        // 4
        ...typingRewrites(registry, schema, excludedMarks),
        // 5
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

const WORD_BOUNDARY_BEFORE = /[\s([{<'"“‘]/;

/** The start of the block, or after whitespace or opening punctuation. An inline element counts as a space. */
const isAtWordStart = (state: EditorState, from: number): boolean => {
    const $from = state.doc.resolve(from);
    if ($from.parentOffset === 0) {
        return true;
    }
    const before = $from.parent.textBetween($from.parentOffset - 1, $from.parentOffset, undefined, ' ');
    return WORD_BOUNDARY_BEFORE.test(before);
};

/**
 * Character hotkeys fire on the character being TYPED, not on the keys pressed
 * (on a Swiss Mac `@` is Option-G, which a keymap would read as `Alt-@`). They
 * only fire at a word start: `@` in `noah@frontify.com` is not a mention.
 * Text carrying a mark that opts out of rules (inline code) is typed as is.
 */
const characterHotkeys = (
    hotkeys: PluginRegistry['hotkeys'],
    excludedMarks: readonly PmMarkType[],
    api: EditorControlApi,
): PmPlugin => {
    return new Plugin({
        props: {
            handleTextInput: (view, from, _to, text) => {
                // Mid-composition the character is not typed yet: the IME owns it.
                if (view.composing) {
                    return false;
                }
                const handlers = isCharacterHotkey(text) ? hotkeys.get(text) : undefined;
                if (!handlers || !isAtWordStart(view.state, from)) {
                    return false;
                }
                const marks = view.state.storedMarks ?? view.state.doc.resolve(from).marks();
                if (excludedMarks.some((markType) => markType.isInSet(marks))) {
                    return false;
                }
                return runUntilHandled(handlers, api);
            },
        },
    });
};

// Typing rewrites: one function per `RteInputRule` kind
//
// Each `xxxRule` turns a declared rule into an engine `InputRule`, or `null`
// when it names a mark or block no mounted feature provides.

type RuleHandler = (state: EditorState, match: RegExpMatchArray, start: number, end: number) => Transaction | null;
type RulePattern = { pattern: RegExp; handler: RuleHandler };

/** What every kind's translation needs: the schema, the registry, and the marks that opt out of rules. */
type RuleContext = {
    schema: Schema;
    registry: PluginRegistry;
    excludedMarks: readonly PmMarkType[];
};

/** The marks that opt out of typing rules (inline code). */
const marksExcludingInputRules = (registry: PluginRegistry, schema: Schema): PmMarkType[] =>
    [...registry.marks]
        .filter(([, definition]) => definition.excludesInputRules === true)
        .flatMap(([type]) => schema.marks[type] ?? []);

const typingRewrites = (registry: PluginRegistry, schema: Schema, excludedMarks: readonly PmMarkType[]): PmPlugin[] => {
    const context: RuleContext = { schema, registry, excludedMarks };
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

type RuleOfKind<Kind extends RteInputRule['kind']> = Extract<RteInputRule, { kind: Kind }>;

const escapeForRegExp = (text: string): string => text.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Text carrying a mark that opts out (inline code) is typed as is: the rule steps aside. */
const unlessInExcludedMark =
    (excluded: readonly PmMarkType[], handler: RuleHandler): RuleHandler =>
    (state, match, start, end) => {
        const marks = state.storedMarks ?? state.doc.resolve(end).marks();
        return excluded.some((markType) => markType.isInSet(marks)) ? null : handler(state, match, start, end);
    };

/**
 * A text rule leaves text alone when any of it carries a mark that opts out of rules (inline code).
 */
const unlessRangeHasExcludedMark =
    (excluded: readonly PmMarkType[], handler: RuleHandler): RuleHandler =>
    (state, match, start, end) => {
        if (excluded.some((markType) => state.doc.rangeHasMark(start, end, markType))) {
            return null;
        }
        return handler(state, match, start, end);
    };

const withoutStateFlags = (pattern: RegExp): string => pattern.flags.replaceAll(/[gy]/g, '');

const toInputRule = ({ pattern, handler }: RulePattern, { excludedMarks }: RuleContext): InputRule =>
    new InputRule(pattern, unlessInExcludedMark(excludedMarks, handler));

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
    const pattern = new RegExp(`(?:^|[^${firstChar}])${escaped}([^${firstChar}]+)${escaped}$`);

    const handler: RuleHandler = (state, match, start, end) => {
        const content = match[1];
        if (!content) {
            return null;
        }
        // The match may include that preceding character. Derive every position
        // from `start`: the closing delimiter's last character is still to come
        // while typing, but already in the document after a composition.
        const leading = match[0].length - (delimiter.length * 2 + content.length);
        const from = start + leading;
        const contentFrom = from + delimiter.length;
        const contentTo = contentFrom + content.length;
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

/** Punctuation and closing quotes that end a sentence or quotation rather than a link, though a link may contain them. */
const TRAILING_PUNCTUATION = /[.,;:!?"'”’]$/;

const count = (text: string, character: string): number => text.split(character).length - 1;

/** Drops trailing punctuation, and a trailing `)` only while it has no `(` to close. */
export const trimTrailingPunctuation = (address: string): string => {
    let trimmed = address;
    for (;;) {
        const unbalanced = trimmed.endsWith(')') && count(trimmed, ')') > count(trimmed, '(');
        if (!unbalanced && !TRAILING_PUNCTUATION.test(trimmed)) {
            return trimmed;
        }
        trimmed = trimmed.slice(0, -1);
    }
};

/**
 * `https://example.com ` -> the address carries the mark, the space does not.
 * Punctuation right before the space is left out of the mark, and the address
 * may follow an opening bracket or quote. A token that
 * already carries the mark, or one that opts out of rules, stays as typed.
 */
const markPatternRule = (rule: RuleOfKind<'markPattern'>, context: RuleContext): InputRule | null => {
    const markType = context.schema.marks[rule.mark];
    if (!markType) {
        return null;
    }
    const flags = withoutStateFlags(rule.pattern);
    const token = new RegExp(`^(?:${rule.pattern.source})$`, flags);
    const pattern = new RegExp(`(?:^|${WORD_BOUNDARY_BEFORE.source})((?:${rule.pattern.source}))\\s$`, flags);

    const handler: RuleHandler = (state, match, start, end) => {
        const typed = match[1];
        if (!typed) {
            return null;
        }
        const linked = trimTrailingPunctuation(typed);
        if (!token.test(linked)) {
            return null;
        }
        // The match is the token plus the space, and maybe the whitespace before the token.
        const from = start + (match[0].length - 1 - typed.length);
        const to = from + linked.length;
        if ([markType, ...context.excludedMarks].some((type) => state.doc.rangeHasMark(from, to, type))) {
            return null;
        }
        const value = rule.value(linked);
        if (value === null) {
            return null;
        }
        // One space follows the token, whatever sits there now: nothing, the composed space, or the selection the typed space replaces.
        return state.tr
            .addMark(from, to, markType.create(valueAttrsFor(value)))
            .replaceWith(from + typed.length, end, state.schema.text(' '))
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

/** `- ` at the start of a block wraps it in a list. */
const listRule = (rule: RuleOfKind<'list'>, { schema, registry }: RuleContext): InputRule | null => {
    const listType = schema.nodes[rule.list];
    return listType && registry.itemTypeByList.has(rule.list)
        ? wrappingInputRule(new RegExp(`^${escapeForRegExp(rule.match)}$`), listType)
        : null;
};

/**
 * A rule's `match` as a pattern anchored to the end of the text before the caret, then `suffix`.
 */
const textPattern = (match: string | RegExp, suffix: string): RegExp => {
    if (typeof match === 'string') {
        return new RegExp(`${escapeForRegExp(match)}${suffix}`);
    }
    return new RegExp(`(?:${match.source})${suffix}`, withoutStateFlags(match));
};

/**
 * `$1` in a rule's `replace` stands for the first group of its pattern.
 */
const withGroups = (replace: string, found: RegExpMatchArray): string =>
    replace.replaceAll(/\$(\d)/g, (_, group: string) => found[Number(group)] ?? '');

/** `->` -> `→`. The replacement carries the marks the matched text did. */
const textRule = (rule: RuleOfKind<'text'>, context: RuleContext): InputRule => {
    if (rule.waitForRunEnd) {
        return runEndTextRule(rule, context);
    }
    const { match, replace } = rule;
    const pattern = textPattern(match, '$');
    // `start` to `end` is the part of the match in the document: replacing it swaps all of it, typed character or not.
    const handler: RuleHandler = (state, found, start, end) =>
        state.tr.insertText(withGroups(replace, found), start, end);
    return toInputRule({ pattern, handler: unlessRangeHasExcludedMark(context.excludedMarks, handler) }, context);
};

/**
 * The characters that end a run: whitespace and sentence punctuation. Not quotes: one may close the quotation the run sits in, as in `"wait --"`.
 */
const RUN_END = /[\s,;:!?)\]}…]/;

/**
 * `--` becomes a dash once a character that ends the run is typed, which stays.
 */
const runEndTextRule = (rule: RuleOfKind<'text'>, context: RuleContext): InputRule => {
    const { match, replace } = rule;
    const pattern = textPattern(match, '[\\s\\S]$');
    const handler: RuleHandler = (state, found, start, end) => {
        const typed = found[0].slice(-1);
        if (!RUN_END.test(typed)) {
            return null;
        }
        const runEnd = start + found[0].length - typed.length;
        // The replacement keeps the marks of what it replaces.
        const replaced = state.doc.resolve(start).marksAcross(state.doc.resolve(runEnd)) ?? [];
        // After a composition the ending character is already in the document: only the run before it is replaced.
        if (runEnd + typed.length === end) {
            return state.tr.replaceWith(start, runEnd, state.schema.text(withGroups(replace, found), replaced));
        }
        // While typing the ending character is still to come, and it carries the marks typing carries.
        const typedMarks = state.storedMarks ?? state.selection.$from.marks();
        return state.tr.replaceWith(start, end, [
            state.schema.text(withGroups(replace, found), replaced),
            state.schema.text(typed, typedMarks),
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
