/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type Mark, type Node, type Schema, Slice } from 'prosemirror-model';
import { type EditorState, Selection, type Transaction } from 'prosemirror-state';
import { type Step, Transform } from 'prosemirror-transform';

import { createParser, readMarkdown } from '#/codecs/from-markdown';
import { withNodeIds } from '#/definition';
import { checkHref, type ContentModel, type HrefPolicy, type ResourceLimits } from '#/model';
import { markHrefPolicy } from '#/model/compile';
import { ISLAND_BLOCK, ISLAND_INLINE, ISLAND_MARK } from '#/model/content';
import { decodeToTree } from '#/model/decode';
import { randomId } from '#/model/random-id';
import { isRecord } from '#/model/values';

import { colorReadingOf } from './import/colors';
import { importHtml } from './import/html';
import { exceededStructure } from './import/limits';
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
    /** The depth or cell limit a document with the pasted content exceeds; the commit checks the runtime's limits. */
    readonly policy: PastePolicy;
    /** The destination's slice context. */
    readonly context: string;
    /** Shift was held. */
    readonly plain: boolean;
    /** The policy's creatable heading levels, which pasted HTML headings move to. */
    readonly headingLevels: readonly number[];
    /** The view's window, whose `DOMParser` makes the inert document of pasted HTML. */
    readonly window: Window;
}

/** A change that follows the paste as its own undo step: a Markdown conversion or a caret link. */
export type FollowUp = (state: EditorState) => Transaction | null;

export interface Pasted {
    readonly followUp?: FollowUp;
    /** Media that a slice from another context dropped. */
    readonly droppedMedia: number;
    /** Pasted formatting the model does not keep, such as colours without `literalColors`, was removed. */
    readonly removedFormatting?: boolean;
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

/** The content with every `nodeId` cleared: the runtime gives each pasted node a new one, and copied HTML holds none. */
export const withoutIds = (fragment: Fragment): Fragment => withNodeIds(fragment, () => null);

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

/** Whether an island of `slice` holds a `nodeId` the paste would repeat, or a reference from another context, so the island cannot stay. */
export const islandsCannotStay = (slice: Slice, doc: Node, foreign: boolean) => {
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

const ABSOLUTE_URL = /^[a-z][\d+.a-z-]*:\S+$/i;

/** The URL that `text` is, when it is one absolute URL that passes `checkHref`. */
export const hrefOf = (text: string, policy: HrefPolicy | undefined): string | undefined => {
    const trimmed = text.trim();
    if (!ABSOLUTE_URL.test(trimmed)) {
        return undefined;
    }
    const checked = checkHref(trimmed, policy);
    if (!checked.ok) {
        return undefined;
    }
    return checked.href;
};

const PLAIN_BLOCKS = new Set(['paragraph_open', 'paragraph_close', 'inline']);
const PLAIN_INLINE = new Set(['text', 'softbreak']);
const parsers = new WeakMap<ContentModel, ReturnType<typeof createParser>>();
/** The Markdown parser of `model`, whose links pass the policy of its `link` mark. */
const markdownParser = (model: ContentModel) => {
    let parser = parsers.get(model);
    if (parser === undefined) {
        parser = createParser(markHrefPolicy(model, 'link'));
        parsers.set(model, parser);
    }
    return parser;
};

/** Whether `text` has Markdown block or inline structure; a bare URL that linkify finds is no structure. */
const isMarkdown = (text: string, model: ContentModel) =>
    markdownParser(model)
        .parse(text, {})
        .some(
            ({ type, children }) =>
                !PLAIN_BLOCKS.has(type) ||
                (children ?? []).some((child) => !PLAIN_INLINE.has(child.type) && child.markup !== 'linkify'),
        );

/**
 * `fragment` without the link marks whose `href` fails `policy`, keeping their text, so pasted content brings no link
 * the host's `allowedSchemes` and `allowedHosts` refuse; stored links never pass here.
 */
const withinLinkPolicy = (fragment: Fragment, policy: HrefPolicy | undefined): Fragment => {
    if (policy === undefined) {
        return fragment;
    }
    const nodes: Node[] = [];
    for (const node of fragment.content) {
        const marked = node.mark(
            node.marks.filter(
                ({ type, attrs }) =>
                    type.name !== 'link' || (typeof attrs.href === 'string' && checkHref(attrs.href, policy).ok),
            ),
        );
        nodes.push(marked.isText ? marked : marked.copy(withinLinkPolicy(node.content, policy)));
    }
    return Fragment.fromArray(nodes);
};

/** One paragraph stays open to join the text around it; other content is inserted closed. */
const insertable = (content: Fragment) => {
    if (content.childCount === 1 && content.firstChild?.type.name === 'paragraph') {
        return Slice.maxOpen(content);
    }
    return new Slice(content, 0, 0);
};

/** `text` converted with `fromMarkdown`. */
const markdownSlice = (schema: Schema, text: string, { model, limits }: PasteSettings): Slice | undefined => {
    const result = readMarkdown(markdownParser(model), text, model, randomId, { limits });
    if (result.status !== 'editable') {
        return undefined;
    }
    const { tree } = decodeToTree(result.document, model, { limits });
    if (tree === undefined) {
        return undefined;
    }
    return insertable(Fragment.fromJSON(schema, tree.content));
};

/**
 * Pastes between `from` and `to`. A code block takes the text as typed. Otherwise the internal slice wins, then a
 * bare URL, then HTML, then plain text, which Markdown structure converts in a second step.
 */
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
    // A code block takes the text exactly.
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
    if (internal !== undefined && islandsCannotStay(internal.slice, tr.doc, internal.context !== settings.context)) {
        internal = undefined;
    }
    // A URL links the selected text, or a caret paste with no usable slice inserts it linked as a second step.
    const href = hrefOf(text, markHrefPolicy(model, 'link'));
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
    // The internal slice.
    if (internal !== undefined) {
        let { slice } = internal;
        let droppedMedia = 0;
        if (internal.context !== settings.context) {
            const converted = outOfContext(schema, slice);
            slice = converted.slice;
            droppedMedia = converted.dropped;
        }
        const content = withinLinkPolicy(slice.content, markHrefPolicy(model, 'link'));
        insert(prepared(new Slice(content, slice.openStart, slice.openEnd)));
        return { droppedMedia };
    }
    // HTML, which goes no further even when it parses to nothing.
    if (!settings.plain && payload.html !== '') {
        const { limits, headingLevels } = settings;
        // The pasted blocks land beside the textblock at the paste position, or inside the node between whose children it is.
        let depth = $from.depth + 2;
        if ($from.parent.isTextblock) {
            depth = $from.depth + 1;
        }
        const { content, droppedImages, removedColors } = importHtml(payload.html, schema, settings.window, {
            limits,
            headingLevels,
            depth,
            colors: colorReadingOf(model),
        });
        insert(prepared(insertable(withinLinkPolicy(content, markHrefPolicy(model, 'link')))));
        return { droppedMedia: droppedImages, removedFormatting: removedColors > 0 };
    }
    // Plain text, which Markdown structure converts in a second step.
    if (text === '') {
        return undefined;
    }
    const before = tr.doc;
    const start = tr.steps.length;
    insert(prepared(plainSlice(schema, text, $from.marks())));
    let converted: Slice | undefined;
    if (!settings.plain && isMarkdown(text, model)) {
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
        // A conversion past the depth or cell limit leaves the pasted text as it is.
        if (exceededStructure(next.doc, settings.limits) !== undefined) {
            return null;
        }
        return next.setSelection(Selection.near(next.doc.resolve(range.to), -1));
    };
    return { droppedMedia: 0, followUp };
};
