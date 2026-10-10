/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type Mark, type Node, type Schema, Slice } from 'prosemirror-model';
import { type EditorState, Selection, type Transaction } from 'prosemirror-state';
import { type Step, Transform } from 'prosemirror-transform';

import { createParser, readMarkdown } from '#/codecs/from-markdown';
import { carriesNodeId } from '#/definition';
import { checkHref, type ContentModel, defaultIdSource, type ResourceLimits } from '#/model';
import { ISLAND_BLOCK, ISLAND_INLINE, ISLAND_MARK } from '#/model/content';
import { decodeToTree } from '#/model/decode';
import { isRecord } from '#/model/values';

import { labelText, type PastePolicy, refusedNames, resliced, withoutRefused } from './import/policy';
import { readSlice } from './slice';

/** What a paste or a drop from outside hands the pipeline after the clipboard read. */
export interface Payload {
    readonly text: string;
    readonly html: string;
    readonly slice: string;
}

/** What the pipeline reads of the session. */
export interface PasteSettings {
    readonly model: ContentModel;
    readonly limits: ResourceLimits;
    /** The limit a document with the pasted content exceeds, from the commit check and the depth and cell check. */
    readonly exceeded: (doc: Node) => string | undefined;
    readonly policy: PastePolicy;
    /** The destination's slice context (SPEC-rich-text-clipboard/AC-022, AC-023). */
    readonly context: string;
    /** Shift was held (Paste order step 2). */
    readonly plain: boolean;
}

/** A change that follows the paste as its own undo step: a Markdown conversion or a caret link (SPEC-rich-text-clipboard/AC-024). */
export type FollowUp = (state: EditorState) => Transaction | null;

export interface Pasted {
    readonly followUp?: FollowUp;
    /** Media that a slice from another context dropped (SPEC-rich-text-clipboard/AC-022). */
    readonly droppedMedia: number;
}

/** Inserts `slice` between `from` and `to` as ProseMirror's paste does, and returns where it landed. */
export const insertSlice = (tr: Transform, from: number, to: number, slice: Slice) => {
    const start = tr.steps.length;
    const { firstChild } = slice.content;
    if (slice.openStart === 0 && slice.openEnd === 0 && slice.content.childCount === 1 && firstChild !== null) {
        tr.replaceRangeWith(from, to, firstChild);
    } else {
        tr.replaceRange(from, to, slice);
    }
    const mapping = tr.mapping.slice(start);
    return { from: mapping.map(from, -1), to: mapping.map(to, 1) };
};

/** `slice` without the content the paste policy refuses and with every `nodeId` cleared, ready to insert. */
export const prepareSlice = (slice: Slice, schema: Schema, model: ContentModel, policy: PastePolicy): Slice => {
    const kept = withoutRefused(slice, schema, model, policy);
    return new Slice(withoutIds(kept.content), kept.openStart, kept.openEnd);
};

/** Inserts `slice` with `insertSlice` and puts the selection after it. */
export const insertAndSelect = (tr: Transaction, from: number, to: number, slice: Slice) => {
    const steps = tr.steps.length;
    const range = insertSlice(tr, from, to, slice);
    if (tr.steps.length > steps) {
        tr.setSelection(Selection.near(tr.doc.resolve(range.to), -1));
    }
    return range;
};

/** The content with every `nodeId` cleared: the runtime gives each pasted node a new one (SPEC-rich-text-clipboard/AC-021), and copied HTML holds none (AC-027). */
export const withoutIds = (fragment: Fragment): Fragment =>
    Fragment.from(
        fragment.content.map((node) => {
            if (node.isText) {
                return node;
            }
            let { attrs } = node;
            if (carriesNodeId(node)) {
                attrs = { ...attrs, nodeId: null };
            }
            return node.type.create(attrs, withoutIds(node.content), node.marks);
        }),
    );

/** The `nodeId`s and resource references inside the island originals of `fragment`, which a paste cannot renew. */
const islandIdentities = (fragment: Fragment) => {
    const ids: string[] = [];
    let references = false;
    const read = (value: unknown) => {
        if (Array.isArray(value)) {
            for (const item of value) {
                read(item);
            }
            return;
        }
        if (!isRecord(value)) {
            return;
        }
        if (isRecord(value.attrs)) {
            if (typeof value.attrs.nodeId === 'string') {
                ids.push(value.attrs.nodeId);
            }
            references ||= Object.hasOwn(value.attrs, 'resourceId') || Object.hasOwn(value.attrs, 'assetId');
        }
        read(value.content);
        read(value.marks);
    };
    fragment.descendants((node) => {
        if (node.type.name === ISLAND_BLOCK || node.type.name === ISLAND_INLINE) {
            read(node.attrs.original);
        }
        for (const mark of node.marks) {
            if (mark.type.name === ISLAND_MARK) {
                read(mark.attrs.original);
            }
        }
    });
    return { ids, references };
};

/** Whether an island of `slice` holds a `nodeId` the paste would repeat, or a reference from another context (DR-082). */
export const repeatsIdentity = (slice: Slice, doc: Node, foreign: boolean) => {
    const { ids, references } = islandIdentities(slice.content);
    if (references && foreign) {
        return true;
    }
    const taken = new Set(islandIdentities(doc.content).ids);
    doc.descendants((node) => {
        if (typeof node.attrs.nodeId === 'string') {
            taken.add(node.attrs.nodeId);
        }
    });
    return ids.some((id, index) => taken.has(id) || ids.indexOf(id) !== index);
};

/** A slice from another context: each mention becomes its label text and each figure goes (SPEC-rich-text-clipboard/AC-022). */
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

const ABSOLUTE_URL = /^[a-z][\d+.a-z-]*:\S+$/i;

/** The URL that `text` is, when it is one absolute URL that passes `checkHref` (Paste order step 3). */
const hrefOf = (text: string): string | undefined => {
    const trimmed = text.trim();
    if (!ABSOLUTE_URL.test(trimmed)) {
        return undefined;
    }
    const checked = checkHref(trimmed);
    if (!checked.ok) {
        return undefined;
    }
    return checked.href;
};

const PLAIN_BLOCKS = new Set(['paragraph_open', 'paragraph_close', 'inline']);
const PLAIN_INLINE = new Set(['text', 'softbreak']);
let parser: ReturnType<typeof createParser> | undefined;
const markdownParser = () => {
    if (parser === undefined) {
        parser = createParser();
    }
    return parser;
};

/** Whether `text` has Markdown block or inline structure; a bare URL that linkify finds is no structure (DR-043). */
const isMarkdown = (text: string) =>
    markdownParser()
        .parse(text, {})
        .some(
            ({ type, children }) =>
                !PLAIN_BLOCKS.has(type) ||
                (children ?? []).some((child) => !PLAIN_INLINE.has(child.type) && child.markup !== 'linkify'),
        );

/** `text` converted with `fromMarkdown`: one paragraph stays open to join the text around it, other content is closed. */
const markdownSlice = (schema: Schema, text: string, { model, limits }: PasteSettings): Slice | undefined => {
    const result = readMarkdown(markdownParser(), text, model, defaultIdSource, { limits });
    if (result.status !== 'editable') {
        return undefined;
    }
    const { tree } = decodeToTree(result.document, model, { limits });
    if (tree === undefined) {
        return undefined;
    }
    const content = Fragment.fromJSON(schema, tree.content);
    if (content.childCount === 1 && content.firstChild?.type.name === 'paragraph') {
        return Slice.maxOpen(content);
    }
    return new Slice(content, 0, 0);
};

/** Paste order steps 2 to 8 between `from` and `to`; step 6 (`text/html`) is not built yet, so `text/plain` follows the slice. */
export const pastePayload = (
    tr: Transaction,
    from: number,
    to: number,
    payload: Payload,
    settings: PasteSettings,
): Pasted | undefined => {
    const { schema } = tr.doc.type;
    const { model, policy } = settings;
    const text = payload.text.replaceAll('\r\n', '\n');
    const $from = tr.doc.resolve(from);
    const prepared = (slice: Slice) => prepareSlice(slice, schema, model, policy);
    const insert = (slice: Slice) => insertAndSelect(tr, from, to, slice);
    // Step 2: a code block takes the text exactly.
    if ($from.parent.type.spec.code === true) {
        if (text === '') {
            return undefined;
        }
        tr.insertText(text, from, to);
        return { droppedMedia: 0 };
    }
    let internal: ReturnType<typeof readSlice>;
    if (!settings.plain && payload.slice !== '') {
        internal = readSlice(payload.slice, model, schema, settings.limits);
    }
    // An island's original stays unchanged, so one whose IDs or references cannot stay makes the slice fall back.
    if (internal !== undefined && repeatsIdentity(internal.slice, tr.doc, internal.context !== settings.context)) {
        internal = undefined;
    }
    // Step 3: a URL links the selected text, or a caret paste with no usable slice inserts it linked as a second step.
    const href = hrefOf(text);
    const link = schema.marks.link;
    if (!settings.plain && href !== undefined && link !== undefined && !refusedNames(model, policy).marks.has('link')) {
        const mark = link.create({ href });
        if (from < to && $from.sameParent(tr.doc.resolve(to)) && $from.parent.inlineContent) {
            tr.addMark(from, to, mark);
            return { droppedMedia: 0 };
        }
        if (from === to && internal === undefined) {
            const range = insert(prepared(plainSlice(schema, href, $from.marks())));
            return { droppedMedia: 0, followUp: (state) => state.tr.addMark(range.from, range.to, mark) };
        }
    }
    // Step 5: the internal slice.
    if (internal !== undefined) {
        let { slice } = internal;
        let droppedMedia = 0;
        if (internal.context !== settings.context) {
            const converted = outOfContext(schema, slice);
            slice = converted.slice;
            droppedMedia = converted.dropped;
        }
        insert(prepared(slice));
        return { droppedMedia };
    }
    // Step 7: plain text, which Markdown structure converts in a second step (DR-043).
    if (text === '') {
        return undefined;
    }
    const before = tr.doc;
    const start = tr.steps.length;
    insert(prepared(plainSlice(schema, text, $from.marks())));
    let converted: Slice | undefined;
    if (!settings.plain && payload.html === '' && isMarkdown(text)) {
        converted = markdownSlice(schema, text, settings);
    }
    if (converted === undefined) {
        return { droppedMedia: 0 };
    }
    const target = new Transform(before);
    const range = insertSlice(target, from, to, prepared(converted));
    const followUp: FollowUp = (state) => {
        const next = state.tr;
        for (let index = tr.steps.length - 1; index >= start; index -= 1) {
            next.step((tr.steps[index] as Step).invert(tr.docs[index] as Node));
        }
        for (const step of target.steps) {
            next.step(step);
        }
        // A conversion past a limit leaves the pasted text as it is (SPEC-rich-text-clipboard/AC-020).
        if (settings.exceeded(next.doc) !== undefined) {
            return null;
        }
        return next.setSelection(Selection.near(next.doc.resolve(range.to), -1));
    };
    return { droppedMedia: 0, followUp };
};
