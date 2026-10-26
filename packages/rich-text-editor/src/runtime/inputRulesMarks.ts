/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ResolvedPos } from 'prosemirror-model';
import { type EditorState } from 'prosemirror-state';

import { type MarkDelimiterRule, type MarkRule } from '#/definition';
import { checkHref } from '#/model';
import { isValidValue } from '#/model/internal';

import { holdsCode, WORD } from './inputRulesCommon';

/** The attributes a mark rule's named groups fill, each converted by its declaration, or `undefined` when one fails it. */
const ruleAttrs = (rule: MarkRule, groups: Readonly<Record<string, string | undefined>>) => {
    const attrs: Record<string, unknown> = {};
    for (const [name, declaration] of Object.entries(rule.attrs)) {
        const value = groups[name];
        if (value === undefined) {
            continue;
        }

        let converted: unknown = value;
        if (declaration.type === 'boolean') {
            converted = true;
        } else if (declaration.type === 'integer' || declaration.type === 'number') {
            converted = Number(value);
        } else if (declaration.type === 'url') {
            const checked = checkHref(value, rule.policy);
            if (!checked.ok) {
                return undefined;
            }

            converted = checked.href;
        }

        if (!isValidValue(declaration, converted)) {
            return undefined;
        }

        attrs[name] = converted;
    }

    return attrs;
};

/** Puts the rule's mark on its match before the caret, without the whitespace that ends it, unless any of it is marked already. */
export const markPattern = (rule: MarkRule, state: EditorState, $cursor: ResolvedPos, before: string, ending = '') => {
    const tested = `${before}${ending}`;
    const found = rule.match.exec(tested);
    if (found === null || found.index + found[0].length !== tested.length) {
        return null;
    }

    const text = found[0].trimEnd();
    if (text === '' || !$cursor.parent.type.allowsMarkType(rule.mark)) {
        return null;
    }

    const from = $cursor.pos - before.length + found.index;
    const to = from + text.length;
    if (holdsCode(state, from, to) || state.doc.rangeHasMark(from, to, rule.mark)) {
        return null;
    }

    const attrs = ruleAttrs(rule, found.groups ?? {});
    if (attrs === undefined) {
        return null;
    }

    return state.tr.addMark(from, to, rule.mark.create(attrs));
};

/**
 * Marks the text between the delimiters and removes them, when the opening one follows a space, punctuation other
 * than a delimiter character or the block start, no word character follows the caret, and the text neither starts
 * nor ends with a space.
 */
export const markDelimiter = (
    rule: MarkDelimiterRule,
    state: EditorState,
    $cursor: ResolvedPos,
    before: string,
    after: string,
) => {
    const { open, close, mark } = rule;
    if (!before.endsWith(close) || WORD.test(after) || !$cursor.parent.type.allowsMarkType(mark)) {
        return null;
    }

    const closeAt = before.length - close.length;
    const openAt = before.lastIndexOf(open, closeAt - open.length - 1);
    const text = before.slice(openAt + open.length, closeAt);
    // A longer run, such as ```, is not a pair of this delimiter.
    if (close.includes(before.charAt(closeAt - 1))) {
        return null;
    }

    const previous = before.charAt(openAt - 1);
    if (
        openAt < 0 ||
        text === '' ||
        text.trim() !== text ||
        WORD.test(previous) ||
        (previous !== '' && open.includes(previous))
    ) {
        return null;
    }

    const start = $cursor.pos - before.length;
    const from = start + openAt;
    if (holdsCode(state, from, $cursor.pos)) {
        return null;
    }

    return state.tr
        .delete(start + closeAt, $cursor.pos)
        .addMark(from + open.length, start + closeAt, mark.create())
        .delete(from, from + open.length)
        .removeStoredMark(mark);
};
