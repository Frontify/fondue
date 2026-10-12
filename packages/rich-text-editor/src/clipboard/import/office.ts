/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElementBeside, unwrap } from './dom';

/**
 * The list template, level and list instance that Word and Outlook write on each list paragraph, as in
 * `mso-list:l0 level2 lfo1`: two lists of one template are told apart by their `lfo`.
 */
const MSO_LIST = /(?:^|;)\s*mso-list:\s*(l\d+)\s+level(\d+)(?:\s+(lfo\d+))?/i;
/** The style of the span that holds a list paragraph's marker, a bullet glyph or a number. */
const MSO_IGNORE = /(?:^|;)\s*mso-list:\s*ignore/i;
/** A CSS comment, which a declaration inside it does not make. */
const CSS_COMMENT = /\/\*[\s\S]*?\*\//g;

/** The declarations of `element`'s `style` attribute as written, without comments; the CSSOM drops `mso-` properties. */
const declaredStyle = (element: Element) => (element.getAttribute('style') ?? '').replaceAll(CSS_COMMENT, '');
/** A number, letter or roman numeral and its delimiter, such as `1.`, `a)` or `(iv)`; anything else is a bullet. */
const ORDERED_MARKER = /^\(?(?:\d+|[a-z]+)[.)]/i;
/** The elements Word and Outlook write list paragraphs as. */
const LIST_PARAGRAPHS = 'p, h1, h2, h3, h4, h5, h6, li';
/** A declaration of an Office property in a `style` attribute. */
const MSO_PROPERTY = /(?:^|;)\s*mso-/i;

/** The numbering formats an ordered list's `data-marker` takes. */
type MarkerFormat = 'decimal' | 'lower-alpha' | 'upper-alpha' | 'lower-roman' | 'upper-roman';

interface ListParagraph {
    readonly element: Element;
    readonly list: string;
    readonly level: number;
    readonly ordered: boolean;
    /** The format its marker text shows, which its list takes when the item opens it; `null` for a bullet or no marker. */
    readonly format: MarkerFormat | null;
}

interface OpenList {
    readonly element: HTMLElement;
    readonly list: string;
    /** The Word level of its items, clamped. */
    readonly level: number;
    readonly ordered: boolean;
}

/** A marker's number or letters before its delimiter, such as `iv` in `iv)`. */
const MARKER_TOKEN = /^\(?(\d+|[a-z]+)[.)]/i;
const ROMAN = /^[ivxlcdm]+$/i;

/**
 * The numbering format that Word's marker text shows, since the `@list` rules that name it are in a `style` element the
 * cleanup removes: digits are decimal; a roman list starts at `i`, so `i` or roman letters longer than one are roman, and
 * any other letter is a letter list; the case gives lower or upper.
 */
const formatOf = (marker: string): MarkerFormat | null => {
    const token = MARKER_TOKEN.exec(marker)?.[1];
    if (token === undefined) {
        return null;
    }
    if (/^\d+$/.test(token)) {
        return 'decimal';
    }
    const lower = token === token.toLowerCase();
    const roman = ROMAN.test(token) && (token.length > 1 || token.toLowerCase() === 'i');
    if (roman && lower) {
        return 'lower-roman';
    }
    if (roman) {
        return 'upper-roman';
    }
    if (lower) {
        return 'lower-alpha';
    }
    return 'upper-alpha';
};

const isList = (node: Node | null) => node !== null && (node.nodeName === 'UL' || node.nodeName === 'OL');

/** `element` as a list paragraph without its marker spans, or `undefined` when it is none. */
const readListParagraph = (element: Element): ListParagraph | undefined => {
    if (!element.matches(LIST_PARAGRAPHS)) {
        return undefined;
    }
    const declared = MSO_LIST.exec(declaredStyle(element));
    // A level below 1 names no list level, so the paragraph stays a paragraph.
    if (declared === null || Number(declared[2]) < 1) {
        return undefined;
    }
    const markers = Array.from(element.querySelectorAll('span')).filter((span) => MSO_IGNORE.test(declaredStyle(span)));
    // An item that Word writes as `li` may have no marker span, and its list says what it is.
    let ordered = element.localName === 'li' && element.parentNode?.nodeName === 'OL';
    let format: MarkerFormat | null = null;
    if (markers[0] !== undefined) {
        const marker = (markers[0].textContent ?? '').trim();
        ordered = ORDERED_MARKER.test(marker);
        format = formatOf(marker);
    }
    for (const span of markers) {
        span.remove();
    }
    return { element, list: `${declared[1]} ${declared[3] ?? ''}`, level: Number(declared[2]), ordered, format };
};

/** Whether `node` lays out markup only, so the list paragraphs on both sides of it are one run. */
const isLayout = (node: ChildNode) =>
    node.nodeType === node.COMMENT_NODE || (node.nodeType === node.TEXT_NODE && (node.textContent ?? '').trim() === '');

/** The list paragraphs that follow `first` as siblings, with only layout between them. */
const runFrom = (first: ListParagraph) => {
    const run = [first];
    for (let next = first.element.nextSibling; next !== null; next = next.nextSibling) {
        if (isLayout(next)) {
            continue;
        }
        if (next.nodeType !== next.ELEMENT_NODE || next.nodeName === 'LI') {
            break;
        }
        const item = readListParagraph(next as Element);
        if (item === undefined) {
            break;
        }
        run.push(item);
    }
    return run;
};

/** The outermost list that holds `item` through lists and items only, which a rebuild of its items replaces. */
const outermostList = (item: Element, body: HTMLElement) => {
    let outermost: Element | undefined;
    for (let parent = item.parentElement; parent !== null && parent !== body; parent = parent.parentElement) {
        if (isList(parent)) {
            outermost = parent;
        } else if (parent.localName !== 'li') {
            break;
        }
    }
    return outermost;
};

/** The deepest list level that fits within `maxDepth` when the import's blocks land at `depth`, or 0 when none fits. */
const deepestLevel = (element: Element, body: HTMLElement, maxDepth: number, depth: number) => {
    // Each element around the paragraph may become a node of its own.
    let around = 0;
    for (let parent = element.parentElement; parent !== null && parent !== body; parent = parent.parentElement) {
        around += 1;
    }
    // Each level adds a list and an item, and the innermost item a paragraph and its text: `depth + 2 * level + 1`.
    // 0 when not even one level fits, which leaves the paragraphs as paragraphs.
    return Math.max(0, Math.floor((maxDepth - depth - around - 1) / 2));
};

/**
 * The items already numbered at each level of each list, so an ordered list that resumes after other blocks
 * continues its numbering, as Word keeps the list of a run that other blocks interrupt.
 */
type Numbering = Map<string, number[]>;

/**
 * Rebuilds one run of list paragraphs as nested lists in their place, or before `anchor` when one is given. A level
 * deeper than the one before opens one list only, so no empty item holds it, and no level passes `deepest`, so the
 * nesting never does either.
 */
const rebuildRun = (run: readonly ListParagraph[], deepest: number, numbering: Numbering, anchor?: Element) => {
    const open: OpenList[] = [];
    for (const { element, list, level: declared, ordered, format } of run) {
        const level = Math.min(declared, deepest);
        for (let top = open.at(-1); top !== undefined && top.level > level; top = open.at(-1)) {
            open.pop();
        }
        const current = open.at(-1);
        // Another list or marker kind at the same level starts a new list.
        if (
            current !== undefined &&
            current.level === level &&
            (current.list !== list || current.ordered !== ordered)
        ) {
            open.pop();
        }
        let counts = numbering.get(list);
        if (counts === undefined) {
            counts = [];
            numbering.set(list, counts);
        }
        let parent = open.at(-1);
        if (parent === undefined || parent.level < level) {
            let tag = 'ul';
            if (ordered) {
                tag = 'ol';
            }
            const created = createElementBeside(element, tag);
            const numbered = counts[level] ?? 0;
            if (ordered && numbered > 0) {
                created.setAttribute('start', String(numbered + 1));
            }
            // An explicit format, so a list nested in another keeps Word's numbering instead of its depth's default.
            if (ordered && format !== null) {
                created.setAttribute('data-marker', format);
            }
            if (parent !== undefined) {
                parent.element.lastElementChild?.append(created);
            } else if (anchor === undefined) {
                element.before(created);
            } else {
                anchor.before(created);
            }
            parent = { element: created, list, level, ordered };
            open.push(parent);
        }
        counts[level] = (counts[level] ?? 0) + 1;
        // An item restarts the numbering of the levels below it.
        counts.length = level + 1;
        const item = createElementBeside(element, 'li');
        // One child at a time: a spread of every child can pass the engine's argument limit.
        for (const child of Array.from(element.childNodes)) {
            // The nested lists of an item that Word writes as `li` go with the list it rebuilds.
            if (anchor === undefined || !isList(child)) {
                item.append(child);
            }
        }
        parent?.element.append(item);
        if (anchor === undefined) {
            element.remove();
        }
    }
    anchor?.remove();
};

/** The items of a list Word writes as `ul` or `ol`, each a list paragraph, or `undefined` when one of them is none. */
const itemsOf = (list: Element) => {
    const items: ListParagraph[] = [];
    for (const item of Array.from(list.querySelectorAll('li'))) {
        const read = readListParagraph(item);
        if (read === undefined) {
            return undefined;
        }
        items.push(read);
    }
    return items;
};

/**
 * Turns the list paragraphs that Word and Outlook write in place of `ul` and `ol`, on `p`, headings and `li`, into
 * nested lists, ordered when the marker is a number or letter, with their marker spans dropped and their levels
 * clamped so that the rebuilt nesting stays within `maxDepth` when the import's blocks land at `depth`, as
 * `exceededStructure` counts it. An `li` list is rebuilt whole from the levels of its items.
 */
export const rebuildOfficeLists = (body: HTMLElement, maxDepth: number, depth: number) => {
    // Each paragraph is read in one run only, so a long run that stays in place costs one pass.
    const read = new Set<Element>();
    const numbering: Numbering = new Map();
    for (const paragraph of Array.from(body.querySelectorAll(LIST_PARAGRAPHS))) {
        if (read.has(paragraph)) {
            continue;
        }
        if (paragraph.localName === 'li') {
            const list = outermostList(paragraph, body);
            // A task list another editor wrote keeps its items' states; a rebuilt `li` would lose them.
            if (list === undefined || list.hasAttribute('data-task-list')) {
                continue;
            }
            for (const item of Array.from(list.querySelectorAll('li'))) {
                read.add(item);
            }
            const items = itemsOf(list);
            const deepest = deepestLevel(list, body, maxDepth, depth);
            if (items !== undefined && deepest > 0) {
                rebuildRun(items, deepest, numbering, list);
            }
            continue;
        }
        const first = readListParagraph(paragraph);
        if (first === undefined) {
            continue;
        }
        const run = runFrom(first);
        for (const item of run) {
            read.add(item.element);
        }
        const deepest = deepestLevel(paragraph, body, maxDepth, depth);
        if (deepest > 0) {
            rebuildRun(run, deepest, numbering);
        }
    }
};

/**
 * Removes what Office writes besides content: each `o:p`, which ends a paragraph and holds at most a space, keeping
 * any text it holds, each `Mso` class and each `mso-` property, which the parse rules never read.
 */
export const removeOfficeMarkup = (body: HTMLElement) => {
    // By tag name, since not every DOM implementation parses the escaped `o\:p` selector.
    for (const marker of Array.from(body.getElementsByTagName('o:p'))) {
        if ((marker.textContent ?? '').trim() === '') {
            marker.remove();
        } else {
            unwrap(marker);
        }
    }
    // One write per element: removing tokens one at a time rewrites the attribute each time, quadratic in hostile input.
    for (const element of Array.from(body.querySelectorAll('[class]'))) {
        const kept = (element.getAttribute('class') ?? '')
            .split(/\s+/)
            .filter((name) => name !== '' && !name.startsWith('Mso'));
        if (kept.length === 0) {
            element.removeAttribute('class');
            continue;
        }
        element.setAttribute('class', kept.join(' '));
    }
    for (const element of Array.from(body.querySelectorAll('[style]'))) {
        const style = (element as HTMLElement).style as CSSStyleDeclaration | undefined;
        if (style === undefined || !MSO_PROPERTY.test(element.getAttribute('style') ?? '')) {
            continue;
        }
        // The style keeps only the properties it parsed, and no engine parses an `mso-` one.
        const kept = style.cssText;
        if (kept === '') {
            element.removeAttribute('style');
        } else {
            element.setAttribute('style', kept);
        }
    }
};
