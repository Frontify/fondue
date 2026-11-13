/* (c) Copyright Frontify Ltd., all rights reserved. */

import { OFFICE_LIST_ATTRIBUTES, type PasteTransform } from '#/core';

import { BULLET_LIST_TAG, LIST_ITEM_TAG, NUMBERED_LIST_TAG, START_ATTRIBUTE } from './helpers/listMarkup';

// The editor keeps what Word and Outlook write on each list paragraph (the
// list's id, the level and the marker text) as attributes; this reads them and
// rebuilds the lists.

/** Paragraphs the editor kept list data on. */
const LIST_PARAGRAPH = `[${OFFICE_LIST_ATTRIBUTES.list}]`;

/** Dot-separated numbers (`1.`, `1.1.`, `1.1`) or letters with a delimiter (`iv)`, `a.`) are numbered markers; a glyph (`·`, `o`, `§`) is a bullet. */
const NUMBERED_MARKER = /^\(?(?:\d+(?:\.\d+)*[.)]?|[a-z]+[.)])$/i;
/** The numbers in a marker; the last is the item's own, the 3 of `3.`, `1.3.` or `(3)`. */
const MARKER_NUMBERS = /\d+/g;
/** Word has nine list levels, which also keeps hostile input from nesting without end. */
const MAX_LEVEL = 9;
/** Word's list levels start at 1, so a paragraph that says level 0 is not a list item. */
const FIRST_LEVEL = 1;

type ListKind = 'bullet' | 'numbered';

/** Where an item belongs: the source app's list, its level, and its kind of list. */
type ListPlace = { list: string; level: number; kind: ListKind };

/** An item's marker: a bullet, or a number with the item's own number, when the marker has one. */
type ListMarker = { kind: Exclude<ListKind, 'numbered'> } | { kind: 'numbered'; number: string | null };

type ListParagraph = Omit<ListPlace, 'kind'> & ListMarker & { paragraph: HTMLElement };

type OpenList = ListPlace & { element: HTMLElement };

const tagOf = (kind: ListKind): string => {
    switch (kind) {
        case 'bullet':
            return BULLET_LIST_TAG;
        case 'numbered':
            return NUMBERED_LIST_TAG;
    }
};

/** Whether `item` continues `open` at its level: a bullet list runs across the source app's lists, a numbered one restarts with each, as Word numbers them. */
const continues = (open: ListPlace, item: ListPlace): boolean => {
    if (open.kind !== item.kind) {
        return false;
    }
    switch (item.kind) {
        case 'bullet':
            return true;
        case 'numbered':
            return open.list === item.list;
    }
};

/** The kind of marker `text` is, and the item's own number when it is a number. */
const readMarker = (text: string): ListMarker => {
    const marker = text.trim();
    if (!NUMBERED_MARKER.test(marker)) {
        return { kind: 'bullet' };
    }
    const numbers = marker.match(MARKER_NUMBERS);
    return { kind: 'numbered', number: numbers?.[numbers.length - 1] ?? null };
};

/** `node` as a list item, or `undefined` when it is not one. */
const readListParagraph = (node: Node): ListParagraph | undefined => {
    if (!(node instanceof HTMLElement)) {
        return undefined;
    }
    const list = node.getAttribute(OFFICE_LIST_ATTRIBUTES.list);
    if (list === null) {
        return undefined;
    }
    const level = Number(node.getAttribute(OFFICE_LIST_ATTRIBUTES.level));
    // The attribute is text, so a level that is no number is a bug in the writer and is not read as a level.
    if (!Number.isInteger(level)) {
        throw new TypeError(`The list paragraph has the level "${node.getAttribute(OFFICE_LIST_ATTRIBUTES.level)}".`);
    }
    if (level < FIRST_LEVEL) {
        return undefined;
    }
    return {
        paragraph: node,
        list,
        level: Math.min(level, MAX_LEVEL),
        ...readMarker(node.getAttribute(OFFICE_LIST_ATTRIBUTES.marker) ?? ''),
    };
};

/** The list paragraphs that follow `first` as siblings, with only layout between them. */
const runFrom = (first: ListParagraph): ListParagraph[] => {
    const run = [first];
    for (let next = first.paragraph.nextSibling; next !== null; next = next.nextSibling) {
        if (next.nodeType === Node.COMMENT_NODE || (next.nodeType === Node.TEXT_NODE && !next.textContent?.trim())) {
            continue;
        }
        const item = readListParagraph(next);
        if (item === undefined) {
            break;
        }
        run.push(item);
    }
    return run;
};

/** Closes the open lists deeper than `item`, and the one at its level when `item` cannot join it. */
const closeListsFor = (open: OpenList[], item: ListParagraph): void => {
    while ((open[open.length - 1]?.level ?? 0) > item.level) {
        open.pop();
    }
    const current = open[open.length - 1];
    if (current?.level === item.level && !continues(current, item)) {
        open.pop();
    }
};

const createList = (document: Document, item: ListParagraph): OpenList => {
    const element = document.createElement(tagOf(item.kind));
    if (item.kind === 'numbered' && item.number !== null) {
        element.setAttribute(START_ATTRIBUTE, item.number);
    }
    return { element, list: item.list, level: item.level, kind: item.kind };
};

/**
 * Rebuilds one run of list paragraphs as nested lists where it stood. A level
 * below the one before opens one list inside the last item, so no empty item
 * holds it. A numbered list starts at the number the source app wrote for its
 * first item, so one that resumes after another block, or a copy that begins
 * partway through, keeps its numbering.
 */
const rebuildRun = (run: readonly ListParagraph[]): void => {
    const first = run[0];
    if (first === undefined) {
        return;
    }
    const document = first.paragraph.ownerDocument;
    // Top-level lists go in order before this mark, which holds the run's place as its paragraphs move.
    const anchor = document.createTextNode('');
    first.paragraph.before(anchor);
    const open: OpenList[] = [];
    for (const item of run) {
        closeListsFor(open, item);
        let parent = open[open.length - 1];
        if (parent === undefined || parent.level < item.level) {
            const created = createList(document, item);
            if (parent === undefined) {
                anchor.before(created.element);
            } else {
                parent.element.lastElementChild?.append(created.element);
            }
            parent = created;
            open.push(created);
        }
        const element = document.createElement(LIST_ITEM_TAG);
        element.append(item.paragraph);
        parent.element.append(element);
    }
    anchor.remove();
};

const rebuildLists = (dom: HTMLElement): void => {
    const done = new Set<Element>();
    for (const paragraph of dom.querySelectorAll(LIST_PARAGRAPH)) {
        if (done.has(paragraph)) {
            continue;
        }
        const first = readListParagraph(paragraph);
        if (first === undefined) {
            continue;
        }
        const run = runFrom(first);
        for (const item of run) {
            done.add(item.paragraph);
        }
        rebuildRun(run);
    }
};

/**
 * Rebuilds the list items a paste carries as paragraphs with Word's list data (Word, Outlook) as nested bulleted and
 * numbered lists, which the list plugins share. The editor removes the list data once every transform has run.
 */
export const PASTED_LISTS: PasteTransform = {
    id: 'pasted-lists',
    run: rebuildLists,
};
