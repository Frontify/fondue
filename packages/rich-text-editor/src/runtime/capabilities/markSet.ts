/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Mark, type MarkType } from 'prosemirror-model';
import { type EditorState, Plugin, PluginKey, type Transaction } from 'prosemirror-state';

import { isRecord } from '#/model';

import { clearMarks } from './markClear';
import { enclosingRange, type Extend, extendOf, markRange } from './markRanges';
import { markableText } from './markToggle';
import { type CapabilityImplementation, markTypesOf, REJECTED, tristate, typeIn } from './shared';

/** The transaction meta that carries the mark a `setMark` command set, which the last-mark plugin keeps. */
export const LAST_MARK_META = 'rte.last-mark';
const lastMarkKey = new PluginKey<readonly Mark[]>('rte.last-mark');

/** Keeps the last mark of each type that a `setMark` command set in the session, the latest first. */
export const lastMarkPlugin = () =>
    new Plugin<readonly Mark[]>({
        key: lastMarkKey,
        state: {
            init: () => [],
            apply: (transaction, marks) => {
                const mark = transaction.getMeta(LAST_MARK_META) as Mark | undefined;
                if (mark === undefined) {
                    return marks;
                }
                return [mark, ...marks.filter((other) => other.type !== mark.type)];
            },
        },
    });

/**
 * Adds `mark` to the selected text, or to the stored marks at a caret, as one transaction that records it as the last
 * mark. With `extend`, a selection inside one run of the mark acts on the whole run. Visible `text` at a caret outside
 * the mark inserts that text with the mark, or the mark's `href` when it is empty.
 */
const applyMark = (
    state: EditorState,
    dispatch: ((transaction: Transaction) => void) | undefined,
    mark: Mark,
    extend: Extend,
    text?: string,
): boolean => {
    const { type } = mark;
    const range = extend === false ? undefined : enclosingRange(state, type, extend);
    if (range !== undefined) {
        if (dispatch !== undefined) {
            const transaction = state.tr;
            markRange(transaction, range.from, range.to, mark, text);
            dispatch(transaction.setMeta(LAST_MARK_META, mark).scrollIntoView());
        }
        return true;
    }
    if (state.selection.empty) {
        const { $from } = state.selection;
        if (!$from.parent.type.allowsMarkType(type)) {
            return false;
        }
        if (text === undefined) {
            dispatch?.(state.tr.addStoredMark(mark).setMeta(LAST_MARK_META, mark));
            return true;
        }
        let inserted = text;
        if (inserted === '' && typeof mark.attrs.href === 'string') {
            inserted = mark.attrs.href;
        }
        if (inserted === '') {
            return false;
        }
        const marks = mark.addToSet((state.storedMarks ?? $from.marks()).filter((other) => other.type !== type));
        dispatch?.(
            state.tr
                .insert($from.pos, type.schema.text(inserted, marks))
                .setMeta(LAST_MARK_META, mark)
                .scrollIntoView(),
        );
        return true;
    }
    const texts = markableText(state, type);
    if (texts.length === 0) {
        return false;
    }
    if (dispatch !== undefined) {
        const transaction = state.tr;
        const { from, to, $from, $to } = state.selection;
        if ($from.sameParent($to)) {
            markRange(transaction, from, to, mark, text);
        } else {
            for (const range of texts) {
                transaction.addMark(range.from, range.to, mark);
            }
        }
        dispatch(transaction.setMeta(LAST_MARK_META, mark).scrollIntoView());
    }
    return true;
};

/** Whether every selected text carries `type` with `attrs`, some of it, or none; at a caret, the marks the next typed text gets. */
const markWithAttrs = (state: EditorState, type: MarkType, attrs: Readonly<Record<string, unknown>>) => {
    const matches = (marks: readonly Mark[]) => {
        const found = type.isInSet(marks);
        return found !== undefined && Object.entries(attrs).every(([name, value]) => found.attrs[name] === value);
    };
    if (state.selection.empty) {
        return matches(state.storedMarks ?? state.selection.$from.marks());
    }
    const texts: boolean[] = [];
    for (const { $from, $to } of state.selection.ranges) {
        state.doc.nodesBetween($from.pos, $to.pos, (node, _pos, parent) => {
            if (node.isText && parent !== null && parent.type.allowsMarkType(type)) {
                texts.push(matches(node.marks));
            }
        });
    }
    return tristate(texts.filter(Boolean).length, texts.length);
};

/** A payload's attributes, and its `text` field, the visible text, unless the mark declares a `text` attribute. */
const splitText = (type: MarkType, payload: Readonly<Record<string, unknown>>) => {
    if (Object.hasOwn(type.spec.attrs ?? {}, 'text') || !Object.hasOwn(payload, 'text')) {
        return { attrs: payload, text: undefined };
    }
    const { text, ...attrs } = payload;
    return { attrs, text: typeof text === 'string' ? text : undefined };
};

/**
 * Sets the mark with the payload's fields as attributes, or removes it for a null payload; a `text` field is the
 * visible text that `applyMark` inserts or replaces.
 */
export const setMark: CapabilityImplementation = (args, schema) => {
    const type = typeIn(schema.marks, args.mark);
    if (type === undefined) {
        return REJECTED;
    }
    const extend = extendOf(args.extendToMarkRange);
    return {
        run: (state, dispatch, payload) => {
            if (payload === null) {
                return clearMarks(state, dispatch, [type], extend);
            }
            if (!isRecord(payload)) {
                return false;
            }
            const { attrs, text } = splitText(type, payload);
            return applyMark(state, dispatch, type.create(attrs), extend, text);
        },
        active: (state, payload) => {
            if (!isRecord(payload)) {
                return false;
            }
            return markWithAttrs(state, type, splitText(type, payload).attrs);
        },
    };
};

/** Sets again the last mark of the listed types that a `setMark` command set in this session. */
export const reapplyMark: CapabilityImplementation = (args, schema) => {
    const types = markTypesOf(args.installed, schema);
    return {
        run: (state, dispatch) => {
            const last = (lastMarkKey.getState(state) ?? []).find((mark) => types.includes(mark.type));
            if (last === undefined) {
                return false;
            }
            return applyMark(state, dispatch, last, false);
        },
        active: () => false,
    };
};
