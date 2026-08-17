/* (c) Copyright Frontify Ltd., all rights reserved. */

import { baseKeymap } from 'prosemirror-commands';
import { history, redo, undo } from 'prosemirror-history';
import { InputRule, inputRules, textblockTypeInputRule, wrappingInputRule } from 'prosemirror-inputrules';
import { keymap } from 'prosemirror-keymap';
import { type Schema } from 'prosemirror-model';
import { type Command, type Plugin as PmPlugin } from 'prosemirror-state';

import { type EditorControlApi, type RteInputRule, type RtePlugin } from '#/core';

import { declaredTriggers, triggerTrackingPlugin } from './autocomplete';
import { listKeys } from './lists';
import { type SchemaBundle } from './schema';

/**
 * What happens when a key is pressed. Assembled once at mount; the handlers it
 * registers then run on every keystroke.
 *
 * The engine consults these in order, and the first one to claim the key wins:
 *
 * 1. Undo and redo.
 * 2. A feature's own hotkeys (Mod-b, Mod-i, …). Several features may bind the
 *    same key; they run in mount order until one reports it handled it.
 * 3. The list keys — Enter, Tab, Shift-Tab — but only when some feature declared
 *    a list. They report "not handled" outside a list, so they fall through.
 * 4. Typing rewrites: the input rules that turn `**bold**` into bold text and
 *    `- ` into a list.
 * 5. Trigger tracking, which watches the result to see whether the caret is now
 *    typing after a `@`. Not a key handler — it observes.
 * 6. The engine's baseline keymap: Enter, Backspace, and everything else an
 *    editor does without being asked.
 *
 * Three invariants, each marked at the line that carries it:
 *
 * (1) The array order below IS the precedence. Reordering it changes which
 *     feature gets a key, so keep it matched to the list above.
 * (2) A feature's hotkeys come before the list keys, so a feature may take a key
 *     the list behaviour would otherwise claim — how `blurOnBreak` gets Enter.
 * (3) Longer mark delimiters are tried first, or `**bold**` is read as an italic
 *     `*` wrapping `*bold*`.
 *
 * One place the seam leaks, worth knowing: a mark can be applied three ways and
 * only two go through `EditorControlApi`. The toolbar button and the hotkey
 * both call `api.marks.toggle`; typing `**bold**` hits `markInputRule` below,
 * which builds its transaction directly. Deliberate — the engine's input-rule
 * machinery owns undo grouping, so a rewrite has to be one transaction it
 * controls.
 */

// (2) A feature's own hotkeys

/** Handlers for the same key run in mount order until one returns anything but `false`. */
const featureHotkeys = (features: RtePlugin[], getApi: () => EditorControlApi): Record<string, Command> => {
    const hotkeys = new Map<string, Array<(api: EditorControlApi) => boolean | void>>();
    for (const feature of features) {
        for (const [keys, command] of Object.entries(feature.hotkeys ?? {})) {
            const handlers = hotkeys.get(keys) ?? [];
            handlers.push(command);
            hotkeys.set(keys, handlers);
        }
    }

    return Object.fromEntries(
        Array.from(hotkeys, ([keys, handlers]): [string, Command] => [
            keys,
            () => handlers.some((handler) => handler(getApi()) !== false),
        ]),
    );
};

// (4) Typing rewrites
//
// A feature declares these (`inputRules`) rather than writing them, so the
// matching stays in one place. A rule naming a mark or block no mounted feature
// provides drops out.

const escapeForRegExp = (text: string): string => text.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * `**bold**` → a bold mark over `bold`. Written here rather than taken from the
 * engine, which ships block and text rules but no mark rule.
 */
const markInputRule = (delimiter: string, markName: string, schema: Schema): InputRule => {
    const escaped = escapeForRegExp(delimiter);
    const firstChar = escapeForRegExp(delimiter.charAt(0));
    // The character before the opening delimiter must not be the delimiter
    // itself, or typing `**bold**` fires the italic rule on `**bold*` first.
    const pattern = new RegExp(`(?:^|[^${firstChar}])${escaped}([^${firstChar}]+)${escaped}$`);

    return new InputRule(pattern, (state, match, start, end) => {
        const content = match[1];
        const markType = schema.marks[markName];
        if (!content || !markType) {
            return null;
        }
        // The match may include that preceding character; the rewrite starts
        // at the opening delimiter. It has to be derived from `start`, because
        // `end` is where the just-typed character will land — the closing
        // delimiter is still one character short in the document.
        const leading = match[0].length - (delimiter.length * 2 + content.length);
        const from = start + leading;
        return state.tr
            .delete(from, end)
            .insertText(content, from)
            .addMark(from, from + content.length, markType.create())
            .removeStoredMark(markType);
    });
};

/** `"` opens or closes depending on what precedes it — the one rule that has to look back. */
const quotesInputRule = (match: string, open: string, close: string): InputRule =>
    new InputRule(new RegExp(`${escapeForRegExp(match)}$`), (state, _match, start, end) => {
        const before = start > 0 ? state.doc.textBetween(start - 1, start) : '';
        const opens = before === '' || /[\s([{<'"“‘]/.test(before);
        return state.tr.insertText(opens ? open : close, start, end);
    });

/** One declared rule → zero or one engine rule (zero when it names a type no mounted feature provides). */
const toEngineRule = (rule: RteInputRule, schema: Schema, itemTypeByList: Map<string, string>): InputRule | null => {
    switch (rule.kind) {
        case 'text':
            return new InputRule(new RegExp(`${escapeForRegExp(rule.match)}$`), rule.replaceWith);
        case 'quotes':
            return quotesInputRule(rule.match, rule.open, rule.close);
        case 'mark':
            return markInputRule(rule.delimiter, rule.key, schema);
        case 'block': {
            const nodeType = schema.nodes[rule.block];
            return nodeType
                ? textblockTypeInputRule(
                      new RegExp(`^${escapeForRegExp(rule.match)}$`),
                      nodeType,
                      rule.attributes ?? null,
                  )
                : null;
        }
        case 'list': {
            const listType = schema.nodes[rule.list];
            return listType && itemTypeByList.has(rule.list)
                ? wrappingInputRule(new RegExp(`^${escapeForRegExp(rule.match)}$`), listType)
                : null;
        }
    }
};

const typingRewrites = (features: RtePlugin[], schema: Schema, itemTypeByList: Map<string, string>): PmPlugin[] => {
    const declared = features.flatMap((feature) => [...(feature.inputRules ?? [])]);
    // invariant (3): longer mark delimiters first. Everything else keeps its
    // declared order.
    const markRules = declared
        .filter((rule) => rule.kind === 'mark')
        .sort((left, right) => right.delimiter.length - left.delimiter.length);
    const ordered = [...markRules, ...declared.filter((rule) => rule.kind !== 'mark')];

    const rules = ordered.flatMap((rule) => {
        const engineRule = toEngineRule(rule, schema, itemTypeByList);
        return engineRule ? [engineRule] : [];
    });

    return rules.length > 0 ? [inputRules({ rules })] : [];
};

// The pipeline

/**
 * Everything above, in the order the engine consults it — the numbers match the
 * six steps in this file's header, and invariant (1) says to keep them matched.
 *
 * `getApi` is a thunk because this runs before the view exists (see editor.ts);
 * it is only ever called from a key handler, by which time the editor is live.
 */
export const keystrokePipeline = (
    features: RtePlugin[],
    bundle: SchemaBundle,
    getApi: () => EditorControlApi,
): PmPlugin[] => {
    const triggers = declaredTriggers(features);
    const hasLists = bundle.itemTypeByList.size > 0;

    return [
        // (1) undo/redo
        history(),
        keymap({ 'Mod-z': undo, 'Mod-y': redo, 'Mod-Shift-z': redo }),
        // (2) a feature's own keys — invariant (2): before the list keys below
        keymap(featureHotkeys(features, getApi)),
        // (3) the list keys, when there is a list to use them in
        ...(hasLists ? [keymap(listKeys(getApi))] : []),
        // (4) typing rewrites
        ...typingRewrites(features, bundle.schema, bundle.itemTypeByList),
        // (5) trigger tracking, when some feature declared a trigger
        ...(triggers.length > 0 ? [triggerTrackingPlugin(triggers)] : []),
        // (6) everything an editor does without being asked
        keymap(baseKeymap),
    ];
};
