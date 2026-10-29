/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type Mark, type Node, type Schema, Slice } from 'prosemirror-model';
import { Selection, type Transaction } from 'prosemirror-state';
import { Transform } from 'prosemirror-transform';

import { requiredAt, markHrefPolicy } from '#/model/internal';
import { importModelHtml } from '#/runtime/import/html';
import { exceededStructure } from '#/runtime/import/limits';
import { labelText, refusedNames, resliced, withinLinkPolicy } from '#/runtime/import/policy';

import { markdownFragment } from './markdown';
import {
    type FollowUp,
    hrefOf,
    insertAndSelect,
    insertSlice,
    islandsCannotStay,
    type PasteSettings,
    type Pasted,
    type Payload,
    prepareSlice,
} from './pasteShared';
import { readSlice } from './slice';

/** A slice from another context: each mention becomes its label text and each figure goes. */
const outOfContext = (schema: Schema, slice: Slice) => {
    let dropped = 0;
    const convert = (fragment: Fragment): Node[] =>
        fragment.content.flatMap((node) => {
            if (node.type.name === 'mention') {
                return labelText(schema, node);
            }

            if (node.type.name === 'figure') {
                dropped += 1;

                return [];
            }

            if (node.isText) {
                return [node];
            }

            return [node.copy(Fragment.from(convert(node.content)))];
        });

    return { slice: resliced(slice, Fragment.from(convert(slice.content))), dropped };
};

/** Each line of `text` as a paragraph, as ProseMirror reads plain text, which joins line breaks in a row. */
const plainSlice = (schema: Schema, text: string, marks: readonly Mark[]) => {
    const paragraphs = text.split(/\n+/).map((line) => {
        let content: Node | undefined;
        if (line !== '') {
            content = schema.text(line, marks);
        }

        return schema.node('paragraph', null, content);
    });

    return Slice.maxOpen(Fragment.from(paragraphs));
};

/**
 * The slice's text blocks as one paragraph with a space between blocks, keeping marks; `undefined` for one text block
 * or none, or when a block leaf such as an island would be dropped.
 */
const joinedSlice = (schema: Schema, slice: Slice): Slice | undefined => {
    const blocks: Node[] = [];
    let textblocks = 0;
    let leaves = 0;
    slice.content.descendants((node) => {
        if (node.isBlock && node.isLeaf) {
            leaves += 1;
        }

        if (!node.isTextblock) {
            return true;
        }

        textblocks += 1;
        if (node.content.size > 0) {
            blocks.push(node);
        }

        return false;
    });
    if (textblocks < 2 || leaves > 0) {
        return undefined;
    }

    const inline: Node[] = [];
    for (const [index, block] of blocks.entries()) {
        if (index > 0) {
            inline.push(schema.text(' '));
        }

        inline.push(...block.children);
    }

    return Slice.maxOpen(Fragment.from(schema.node('paragraph', null, inline)));
};

/** One paragraph stays open to join the text around it; other content is inserted closed. */
const insertable = (content: Fragment) => {
    if (content.childCount === 1 && content.firstChild?.type.name === 'paragraph') {
        return Slice.maxOpen(content);
    }

    return new Slice(content, 0, 0);
};

/** One paste being written, and whether a single-line field has joined its blocks. */
type PasteContext = {
    transaction: Transaction;
    from: number;
    to: number;
    payload: Payload;
    settings: PasteSettings;
    schema: Schema;
    text: string;
    $from: ReturnType<Transaction['doc']['resolve']>;
    joined: boolean;
    internal: ReturnType<typeof readSlice> | undefined;
};

/** A branch that handled the paste, or one that left it for the next source. */
type PasteStep = { handled: true; pasted: Pasted | undefined } | { handled: false };

const prepareForField = (context: PasteContext, slice: Slice): Slice => {
    const kept = prepareSlice(slice, context.schema, context.settings.model, context.settings.policy);
    if (!context.settings.singleLine) {
        return kept;
    }

    const one = joinedSlice(context.schema, kept);
    if (one === undefined) {
        // A closed paragraph would land beside the field's one paragraph, so it opens into the paragraph at the caret.
        return Slice.maxOpen(kept.content);
    }

    context.joined = true;

    return one;
};

const insertPrepared = (context: PasteContext, slice: Slice) =>
    insertAndSelect(context.transaction, context.from, context.to, prepareForField(context, slice));

/** A code block takes the text exactly. */
const pasteCode = (context: PasteContext): PasteStep => {
    if (context.$from.parent.type.spec.code !== true) {
        return { handled: false };
    }

    if (context.text === '') {
        return { handled: true, pasted: undefined };
    }

    context.transaction.insertText(context.text, context.from, context.to);

    return { handled: true, pasted: { droppedMedia: 0 } };
};

/** The internal slice, cleared when an island's original cannot keep its IDs or references. */
const readInternal = (context: PasteContext): ReturnType<typeof readSlice> | undefined => {
    if (context.settings.plain || context.payload.slice === '') {
        return undefined;
    }

    const internal = readSlice(context.payload.slice, context.settings.model, context.schema, context.settings.limits);
    // An island's original stays unchanged, so one whose IDs or references cannot stay makes the slice fall back.
    if (
        internal === undefined ||
        islandsCannotStay(internal.slice, context.transaction.doc, internal.context !== context.settings.context)
    ) {
        return undefined;
    }

    return internal;
};

/** A URL links the selected text, or a caret paste with no usable slice inserts it linked as a second step. */
const pasteLink = (context: PasteContext): PasteStep => {
    const { schema, settings, text, $from, transaction, from, to, internal } = context;
    const href = hrefOf(text, markHrefPolicy(settings.model, 'link'));
    const link = schema.marks.link;
    const linksAllowed =
        !settings.plain && link !== undefined && !refusedNames(settings.model, settings.policy).marks.has('link');
    if (!linksAllowed || href === undefined || link === undefined) {
        return { handled: false };
    }

    const mark = link.create({ href });
    if (from < to && $from.sameParent(transaction.doc.resolve(to)) && $from.parent.inlineContent) {
        transaction.addMark(from, to, mark);

        return { handled: true, pasted: { droppedMedia: 0 } };
    }

    if (from === to && internal === undefined) {
        const range = insertPrepared(context, plainSlice(schema, href, $from.marks()));

        return {
            handled: true,
            pasted: { droppedMedia: 0, followUp: (state) => state.tr.addMark(range.from, range.to, mark) },
        };
    }

    return { handled: false };
};

/** The internal slice. */
const pasteInternal = (context: PasteContext): PasteStep => {
    const { internal, schema, settings } = context;
    if (internal === undefined) {
        return { handled: false };
    }

    let { slice } = internal;
    let droppedMedia = 0;
    if (internal.context !== settings.context) {
        const converted = outOfContext(schema, slice);
        slice = converted.slice;
        droppedMedia = converted.dropped;
    }

    const content = withinLinkPolicy(slice.content, markHrefPolicy(settings.model, 'link'));
    insertPrepared(context, new Slice(content, slice.openStart, slice.openEnd));

    return { handled: true, pasted: { droppedMedia, removedFormatting: context.joined } };
};

/** HTML, which goes no further even when it parses to nothing. */
const pasteHtml = (context: PasteContext): PasteStep => {
    const { settings, payload, schema, $from } = context;
    if (settings.plain || payload.html === '') {
        return { handled: false };
    }

    const { limits, headingLevels, model } = settings;
    // The pasted blocks land beside the textblock at the paste position, or inside the node between whose children it is.
    let depth = $from.depth + 2;
    if ($from.parent.isTextblock) {
        depth = $from.depth + 1;
    }

    const { content, droppedImages, removedColors, removedTables } = importModelHtml(
        payload.html,
        model,
        schema,
        settings.window,
        {
            limits,
            headingLevels,
            depth,
        },
    );
    insertPrepared(context, insertable(content));
    const removedFormatting = removedColors > 0 || removedTables > 0 || context.joined;

    return { handled: true, pasted: { droppedMedia: droppedImages, removedFormatting } };
};

/** Plain text, which Markdown structure converts in a second step. */
const pastePlain = (context: PasteContext): Pasted | undefined => {
    const { text, settings, schema, transaction, from, to, $from } = context;
    if (text === '') {
        return undefined;
    }

    const before = transaction.doc;
    const start = transaction.steps.length;
    insertPrepared(context, plainSlice(schema, text, $from.marks()));
    let converted: Slice | undefined;
    if (!settings.plain) {
        const fragment = markdownFragment(schema, text, settings);
        if (fragment !== undefined) {
            converted = insertable(fragment);
        }
    }

    if (converted === undefined) {
        return { droppedMedia: 0, removedFormatting: context.joined };
    }

    const target = new Transform(before);
    const range = insertSlice(target, from, to, prepareForField(context, converted));
    const followUp: FollowUp = (state) => {
        const next = state.tr;
        for (let index = transaction.steps.length - 1; index >= start; index -= 1) {
            next.step(requiredAt(transaction.steps, index).invert(requiredAt(transaction.docs, index)));
        }

        for (const step of target.steps) {
            next.step(step);
        }

        // A conversion past the depth or cell limit leaves the pasted text as it is.
        if (exceededStructure(next.doc, settings.limits) !== undefined) {
            return null;
        }

        return next.setSelection(Selection.near(next.doc.resolve(range.to), -1));
    };

    return { droppedMedia: 0, removedFormatting: context.joined, followUp };
};

/**
 * Pastes between `from` and `to`. A code block takes the text as typed. Otherwise the internal slice wins, then a
 * bare URL, then HTML, then plain text, which Markdown structure converts in a second step.
 */
export const pastePayload = (
    transaction: Transaction,
    from: number,
    to: number,
    payload: Payload,
    settings: PasteSettings,
): Pasted | undefined => {
    // A single-line field joins the pasted blocks into one paragraph, which the announcement reports.
    const context: PasteContext = {
        transaction,
        from,
        to,
        payload,
        settings,
        schema: transaction.doc.type.schema,
        text: payload.text.replaceAll('\r\n', '\n'),
        $from: transaction.doc.resolve(from),
        joined: false,
        internal: undefined,
    };
    const code = pasteCode(context);
    if (code.handled) {
        return code.pasted;
    }

    context.internal = readInternal(context);
    const linked = pasteLink(context);
    if (linked.handled) {
        return linked.pasted;
    }

    const internal = pasteInternal(context);
    if (internal.handled) {
        return internal.pasted;
    }

    const html = pasteHtml(context);
    if (html.handled) {
        return html.pasted;
    }

    return pastePlain(context);
};
