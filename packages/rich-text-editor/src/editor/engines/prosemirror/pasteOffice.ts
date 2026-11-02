/* (c) Copyright Frontify Ltd., all rights reserved. */

// Word and Outlook write a list as paragraphs with an `mso-list` style and the
// marker (a bullet glyph or a number) as text in a span, and end every
// paragraph with an `<o:p>` marker.

/** Word's list data on a paragraph, as in `mso-list: l0 level2 lfo1`: list template, level and list instance. */
const LIST_STYLE = /(?:^|;)\s*(?:--)?mso-list:\s*(l\d+)\s+level(\d+)(?:\s+(lfo\d+))?/i;
/** A paragraph's own `mso-list`, which can also say `none`. */
const OWN_LIST_STYLE = /(?:^|;)\s*(?:--)?mso-list:/i;
/** The list data a `<style>` rule gave a paragraph, under its own name so the paragraph's own wins. */
const RULE_LIST_STYLE = /(?:^|;)\s*--mso-list-rule:\s*(l\d+)\s+level(\d+)(?:\s+(lfo\d+))?/i;
/** The style of the span that holds a list paragraph's marker. */
const MARKER_STYLE = /(?:^|;)\s*(?:--)?mso-list:\s*ignore/i;
/** Dot-separated numbers (`1.`, `1.1.`, `1.1`) or letters with a delimiter (`iv)`, `a.`) are numbered markers; a glyph (`·`, `o`, `§`) is a bullet. */
const NUMBERED_MARKER = /^\(?(?:\d+(?:\.\d+)*[.)]?|[a-z]+[.)])$/i;
/** Word has nine list levels, which also keeps hostile input from nesting without end. */
const MAX_LEVEL = 9;

/** Word's namespace, a `Mso` class or an `mso-` style in the HTML string, found without parsing it. */
const OFFICE_MARKUP = /urn:schemas-microsoft-com:office|\sclass\s*=\s*["']?[^"'>]*Mso|\sstyle\s*=\s*["'][^"']*mso-/i;
const TAG = /<[a-z][^>]*>/gi;
const STYLE_ATTRIBUTE = /(\sstyle\s*=\s*)("[^"]*"|'[^']*')/gi;
const STYLE_ELEMENT = /(<style\b[^>]*>)([\s\S]*?)(<\/style\s*>)/gi;
const MSO_LIST_PROPERTY = /(?<![\w-])mso-list(?=\s*:)/gi;

/**
 * Keeps Word's list data past the engine, which merges the pasted `<style>`
 * rules into each element with the CSSOM and so drops every `mso-` property
 * the rules touch. A custom property survives that merge. The merge appends
 * each rule after the element's own style, so the rules get a name of their
 * own to keep a paragraph's own level and list. Only an Office paste, and only
 * where CSS lives (style attributes and `<style>` bodies), so text that
 * mentions `mso-list` stays as written.
 */
export const keepOfficeListStyles = (html: string): string => {
    if (!OFFICE_MARKUP.test(html)) {
        return html;
    }
    return html
        .replaceAll(TAG, (tag) =>
            tag.replaceAll(
                STYLE_ATTRIBUTE,
                (_match, name: string, value: string) => name + value.replaceAll(MSO_LIST_PROPERTY, '--mso-list'),
            ),
        )
        .replaceAll(
            STYLE_ELEMENT,
            (_match, open: string, css: string, close: string) =>
                open + css.replaceAll(MSO_LIST_PROPERTY, '--mso-list-rule') + close,
        );
};

/** Whether the paste carries Word or Outlook markup, found without reading every element's style. */
const isOffice = (dom: HTMLElement): boolean =>
    dom.getElementsByTagName('o:p').length > 0 || dom.querySelector('[class*="Mso"], [style*="mso-"]') !== null;

type ListParagraph = { paragraph: HTMLElement; list: string; level: number; ordered: boolean };

type OpenList = { element: HTMLElement; level: number; ordered: boolean; list: string };

/** The `<o:p>` marker ends a paragraph and holds at most a space, so it goes and keeps only text it holds. */
const removeParagraphMarkers = (dom: HTMLElement): void => {
    // By tag name, since not every DOM parses the escaped `o\:p` selector.
    for (const marker of [...dom.getElementsByTagName('o:p')]) {
        if ((marker.textContent ?? '').trim() === '') {
            marker.remove();
        } else {
            marker.replaceWith(...marker.childNodes);
        }
    }
};

const markerSpans = (root: ParentNode): HTMLElement[] =>
    [...root.querySelectorAll<HTMLElement>('span[style*="mso-list"]')].filter((span) =>
        MARKER_STYLE.test(span.getAttribute('style') ?? ''),
    );

/** The list and level `element` declares, or `undefined` when it declares none. */
const readListData = (element: HTMLElement): { list: string; level: number } | undefined => {
    const style = element.getAttribute('style') ?? '';
    let declared = RULE_LIST_STYLE.exec(style);
    if (OWN_LIST_STYLE.test(style)) {
        declared = LIST_STYLE.exec(style);
    }
    if (declared === null || Number(declared[2]) < 1) {
        return undefined;
    }
    return { list: `${declared[1] ?? ''} ${declared[3] ?? ''}`, level: Math.min(Number(declared[2]), MAX_LEVEL) };
};

/** `element` as a list paragraph, or `undefined` when it is not one. */
const readListParagraph = (element: Node): ListParagraph | undefined => {
    if (!(element instanceof HTMLElement) || element.localName !== 'p') {
        return undefined;
    }
    const data = readListData(element);
    if (data === undefined) {
        return undefined;
    }
    const marker = (markerSpans(element)[0]?.textContent ?? '').trim();
    return { paragraph: element, ...data, ordered: NUMBERED_MARKER.test(marker) };
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

/**
 * The items each of Word's lists already holds at each level, so a numbered
 * list that other blocks interrupt continues its numbering, as Word keeps
 * counting a list it resumes.
 */
type Numbering = Map<string, number[]>;

const countsOf = (numbering: Numbering, list: string): number[] => {
    let counts = numbering.get(list);
    if (counts === undefined) {
        counts = [];
        numbering.set(list, counts);
    }
    return counts;
};

/** Counts one item at `level`, which restarts the numbering of the levels below it. */
const countItem = (counts: number[], level: number): void => {
    counts[level] = (counts[level] ?? 0) + 1;
    counts.length = level + 1;
};

/**
 * Rebuilds one run of list paragraphs as nested lists where it stood. A level
 * below the one before opens one list inside the last item, so no empty item
 * holds it. A bullet run continues across Word's list instances, a numbered
 * one restarts with each, as Word numbers them. A numbered list that resumes
 * after another block starts after the items `numbering` counted for it.
 */
const rebuildRun = (run: readonly ListParagraph[], numbering: Numbering): void => {
    const first = run[0];
    if (first === undefined) {
        return;
    }
    const document = first.paragraph.ownerDocument;
    const open: OpenList[] = [];
    let lastTop: HTMLElement | undefined;
    for (const { paragraph, list, level, ordered } of run) {
        while ((open[open.length - 1]?.level ?? 0) > level) {
            open.pop();
        }
        const current = open[open.length - 1];
        if (current?.level === level && (current.ordered !== ordered || (ordered && current.list !== list))) {
            open.pop();
        }
        const counts = countsOf(numbering, list);
        let parent = open[open.length - 1];
        if (parent === undefined || parent.level < level) {
            let tag = 'ul';
            if (ordered) {
                tag = 'ol';
            }
            const element = document.createElement(tag);
            const numbered = counts[level] ?? 0;
            if (ordered && numbered > 0) {
                element.setAttribute('start', String(numbered + 1));
            }
            if (parent !== undefined) {
                parent.element.lastElementChild?.append(element);
            } else if (lastTop === undefined) {
                first.paragraph.before(element);
            } else {
                lastTop.after(element);
            }
            if (parent === undefined) {
                lastTop = element;
            }
            parent = { element, level, ordered, list };
            open.push(parent);
        }
        countItem(counts, level);
        const item = document.createElement('li');
        item.append(paragraph);
        parent.element.append(item);
    }
};

const rebuildLists = (dom: HTMLElement): void => {
    const done = new Set<Element>();
    const numbering: Numbering = new Map();
    for (const paragraph of dom.querySelectorAll<HTMLElement>('p, h1, h2, h3, h4, h5, h6')) {
        if (done.has(paragraph)) {
            continue;
        }
        // A heading Word numbers with a list stays a heading, but counts as that list's item.
        if (paragraph.localName !== 'p') {
            const heading = readListData(paragraph);
            if (heading !== undefined) {
                countItem(countsOf(numbering, heading.list), heading.level);
            }
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
        rebuildRun(run, numbering);
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
