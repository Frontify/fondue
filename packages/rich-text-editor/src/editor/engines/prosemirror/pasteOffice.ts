/* (c) Copyright Frontify Ltd., all rights reserved. */

// Word and Outlook write a list as paragraphs with an `mso-list` style and the
// marker (a bullet glyph or a number) as text in a span, and end every
// paragraph with an `<o:p>` marker.

/** The name `mso-list` takes in a style attribute, so the engine's style merge keeps it. */
const KEPT_LIST_PROPERTY = '--mso-list';
/** The name `mso-list` takes in a `<style>` rule, apart from a paragraph's own so that one wins. */
const RULE_LIST_PROPERTY = '--mso-list-rule';
/** A paragraph's own list property, as Word writes it or as `keepOfficeListStyles` renamed it. */
const OWN_LIST_PROPERTY = `(?:mso-list|${KEPT_LIST_PROPERTY})`;
/** Word's list data, as in `l0 level2 lfo1`: list template, level and list instance. */
const LIST_DATA = String.raw`(l\d+)\s+level(\d+)(?:\s+(lfo\d+))?`;

/** A declaration of `property` in a style attribute whose value starts with `value`. */
const declaration = (property: string, value: string): RegExp =>
    new RegExp(String.raw`(?:^|;)\s*${property}:\s*${value}`, 'i');

const LIST_STYLE = declaration(OWN_LIST_PROPERTY, LIST_DATA);
/** A paragraph's own list property, which can also say `none`. */
const OWN_LIST_STYLE = declaration(OWN_LIST_PROPERTY, '');
const RULE_LIST_STYLE = declaration(RULE_LIST_PROPERTY, LIST_DATA);
/** The style of the span that holds a list paragraph's marker. */
const MARKER_STYLE = declaration(OWN_LIST_PROPERTY, 'ignore');
/** Dot-separated numbers (`1.`, `1.1.`, `1.1`) or letters with a delimiter (`iv)`, `a.`) are numbered markers; a glyph (`·`, `o`, `§`) is a bullet. */
const NUMBERED_MARKER = /^\(?(?:\d+(?:\.\d+)*[.)]?|[a-z]+[.)])$/i;
/** The numbers in a marker; the last is the item's own, the 3 of `3.`, `1.3.` or `(3)`. */
const MARKER_NUMBERS = /\d+/g;
/** Word has nine list levels, which also keeps hostile input from nesting without end. */
const MAX_LEVEL = 9;

/** Word's list data in the HTML string, found without parsing it. */
const OFFICE_LIST_MARKUP = /mso-list/i;
// Stops at the next tag, so an unclosed one costs one scan, not one per start.
const TAG = /<[a-z][^<>]*>/gi;
const STYLE_ATTRIBUTE = /(\sstyle\s*=\s*)("[^"]*"|'[^']*')/gi;
// Split on, not matched around: a pattern holding a whole `<style>` body overflows the regexp stack past a few megabytes.
const STYLE_TAGS = /(<\/?style(?![\w-])[^<>]*>)/gi;
const MSO_LIST_PROPERTY = /(?<![\w-])mso-list(?=\s*:)/gi;

/** The marker Word ends each paragraph with. */
const PARAGRAPH_MARKER = 'o:p';
/** Elements only Word and Outlook write: their style classes and `mso-` properties. */
const OFFICE_STYLED = '[class*="Mso"], [style*="mso-"]';
/** Spans that may hold a list paragraph's marker, before their style is read. */
const LIST_SPAN = 'span[style*="mso-list"]';

/**
 * Keeps Word's list data past the engine, which merges the pasted `<style>`
 * rules into each element with the CSSOM and so drops every `mso-` property
 * the rules touch. A custom property survives that merge. The merge appends
 * each rule after the element's own style, so the rules get a name of their
 * own to keep a paragraph's own level and list. Only HTML that holds
 * `mso-list`, and only where CSS lives (style attributes and `<style>` bodies),
 * so text that mentions `mso-list` stays as written.
 */
export const keepOfficeListStyles = (html: string): string => {
    if (!OFFICE_LIST_MARKUP.test(html)) {
        return html;
    }
    const withAttributes = html.replaceAll(TAG, (tag) =>
        tag.replaceAll(
            STYLE_ATTRIBUTE,
            (_match, name: string, value: string) => name + value.replaceAll(MSO_LIST_PROPERTY, KEPT_LIST_PROPERTY),
        ),
    );
    // The split puts each style tag at an odd index; a body is the text between an opening tag and a closing one.
    const parts = withAttributes.split(STYLE_TAGS);
    for (let index = 2; index < parts.length - 1; index += 2) {
        const opening = parts[index - 1] ?? '';
        const closing = parts[index + 1] ?? '';
        if (!opening.startsWith('</') && closing.startsWith('</')) {
            parts[index] = (parts[index] ?? '').replaceAll(MSO_LIST_PROPERTY, RULE_LIST_PROPERTY);
        }
    }
    return parts.join('');
};

/** Whether the paste carries Word or Outlook markup, found without reading every element's style. */
const isOffice = (dom: HTMLElement): boolean =>
    dom.getElementsByTagName(PARAGRAPH_MARKER).length > 0 || dom.querySelector(OFFICE_STYLED) !== null;

type ListKind = 'bullet' | 'numbered';

/** Where an item belongs: Word's list (template and instance), its level, and its kind of list. */
type ListPlace = { list: string; level: number; kind: ListKind };

/** An item's marker: a bullet, or a number with the item's number as Word wrote it, when the marker has one. */
type ListMarker = { kind: 'bullet' } | { kind: 'numbered'; number: string | undefined };

type ListParagraph = Omit<ListPlace, 'kind'> & ListMarker & { paragraph: HTMLElement };

type OpenList = ListPlace & { element: HTMLElement };

const tagOf = (kind: ListKind): string => {
    switch (kind) {
        case 'bullet':
            return 'ul';
        case 'numbered':
            return 'ol';
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

/** The elements of `dom` that hold text other than whitespace, each ancestor added once. */
const elementsWithText = (dom: HTMLElement): Set<Node> => {
    const holding = new Set<Node>();
    const walker = dom.ownerDocument.createTreeWalker(dom, NodeFilter.SHOW_TEXT);
    for (let text = walker.nextNode(); text !== null; text = walker.nextNode()) {
        if ((text.textContent ?? '').trim() === '') {
            continue;
        }
        for (let parent = text.parentNode; parent !== null && !holding.has(parent); parent = parent.parentNode) {
            holding.add(parent);
        }
    }
    return holding;
};

/**
 * The `<o:p>` marker ends a paragraph and usually holds at most a space. A blank
 * one goes; one with text stays, since the parse reads an unknown element's
 * content as it is, and moving a large subtree out costs its size per marker.
 */
const removeParagraphMarkers = (dom: HTMLElement): void => {
    // By tag name, since not every DOM parses the escaped `o\:p` selector.
    const markers = [...dom.getElementsByTagName(PARAGRAPH_MARKER)];
    if (markers.length === 0) {
        return;
    }
    // Read once for the whole paste: each marker reading its own text reads nested markers' text again.
    const holding = elementsWithText(dom);
    for (const marker of markers) {
        // A marker inside a blank one went with it.
        if (!holding.has(marker) && dom.contains(marker)) {
            marker.remove();
        }
    }
};

const markerSpans = (root: ParentNode): HTMLElement[] =>
    [...root.querySelectorAll<HTMLElement>(LIST_SPAN)].filter((span) =>
        MARKER_STYLE.test(span.getAttribute('style') ?? ''),
    );

/** `element` as a list paragraph, or `undefined` when it is not one. */
const readListParagraph = (element: Node): ListParagraph | undefined => {
    if (!(element instanceof HTMLElement) || element.localName !== 'p') {
        return undefined;
    }
    // Word never puts a paragraph inside another; only parser tricks do, and lists rebuilt there would nest without bound.
    if (element.parentElement?.closest('p')) {
        return undefined;
    }
    const style = element.getAttribute('style') ?? '';
    let declared = RULE_LIST_STYLE.exec(style);
    if (OWN_LIST_STYLE.test(style)) {
        declared = LIST_STYLE.exec(style);
    }
    if (declared === null || Number(declared[2]) < 1) {
        return undefined;
    }
    const markerText = (markerSpans(element)[0]?.textContent ?? '').trim();
    let marker: ListMarker = { kind: 'bullet' };
    if (NUMBERED_MARKER.test(markerText)) {
        const numbers = markerText.match(MARKER_NUMBERS);
        marker = { kind: 'numbered', number: numbers?.[numbers.length - 1] };
    }
    return {
        paragraph: element,
        list: `${declared[1] ?? ''} ${declared[3] ?? ''}`,
        level: Math.min(Number(declared[2]), MAX_LEVEL),
        ...marker,
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
    if (item.kind === 'numbered' && item.number !== undefined) {
        element.setAttribute('start', item.number);
    }
    return { element, list: item.list, level: item.level, kind: item.kind };
};

/**
 * Rebuilds one run of list paragraphs as nested lists where it stood. A level
 * below the one before opens one list inside the last item, so no empty item
 * holds it. A numbered list starts at the number Word wrote for its first
 * item, so one that resumes after another block, or a copy that begins
 * partway through, keeps Word's numbering.
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
        const element = document.createElement('li');
        element.append(item.paragraph);
        parent.element.append(element);
    }
    anchor.remove();
};

const rebuildLists = (dom: HTMLElement): void => {
    const done = new Set<Element>();
    for (const paragraph of dom.querySelectorAll('p')) {
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
 * Turns Word and Outlook's list paragraphs into nested lists and removes what
 * they write besides content: the `<o:p>` markers and each list marker, also
 * the number a heading carries. Does nothing to a paste from elsewhere.
 */
export const tidyOffice = (dom: HTMLElement): void => {
    if (!isOffice(dom)) {
        return;
    }
    removeParagraphMarkers(dom);
    rebuildLists(dom);
    for (const span of markerSpans(dom)) {
        span.remove();
    }
};
