/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PASTED_LIST_ITEM_ATTRIBUTES, type PastedListMarker, type PasteTransform } from '#/core';

// The editor marks each list item another app wrote as a paragraph (Word,
// Outlook) with the pasted-list contract; the list plugins rebuild the lists.

/** The tags the bulleted and numbered list contents parse, and their item's. */
const BULLET_LIST_TAG = 'ul';
const NUMBERED_LIST_TAG = 'ol';
const LIST_ITEM_TAG = 'li';
/** Where a numbered list's numbering starts. */
const START_ATTRIBUTE = 'start';

/** The marker the contract names for a numbered item; any other is a bullet. */
const NUMBERED_MARKER: PastedListMarker = 'numbered';

/** Paragraphs the editor marked as list items. */
const MARKED_ITEM = `[${PASTED_LIST_ITEM_ATTRIBUTES.list}]`;
/** Every attribute of the pasted-list contract. */
const CONTRACT_ATTRIBUTES = Object.values(PASTED_LIST_ITEM_ATTRIBUTES);
/** Elements carrying any attribute of the pasted-list contract. */
const CARRYING_CONTRACT = CONTRACT_ATTRIBUTES.map((name) => `[${name}]`).join(', ');

/** Where an item belongs: the source app's list, its level, and its kind of list. */
type ListPlace = { list: string; level: number; kind: PastedListMarker };

/** An item's marker: a bullet, or a number with the item's own number, when the marker has one. */
type ListMarker = { kind: 'bullet' } | { kind: 'numbered'; number: string | null };

type ListParagraph = Omit<ListPlace, 'kind'> & ListMarker & { paragraph: HTMLElement };

type OpenList = ListPlace & { element: HTMLElement };

const tagOf = (kind: PastedListMarker): string => {
    switch (kind) {
        case 'bullet':
            return BULLET_LIST_TAG;
        case 'numbered':
            return NUMBERED_LIST_TAG;
    }
};

/** Whether `item` continues `open` at its level: a bullet list runs across Word's lists, a numbered one restarts with each, as Word numbers them. */
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

/** `node` as a list item the editor marked, or `undefined` when it is not one. */
const readListParagraph = (node: Node): ListParagraph | undefined => {
    if (!(node instanceof HTMLElement)) {
        return undefined;
    }
    const list = node.getAttribute(PASTED_LIST_ITEM_ATTRIBUTES.list);
    if (list === null) {
        return undefined;
    }
    let marker: ListMarker = { kind: 'bullet' };
    if (node.getAttribute(PASTED_LIST_ITEM_ATTRIBUTES.marker) === NUMBERED_MARKER) {
        marker = { kind: 'numbered', number: node.getAttribute(PASTED_LIST_ITEM_ATTRIBUTES.number) };
    }
    return { paragraph: node, list, level: Number(node.getAttribute(PASTED_LIST_ITEM_ATTRIBUTES.level)), ...marker };
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
    for (const paragraph of dom.querySelectorAll(MARKED_ITEM)) {
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

/** Removes the contract from every paragraph that carries it, rebuilt or not. */
const removeContract = (dom: HTMLElement): void => {
    for (const element of dom.querySelectorAll(CARRYING_CONTRACT)) {
        for (const name of CONTRACT_ATTRIBUTES) {
            element.removeAttribute(name);
        }
    }
};

/**
 * Rebuilds the list items a paste carries as paragraphs marked with the pasted-list contract (Word, Outlook) as
 * nested bulleted and numbered lists, which the list plugins share.
 */
export const PASTED_LISTS: PasteTransform = {
    id: 'pasted-lists',
    run: (dom) => {
        rebuildLists(dom);
        removeContract(dom);
    },
};
