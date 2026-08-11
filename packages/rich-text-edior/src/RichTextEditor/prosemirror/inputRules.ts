/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InputRule, inputRules, textblockTypeInputRule, wrappingInputRule } from 'prosemirror-inputrules';
import { type Schema } from 'prosemirror-model';
import { type Plugin as PmPlugin } from 'prosemirror-state';

import { type RteInputRule, type RtePlugin } from '#/domain';

/**
 * Declared input rules → the engine's typing-rewrite machinery.
 */

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

/** One declared rule → zero or one engine rule (zero when it names a type no mounted plugin provides). */
const toPmRule = (rule: RteInputRule, schema: Schema, itemTypeByList: Map<string, string>): InputRule | null => {
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

export const buildInputRules = (
    plugins: RtePlugin[],
    schema: Schema,
    itemTypeByList: Map<string, string>,
): PmPlugin[] => {
    const declared = plugins.flatMap((plugin) => [...(plugin.inputRules ?? [])]);
    // Longer mark delimiters have to be tried first, or `**bold**` is read as an
    // italic `*` wrapping `*bold*`. Everything else keeps its declared order.
    const markRules = declared
        .filter((rule) => rule.kind === 'mark')
        .sort((left, right) => right.delimiter.length - left.delimiter.length);
    const ordered = [...markRules, ...declared.filter((rule) => rule.kind !== 'mark')];

    const rules = ordered.flatMap((rule) => {
        const pmRule = toPmRule(rule, schema, itemTypeByList);
        return pmRule ? [pmRule] : [];
    });

    return rules.length > 0 ? [inputRules({ rules })] : [];
};
