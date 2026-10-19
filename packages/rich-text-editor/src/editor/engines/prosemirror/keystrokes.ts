/* (c) Copyright Frontify Ltd., all rights reserved. */

import { baseKeymap, chainCommands, setBlockType } from 'prosemirror-commands';
import { history, redo, undo } from 'prosemirror-history';
import { InputRule, inputRules, undoInputRule, wrappingInputRule } from 'prosemirror-inputrules';
import { keymap } from 'prosemirror-keymap';
import { type MarkType as PmMarkType, type Schema } from 'prosemirror-model';
import { type Command, type EditorState, Plugin, type Plugin as PmPlugin, type Transaction } from 'prosemirror-state';

import { type EditorControlApi, type HotkeyHandler, type PluginRegistry, type RteInputRule } from '#/core';

import { keepCarriedAttrs } from './controlApi';
import { valueAttrsFor } from './documentConversion';
import { listKeys } from './lists';

/**
 * What happens when a key is pressed, as one ordered list of ProseMirror plugins.
 * Order is precedence: the first plugin to handle a key wins, so keep the list
 * in `keystrokePipeline` matching the numbers used below.
 *
 * 1. Undo / redo, and Backspace right after a typing rewrite (takes the rewrite back).
 * 2. Feature hotkeys (Mod-b, ...). Before the list keys so a feature can take a
 *    key lists would claim (`blurOnBreak` takes Enter).
 * 3. List keys (Enter, Tab, Shift-Tab, Backspace); only present when a list exists.
 * 4. Typing rewrites: declared `RteInputRule`s (`**bold**`, `- `, `-->`).
 * 5. Baseline keymap, plus Backspace resetting an emptied first heading.
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
            'Mod-z': chainCommands(undoInputRule, undo),
            'Mod-y': redo,
            'Mod-Shift-z': redo,
            Backspace: undoInputRule,
        }),
        // 2
        keymap(featureHotkeys(registry.hotkeys, api)),
        characterHotkeys(registry.hotkeys, api),
        // 3
        ...(hasLists ? [keymap(listKeys(api, registry.itemTypeByList))] : []),
        // 4
        ...typingRewrites(registry, schema),
        // 5
        keymap({ Backspace: resetEmptyFirstBlock }),
        keymap(baseKeymap),
    ];
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

type RuleHandler = (state: EditorState, match: RegExpMatchArray, start: number, end: number) => Transaction | null;
type RulePattern = { pattern: RegExp; handler: RuleHandler };

/** What every kind's translation needs: the schema, the registry, and the marks that opt out of rules. */
type RuleContext = {
    schema: Schema;
    registry: PluginRegistry;
    excludedMarks: readonly PmMarkType[];
};

const typingRewrites = (registry: PluginRegistry, schema: Schema): PmPlugin[] => {
    const excludedMarks = [...registry.marks]
        .filter(([, definition]) => definition.excludesInputRules === true)
        .flatMap(([type]) => schema.marks[type] ?? []);
    const context: RuleContext = { schema, registry, excludedMarks };
    // The registry orders rules longest delimiter first; otherwise `**bold**`
    // reads as an italic `*` wrapping `*bold*`.
    const rules = registry.inputRules.flatMap((rule) => toEngineRule(rule, context) ?? []);

    return rules.length > 0 ? [inputRules({ rules })] : [];
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
        // The match may include that preceding character. Derive the opening
        // delimiter from `start`: `end` is where the just-typed character will
        // land, so the closing delimiter is still one character short.
        const leading = match[0].length - (delimiter.length * 2 + content.length);
        const from = start + leading;
        const contentFrom = from + delimiter.length;
        const contentTo = end - (delimiter.length - 1);
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

/** Punctuation that ends a sentence rather than a link, though a link may contain it. */
const TRAILING_PUNCTUATION = /[.,;:!?]+$/;

const count = (text: string, character: string): number => text.split(character).length - 1;

/** Drops trailing punctuation, and a trailing `)` only while it has no `(` to close. */
const trimTrailingPunctuation = (address: string): string => {
    let trimmed = address;
    for (;;) {
        const next = trimmed.replace(TRAILING_PUNCTUATION, '');
        const unbalanced = next.endsWith(')') && count(next, ')') > count(next, '(');
        if (!unbalanced && next === trimmed) {
            return trimmed;
        }
        trimmed = unbalanced ? next.slice(0, -1) : next;
    }
};

/**
 * `https://example.com ` -> the address carries the mark, the space does not.
 * Punctuation right before the space is left out of the mark. A token that
 * already carries the mark, or one that opts out of rules, stays as typed.
 */
const markPatternRule = (rule: RuleOfKind<'markPattern'>, context: RuleContext): InputRule | null => {
    const markType = context.schema.marks[rule.mark];
    if (!markType) {
        return null;
    }
    const flags = withoutStateFlags(rule.pattern);
    const token = new RegExp(`^(?:${rule.pattern.source})$`, flags);
    const pattern = new RegExp(`(?:^|\\s)((?:${rule.pattern.source}))\\s$`, flags);

    const handler: RuleHandler = (state, match, start, end) => {
        const typed = match[1];
        if (!typed) {
            return null;
        }
        const linked = trimTrailingPunctuation(typed);
        if (!token.test(linked)) {
            return null;
        }
        // The match is the token plus the space being typed (not in the
        // document yet), and maybe the whitespace before the token.
        const from = start + (match[0].length - 1 - typed.length);
        const to = from + linked.length;
        if ([markType, ...context.excludedMarks].some((type) => state.doc.rangeHasMark(from, to, type))) {
            return null;
        }
        return state.tr
            .addMark(from, to, markType.create(valueAttrsFor(rule.value(linked))))
            .insert(end, state.schema.text(' '))
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
    return setBlockType(paragraph)(state, dispatch);
};
